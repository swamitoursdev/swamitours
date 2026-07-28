import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import RouteDivider from "@/components/ui/RouteDivider";
import FloatingContact from "@/components/ui/FloatingContact";

/**
 * Shared shell for all non-home pages: Header + title band + Footer +
 * FloatingContact, so individual pages only need to supply their content.
 */
export default function PageShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-moss/5 pt-28 pb-10 sm:pt-32">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-saffron-dark">
              {eyebrow}
            </p>
            <h1 className="mt-3 font-display text-3xl sm:text-4xl font-semibold text-ink">
              {title}
            </h1>
            {description && (
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink/70">
                {description}
              </p>
            )}
          </div>
          <div className="mx-auto max-w-6xl px-5 sm:px-8 mt-8">
            <RouteDivider />
          </div>
        </section>
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-12">{children}</div>
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}
