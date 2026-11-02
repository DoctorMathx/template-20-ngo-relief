import Image from "next/image";
import { cn } from "@/lib/utils";

/** Dark masthead used at the top of inner pages. */
export function PageHero({
  kicker,
  title,
  lede,
  image,
  imageAlt = "",
  children,
  meta,
}: {
  kicker: string;
  title: string;
  lede?: string;
  image?: string;
  imageAlt?: string;
  children?: React.ReactNode;
  meta?: React.ReactNode;
}) {
  return (
    <section className="relative bg-ink text-white overflow-hidden">
      {image && (
        <>
          <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="object-cover photo-hc" />
          <div className="absolute inset-0 overlay-left" aria-hidden />
        </>
      )}
      {!image && <div className="absolute inset-0 grid-lines" aria-hidden />}
      <div className={cn("container-x relative", image ? "py-20 md:py-28" : "py-14 md:py-20")}>
        <div className="kicker text-alarm mb-4 flex items-center gap-2">
          <span aria-hidden className="inline-block w-3 h-3 bg-alarm" />
          {kicker}
        </div>
        <h1 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl max-w-4xl">{title}</h1>
        {lede && <p className="mt-5 max-w-2xl text-lg md:text-xl leading-relaxed text-white/85">{lede}</p>}
        {meta && <div className="mt-6">{meta}</div>}
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </div>
      <div className="h-1.5 bg-alarm relative" aria-hidden />
    </section>
  );
}
