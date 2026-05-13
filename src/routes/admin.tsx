import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useAppStore, type Order } from "@/lib/store";
import { toast } from "sonner";
import { Copy, CheckCircle, Trash2, Send, Plus, Package, ArrowLeft, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const {
    products,
    orders,
    addProduct,
    validateAllPendingOrders,
    updateOrderStatus,
    deleteOrder,
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<"dashboard" | "orders" | "products">("dashboard");

  // Format order for whatsapp
  const sendToWhatsApp = (o: Order) => {
    let text = `*Nouvelle Commande N°${o.id}*\n\n`;
    text += `🙎‍♀️ *Client:* ${o.customer.name}\n`;
    text += `📞 *Tél:* ${o.customer.phone}\n`;
    text += `📍 *Adresse:* ${o.customer.address}, ${o.customer.city}\n`;
    text += `💳 *Paiement:* ${o.customer.paymentMethod === "delivery" ? "A la livraison" : "Virement Bancaire"}\n\n`;
    text += `*Produits:*\n`;
    o.items.forEach((i) => {
      text += `- ${i.qty}x ${i.product.name} (${i.product.price} DH)\n`;
    });
    text += `\n*TOTAL: ${o.total} DH* (incl. livraison)`;

    const encoded = encodeURIComponent(text);
    // Open whatsapp link
    window.open(`https://wa.me/?text=${encoded}`, "_blank");
  };

  const handleValidateAll = () => {
    validateAllPendingOrders();
    toast.success("Toutes les commandes en attente ont été validées");
  };

  const pendingCount = orders.filter((o) => o.status === "pending").length;
  const totalRevenue = orders.filter((o) => o.status === "validated").reduce((sum, o) => sum + o.total, 0);
  
  const lowStockProducts = products.filter(p => p.stock !== undefined && p.stock <= 5);

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Admin header */}
      <header className="bg-card border-b-2 border-foreground/10 px-6 py-4 flex items-center gap-6 overflow-x-auto">
        <Link to="/" className="flex flex-shrink-0 items-center justify-center p-2 rounded-full hover:bg-muted transition-colors text-foreground">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="font-display text-2xl text-hot tracking-wide whitespace-nowrap">
          Admin <span className="text-foreground">Panel</span>
        </h1>
        <div className="flex gap-4 ml-auto">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`font-bold text-sm whitespace-nowrap uppercase px-4 py-2 rounded-full transition-colors ${activeTab === "dashboard" ? "bg-hot text-white" : "hover:bg-muted"}`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`font-bold text-sm whitespace-nowrap uppercase px-4 py-2 rounded-full transition-colors ${activeTab === "orders" ? "bg-hot text-white" : "hover:bg-muted"}`}
          >
            Commandes
            {pendingCount > 0 && <span className="ml-2 bg-foreground text-background px-2 py-0.5 rounded-full text-xs">{pendingCount}</span>}
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`font-bold text-sm whitespace-nowrap uppercase px-4 py-2 rounded-full transition-colors ${activeTab === "products" ? "bg-hot text-white" : "hover:bg-muted"}`}
          >
            Produits
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 mt-6">
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card p-6 rounded-3xl border-2 border-foreground/10 shadow-cute">
                <h3 className="text-muted-foreground uppercase text-sm font-bold">Chiffre d'affaires</h3>
                <p className="font-display text-4xl text-hot mt-2">{totalRevenue} DH</p>
              </div>
              <div className="bg-card p-6 rounded-3xl border-2 border-foreground/10 shadow-cute">
                <h3 className="text-muted-foreground uppercase text-sm font-bold">Commandes validées</h3>
                <p className="font-display text-4xl mt-2">{orders.filter(o => o.status === "validated").length}</p>
              </div>
              <div className="bg-card p-6 rounded-3xl border-2 border-foreground/10 shadow-cute">
                <h3 className="text-muted-foreground uppercase text-sm font-bold">En attente</h3>
                <p className="font-display text-4xl mt-2 text-orange-500">{pendingCount}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card p-6 rounded-3xl border-2 border-foreground/10 shadow-cute">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-foreground uppercase text-sm font-bold flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange-500" />
                    Produits en stock faible
                  </h3>
                  <button onClick={() => setActiveTab("products")} className="text-hot text-xs font-bold hover:underline">Gérer</button>
                </div>
                {lowStockProducts.length === 0 ? (
                  <p className="text-muted-foreground text-sm">Tous les produits sont bien approvisionnés.</p>
                ) : (
                  <ul className="space-y-3">
                    {lowStockProducts.map(p => (
                      <li key={p.id} className="flex items-center justify-between border-b-2 border-foreground/5 pb-2 last:border-0 last:pb-0">
                        <div className="flex items-center gap-3">
                          <img src={p.image} className="w-10 h-10 rounded-lg object-cover bg-muted" alt={p.name} />
                          <span className="font-bold text-sm">{p.name}</span>
                        </div>
                        <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-xs font-bold font-mono">
                          Stock: {p.stock}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="bg-card rounded-3xl border-2 border-foreground/10 shadow-cute overflow-hidden">
            <div className="p-4 border-b-2 border-foreground/10 flex justify-between items-center bg-muted/20">
              <h2 className="font-display text-xl">Gestion des Commandes</h2>
              {pendingCount > 0 && (
                <button
                  onClick={handleValidateAll}
                  className="bg-black text-white px-4 py-2 rounded-full text-sm font-bold shadow-pop flex items-center gap-2 hover:scale-105 transition-transform"
                >
                  <CheckCircle className="w-4 h-4" />
                  Valider tout
                </button>
              )}
            </div>
            <div className="p-4">
              {orders.length === 0 ? (
                <p className="text-center py-10 text-muted-foreground">Aucune commande pour le moment.</p>
              ) : (
                <div className="space-y-4">
                  {orders.map((o) => (
                    <div key={o.id} className="border-2 border-foreground/10 rounded-2xl p-4 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-muted-foreground">{o.id}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-bold uppercase ${o.status === "validated" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>
                            {o.status === "validated" ? "Validée" : "En attente"}
                          </span>
                        </div>
                        <h4 className="font-bold text-lg mt-1">{o.customer.name} <span className="text-muted-foreground font-normal text-sm">({o.customer.phone})</span></h4>
                        <p className="text-sm text-muted-foreground">{o.items.length} article(s) - {o.total} DH ({o.customer.paymentMethod})</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {o.status === "pending" && (
                          <button
                            onClick={() => updateOrderStatus(o.id, "validated")}
                            className="bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1.5 rounded-xl text-sm font-bold flex items-center gap-1 transition-colors"
                          >
                            <CheckCircle className="w-4 h-4" /> Valider
                          </button>
                        )}
                        <button
                          onClick={() => sendToWhatsApp(o)}
                          className="bg-green-500 text-white hover:bg-green-600 px-3 py-1.5 rounded-xl text-sm font-bold flex items-center gap-1 transition-colors"
                        >
                          <Send className="w-4 h-4" /> WhatsApp
                        </button>
                        <button
                          onClick={() => {
                            if (confirm("Supprimer cette commande ?")) deleteOrder(o.id);
                          }}
                          className="bg-red-100 text-red-600 hover:bg-red-200 px-3 py-1.5 rounded-xl text-sm font-bold flex items-center gap-1 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "products" && (
          <ProductManager products={products} addProduct={addProduct} />
        )}
      </main>
    </div>
  );
}

function ProductManager({ products, addProduct }: { products: any[], addProduct: any }) {
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category: "Makeup",
    image: "",
    tag: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.image || !formData.stock) {
      toast.error("Veuillez remplir tous les champs obligatoires (incluant le stock)");
      return;
    }
    addProduct({
      name: formData.name,
      price: Number(formData.price),
      stock: Number(formData.stock),
      category: formData.category as any,
      image: formData.image,
      tag: formData.tag || undefined
    });
    setFormData({ name: "", price: "", stock: "", category: "Makeup", image: "", tag: "" });
    setShowForm(false);
    toast.success("Produit ajouté !");
  };

  return (
    <div className="bg-card rounded-3xl border-2 border-foreground/10 shadow-cute overflow-hidden">
      <div className="p-4 border-b-2 border-foreground/10 flex justify-between items-center bg-muted/20">
        <h2 className="font-display text-xl flex items-center gap-2"><Package className="h-5 w-5" /> Gérer le Catalogue</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-hot text-white px-4 py-2 rounded-full text-sm font-bold shadow-pop flex items-center gap-2"
        >
          {showForm ? "Fermer" : <><Plus className="h-4 w-4" /> Nouveau</>}
        </button>
      </div>
      
      {showForm && (
        <div className="p-6 border-b-2 border-foreground/10 bg-muted/10">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
            <div>
              <label className="block text-sm font-bold mb-1">Nom du Produit</label>
              <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full border-2 border-foreground/20 rounded-xl px-3 py-2" placeholder="Ex: Palette Rose" />
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-sm font-bold mb-1">Prix (DH)</label>
                <input type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} className="w-full border-2 border-foreground/20 rounded-xl px-3 py-2" placeholder="Ex: 150" />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-bold mb-1">Stock</label>
                <input type="number" value={formData.stock} onChange={e => setFormData({ ...formData, stock: e.target.value })} className="w-full border-2 border-foreground/20 rounded-xl px-3 py-2" placeholder="Ex: 10" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Catégorie</label>
              <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full border-2 border-foreground/20 rounded-xl px-3 py-2">
                <option value="Makeup">Makeup</option>
                <option value="Parfums">Parfums</option>
                <option value="Sacs">Sacs</option>
                <option value="Soins">Soins</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">URL de l'image</label>
              <input type="text" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} className="w-full border-2 border-foreground/20 rounded-xl px-3 py-2" placeholder="https://..." />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Tag (Optionnel)</label>
              <input type="text" value={formData.tag} onChange={e => setFormData({ ...formData, tag: e.target.value })} className="w-full border-2 border-foreground/20 rounded-xl px-3 py-2" placeholder="Ex: Nouveau, Promo" />
            </div>
            <div className="md:col-span-2 pt-2">
              <button type="submit" className="w-full bg-black text-white px-4 py-3 rounded-xl font-bold uppercase tracking-wide">Ajouter le produit</button>
            </div>
          </form>
        </div>
      )}

      <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {products.map(p => (
          <div key={p.id} className="border border-foreground/10 rounded-2xl p-3 bg-card relative">
            {p.stock !== undefined && (
              <span className={`absolute top-2 right-2 text-xs font-bold px-2 py-0.5 rounded-full ${p.stock <= 5 ? "bg-red-100 text-red-600" : "bg-green-100 text-green-700"}`}>
                Stock: {p.stock}
              </span>
            )}
            <img src={p.image} className="w-full aspect-square object-cover rounded-xl bg-muted" alt={p.name} />
            <div className="mt-2 text-sm text-muted-foreground uppercase">{p.category}</div>
            <div className="font-bold leading-tight">{p.name}</div>
            <div className="text-hot font-bold mt-1">{p.price} DH</div>
          </div>
        ))}
      </div>
    </div>
  )
}
