import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowLeft, ArrowRight, X, Calendar, Clock } from 'lucide-react';
import top1Webp from '../assets/top1.webp';
import lifeAsHauWebp from '../assets/lifeAsHau.webp';
import codingDailyWebp from '../assets/codingDaily.webp';

interface BlogPost {
  id: number;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  tags: string[];
  image: string;
  content: string[];
}

const ALL_BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    date: 'Jan 2024',
    readTime: '6 min read',
    title: 'MY JOURNEY TO TOP 1%',
    excerpt: 'How I achieved top rankings in web development through consistent learning, strategic goal-setting, and a growth mindset.',
    tags: ['CAREER', 'MINDSET', 'GROWTH'],
    image: top1Webp,
    content: [
      'When I first enrolled at Holy Angel University as a BS Information Technology student, I never imagined I would reach the top 1% of my class. It was a journey built on discipline, curiosity, and an unwavering love for building things with code.',
      'The early semesters were about survival — learning the fundamentals of programming, understanding data structures, and figuring out how to debug code late into the night. But somewhere along the way, something clicked. I stopped seeing assignments as chores and started seeing them as puzzles to be solved.',
      'One of the biggest lessons I learned at HAU is that consistency beats talent. There were students who grasped concepts faster than I did, but I showed up every single day. I wrote code every day, asked questions, attended workshops, and treated every failure as a stepping stone.',
      'The journey taught me that success in tech is not about being the smartest person in the room — it is about being the most persistent. Every frustrating merge conflict and late-night debugging session built the foundation that brought me here today.',
      'To anyone reading this who feels like they are struggling: keep going. The path to the top is a marathon of small, consistent wins. The view from the top 1% is worth every struggle along the way.'
    ]
  },
  {
    id: 2,
    date: 'Dec 2023',
    readTime: '5 min read',
    title: 'MY LIFE AS AN HAU STUDENT',
    excerpt: 'A glimpse into my daily routine, balancing academic excellence, extracurricular projects, and personal growth at Holy Angel University.',
    tags: ['HAU', 'STUDENT LIFE', 'ACADEMICS'],
    image: lifeAsHauWebp,
    content: [
      'Life as an Information Technology student at Holy Angel University is a whirlwind of lectures, lab sessions, and endless lines of code. It is an environment that constantly challenges you to push beyond your limits and strive for excellence.',
      'A typical day starts early with coffee and a review of my pending tasks. The campus is vibrant, and the IT department is always buzzing with students collaborating on projects or preparing for upcoming hackathons. The energy is contagious.',
      'Balancing academics with practical development requires strict time management. I adopted a routine where my mornings are dedicated to attending classes and absorbing theoretical concepts, while my late afternoons and evenings are reserved for hands-on coding and building personal projects.',
      'Beyond the academics, HAU has provided a community of like-minded individuals. The friendships formed over complex group projects and the mentorship from dedicated professors have been invaluable to my growth.',
      'My life as a student here isn\'t just about maintaining high grades; it\'s about preparing for the real world. Every project presentation, every group collaboration, and every deadline met has molded me into a more disciplined and capable developer.'
    ]
  },
  {
    id: 3,
    date: 'Nov 2023',
    readTime: '7 min read',
    title: 'CODING AS MY DAILY LIFE',
    excerpt: 'Why programming is more than a required subject for me — it has become my passion, my hobby, and my daily routine.',
    tags: ['CODING', 'PASSION', 'LIFESTYLE'],
    image: codingDailyWebp,
    content: [
      'For many, coding is a skill learned in a classroom to pass an exam or secure a job. For me, it has evolved into a fundamental part of my daily life. It is the first thing I think about when I wake up and the last thing I do before going to sleep.',
      'My day usually involves diving into new frameworks, optimizing existing projects, or simply experimenting with code to see what breaks. There is a profound satisfaction in typing a sequence of characters and watching it come to life on the screen.',
      'I treat coding as both an art and a science. It is an outlet for creativity where I can build beautiful, functional interfaces, and a rigorous discipline where logic and problem-solving reign supreme.',
      'Even on weekends or holidays, you will likely find me at my desk, dark mode enabled, building something new. This relentless practice is not driven by obligation, but by a genuine curiosity to understand how systems work under the hood.',
      'Integrating coding into my daily life has accelerated my learning curve exponentially. When you immerse yourself in something completely, it stops being difficult work and starts becoming second nature.'
    ]
  }
];

