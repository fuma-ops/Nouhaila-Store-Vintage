import { useCart } from "@/lib/cart-context";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function CartDrawer() {
  const { items, open, setOpen, setQty, remove, total, count } = useCart();
  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-foreground/40 transition-opacity ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setOpen(false)}
      />
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-full sm:w-[420px] bg-background border-l-2 border-foreground shadow-pop flex flex-col transition-transform ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-5 border-b-2 border-foreground/10">
          <h3 className="font-display text-2xl text-hot">Mon Panier ({count})</h3>
          <button onClick={() => setOpen(false)} className="p-2 rounded-full hover:bg-muted">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-3">🛍️</div>
              <p className="font-display text-xl text-foreground">Ton panier est vide</p>
              <p className="text-sm text-muted-foreground mt-1">
                Ajoute des cuties pour commencer ♡
              </p>
            </div>
          )}
          {items.map(({ product, qty }) => (
            <div
              key={product.id}
              className="flex gap-3 rounded-2xl border-2 border-foreground/10 p-3"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-20 w-20 rounded-xl object-cover"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-display text-sm leading-tight">{product.name}</h4>
                <p className="text-hot font-bold text-sm mt-1">{product.price} DH</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => setQty(product.id, qty - 1)}
                    className="h-7 w-7 rounded-full border border-foreground flex items-center justify-center hover:bg-muted"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="text-sm font-bold w-5 text-center">{qty}</span>
                  <button
                    onClick={() => setQty(product.id, qty + 1)}
                    className="h-7 w-7 rounded-full border border-foreground flex items-center justify-center hover:bg-muted"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => remove(product.id)}
                    className="ml-auto h-7 w-7 rounded-full text-muted-foreground hover:text-hot flex items-center justify-center"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {items.length > 0 && (
          <div className="border-t-2 border-foreground/10 p-5 space-y-3">
            <div className="flex justify-between font-display text-xl">
              <span>Total</span>
              <span className="text-hot">{total} DH</span>
            </div>
            <Link
              to="/cart"
              onClick={() => setOpen(false)}
              className="block text-center rounded-full bg-hot text-primary-foreground py-3.5 font-bold uppercase tracking-wider text-sm shadow-cute hover:scale-[1.02] transition-transform"
            >
              Checkout ♡
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
