import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/store/Navbar";
import { Hero } from "@/components/store/Hero";
import { CategoryTiles } from "@/components/store/CategoryTiles";
import { ProductGrid } from "@/components/store/ProductGrid";
import { Subscribe } from "@/components/store/Subscribe";
import { Footer } from "@/components/store/Footer";

export const Route = createFileRoute("/")({ component: Index });

function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <CategoryTiles />
        <ProductGrid limit={8} title="Bestsellers ♡" />
        <Subscribe />
      </main>
      <Footer />
    </div>
  );
}
