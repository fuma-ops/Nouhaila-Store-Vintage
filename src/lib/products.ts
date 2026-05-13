import lipstick from "@/assets/product-lipstick.jpg";
import perfume from "@/assets/product-perfume.jpg";
import bag from "@/assets/product-bag.jpg";
import blush from "@/assets/product-blush.jpg";
import gloss from "@/assets/product-gloss.jpg";
import purse from "@/assets/product-purse.jpg";
import perfume2 from "@/assets/product-perfume2.jpg";

export type Product = {
  id: string;
  name: string;
  price: number;
  category: "Makeup" | "Parfums" | "Sacs" | "Soins";
  image: string;
  tag?: string;
  stock?: number;
};

export const products: Product[] = [
  {
    id: "p1",
    name: "Hot Pink Lipstick",
    price: 149,
    category: "Makeup",
    image: lipstick,
    tag: "Bestseller",
  },
  {
    id: "p2",
    name: "Girly Eau de Parfum",
    price: 389,
    category: "Parfums",
    image: perfume,
    tag: "New",
  },
  { id: "p3", name: "Heart Charm Mini Bag", price: 459, category: "Sacs", image: bag, tag: "Hot" },
  { id: "p4", name: "Rose Glow Blush Kit", price: 199, category: "Makeup", image: blush },
  {
    id: "p5",
    name: "Sugar Lip Gloss Trio",
    price: 129,
    category: "Makeup",
    image: gloss,
    tag: "Sale",
  },
  { id: "p6", name: "Pink Chain Crossbody", price: 529, category: "Sacs", image: purse },
  { id: "p7", name: "Bloom Eau de Parfum", price: 419, category: "Parfums", image: perfume2 },
  { id: "p8", name: "Cherry Crush Lipstick", price: 159, category: "Makeup", image: lipstick },
];

export const categories = [
  { name: "New Arrivals", key: "new" },
  { name: "Makeup", key: "Makeup" },
  { name: "Parfums", key: "Parfums" },
  { name: "Sacs", key: "Sacs" },
  { name: "Soins", key: "Soins" },
] as const;
