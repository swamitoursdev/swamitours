import type { InputHTMLAttributes } from "react";

export function FormField({
  label,
  ...props
}: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="font-mono text-xs uppercase tracking-wide text-ink/60">
        {label}
      </span>
      <input
        {...props}
        className="w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm text-ink placeholder-ink/35 transition-colors focus:outline-2 focus:outline-saffron"
      />
    </label>
  );
}

export const primaryButton =
  "inline-flex items-center justify-center rounded-lg bg-saffron px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-saffron-dark";
