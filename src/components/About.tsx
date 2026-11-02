"use client";
import { useState } from "react";
import Markdown from "@/components/Markdown";

type AboutProps = {
  title: string;
  number: string;
  markdown: string;
};

// ─────────────────────────────────────────────────────────────────────────────
// PHOTOS — img_1.webp, img_2.webp and img_3.webp live in /public/. If a file
// is missing, an emoji placeholder with its file name is shown instead.
// ─────────────────────────────────────────────────────────────────────────────
const PHOTOS: {
  src: string;
  alt: string;
  emoji: string;
  wrapStyle: React.CSSProperties;
  animation: string;
  size: string;
}[] = [
  {
    src: "/img_1.webp",
    alt: "Profile photo 1",
    emoji: "👤",
    wrapStyle: { rotate: "-4deg", marginLeft: "0px" },
    animation: "photo-bounce",
    size: "w-full",
  },
  {
    src: "/img_2.webp",
    alt: "Profile photo 2",
    emoji: "🖼️",
    wrapStyle: { rotate: "3deg", marginLeft: "24px" },
    animation: "photo-wobble",
    size: "w-4/5",
  },
  {
    src: "/img_3.webp",
    alt: "Profile photo 3",
    emoji: "📸",
    wrapStyle: { rotate: "-1.5deg", marginLeft: "10px" },
    animation: "photo-float",
    size: "w-11/12",
  },
];

function PhotoCard({
  photo,
}: Readonly<{
  photo: (typeof PHOTOS)[number];
}>) {
  const [failed, setFailed] = useState(false);

  return (
    <div style={photo.wrapStyle}>
      <div
        className={`${photo.animation} ${photo.size} aspect-square bg-card border border-border overflow-hidden hover:border-accent/40 transition-colors duration-300 cursor-pointer`}
      >
        {failed ? (
          /* Placeholder shown when the image file doesn't exist yet */
          <div className="w-full h-full flex flex-col items-center justify-center">
            <span className="text-3xl mb-1.5 select-none">{photo.emoji}</span>
            <p className="text-muted text-[9px] tracking-wider font-mono">
              {photo.src.slice(1)}
            </p>
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photo.src}
            alt={photo.alt}
            className="w-full h-full object-cover"
            onError={() => setFailed(true)}
          />
        )}
      </div>
    </div>
  );
}

export default function About({ title, number, markdown }: Readonly<AboutProps>) {
  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-4 animate-fade-in-up">
          <span className="text-accent text-sm">{number}</span>
          <span className="text-foreground">{title}</span>
          <span className="h-px bg-border flex-1 ml-4" />
        </h2>

        <div className="mt-12 grid md:grid-cols-3 gap-12 items-start">
          <Markdown
            content={markdown}
            className="md:col-span-2 text-muted text-sm leading-relaxed animate-fade-in-left delay-200 md-content"
          />

          {/* 3 misaligned photo cards — animated on hover */}
          <div className="hidden md:flex flex-col gap-4 pt-1 animate-fade-in-right delay-300">
            {PHOTOS.map((photo) => (
              <PhotoCard key={photo.src} photo={photo} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

