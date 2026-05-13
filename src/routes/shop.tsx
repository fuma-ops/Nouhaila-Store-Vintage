import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Navbar } from "@/components/store/Navbar";
import { Footer } from "@/components/store/Footer";
import { ProductCard } from "@/components/store/ProductCard";
import { useAppStore } from "@/lib/store";

const filters = ["All", "Makeup", "Parfums", "Sacs", "Soins"] as const;

export const Route = createFileRoute("/shop")({
  component: Shop,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      filter: (search.filter as typeof filters[number]) || "All",
    };
  },
});

function Shop() {
  const { filter } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const products = useAppStore((state) => state.products);
  const list = filter === "All" ? products : products.filter((p) => p.category === filter);
  
  const setFilter = (newFilter: typeof filters[number]) => {
    navigate({ search: { filter: newFilter } });
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="bg-groovy py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-8 text-center">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-coral">
              ♡ Shop everything
            </span>
            <h1 className="font-display text-5xl md:text-7xl text-hot mt-2">Toute la collection</h1>
            <p className="mt-3 text-foreground/70 max-w-lg mx-auto font-medium">
              Cute stuff importé rien que pour toi, girly ♡
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-10">
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-5 py-2 text-sm font-bold uppercase tracking-wider border-2 border-foreground transition-colors ${filter === f ? "bg-hot text-primary-foreground" : "bg-background hover:bg-foreground hover:text-background"}`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {list.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
