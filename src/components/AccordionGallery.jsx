import { useState, useRef, useEffect, useCallback } from 'react'
import {
  Calendar,
  MapPin,
  ArrowSquareOut,
  CaretLeft,
  CaretRight,
  Clock,
  Broadcast,
  CheckCircle,
  CaretDown,
} from '@phosphor-icons/react'
import './AccordionGallery.css'

export default function AccordionGallery({
  items = [],
  defaultIndex = 0,
  enableWheelScroll = true,
  autoPlay = false,
  autoPlayInterval = 6000,
  className = '',
}) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex)
  const [isHovered, setIsHovered] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const galleryRef = useRef(null)
  const lastScrollTime = useRef(0)
  const touchStartX = useRef(0)

  // Navigate to previous or next panel
  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1))
  }, [items.length])

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0))
  }, [items.length])

  // Mouse wheel scroll to cycle accordion like a carousel
  const handleWheel = useCallback(
    (e) => {
      if (!enableWheelScroll || items.length <= 1) return

      const now = Date.now()
      // Throttle wheel navigation to avoid runaway skips (450ms debounce)
      if (now - lastScrollTime.current < 450) return

      if (Math.abs(e.deltaY) > 25 || Math.abs(e.deltaX) > 25) {
        const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
        if (delta > 0) {
          // Scrolled down/right -> next
          handleNext()
          lastScrollTime.current = now
        } else if (delta < 0) {
          // Scrolled up/left -> prev
          handlePrev()
          lastScrollTime.current = now
        }
      }
    },
    [enableWheelScroll, handleNext, handlePrev, items.length]
  )

  // Touch swipe support for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX.current - touchEndX
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext()
      } else {
        handlePrev()
      }
    }
  }

  // Auto-play timer (pauses on hover)
  useEffect(() => {
    if (!autoPlay || isHovered || items.length <= 1) return
    const timer = setInterval(() => {
      handleNext()
    }, autoPlayInterval)
    return () => clearInterval(timer)
  }, [autoPlay, isHovered, autoPlayInterval, handleNext, items.length])

  // Subtle 3D tilt tracking for expanded card on desktop
  const handleMouseMove = (e, index) => {
    if (index !== activeIndex || window.innerWidth < 768) return
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: x * 6, y: -y * 6 })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setIsHovered(false)
  }

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (galleryRef.current && galleryRef.current.contains(document.activeElement)) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault()
          handleNext()
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault()
          handlePrev()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleNext, handlePrev])

  if (!items || items.length === 0) return null

  return (
    <div
      ref={galleryRef}
      className={`accordion-gallery-container ${className}`}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      tabIndex={0}
      role="region"
      aria-label="Interactive Events Accordion Gallery"
    >
      {/* ── Main Accordion Track ── */}
      <div className="accordion-gallery-track">
        {items.map((item, index) => {
          const isExpanded = index === activeIndex
          const itemNumber = String(index + 1).padStart(2, '0')
          const isOnline = item.mode?.toLowerCase().includes('online')
          const isUpcoming = item.mode?.toLowerCase().includes('coming')

          return (
            <div
              key={item.id || index}
              className={`accordion-panel ${isExpanded ? 'is-expanded' : 'is-collapsed'}`}
              onClick={() => setActiveIndex(index)}
              onMouseMove={(e) => handleMouseMove(e, index)}
              style={
                isExpanded && window.innerWidth >= 768
                  ? {
                      transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
                    }
                  : undefined
              }
              role="tab"
              aria-selected={isExpanded}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setActiveIndex(index)
                }
              }}
            >
              {/* Top ambient glow accent line */}
              <div className="accordion-glow-accent" />

              {/* Background Image with Fallback handling */}
              <img
                src={item.src}
                alt={item.title}
                className="accordion-bg-img"
                loading="lazy"
                onError={(e) => {
                  if (item.fallbackSrc && e.currentTarget.src !== item.fallbackSrc) {
                    e.currentTarget.src = item.fallbackSrc
                  }
                }}
              />

              {/* Dark Gradient Glass Overlay */}
              <div className="accordion-overlay" />

              {/* ── Collapsed State Display ── */}
              {!isExpanded && (
                <div className="accordion-collapsed-content">
                  {/* Left / Top: Item Index */}
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-sky-400/90 bg-sky-950/70 border border-sky-400/25 px-2.5 py-1 rounded-full backdrop-blur-md">
                      {itemNumber}
                    </span>
                  </div>

                  {/* Desktop Vertical Rotated Title / Mobile Horizontal Title */}
                  <div className="accordion-vertical-title flex items-center gap-2 sm:gap-3">
                    <span className="font-bold text-white tracking-wide">{item.title}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400/70 shrink-0" />
                    <span className="text-xs font-mono font-normal text-slate-400 truncate max-w-[140px] sm:max-w-none">
                      {item.date}
                    </span>
                  </div>

                  {/* Desktop Bottom Pulse Dot / Mobile Caret Icon */}
                  <div className="flex items-center text-slate-400">
                    <div className="hidden md:flex flex-col items-center gap-1">
                      <div className="w-1.5 h-8 rounded-full bg-slate-700/60 overflow-hidden">
                        <div className="w-full h-2 bg-sky-400 rounded-full animate-pulse" />
                      </div>
                    </div>
                    <div className="md:hidden flex items-center gap-1 text-xs text-sky-400/80 font-mono">
                      <span>Tap to view</span>
                      <CaretDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              )}

              {/* ── Expanded State Display ── */}
              {isExpanded && (
                <div className="accordion-expanded-content">
                  {/* Top Bar: Index (Left) + Mode without brackets (Right) */}
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-xs sm:text-sm font-extrabold text-sky-300 bg-sky-950/80 border border-sky-400/30 px-3 py-1 rounded-full backdrop-blur-md shadow-sm">
                      {itemNumber} / {String(items.length).padStart(2, '0')}
                    </span>

                    {/* Clean Mode Pill without brackets */}
                    {item.mode && (
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider backdrop-blur-md border ${
                          isOnline
                            ? 'bg-emerald-950/70 border-emerald-400/40 text-emerald-300'
                            : isUpcoming
                            ? 'bg-purple-950/70 border-purple-400/40 text-purple-300'
                            : 'bg-sky-950/70 border-sky-400/40 text-sky-300'
                        }`}
                      >
                        {isOnline ? (
                          <Broadcast className="w-3.5 h-3.5 animate-pulse" />
                        ) : (
                          <CheckCircle className="w-3.5 h-3.5" />
                        )}
                        {item.mode}
                      </span>
                    )}
                  </div>

                  {/* Content Area */}
                  <div className="mt-auto pt-5 sm:pt-6 flex flex-col gap-3.5 sm:gap-4">
                    {/* Event Title */}
                    <div>
                      <h3 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                        {item.title}
                      </h3>
                      {item.tagline && (
                        <p className="text-xs sm:text-sm font-mono text-sky-400/90 mt-1 uppercase tracking-wider">
                          {item.tagline}
                        </p>
                      )}
                    </div>

                    {/* Event Meta: Date & Venue (if venue exists) */}
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 py-3 border-y border-white/10 text-xs sm:text-sm text-slate-300 font-medium">
                      <div className="flex items-center gap-2">
                        <Calendar weight="duotone" className="w-4 h-4 text-sky-400 shrink-0" />
                        <span>{item.date}</span>
                      </div>

                      {/* Location Tag only rendered when venue is defined */}
                      {item.venue && (
                        <div className="flex items-center gap-2">
                          <MapPin weight="duotone" className="w-4 h-4 text-rose-400 shrink-0" />
                          {item.mapsUrl ? (
                            <a
                              href={item.mapsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-sky-300 hover:text-white underline underline-offset-4 decoration-sky-400/50 hover:decoration-sky-300 transition-colors group/link"
                              title="Open VIT Bibwewadi College in Google Maps"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span>{item.venue}</span>
                              <ArrowSquareOut className="w-3.5 h-3.5 text-sky-400 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                            </a>
                          ) : (
                            <span>{item.venue}</span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed max-w-3xl">
                      {item.desc}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* ── Carousel Bottom Navigation & Indicators ── */}
      <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
        {/* Helper Hint */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 tracking-wider">
          <Clock className="w-4 h-4 text-sky-400" />
          <span>Scroll over cards or tap to expand event details</span>
        </div>

        {/* Navigation Controls: Indicator Dots + Prev/Next Buttons */}
        <div className="flex items-center gap-4">
          {/* Dot Indicators */}
          <div className="flex items-center gap-2" role="tablist">
            {items.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === activeIndex
                    ? 'w-8 bg-gradient-to-r from-sky-400 to-indigo-400 shadow-md shadow-sky-400/40'
                    : 'w-2.5 bg-slate-700 hover:bg-slate-500'
                }`}
                aria-label={`Go to event ${idx + 1}: ${item.title}`}
              />
            ))}
          </div>

          {/* Prev / Next Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="accordion-nav-btn"
              aria-label="Previous event"
              title="Previous event"
            >
              <CaretLeft weight="bold" className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="accordion-nav-btn"
              aria-label="Next event"
              title="Next event"
            >
              <CaretRight weight="bold" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
