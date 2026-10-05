import { useState, useRef, useEffect } from 'react'
import {
  Calendar,
  MapPin,
  ArrowSquareOut,
  CaretRight,
  Broadcast,
  CheckCircle,
  Sparkle,
  CaretDown,
  ArrowRight,
} from '@phosphor-icons/react'
import { usePageTransition } from '../hooks/usePageTransition'
import './AccordionGallery.css'

export default function AccordionGallery({
  items = [],
  activeIndex = 0,
  onSelect = () => {},
  className = '',
}) {
  const { transitionTo } = usePageTransition()
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const galleryRef = useRef(null)

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
  }

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (galleryRef.current && galleryRef.current.contains(document.activeElement)) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault()
          onSelect(Math.min(items.length - 1, activeIndex + 1))
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault()
          onSelect(Math.max(0, activeIndex - 1))
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeIndex, items.length, onSelect])

  if (!items || items.length === 0) return null

  return (
    <div
      ref={galleryRef}
      className={`accordion-gallery-container ${className}`}
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
              onClick={() => onSelect(index)}
              onMouseMove={(e) => handleMouseMove(e, index)}
              style={
                isExpanded && typeof window !== 'undefined' && window.innerWidth >= 768
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
                  onSelect(index)
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

              {/* ── Collapsed Content Layer (Permanently in DOM for smooth GPU cross-fade) ── */}
              <div className="accordion-collapsed-content">
                {/* Top: Item Index Circle */}
                <div className="flex items-center justify-center pt-0.5">
                  <span className="font-mono text-xs font-bold text-sky-300 bg-sky-950/80 border border-sky-400/30 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center backdrop-blur-md shadow-sm">
                    {itemNumber}
                  </span>
                </div>

                {/* Center: Vertical Rotated Title in pure white */}
                <div className="accordion-vertical-title-wrap">
                  <div className="accordion-vertical-title">
                    <span className="font-bold text-white text-sm sm:text-[0.95rem] tracking-wide whitespace-nowrap">
                      {item.collapsedTitle || item.title}
                    </span>
                  </div>
                </div>

                {/* Bottom: Micro expand indicator */}
                <div className="flex items-center justify-center pb-0.5 text-slate-400">
                  <div className="hidden md:flex w-7 h-7 rounded-full bg-white/5 border border-white/10 items-center justify-center text-sky-400/70 hover:border-sky-400/40 hover:bg-sky-500/10 transition-all">
                    <CaretRight weight="bold" className="w-3.5 h-3.5" />
                  </div>
                  <div className="md:hidden flex items-center gap-1 text-xs text-sky-400/80 font-mono">
                    <span>Tap to view</span>
                    <CaretDown className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* ── Expanded Content Layer (Permanently in DOM with stable inner width) ── */}
              <div className="accordion-expanded-content">
                <div className="accordion-expanded-inner">
                  {/* Top Bar: Index (Left) + Mode badge (Right) */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs sm:text-sm font-extrabold text-sky-300 bg-sky-950/80 border border-sky-400/30 px-3 py-1 rounded-full backdrop-blur-md shadow-sm">
                        {itemNumber} / {String(items.length).padStart(2, '0')}
                      </span>
                      {item.category && (
                        <span className="hidden sm:inline-block font-mono text-[11px] font-semibold text-slate-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full backdrop-blur-md">
                          {item.category}
                        </span>
                      )}
                    </div>

                    {/* Mode Pill */}
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
                        ) : isUpcoming ? (
                          <Sparkle className="w-3.5 h-3.5" />
                        ) : (
                          <CheckCircle className="w-3.5 h-3.5" />
                        )}
                        {item.mode}
                      </span>
                    )}
                  </div>

                  {/* Content Area */}
                  <div className="mt-auto pt-3 sm:pt-4 flex flex-col gap-2 sm:gap-2.5">
                    {/* Event Title */}
                    <div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
                        {item.title}
                      </h3>
                      {item.tagline && (
                        <p className="text-xs sm:text-sm font-mono text-sky-400/90 mt-1 uppercase tracking-wider font-semibold">
                          {item.tagline}
                        </p>
                      )}
                    </div>

                    {/* Event Meta: Date & Venue */}
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 py-2 border-y border-white/10 text-xs sm:text-sm text-slate-300 font-medium">
                      <div className="flex items-center gap-2">
                        <Calendar weight="duotone" className="w-4 h-4 text-sky-400 shrink-0" />
                        <span>{item.date}</span>
                      </div>

                      {/* Location Tag */}
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
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl line-clamp-3 sm:line-clamp-4">
                      {item.desc}
                    </p>

                    {/* Bottom strip: Tags and CTA button */}
                    <div className="flex items-center justify-between gap-3 pt-2">
                      <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                        {item.tags?.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] sm:text-xs font-mono px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-white/5 text-slate-300 border border-white/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {item.mapsUrl ? (
                        <a
                          href={item.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-bold bg-sky-400 text-slate-950 hover:bg-sky-300 transition-all shadow-md shadow-sky-400/25 shrink-0"
                        >
                          <span>{item.actionLabel || 'View Map'}</span>
                          <ArrowSquareOut className="w-3.5 h-3.5" />
                        </a>
                      ) : item.actionUrl ? (
                        <a
                          href={item.actionUrl}
                          target={item.actionUrl.startsWith('http') ? '_blank' : '_self'}
                          rel={item.actionUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                          onClick={(e) => {
                            e.stopPropagation()
                            if (!item.actionUrl.startsWith('http')) {
                              e.preventDefault()
                              transitionTo(item.actionUrl)
                            }
                          }}
                          className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-bold bg-sky-400 text-slate-950 hover:bg-sky-300 transition-all shadow-md shadow-sky-400/25 shrink-0"
                        >
                          <span>{item.actionLabel || 'Join Lab'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-semibold text-slate-400 bg-white/5 border border-white/10 shrink-0">
                          <span>{item.actionLabel || 'Details Coming Soon'}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
