import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Navbar } from "@/components/store/Navbar";
import { Footer } from "@/components/store/Footer";
import { useCart } from "@/lib/cart-context";
import { Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/cart")({ component: CartPage });

function CartPage() {
  const { items, setQty, remove, total, clear } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (items.length === 0) return;
    toast.success("Commande passée avec succès ! ♡", {
      description: "On prépare ta commande girly, tu vas bientôt la recevoir ✨"
    });
    clear();
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 mx-auto max-w-5xl w-full px-4 md:px-8 py-10 md:py-14">
        <h1 className="font-display text-4xl md:text-6xl text-hot">Mon Panier</h1>
        {items.length === 0 ? (
          <div className="mt-10 text-center rounded-3xl border-2 border-foreground/10 bg-card p-12">
            <div className="text-6xl mb-3">🛍️</div>
            <p className="font-display text-2xl">Ton panier est vide</p>
            <Link
              to="/shop"
              className="inline-block mt-5 rounded-full bg-hot text-primary-foreground px-7 py-3 font-bold uppercase text-sm shadow-cute"
            >
              Découvrir le shop
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid md:grid-cols-[1fr_320px] gap-8">
            <div className="space-y-4">
              {items.map(({ product, qty }) => (
                <div
                  key={product.id}
                  className="flex gap-4 rounded-2xl border-2 border-foreground/10 bg-card p-4"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-24 w-24 sm:h-28 sm:w-28 rounded-xl object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">
                      {product.category}
                    </span>
                    <h3 className="font-display text-lg leading-tight mt-1">{product.name}</h3>
                    <p className="text-hot font-bold mt-1">{product.price} DH</p>
                    <div className="flex items-center gap-2 mt-3">
                      <button
                        onClick={() => setQty(product.id, qty - 1)}
                        className="h-8 w-8 rounded-full border border-foreground flex items-center justify-center hover:bg-muted"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="font-bold w-6 text-center">{qty}</span>
                      <button
                        onClick={() => setQty(product.id, qty + 1)}
                        className="h-8 w-8 rounded-full border border-foreground flex items-center justify-center hover:bg-muted"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => remove(product.id)}
                        className="ml-auto text-muted-foreground hover:text-hot"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={clear} className="text-sm text-muted-foreground hover:text-hot">
                Vider le panier
              </button>
            </div>
            <aside className="rounded-3xl border-2 border-foreground bg-card p-6 shadow-pop h-fit">
              <h3 className="font-display text-2xl">Résumé</h3>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span>{total} DH</span>
                </div>
                <div className="flex justify-between">
                  <span>Livraison</span>
                  <span>{total >= 500 ? "Offerte ♡" : "30 DH"}</span>
                </div>
              </div>
              <div className="border-t-2 border-foreground/10 mt-4 pt-4 flex justify-between font-display text-xl">
                <span>Total</span>
                <span className="text-hot">{total + (total >= 500 ? 0 : 30)} DH</span>
              </div>
              <button onClick={handleCheckout} className="mt-5 w-full rounded-full bg-hot text-primary-foreground py-3.5 font-bold uppercase tracking-wider text-sm shadow-cute hover:scale-[1.02] transition-transform">
                Passer la commande ♡
              </button>
              <p className="mt-3 text-xs text-center text-muted-foreground">
                Paiement à la livraison disponible
              </p>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
