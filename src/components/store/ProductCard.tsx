import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { Heart } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  return (
    <article className="group relative rounded-3xl border-2 border-foreground bg-card shadow-pop overflow-hidden flex flex-col">
      <Link to="/product/$productId" params={{ productId: product.id }} className="relative aspect-square overflow-hidden bg-muted block">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={640}
          height={640}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.tag && (
          <span className="absolute top-3 left-3 rounded-full bg-hot text-primary-foreground px-3 py-1 text-xs font-bold uppercase tracking-wider">
            {product.tag}
          </span>
        )}
      </Link>
      <button className="absolute top-3 right-3 z-10 h-9 w-9 rounded-full bg-background flex items-center justify-center border-2 border-foreground hover:bg-hot hover:text-primary-foreground transition-colors shadow-sm">
        <Heart className="h-4 w-4" />
      </button>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
          {product.category}
        </span>
        <Link to="/product/$productId" params={{ productId: product.id }} className="font-display text-lg leading-tight text-foreground hover:text-hot transition-colors">
          {product.name}
        </Link>
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <span className="font-display text-xl text-hot">{product.price} DH</span>
          <button
            onClick={(e) => {
              e.preventDefault();
              add(product);
            }}
            className="rounded-full bg-foreground text-background px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-hot transition-colors"
          >
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
