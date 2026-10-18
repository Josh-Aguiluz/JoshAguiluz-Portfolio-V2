import React, { useState, useCallback, useEffect, useRef } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle2, Download, ExternalLink, Eye, X } from 'lucide-react';
import { useDialogFocus } from '../lib/useDialogFocus';
import Picture, { type PictureData } from './Picture';

/**
 * Small, sized carousel variants of the certificate images. The certifications data
 * (and its full-resolution imports, used by the preview modal) is left untouched;
 * thumbnails are matched to it by file name.
 */
const THUMBS = Object.fromEntries(
  Object.entries(
    import.meta.glob<PictureData>('../assets/{phpBasics,comptiaReal,ccna,aws,htmlFundamentals,jsFundamentals}.webp', {
      query: { w: '360;720', format: 'avif;webp', as: 'picture' },
      import: 'default',
      eager: true,
    }),
  ).map(([path, pic]) => [path.split('/').pop()!.replace(/\.webp$/, ''), pic]),
);
const thumbFor = (src: string) => THUMBS[(src.split('/').pop() ?? '').replace(/(-[A-Za-z0-9_-]{8})?\.webp$/, '')];

interface Certification {
  title: string;
  issuer: string;
  image: string;
  link: string;
  sourceFile?: string;
  description: string;
  alt?: string;
}

interface CertCoverflowProps {
  certifications: Certification[];
}

