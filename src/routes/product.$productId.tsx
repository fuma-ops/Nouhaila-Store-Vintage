import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/store/Navbar";
import { Footer } from "@/components/store/Footer";
import { useAppStore } from "@/lib/store";
import { useCart } from "@/lib/cart-context";
import { ChevronLeft, Heart, ShoppingBag } from "lucide-react";
import { ProductGrid } from "@/components/store/ProductGrid";

export const Route = createFileRoute("/product/$productId")({
  component: ProductPage,
  loader: ({ params }) => {
    const products = useAppStore.getState().products;
    const product = products.find((p) => p.id === params.productId);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  },
  errorComponent: () => {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center p-10">
          <h1 className="font-display text-4xl text-hot mb-4">Oops!</h1>
          <p className="text-xl">Ce produit n'existe pas.</p>
          <Link
            to="/shop"
            className="mt-6 rounded-full bg-hot text-primary-foreground px-6 py-3 font-bold uppercase tracking-wider shadow-cute"
          >
            Retour au Shop
          </Link>
        </main>
        <Footer />
      </div>
    );
  },
});

function ProductPage() {
  const product = Route.useLoaderData();
  const { add } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-8 md:py-12">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground hover:text-hot mb-8 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" /> Retour
        </Link>
        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          <div className="rounded-3xl border-2 border-foreground overflow-hidden bg-card shadow-pop">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover aspect-square"
            />
          </div>
          <div className="flex flex-col justify-center">
            {product.tag && (
              <span className="w-fit rounded-full bg-hot text-primary-foreground px-4 py-1.5 text-xs font-bold uppercase tracking-wider mb-4">
                {product.tag}
              </span>
            )}
            <span className="text-sm uppercase tracking-wider text-muted-foreground font-semibold mb-2">
              {product.category}
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4 leading-tight">
              {product.name}
            </h1>
            <p className="font-display text-3xl text-hot mb-8">{product.price} DH</p>

            <p className="text-foreground/80 mb-10 leading-relaxed max-w-md">
              Un must-have pour chaque girly qui se respecte ! Ajoute cette merveille à ta collection 
              et brille de mille feux ✨
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <button
                onClick={() => add(product)}
                className="flex-1 flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-8 py-4 font-bold uppercase tracking-wider shadow-pop hover:bg-hot hover:text-primary-foreground transition-colors"
              >
                <ShoppingBag className="h-5 w-5" />
                Ajouter au panier
              </button>
              <button className="h-[56px] w-[56px] flex-shrink-0 flex items-center justify-center rounded-full border-2 border-foreground text-foreground hover:bg-hot hover:border-hot hover:text-primary-foreground transition-all">
                <Heart className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-8 pt-8 border-t-2 border-foreground/10 space-y-4 text-sm font-medium">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Livraison</span>
                <span>Partout au Maroc 🇲🇦</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Paiement</span>
                <span>À la livraison ou virement</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <ProductGrid title="Nouvel arrivage ✨" limit={4} showAll={true} />
      <Footer />
    </div>
  );
}
