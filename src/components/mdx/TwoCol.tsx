"use client";

type Props = {
  left: React.ReactNode;
  right: React.ReactNode;
  reverse?: boolean;
};

export default function TwoCol({ left, right, reverse }: Props) {
  return (
    <section className="max-w-5xl mx-auto px-4 md:px-6 my-12">
      <div className={`grid gap-6 md:gap-10 md:grid-cols-2 ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
        <div>{left}</div>
        <div>{right}</div>
      </div>
    </section>
  );
}
