import { Link } from "@tanstack/react-router";
import { ShoppingBag, Heart, Search, Menu } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useState } from "react";

export function Navbar() {
  const { count, setOpen } = useCart();
  const [mobile, setMobile] = useState(false);
  const links = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop", search: { filter: "All" } },
    { to: "/shop", label: "Makeup", search: { filter: "Makeup" } },
    { to: "/shop", label: "Parfums", search: { filter: "Parfums" } },
    { to: "/shop", label: "Sacs", search: { filter: "Sacs" } },
  ];
  return (
    <header className="sticky top-0 z-40 border-b-2 border-foreground/10 bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
        <button
          onClick={() => setMobile((v) => !v)}
          className="md:hidden p-2 rounded-full hover:bg-muted"
        >
          <Menu className="h-5 w-5" />
        </button>
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-2xl md:text-3xl text-hot leading-none">Nouhaila</span>
          <span className="hidden sm:inline-block rounded-full bg-hot px-2 py-0.5 text-xs text-primary-foreground font-bold uppercase tracking-wider">
            store
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold uppercase tracking-wider text-foreground/80">
          {links.map((l, i) => (
            <Link key={i} to={l.to} search={l.search} className="hover:text-hot transition-colors active:text-hot">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <button className="hidden sm:inline-flex p-2 rounded-full hover:bg-muted">
            <Search className="h-5 w-5" />
          </button>
          <button className="hidden sm:inline-flex p-2 rounded-full hover:bg-muted">
            <Heart className="h-5 w-5" />
          </button>
          <button
            onClick={() => setOpen(true)}
            className="relative p-2 rounded-full hover:bg-muted"
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-5 min-w-5 px-1 rounded-full bg-hot text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>
      {mobile && (
        <nav className="md:hidden flex flex-col px-4 pb-3 gap-3 text-sm font-semibold uppercase tracking-wider">
          {links.map((l, i) => (
            <Link key={i} to={l.to} search={l.search} onClick={() => setMobile(false)} className="hover:text-hot">
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
