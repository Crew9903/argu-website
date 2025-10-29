"use client";

import Image from "next/image";

export default function Home() {
  return (
    <main className="w-full">

      {/* HERO */}
      <section className="w-full max-w-5xl mx-auto px-4 md:px-6 pt-24 md:pt-28">
        <div className="relative w-full aspect-[3/2] overflow-hidden rounded-sm">
          <Image
            src="/images/about/luis-madrid.jpg"
            alt="ARGU Hero"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* SPACER */}
      <div className="h-16 md:h-24"></div>

      {/* 3-UP FEATURE STRIP */}
      <section className="w-full max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">

          {[
            { src: "/images/homepage/COLOR1.png", title: "Ropa prueba", sub: "89 EUR" },
            { src: "/images/homepage/COLOR2.png", title: "Ropa prueba 2", sub: "89 EUR" },
            { src: "/images/homepage/COLOR3.png", title: "Ropa prueba 3", sub: "89 EUR" },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="relative w-full aspect-square">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-contain"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="mt-3">
                <div className="text-sm md:text-base font-medium tracking-tight">{item.title}</div>
                <div className="text-xs md:text-sm opacity-60">{item.sub}</div>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* BOTTOM SPACER */}
      <div className="h-32"></div>

    </main>
  );
}
