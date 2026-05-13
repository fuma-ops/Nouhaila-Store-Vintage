import { create } from "zustand";
import { persist } from "zustand/middleware";
import { products as initialProducts, type Product } from "./products";

export type OrderStatus = "pending" | "validated";

export type CheckoutFormData = {
  name: string;
  phone: string;
  address: string;
  city: string;
  paymentMethod: "delivery" | "transfer";
};

export type OrderItem = {
  product: Product;
  qty: number;
};

export type Order = {
  id: string;
  date: string;
  customer: CheckoutFormData;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
};

type AppStore = {
  products: Product[];
  orders: Order[];
  addProduct: (product: Omit<Product, "id">) => void;
  removeProduct: (id: string) => void;
  addOrder: (order: Omit<Order, "id" | "date" | "status">) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  validateAllPendingOrders: () => void;
  deleteOrder: (id: string) => void;
};

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      products: initialProducts,
      orders: [],
      addProduct: (product) =>
        set((state) => ({
          products: [
            ...state.products,
            { ...product, id: `p_${Date.now()}` },
          ],
        })),
      removeProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),
      addOrder: (order) =>
        set((state) => ({
          orders: [
            ...state.orders,
            {
              ...order,
              id: `ord_${Date.now()}`,
              date: new Date().toISOString(),
              status: "pending",
            },
          ],
        })),
      updateOrderStatus: (id, status) =>
        set((state) => ({
          orders: state.orders.map((o) => (o.id === id ? { ...o, status } : o)),
        })),
      validateAllPendingOrders: () =>
        set((state) => ({
          orders: state.orders.map((o) =>
            o.status === "pending" ? { ...o, status: "validated" } : o
          ),
        })),
      deleteOrder: (id) =>
        set((state) => ({
          orders: state.orders.filter((o) => o.id !== id),
        })),
    }),
    {
      name: "nouhaila-store-db",
    }
  )
);
