import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle2, Download, ExternalLink, Eye, X } from 'lucide-react';

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
      <div className="glass-deck-container" style={{ minHeight: '650px' }}>
        <div className="glass-deck-fan">
          {certifications.map((cert, index) => {
            const style = getCardStyle(index);
            const isActive = index === activeIndex;
            const isPeeking = index === prev || index === next;

            return (
              <motion.div
                key={index}
                className={`glass-card ${isActive ? 'glass-card-active' : ''}`}
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
                {/* Premium Gold Ribbon Twist */}
                {isActive && (
                  <div className="absolute top-0 right-0 w-28 h-28 overflow-hidden z-20 pointer-events-none">
                    <div
                      className="absolute top-6 -right-8 w-48 bg-[#A47A2D] text-white text-[10px] font-black uppercase py-1.5 text-center transform rotate-45 shadow-[0_2px_10px_rgba(0,0,0,0.2)]"
                      style={{ fontFamily: 'Michroma, sans-serif' }}
                    >
                      Certified
                    </div>
                  </div>
                )}

                {/* Card Image */}
                <div
                  className={`glass-card-image certification-image-container ${isActive ? 'group cursor-pointer' : ''}`}
                  onClick={(e) => {
                    if (isActive) {
                      e.stopPropagation();
                      setSelectedCert(cert);
                    }
                  }}
                  title={isActive ? "Preview Credential" : ""}
                >
                  <img src={cert.image} alt={cert.alt || `Professional Certification: ${cert.title} issued by ${cert.issuer}`} draggable={false} />
                  <div className="glass-card-image-overlay transition-all duration-300 group-hover:bg-black/40" />

                  {/* Hover Preview Overlay */}
                  {isActive && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center gap-2 bg-[#A47A2D]/90 backdrop-blur-sm text-white px-5 py-2.5 rounded-full shadow-xl transform scale-95 group-hover:scale-100 transition-transform duration-300 border border-white/20">
                        <Eye className="w-4 h-4" />
                        <span className="text-[11px] font-black uppercase tracking-widest" style={{ fontFamily: 'Michroma, sans-serif' }}>Preview</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="glass-card-content">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-black text-[#8A5A19] dark:text-[#D4AF37] uppercase tracking-widest" style={{ fontFamily: 'Michroma, sans-serif' }}>
                      {cert.issuer}
                    </span>
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[#BF953F]/10 rounded-full border border-[#BF953F]/30">
                      <CheckCircle2 className="w-3 h-3 text-[#BF953F]" />
                      <span className="text-[8px] font-bold text-[#A47A2D] uppercase tracking-wider">Verified</span>
                    </div>
                  </div>

                  <div className="glass-card-title">{cert.title}</div>

                  {isActive && (
                    <>
                      <div className="glass-card-desc" style={{ fontSize: '14px', marginTop: '4px' }}>
                        {cert.description}
                      </div>

                      <div className="flex gap-2 w-full mt-auto pt-4 border-t border-[#A47A2D]/10">
                        {cert.sourceFile && (
                          <a
                            href={cert.sourceFile}
                            download
                            className="glass-card-link"
                            style={{ width: '44px', padding: '0', justifyContent: 'center' }}
                            title="Download Certificate"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Download className="w-5 h-5" />
                          </a>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCert(cert);
                          }}
                          className="glass-card-link grow"
                          style={{
                            justifyContent: 'center',
                            background: '#A47A2D',
                            color: 'white',
                            border: 'none',
                            padding: '0 16px',
                            height: '44px',
                            cursor: 'pointer'
                          }}
                        >
                          <Eye className="w-4 h-4" />
                          <span className="text-[11px] font-black uppercase tracking-widest" style={{ fontFamily: 'Michroma, sans-serif' }}>Preview Image</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Navigation controls */}
        <div className="glass-deck-nav">
          <button
            className="glass-deck-arrow"
            onClick={goPrev}
            aria-label="Previous certification"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="glass-deck-dots">
            {certifications.map((_, i) => (
              <button
                key={i}
                className={`glass-deck-dot ${i === activeIndex ? 'active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Go to certification ${i + 1}`}
              />
            ))}
          </div>

          <button
            className="glass-deck-arrow"
            onClick={goNext}
            aria-label="Next certification"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ===== Certification Preview Modal ===== */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              className="relative w-full max-w-5xl bg-[#1A1715] rounded-xl sm:rounded-2xl flex flex-col shadow-2xl border border-[#A47A2D]/20 mt-32 mb-12"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* GLOWY RED CLOSE BUTTON - Definitive Upper Right Position with Inline Styles */}
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCert(null);
                }}
                whileHover={{ scale: 1.1, backgroundColor: '#FF0000', boxShadow: '0 0 50px rgba(255, 0, 0, 1)' }}
                whileTap={{ scale: 0.9 }}
                style={{
                  position: 'absolute',
                  top: '24px',
                  right: '24px',
                  backgroundColor: '#FF0000',
                  border: '4px solid white',
                  boxShadow: '0 0 35px rgba(255, 0, 0, 0.9)',
                  color: 'white',
                  zIndex: 999999
                }}
                className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full cursor-pointer"
                aria-label="Close preview"
              >
                <X className="w-8 h-8 sm:w-10 sm:h-10 stroke-[5px]" />
              </motion.button>

              {/* Image Container */}
              <div className="p-4 sm:p-10 flex items-center justify-center bg-[#1A1715] min-h-[300px]">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.alt || `Full preview of ${selectedCert.title} certification`}
                  className="max-w-full max-h-[70vh] object-contain drop-shadow-[0_10px_40px_rgba(0,0,0,0.9)] rounded-md border-4 border-white/10"
                  draggable={false}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
