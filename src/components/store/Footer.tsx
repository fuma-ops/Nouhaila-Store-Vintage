import { Instagram, Facebook, Music2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-12 grid gap-8 md:grid-cols-4">
        <div>
          <h3 className="font-display text-3xl text-coral">Nouhaila Store</h3>
          <p className="mt-3 text-sm text-background/70 font-medium">
            Girly stuff imported with love. Makeup, parfums & sacs cute.
          </p>
        </div>
        <div>
          <h4 className="font-display text-lg mb-3">Shop</h4>
          <ul className="space-y-2 text-sm text-background/80">
            <li>Makeup</li>
            <li>Parfums</li>
            <li>Sacs</li>
            <li>New Arrivals</li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-lg mb-3">Help</h4>
          <ul className="space-y-2 text-sm text-background/80">
            <li>Livraison</li>
            <li>Retours</li>
            <li>Contact</li>
            <li>FAQ</li>
            <li>
              <Link to="/admin" className="hover:text-coral transition-colors underline underline-offset-4">Admin Panel</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-lg mb-3">Follow</h4>
          <div className="flex gap-3">
            <a className="h-10 w-10 rounded-full bg-hot flex items-center justify-center hover:scale-110 transition-transform">
              <Instagram className="h-5 w-5" />
            </a>
            <a className="h-10 w-10 rounded-full bg-coral flex items-center justify-center hover:scale-110 transition-transform">
              <Music2 className="h-5 w-5" />
            </a>
            <a className="h-10 w-10 rounded-full bg-lavender flex items-center justify-center hover:scale-110 transition-transform">
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-background/10 py-4 text-center text-xs text-background/60">
        © 2026 Nouhaila Store · Made with ♡ in Morocco
      </div>
    </footer>
  );
}
