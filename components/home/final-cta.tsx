import Image from "next/image";
import Link from "next/link";
import { photo } from "@/lib/images";

export function FinalCta() {
  return (
    <section className="relative bg-ink text-white overflow-hidden" aria-labelledby="final-cta-title">
      <Image src={photo("responders", 1800)} alt="" fill sizes="100vw" className="object-cover photo-mono opacity-60" />
      <div className="absolute inset-0 overlay-full" aria-hidden />
      <div className="container-x relative py-20 md:py-28 text-center">
        <div className="kicker text-alarm">The next emergency is already forming</div>
        <h2 id="final-cta-title" className="font-display font-bold text-5xl md:text-7xl lg:text-8xl mt-4 max-w-5xl mx-auto">
          Be there in the first 72 hours
        </h2>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link href="/donate" className="btn btn-alarm btn-lg">
            Donate now
          </Link>
          <Link href="/relief-kits" className="btn btn-outline-light btn-lg">
            Build a relief kit
          </Link>
        </div>
      </div>
    </section>
  );
}
