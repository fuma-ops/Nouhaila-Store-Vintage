import { products } from "@/lib/products";
import { ProductCard } from "./ProductCard";
import { Link } from "@tanstack/react-router";

export function ProductGrid({
  limit,
  title = "Bestsellers",
  showAll = true,
}: {
  limit?: number;
  title?: string;
  showAll?: boolean;
}) {
  const list = limit ? products.slice(0, limit) : products;
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-16">
      <div className="flex items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-coral">
            ♡ Shop the drop
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mt-2">{title}</h2>
        </div>
        {showAll && (
          <Link
            to="/shop"
            className="hidden sm:inline-flex rounded-full border-2 border-foreground px-5 py-2.5 font-bold text-xs uppercase tracking-wider hover:bg-foreground hover:text-background transition-colors"
          >
            View all
          </Link>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {list.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
