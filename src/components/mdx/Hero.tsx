"use client";

type Props = {
  title: string;
  kicker?: string;
  subtitle?: string;
};

export default function Hero({ title, kicker, subtitle }: Props) {
  return (
    <section className="max-w-5xl mx-auto px-4 md:px-6 py-16 md:py-24">
      {kicker && <p className="text-xs uppercase tracking-widest text-white/60 mb-3">{kicker}</p>}
      <h1 className="text-3xl md:text-5xl font-semibold leading-tight">{title}</h1>
      {subtitle && <p className="mt-4 text-base md:text-lg text-white/80 max-w-3xl">{subtitle}</p>}
    </section>
  );
}