export default function BlogSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const n = ALL_BLOG_POSTS.length;

  const prev = (activeIndex - 1 + n) % n;
  const next = (activeIndex + 1) % n;

  const goPrev = useCallback(() => setActiveIndex((i) => (i - 1 + n) % n), [n]);
  const goNext = useCallback(() => setActiveIndex((i) => (i + 1) % n), [n]);
  const goTo = useCallback((index: number) => setActiveIndex(index), []);

  // Close modal on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPost(null);
    };
    if (selectedPost) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [selectedPost]);

  const getCardStyle = (index: number) => {
    if (index === activeIndex) {
      return { x: 0, scale: 1, rotate: 0, opacity: 1, zIndex: 30 };
    }
    if (index === prev) {
      return { x: '-40%', scale: 0.82, rotate: -6, opacity: 1, zIndex: 20 };
    }
    if (index === next) {
      return { x: '40%', scale: 0.82, rotate: 6, opacity: 1, zIndex: 20 };
    }
    return { x: 0, scale: 0.7, rotate: 0, opacity: 0, zIndex: 10 };
  };

  return (
    <section className="py-20 bg-[#FDF5E7] dark:bg-[#1A1715]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-6 md:px-10 py-2 md:py-4 bg-[#A47A2D] rounded-full mb-6 md:mb-8"
          >
            <p className="font-mono text-base md:text-[24px] font-bold text-white dark:text-[#1A1715] uppercase tracking-wider">
              // Insights
            </p>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ fontFamily: 'Michroma, sans-serif' }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#521D07] dark:text-[#E2E8F0] uppercase mb-4"
          >
            Latest Thoughts
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-[28px] font-bold text-[#521D07] dark:text-[#B8B0A6] max-w-3xl mx-auto"
          >
            Stories, lessons, and insights from my development journey.
          </motion.p>
        </div>

        {/* Deck of Cards */}
        <div className="blog-deck-container">
          <div className="blog-deck-fan">
            {ALL_BLOG_POSTS.map((post, index) => {
              const style = getCardStyle(index);
              const isActive = index === activeIndex;
              const isPeeking = index === prev || index === next;

              return (
                <motion.div
                  key={post.id}
                  className={`blog-deck-card ${isActive ? 'blog-deck-card-active' : ''}`}
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
                  <div className="blog-deck-card-image">
                    <img src={post.image} alt={`Blog thumbnail: ${post.title}`} />
                    <div className="blog-deck-card-image-overlay" />
                  </div>

                  {/* Card Content */}
                  <div className="blog-deck-card-content">
                    {/* Meta */}
                    <div className="flex items-center gap-2 mb-3 font-mono text-xs text-[#A47A2D]">
                      <Calendar className="w-3 h-3" />
                      <span>{post.date}</span>
                      <span>•</span>
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </div>

                    {/* Title */}
                    <div className="blog-deck-card-title text-[#A47A2D] dark:text-[#D4AF37]">{post.title}</div>

                    {isActive && (
                      <div className="flex flex-col h-full justify-between mt-2">
                        {/* Excerpt */}
                        <p className="text-[13px] md:text-sm font-medium text-[#521D07]/80 dark:text-[#B8B0A6] mb-3 line-clamp-3 leading-relaxed">
                          {post.excerpt}
                        </p>

                        <div className="mt-auto pt-4 border-t border-[#A47A2D]/20">
                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map(tag => (
                              <span
                                key={tag}
                                className="modal-tag px-3 py-1 border rounded-md text-[11px] font-bold uppercase tracking-wider"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Read Article Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedPost(post);
                            }}
                            className="modal-action-link"
                          >
                            <span>Read Article</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="blog-deck-nav">
            <button className="blog-deck-arrow" onClick={goPrev} aria-label="Previous article">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="blog-deck-dots">
              {ALL_BLOG_POSTS.map((_, i) => (
                <button
                  key={i}
                  className={`blog-deck-dot ${i === activeIndex ? 'active' : ''}`}
                  onClick={() => goTo(i)}
                  aria-label={`Go to article ${i + 1}`}
                />
              ))}
            </div>
            <button className="blog-deck-arrow" onClick={goNext} aria-label="Next article">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>

      {/* ===== Article Modal ===== */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            className="blog-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPost(null)}
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
                <img src={selectedPost.image} alt={`Full article image for ${selectedPost.title}`} />
                <div className="blog-modal-hero-overlay" />
              </div>

              {/* Back Button - Top Left */}
              <button
                onClick={() => setSelectedPost(null)}
                className="blog-modal-back"
                style={{ zIndex: 50 }}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              {/* Close Button - Top Right */}
              <button
                onClick={() => setSelectedPost(null)}
                className="blog-modal-close"
                style={{ zIndex: 50 }}
                aria-label="Close article"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Article Body */}
              <div className="blog-modal-body">
                {/* Meta */}
                <div className="flex items-center gap-3 mb-4 font-mono text-sm text-[#A47A2D]">
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {selectedPost.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {selectedPost.readTime}</span>
                </div>

                {/* Title */}
                <h2
                  style={{ fontFamily: 'Michroma, sans-serif' }}
                  className="modal-title text-2xl md:text-4xl font-black uppercase mb-4 leading-tight"
                >
                  {selectedPost.title}
                </h2>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {selectedPost.tags.map(tag => (
                    <span
                      key={tag}
                      className="modal-tag px-3 py-1 border-2 rounded-lg text-xs font-black uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Divider */}
                <div className="w-full h-1 bg-gradient-to-r from-[#A47A2D] via-[#D4AF37] to-[#A47A2D] rounded-full mb-8" />

                {/* Article Paragraphs */}
                <div className="space-y-6">
                  {selectedPost.content.map((paragraph, i) => (
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

                {/* Back to articles bottom button */}
                <div className="modal-actions mt-12 pt-8">
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="modal-action-link"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Articles</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}