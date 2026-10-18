import React from 'react';

/** Shape of a vite-imagetools `as=picture` import. */
export interface PictureData {
  sources: Record<string, string>;
  img: { src: string; w: number; h: number };
}

interface PictureProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'width' | 'height'> {
  picture: PictureData;
  alt: string;
  sizes: string;
  /** Below-the-fold images are lazy by default; pass true for the LCP image. */
  priority?: boolean;
  pictureClassName?: string;
}

const TYPES: Record<string, string> = { avif: 'image/avif', webp: 'image/webp' };

/** Responsive <picture>: AVIF first, WebP fallback, with intrinsic width/height to prevent CLS. */
export default function Picture({ picture, alt, sizes, priority = false, pictureClassName, ...img }: PictureProps) {
  return (
    <picture className={pictureClassName}>
      {['avif', 'webp'].map((fmt) =>
        picture.sources[fmt] ? <source key={fmt} type={TYPES[fmt]} srcSet={picture.sources[fmt]} sizes={sizes} /> : null,
      )}
      <img
        src={picture.img.src}
        width={picture.img.w}
        height={picture.img.h}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        {...(priority ? { fetchpriority: 'high' } : {})}
        {...img}
      />
    </picture>
  );
}
