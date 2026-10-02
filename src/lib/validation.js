import { FILE_RULES, RECRUITMENT } from '../data/recruitment'

const VIT_EMAIL = /^[a-z0-9._%+-]+@vit\.edu$/i
const PHONE = /^(?:\+?91[-\s]?)?[6-9]\d{4}[-\s]?\d{5}$/

export const isVitEmail = (value) => VIT_EMAIL.test(String(value || '').trim())

const isEmpty = (field, value) => {
  if (field.type === 'chips') return !Array.isArray(value) || value.length === 0
  if (field.type === 'file') return !value
  return value == null || String(value).trim() === ''
}

function checkUrl(field, raw) {
  let url
  try {
    url = new URL(raw.trim())
  } catch {
    return 'Enter a full link starting with https://'
  }
  if (!/^https?:$/.test(url.protocol)) return 'Link must start with https://'
  if (field.host) {
    const host = url.hostname.replace(/^www\./, '')
    if (host !== field.host && !host.endsWith(`.${field.host}`)) {
      return `This should be a ${field.host} link.`
    }
    if (url.pathname.replace(/\/+$/, '') === '') return `Add your ${field.label} username to the link.`
  }
  return null
}

/** File objects can't survive a reload, so drafts store `{ name, size, stale: true }`. */
function checkFile(rule, file) {
  const r = FILE_RULES[rule]
  if (!r || !file) return null
  if (file.stale) return 'Please re-attach this file — uploads aren’t kept after you leave the page.'
  const ext = `.${String(file.name).split('.').pop().toLowerCase()}`
  if (!r.accept.includes(ext)) return `Unsupported file type. Allowed: ${r.accept.join(', ')}`
  if (file.size > r.maxMB * 1024 * 1024) return `File is too large. Max ${r.maxMB} MB.`
  if (file.size === 0) return 'This file is empty.'
  return null
}

function validateField(field, value) {
  if (isEmpty(field, value)) {
    if (!field.required) return null
    return field.label.length > 32 ? 'This answer is required.' : `${field.label} is required.`
  }

  switch (field.type) {
    case 'email':
      if (!isVitEmail(value)) return `Use your college email ending in ${RECRUITMENT.emailDomain}`
      break
    case 'tel':
      if (!PHONE.test(String(value).trim())) return 'Enter a valid 10-digit Indian mobile number.'
      break
    case 'url':
      return checkUrl(field, value)
    case 'file':
      return checkFile(field.rule, value)
    default:
      break
  }

  const text = typeof value === 'string' ? value.trim() : ''
  if (field.pattern && !field.pattern.test(text)) return field.patternMessage || 'Invalid format.'
  if (field.minLength && text.length < field.minLength) {
    return `A little more detail please — at least ${field.minLength} characters (${text.length} so far).`
  }
  if (field.maxLength && text.length > field.maxLength) return `Keep it under ${field.maxLength} characters.`
  return null
}

export function validateFields(fields, values) {
  const errors = {}
  for (const field of fields) {
    const err = validateField(field, values[field.id])
    if (err) errors[field.id] = err
  }
  return errors
}
