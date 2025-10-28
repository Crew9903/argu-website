"use client";

type Props = {
  tone?: "info" | "success" | "warning" | "danger";
  children: React.ReactNode;
};

const tones: Record<NonNullable<Props["tone"]>, string> = {
  info: "bg-blue-500/10 border-blue-400/40",
  success: "bg-emerald-500/10 border-emerald-400/40",
  warning: "bg-amber-500/10 border-amber-400/40",
  danger: "bg-red-500/10 border-red-400/40",
};

export default function Callout({ tone = "info", children }: Props) {
  return (
    <div className={`my-6 border rounded-xl p-4 ${tones[tone]}`}>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}