export default function CertCoverflow({ certifications }: CertCoverflowProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const n = certifications.length;

  const prev = (activeIndex - 1 + n) % n;
  const next = (activeIndex + 1) % n;

  const goTo = useCallback((idx: number) => setActiveIndex(idx), []);
  const goPrev = useCallback(() => setActiveIndex((i) => (i - 1 + n) % n), [n]);
  const goNext = useCallback(() => setActiveIndex((i) => (i + 1) % n), [n]);

  // Close modal on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedCert(null);
    };
    if (selectedCert) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [selectedCert]);

  // Modal a11y: focus moves to the close button on open, Tab stays inside, focus returns on close.
  useDialogFocus(!!selectedCert, dialogRef, { initialFocusRef: closeRef });

  // Arrow-key navigation, only while focus is inside the carousel and no modal is open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (selectedCert) return;
      if (!rootRef.current?.contains(document.activeElement)) return;
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [selectedCert, goPrev, goNext]);

  const getCardStyle = (index: number) => {
    if (index === activeIndex) {
      return {
        x: 0,
        scale: 1,
        rotate: 0,
        opacity: 1,
        zIndex: 30,
      };
    }
    if (index === prev) {
      return {
        x: '-40%',
        scale: 0.82,
        rotate: -6,
        opacity: 1,
        zIndex: 20,
      };
    }
    if (index === next) {
      return {
        x: '40%',
        scale: 0.82,
        rotate: 6,
        opacity: 1,
        zIndex: 20,
      };
    }
    return {
      x: 0,
      scale: 0.7,
      rotate: 0,
      opacity: 0,
      zIndex: 10,
    };
  };

  return (
    <>
      <div
        ref={rootRef}
        className="glass-deck-container cert-deck rounded-2xl"
        role="region"
        aria-roledescription="carousel"
        aria-label="Certifications. Use the left and right arrow keys to browse."
        tabIndex={0}
      >
        <div className="glass-deck-fan">
          {certifications.map((cert, index) => {
            const style = getCardStyle(index);
            const isActive = index === activeIndex;
            const isPeeking = index === prev || index === next;

            return (
              <m.div
                key={index}
                className={`glass-card cert-card ${isActive ? 'glass-card-active cert-card-active' : 'cert-card-side'}`}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${n}: ${cert.title}`}
                aria-hidden={!isActive}
                animate={{
                  x: style.x,
                  scale: style.scale,
                  rotate: style.rotate,
                  opacity: style.opacity,
                  zIndex: style.zIndex,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 26,
                  mass: 0.9,
                }}
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  margin: '0 auto',
                  top: 0,
                  transformOrigin: 'center bottom',
                  cursor: isPeeking ? 'pointer' : isActive ? 'grab' : 'default',
                  pointerEvents: isActive || isPeeking ? 'auto' : 'none',
                }}
                onClick={() => {
                  if (index === prev) goPrev();
                  if (index === next) goNext();
                }}
                drag={isActive ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) goNext();
                  else if (info.offset.x > 80) goPrev();
                }}
                whileDrag={isActive ? { scale: 1.03, cursor: 'grabbing' } : undefined}
              >
                {/* Corner ribbon */}
                {isActive && (
                  <div className="pointer-events-none absolute right-0 top-0 z-20 h-28 w-28 overflow-hidden">
                    <div className="absolute -right-8 top-6 w-48 rotate-45 bg-accent py-1 text-center font-mono text-[10px] tracking-wider text-accent-fg">
                      Certified
                    </div>
                  </div>
                )}

                {/* Card Image */}
                <div
                  className={`glass-card-image certification-image-container cert-image ${isActive ? 'group cursor-pointer' : ''}`}
                  onClick={(e) => {
                    if (isActive) {
                      e.stopPropagation();
                      setSelectedCert(cert);
                    }
                  }}
                  title={isActive ? 'Preview Credential' : ''}
                >
                  <span className="cert-counter" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
                  </span>
                  {thumbFor(cert.image) ? (
                    <Picture
                      picture={thumbFor(cert.image)}
                      alt={cert.alt || `Professional Certification: ${cert.title} issued by ${cert.issuer}`}
                      sizes="(max-width: 480px) 255px, 357px"
                      draggable={false}
                    />
                  ) : (
                    <img
                      src={cert.image}
                      alt={cert.alt || `Professional Certification: ${cert.title} issued by ${cert.issuer}`}
                      draggable={false}
                      loading="lazy"
                      decoding="async"
                    />
                  )}

                  {isActive && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="flex items-center gap-2 rounded-lg border border-white/15 bg-black/70 px-4 py-2 text-sm font-medium text-white">
                        <Eye className="h-4 w-4" aria-hidden="true" />
                        <span>Preview</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="glass-card-content cert-content">
                  <div className="flex items-center gap-2">
                    <span className="cert-issuer">{cert.issuer}</span>
                    <span className="cert-verified">
                      <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                      Verified
                    </span>
                  </div>

                  <h3 className="glass-card-title cert-title">{cert.title}</h3>

                  {isActive && (
                    <>
                      <p className="glass-card-desc cert-desc">{cert.description}</p>

                      <div className="cert-actions">
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          onPointerDown={(e) => e.stopPropagation()}
                          className="cert-btn cert-btn-primary"
                          title={`Verify ${cert.title} on ${cert.issuer}`}
                        >
                          <ExternalLink className="h-4 w-4" aria-hidden="true" />
                          <span>View Credential</span>
                        </a>
                        <div className="cert-actions-row">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedCert(cert);
                            }}
                            onPointerDown={(e) => e.stopPropagation()}
                            className="cert-btn cert-btn-ghost"
                          >
                            <Eye className="h-4 w-4" aria-hidden="true" />
                            <span>Preview</span>
                          </button>
                          {cert.sourceFile && (
                            <a
                              href={cert.sourceFile}
                              download
                              onClick={(e) => e.stopPropagation()}
                              onPointerDown={(e) => e.stopPropagation()}
                              className="cert-btn cert-btn-ghost"
                              title="Download Certificate"
                            >
                              <Download className="h-4 w-4" aria-hidden="true" />
                              <span>Download</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </m.div>
            );
          })}
        </div>

        {/* Navigation controls */}
        <div className="glass-deck-nav">
          <button
            type="button"
            className="glass-deck-arrow"
            onClick={goPrev}
            aria-label="Previous certification"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>

          <div className="glass-deck-dots">
            {certifications.map((_, i) => (
              <button
                type="button"
                key={i}
                className={`glass-deck-dot ${i === activeIndex ? 'active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Go to certification ${i + 1}`}
                aria-current={i === activeIndex ? 'true' : undefined}
              />
            ))}
          </div>

          <button
            type="button"
            className="glass-deck-arrow"
            onClick={goNext}
            aria-label="Next certification"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* ===== Certification Preview Modal ===== */}
      <AnimatePresence>
        {selectedCert && (
          <m.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
          >
            <m.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="cert-dialog-title"
              className="relative flex w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-border-strong bg-surface"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-3 sm:px-6">
                <div className="min-w-0">
                  <p className="font-mono text-xs text-fg-subtle">{selectedCert.issuer}</p>
                  <h3 id="cert-dialog-title" className="truncate text-base font-semibold">{selectedCert.title}</h3>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCert(null);
                  }}
                  className="icon-btn shrink-0"
                  aria-label="Close preview"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              {/* Image Container */}
              <div className="flex min-h-[300px] items-center justify-center bg-surface-2 p-4 sm:p-8">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.alt || `Full preview of ${selectedCert.title} certification`}
                  className="max-h-[70vh] max-w-full rounded-md border border-border object-contain"
                  draggable={false}
                />
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
