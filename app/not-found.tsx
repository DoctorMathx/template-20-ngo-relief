import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-ink text-white">
      <div className="container-x py-24 md:py-32">
        <div className="kicker text-alarm">Error 404 · Signal lost</div>
        <h1 className="font-display font-bold text-6xl md:text-8xl mt-4">Page not found</h1>
        <p className="mt-5 text-lg text-white/80 max-w-xl">The page you&apos;re looking for has moved or never existed. The emergencies, however, are very real.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-white">
            Back to home
          </Link>
          <Link href="/appeals" className="btn btn-alarm">
            See live appeals
          </Link>
        </div>
      </div>
    </section>
  );
}
