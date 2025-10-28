"use client";

import Image from "next/image";

type ImageItem = {
  src: string;
  alt?: string;
  aspect?: "square" | "wide";
};

export default function Gallery({ images }: { images: ImageItem[] }) {
  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 my-10 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
      {images.map((img, i) => (
        <div
          key={i}
          className={`relative w-full overflow-hidden rounded-xl ${
            img.aspect === "square" ? "aspect-square" : "aspect-[4/3]"
          }`}
        >
          <Image
            src={img.src}
            alt={img.alt ?? ""}
            fill
            sizes="(max-width: 768px) 50vw, (min-width: 769px) 33vw"
            className="object-cover"
            decoding="async"
            {...(i === 0 ? { priority: true } : { loading: "lazy" })}
          />
        </div>
      ))}
    </div>
  );
}
