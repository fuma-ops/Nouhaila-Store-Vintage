import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Navbar } from "@/components/store/Navbar";
import { Footer } from "@/components/store/Footer";
import { useCart } from "@/lib/cart-context";
import { useAppStore } from "@/lib/store";
import { Minus, Plus, Trash2, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export const Route = createFileRoute("/cart")({ component: CartPage });

function CartPage() {
  const { items, setQty, remove, total, clear } = useCart();
  const addOrder = useAppStore((state) => state.addOrder);
  const navigate = useNavigate();

  const [checkoutMode, setCheckoutMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    paymentMethod: "delivery" as "delivery" | "transfer",
  });

  const grandTotal = total + (total >= 500 ? 0 : 30);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address || !formData.city) {
      toast.error("Veuillez remplir tous les champs !");
      return;
    }

    addOrder({
      customer: formData,
      items: items.map((i) => ({ product: i.product, qty: i.qty })),
      total: grandTotal,
    });

    toast.success("Commande passée avec succès ! ♡", {
      description: "On prépare ta commande girly, tu vas bientôt la recevoir ✨"
    });
    clear();
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 mx-auto max-w-6xl w-full px-4 md:px-8 py-10 md:py-14">
        <h1 className="font-display text-4xl md:text-6xl text-hot mb-8">Mon Panier</h1>
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
          <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
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
              <div className="pt-2">
                <button onClick={clear} className="text-sm text-muted-foreground hover:text-hot underline underline-offset-4">
                  Vider le panier
                </button>
              </div>
            </div>

            <aside className="rounded-3xl border-2 border-foreground bg-card p-6 shadow-pop sticky top-24">
              <h3 className="font-display text-2xl">Résumé</h3>
              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span className="text-foreground">{total} DH</span>
                </div>
                <div className="flex justify-between">
                  <span>Livraison</span>
                  <span className="text-foreground">{total >= 500 ? "Offerte ♡" : "30 DH"}</span>
                </div>
              </div>
              <div className="border-t-2 border-foreground/10 mt-4 pt-4 flex justify-between font-display text-2xl">
                <span>Total</span>
                <span className="text-hot">{grandTotal} DH</span>
              </div>

              {!checkoutMode ? (
                <>
                  <button 
                    onClick={() => setCheckoutMode(true)} 
                    className="mt-6 w-full rounded-full bg-hot text-primary-foreground py-4 font-bold uppercase tracking-wider text-sm shadow-cute hover:scale-[1.02] transition-transform"
                  >
                    Valider mon panier ♡
                  </button>
                  <p className="mt-3 text-xs text-center justify-center text-muted-foreground flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> Paiement sécurisé
                  </p>
                </>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 border-t-2 border-foreground/10 pt-6 space-y-4 animate-in fade-in slide-in-from-bottom-4">
                  <h4 className="font-bold text-lg">Informations de livraison</h4>
                  
                  <div>
                    <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Nom complet</label>
                    <input required minLength={3} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full mt-1 px-4 py-2.5 rounded-xl border-2 border-foreground/10 bg-transparent focus:border-hot outline-none transition-colors" placeholder="Kenza Alaoui" />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Numéro de téléphone</label>
                    <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full mt-1 px-4 py-2.5 rounded-xl border-2 border-foreground/10 bg-transparent focus:border-hot outline-none transition-colors" placeholder="06..." />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Ville</label>
                    <input required value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full mt-1 px-4 py-2.5 rounded-xl border-2 border-foreground/10 bg-transparent focus:border-hot outline-none transition-colors" placeholder="Casablanca" />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Adresse complète</label>
                    <textarea required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full mt-1 px-4 py-2.5 rounded-xl border-2 border-foreground/10 bg-transparent focus:border-hot outline-none transition-colors h-20 resize-none" placeholder="Quartier, rue, numéro..." />
                  </div>
                  
                  <div className="pt-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground ml-1 mb-2 block">Paiement</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setFormData({...formData, paymentMethod: "delivery"})}
                        className={`py-3 px-2 rounded-xl text-xs font-bold border-2 text-center transition-all ${formData.paymentMethod === "delivery" ? "border-hot bg-hot/10 text-hot" : "border-foreground/10 hover:border-foreground/30 text-muted-foreground"}`}
                      >
                        🚚 À la livraison
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({...formData, paymentMethod: "transfer"})}
                        className={`py-3 px-2 rounded-xl text-xs font-bold border-2 text-center transition-all ${formData.paymentMethod === "transfer" ? "border-hot bg-hot/10 text-hot" : "border-foreground/10 hover:border-foreground/30 text-muted-foreground"}`}
                      >
                        💳 Virement
                      </button>
                    </div>
                  </div>

                  <button type="submit" className="mt-4 w-full rounded-xl bg-black text-white py-4 font-bold uppercase tracking-wider text-sm shadow-pop hover:scale-[1.02] transition-transform flex justify-center items-center gap-2">
                    Confirmer la commande <CheckCircle className="w-4 h-4" />
                  </button>
                  <button type="button" onClick={() => setCheckoutMode(false)} className="w-full text-center text-xs text-muted-foreground mt-2 hover:text-hot underline underline-offset-2">
                    Retour
                  </button>
                </form>
              )}
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
