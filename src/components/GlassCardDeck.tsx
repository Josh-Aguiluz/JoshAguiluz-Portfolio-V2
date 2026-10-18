import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Github, ExternalLink, ArrowRight, ArrowLeft, X, User, Wrench } from 'lucide-react';

interface Project {
    title: string;
    description: string;
    tags: string[];
    github: string;
    live: string;
    image: string;
    role?: string;
    details?: string[];
    alt?: string;
}

interface GlassCardDeckProps {
    projects: Project[];
}

export default function GlassCardDeck({ projects }: GlassCardDeckProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const n = projects.length;

    const prev = (activeIndex - 1 + n) % n;
    const next = (activeIndex + 1) % n;

    const goTo = useCallback(
        (index: number) => setActiveIndex(index),
        []
    );
    const goPrev = useCallback(
        () => setActiveIndex((i) => (i - 1 + n) % n),
        [n]
    );
    const goNext = useCallback(
        () => setActiveIndex((i) => (i + 1) % n),
        [n]
    );

    // Close modal on Escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelectedProject(null);
        };
        if (selectedProject) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
        };
    }, [selectedProject]);

    // Position config for each card role
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
        // Hidden card
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
            <div className="glass-deck-container">
                {/* Fanned cards area */}
                <div className="glass-deck-fan">
                    {projects.map((project, index) => {
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
                                {/* Card Image */}
                                <div className="glass-card-image">
                                    <img 
                                        src={project.image} 
                                        alt={project.alt || `Screenshot of ${project.title} - ${project.description}`} 
                                    />
                                    <div className="glass-card-image-overlay" />
                                </div>

                                {/* Card Content — only fully rendered on active card */}
                                <div className="glass-card-content">
                                    <div className="glass-card-title">{project.title}</div>

                                    {isActive && (
                                        <>
                                            <div className="glass-card-desc">{project.description}</div>
                                            <div className="glass-card-tags">
                                                {project.tags.map((tag, i) => (
                                                    <span key={i} className="glass-card-tag">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="glass-card-links">
                                                <a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="glass-card-link"
                                                >
                                                    <Github className="w-4 h-4" />
                                                    <span>Code</span>
                                                </a>
                                                <a
                                                    href={project.live}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="glass-card-link"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                    <span>Live</span>
                                                </a>
                                                {project.details && project.details.length > 0 && (
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedProject(project);
                                                        }}
                                                        className="glass-card-link glass-card-link-read"
                                                    >
                                                        <ArrowRight className="w-4 h-4" />
                                                        <span>Read More</span>
                                                    </button>
                                                )}
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
                        aria-label="Previous project"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    <div className="glass-deck-dots">
                        {projects.map((_, i) => (
                            <button
                                key={i}
                                className={`glass-deck-dot ${i === activeIndex ? 'active' : ''}`}
                                onClick={() => goTo(i)}
                                aria-label={`Go to project ${i + 1}`}
                            />
                        ))}
                    </div>

                    <button
                        className="glass-deck-arrow"
                        onClick={goNext}
                        aria-label="Next project"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* ===== Project Detail Modal ===== */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        className="blog-modal-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            className="blog-modal-content"
                            initial={{ opacity: 0, y: 60, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 60, scale: 0.95 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Hero Image */}
                            <div className="blog-modal-hero">
                                {selectedProject.image && (
                                    <img 
                                        src={selectedProject.image} 
                                        alt={selectedProject.alt || `Preview of ${selectedProject.title} project`} 
                                        key={selectedProject.title}
                                    />
                                )}
                                <div className="blog-modal-hero-overlay" />
                            </div>

                            {/* Back Button - Top Left */}
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="blog-modal-back"
                                style={{ zIndex: 50 }}
                            >
                                <ArrowLeft className="w-4 h-4" />
                                <span>Back</span>
                            </button>

                            {/* Close Button - Top Right */}
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="blog-modal-close"
                                style={{ zIndex: 50 }}
                                aria-label="Close project details"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Article Body */}
                            <div className="blog-modal-body">
                                {/* Role Badge */}
                                {selectedProject.role && (
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#A47A2D] rounded-full font-mono text-xs font-black text-white uppercase tracking-wider">
                                            <User className="w-3 h-3" />
                                            {selectedProject.role}
                                        </span>
                                    </div>
                                )}

                                {/* Title */}
                                <h2
                                    style={{ fontFamily: 'Michroma, sans-serif' }}
                                    className="modal-title text-2xl md:text-4xl font-black uppercase mb-4 leading-tight"
                                >
                                    {selectedProject.title}
                                </h2>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {selectedProject.tags.map(tag => (
                                        <span
                                            key={tag}
                                            className="modal-tag px-3 py-1 border-2 rounded-lg text-xs font-black uppercase"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Tech used heading */}
                                <div className="flex items-center gap-2 mb-3">
                                    <Wrench className="w-4 h-4 modal-tech-icon" />
                                    <span className="modal-tech-line font-mono text-xs font-bold uppercase tracking-wider">Technologies Used: {selectedProject.tags.join(' • ')}</span>
                                </div>

                                {/* Divider */}
                                <div className="w-full h-1 bg-gradient-to-r from-[#A47A2D] via-[#D4AF37] to-[#A47A2D] rounded-full mb-8" />

                                {/* Detail Paragraphs */}
                                <div className="space-y-6">
                                    {selectedProject.details?.map((paragraph, i) => (
                                        <motion.p
                                            key={i}
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 + i * 0.05 }}
                                            className="modal-paragraph text-base md:text-lg leading-relaxed font-medium"
                                        >
                                            {paragraph}
                                        </motion.p>
                                    ))}
                                </div>

                                {/* Action Links */}
                                <div className="modal-actions mt-12 pt-8 flex flex-wrap gap-4">
                                    <a
                                        href={selectedProject.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="modal-action-link"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        <span>View Live Site</span>
                                    </a>
                                    <a
                                        href={selectedProject.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="modal-action-link"
                                    >
                                        <Github className="w-4 h-4" />
                                        <span>View Source Code</span>
                                    </a>
                                </div>

                                {/* Back button bottom */}
                                <div className="mt-8">
                                    <button
                                        onClick={() => setSelectedProject(null)}
                                        className="modal-action-link"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        <span>Back to Projects</span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
