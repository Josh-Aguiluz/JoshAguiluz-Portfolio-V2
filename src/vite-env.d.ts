/// <reference types="vite/client" />

declare module '*.png' {
    const src: string;
    export default src;
}

declare module '*.webp' {
    const src: string;
    export default src;
}

declare module '*.pdf' {
    const src: string;
    export default src;
}

/* vite-imagetools: `?...&as=picture` imports (responsive AVIF + WebP sets) */
declare module '*as=picture' {
    const picture: import('./components/Picture').PictureData;
    export default picture;
}

/* vite-imagetools: single resized file, e.g. `?w=96&h=96&fit=cover&format=webp` */
declare module '*format=webp' {
    const src: string;
    export default src;
}
