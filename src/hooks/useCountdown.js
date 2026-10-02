import { useEffect, useState } from 'react'

const split = (ms) => {
  const s = Math.max(0, Math.floor(ms / 1000))
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  }
}

/**
 * useCountdown — live time remaining until `target` (ISO string / Date).
 * Stops ticking once the deadline has passed.
 */
export function useCountdown(target) {
  const end = new Date(target).getTime()
  const [now, setNow] = useState(() => Date.now())
  const closed = now >= end

  useEffect(() => {
    if (closed) return
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [closed])

  return { ...split(end - now), closed }
}

const MAX_TIMEOUT = 2 ** 31 - 1

/**
 * useDeadlinePassed — boolean that flips once when `target` passes.
 * Cheaper than useCountdown for components that don't display the timer.
 */
export function useDeadlinePassed(target) {
  const end = new Date(target).getTime()
  const [passed, setPassed] = useState(() => Date.now() >= end)

  useEffect(() => {
    if (passed) return
    let id
    const schedule = () => {
      const left = end - Date.now()
      if (left <= 0) return setPassed(true)
      id = setTimeout(schedule, Math.min(left, MAX_TIMEOUT))
    }
    schedule()
    return () => clearTimeout(id)
  }, [end, passed])

  return passed
}
