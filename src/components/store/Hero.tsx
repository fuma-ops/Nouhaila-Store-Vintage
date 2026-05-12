import hero from "@/assets/hero-model.jpg";
import { Link } from "@tanstack/react-router";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-groovy">
      <div className="absolute -top-10 left-10 h-40 w-40 rounded-full bg-hot/20 blur-2xl" />
      <div className="absolute bottom-0 right-0 h-60 w-60 rounded-full bg-coral/30 blur-3xl" />
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 md:grid-cols-2 md:gap-10 md:px-8 md:py-16 items-center">
        <div className="relative z-10 text-center md:text-left order-2 md:order-1">
          <span className="inline-block rounded-full bg-foreground text-background px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em]">
            ✦ Imported with love ✦
          </span>
          <h1 className="mt-5 font-display text-[3.5rem] leading-[0.95] sm:text-[4.5rem] md:text-6xl lg:text-7xl xl:text-[5.5rem] text-hot flex flex-col items-center md:items-start text-center md:text-left">
            <span>check out</span>
            <span className="text-foreground">our</span>
            <span className="italic text-coral">Bestsellers</span>
          </h1>
          <p className="mx-auto md:mx-0 mt-5 max-w-md text-base md:text-lg text-foreground/70 font-medium">
            Maquillage, parfums et sacs girly importés — choisis avec amour par Nouhaila pour les
            vraies girlies.
          </p>
          <div className="mt-7 flex flex-wrap justify-center md:justify-start gap-3">
            <Link
              to="/shop"
              className="rounded-full bg-hot text-primary-foreground px-7 py-3.5 font-bold uppercase tracking-wider text-sm shadow-cute hover:scale-105 transition-transform"
            >
              Shop Now
            </Link>
            <Link
              to="/shop"
              className="rounded-full border-2 border-foreground bg-background px-7 py-3.5 font-bold uppercase tracking-wider text-sm hover:bg-foreground hover:text-background transition-colors"
            >
              New Arrivals
            </Link>
          </div>
        </div>
        <div className="relative order-1 md:order-2">
          <div className="absolute inset-0 -z-10 animate-spin-slow">
            <div className="absolute inset-6 rounded-full bg-hot/30 blur-2xl" />
          </div>
          <div className="relative mx-auto aspect-square max-w-md rounded-[2rem] overflow-hidden border-4 border-foreground shadow-pop">
            <img
              src={hero}
              alt="Nouhaila Store hero"
              width={1024}
              height={1024}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -top-3 -left-3 rotate-[-12deg] rounded-full bg-coral px-4 py-2 font-display text-background text-lg shadow-pop animate-wiggle">
            cute ♡
          </div>
          <div className="absolute -bottom-3 -right-3 rotate-[8deg] rounded-full bg-hot px-4 py-2 font-display text-primary-foreground text-lg shadow-pop">
            shop now!
          </div>
        </div>
      </div>
      <div className="bg-foreground text-background overflow-hidden">
        <div className="flex animate-[scroll_30s_linear_infinite] gap-10 py-3 whitespace-nowrap font-display text-xl uppercase tracking-widest">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i}>
              ♡ Customize colors ✦ banners ✦ graphic ✦ text ♡ free shipping over 500 dh ✦
            </span>
          ))}
        </div>
      </div>
      <style>{`@keyframes scroll { from { transform: translateX(0)} to { transform: translateX(-50%)} }`}</style>
    </section>
  );
}
