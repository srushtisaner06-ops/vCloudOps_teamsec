import { RECRUITMENT, getDomain } from '../data/recruitment'

/* ══════════════════════════════════════════════════════════════════════════════
   Recruitment data layer (browser-only for now).
   ──────────────────────────────────────────────────────────────────────────────
   Every function is async and returns plain JSON so the localStorage
   implementation can be swapped for real API calls (Supabase / Express)
   without changing the components that use it.
══════════════════════════════════════════════════════════════════════════════ */

const DRAFT_KEY = 'vcloudops.recruitment.draft.v1'
const APPS_KEY = 'vcloudops.recruitment.applications.v1'
const SESSION_KEY = 'vcloudops.recruitment.session.v1'

const read = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

const write = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

const normEmail = (email) => String(email || '').trim().toLowerCase()

/** Replace File objects with serialisable metadata. */
function serialiseFiles(values, { stale = false } = {}) {
  const out = {}
  for (const [k, v] of Object.entries(values)) {
    if (typeof File !== 'undefined' && v instanceof File) {
      out[k] = { name: v.name, size: v.size, type: v.type, ...(stale && { stale: true }) }
    } else {
      out[k] = v
    }
  }
  return out
}

/* ── Drafts (Save & Continue Later) ────────────────────────────────────────── */
export function loadDraft() {
  return read(DRAFT_KEY, null)
}

export function saveDraft(draft) {
  const savedAt = new Date().toISOString()
  const ok = write(DRAFT_KEY, { ...draft, values: serialiseFiles(draft.values, { stale: true }), savedAt })
  return ok ? savedAt : null
}

export function clearDraft() {
  try {
    localStorage.removeItem(DRAFT_KEY)
  } catch {
    /* storage unavailable */
  }
}

/* ── Session (stand-in for VIT email login) ──────────────────────────────────── */
export function getSession() {
  return read(SESSION_KEY, null)
}

export function setSession(email) {
  write(SESSION_KEY, normEmail(email))
}

export function clearSession() {
  try {
    localStorage.removeItem(SESSION_KEY)
  } catch {
    /* storage unavailable */
  }
}

/* ── Applications ──────────────────────────────────────────────────────────── */
function generateId(domainId, existing) {
  const code = getDomain(domainId)?.code || 'GEN'
  const buf = new Uint32Array(1)
  let id
  do {
    crypto.getRandomValues(buf)
    id = `VIT-${code}-${RECRUITMENT.year}-${String(buf[0] % 100000).padStart(5, '0')}`
  } while (existing.some((a) => a.id === id))
  return id
}

export async function findApplication(email) {
  const apps = read(APPS_KEY, [])
  return apps.find((a) => normEmail(a.email) === normEmail(email)) || null
}

export function hasApplied(email) {
  return read(APPS_KEY, []).some((a) => normEmail(a.email) === normEmail(email))
}

export async function submitApplication(values) {
  const apps = read(APPS_KEY, [])
  if (apps.some((a) => normEmail(a.email) === normEmail(values.email))) {
    const err = new Error('An application with this email already exists for this cycle.')
    err.code = 'DUPLICATE'
    throw err
  }

  const submittedAt = new Date().toISOString()
  const record = {
    id: generateId(values.primaryDomain, apps),
    cycle: RECRUITMENT.cycle,
    email: normEmail(values.email),
    name: values.fullName.trim(),
    primaryDomain: values.primaryDomain,
    secondaryDomain: values.secondaryDomain || null,
    status: 'SUBMITTED',
    submittedAt,
    data: serialiseFiles(values),
    notifications: [
      { id: 'received', title: 'Application received', body: 'Thanks for applying! We’ll notify you when your status changes.', at: submittedAt },
    ],
  }

  if (!write(APPS_KEY, [...apps, record])) {
    throw new Error('Could not save your application. Check that your browser allows site storage.')
  }
  clearDraft()
  setSession(record.email)
  return record
}
