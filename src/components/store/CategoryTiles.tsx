import { Link } from "@tanstack/react-router";
const tiles = [
  { label: "New Arrivals", color: "bg-coral" },
  { label: "Sugar Crush", color: "bg-hot" },
  { label: "On Sale", color: "bg-lavender" },
  { label: "Best Sellers", color: "bg-accent" },
];
export function CategoryTiles() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {tiles.map((t) => (
          <Link
            key={t.label}
            to="/shop"
            className={`group ${t.color} aspect-square rounded-3xl border-2 border-foreground shadow-pop flex items-center justify-center p-4 hover:-translate-y-1 transition-transform`}
          >
            <span className="font-display text-xl md:text-2xl text-center text-primary-foreground text-stroke">
              {t.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
