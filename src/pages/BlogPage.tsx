import React, { useState } from 'react';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import Modal from '../components/Modal';
import Picture, { type PictureData } from '../components/Picture';
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import SpotlightCard from '../components/SpotlightCard';
import top1Webp from '../assets/top1.webp?w=480;800&format=avif;webp&as=picture';
import lifeAsHauWebp from '../assets/lifeAsHau.webp?w=480;800&format=avif;webp&as=picture';
import codingDailyWebp from '../assets/codingDaily.webp?w=480;800&format=avif;webp&as=picture';

interface BlogPost {
  id: number;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  tags: string[];
  image: PictureData;
  content: string[];
}

const ALL_BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    date: 'Jan 2024',
    readTime: '6 min read',
    title: 'My Journey to Top 1%',
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
    title: 'My Life as an HAU Student',
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
    title: 'Coding as My Daily Life',
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

function PostMeta({ post }: { post: BlogPost }) {
  return (
    <p className="flex items-center gap-3 font-mono text-xs text-fg-subtle">
      <span className="inline-flex items-center gap-1.5">
        <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
        {post.date}
      </span>
      <span aria-hidden="true">·</span>
      <span className="inline-flex items-center gap-1.5">
        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
        {post.readTime}
      </span>
    </p>
  );
}

export default function BlogSection() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <div className="container-page section-y">
      <SectionHeader
        id="blog-title"
        eyebrow="// Insights"
        title="Latest Thoughts"
        lede="Stories, lessons, and insights from my development journey."
      />

      <ul className="grid gap-4 md:grid-cols-3 md:gap-6">
        {ALL_BLOG_POSTS.map((post, i) => (
          <Reveal as="li" key={post.id} delay={i * 0.05}>
            <SpotlightCard as="article" className="group flex h-full flex-col overflow-hidden" aria-labelledby={`post-${post.id}-title`}>
              <div className="aspect-[16/10] overflow-hidden border-b border-border bg-surface-2">
                <Picture
                  picture={post.image}
                  alt={`Blog thumbnail: ${post.title}`}
                  sizes="(min-width: 768px) 360px, 100vw"
                  pictureClassName="block h-full w-full"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <PostMeta post={post} />
                <h3 id={`post-${post.id}-title`} className="mt-3 text-lg font-semibold leading-snug tracking-tight">{post.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-fg-muted">{post.excerpt}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tags">
                  {post.tags.map((tag) => (
                    <li key={tag} className="badge">{tag}</li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => setSelectedPost(post)}
                  className="btn btn-ghost -ml-3 mt-auto self-start !px-3 pt-4"
                >
                  Read Article<span className="sr-only">: {post.title}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </ul>

      {/* Article modal */}
      <Modal open={!!selectedPost} onClose={() => setSelectedPost(null)} labelledBy="blog-dialog-title" closeLabel="Close article">
        {selectedPost && (
          <article>
            <div className="aspect-[16/9] overflow-hidden border-b border-border bg-surface-2">
              <Picture
                picture={selectedPost.image}
                alt={`Full article image for ${selectedPost.title}`}
                sizes="(min-width: 672px) 672px, 100vw"
                pictureClassName="block h-full w-full"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-6 sm:p-8">
              <PostMeta post={selectedPost} />
              <h3 id="blog-dialog-title" className="mt-3 text-h3 font-semibold">{selectedPost.title}</h3>
              <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tags">
                {selectedPost.tags.map((tag) => (
                  <li key={tag} className="badge">{tag}</li>
                ))}
              </ul>
              <div className="mt-6 space-y-5 border-t border-border pt-6 text-[1.0625rem] leading-relaxed text-fg-muted">
                {selectedPost.content.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
              <button type="button" onClick={() => setSelectedPost(null)} className="btn btn-secondary mt-8">
                Back to Articles
              </button>
            </div>
          </article>
        )}
      </Modal>
    </div>
  );
}
