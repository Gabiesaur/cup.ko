import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Item from "../components/order/Item";
import type { Product } from "../types/shop";

type OrderPageProps = {
  items: Product[];
  onAddToCart: (item: Product) => void;
  cartCount: number;
};

function OrderPage({ items, onAddToCart, cartCount }: OrderPageProps) {
  const [toastMessage, setToastMessage] = useState("");
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [selectedFlavor, setSelectedFlavor] = useState<string | null>(null);
  const toastTimerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const handleAddToCart = (item: Product) => {
    onAddToCart(item);
    setToastMessage(`${item.name} added to cart`);
    setIsToastVisible(true);

    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }

    toastTimerRef.current = window.setTimeout(() => {
      setIsToastVisible(false);
    }, 1800);
  };

  return (
    <div className="flex flex-col items-center pb-16">
      <div
        role="status"
        aria-live="polite"
        className={`pointer-events-none fixed right-6 top-6 z-50 max-w-xs rounded-2xl bg-[#9a3140] px-4 py-3 text-white shadow-lg transition-all duration-200 ${isToastVisible ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}`}
      >
        <p className="font-pangolin text-base leading-tight">
          {toastMessage || "Added to cart"}
        </p>
      </div>
      <div className="w-full max-w-7xl px-8 pt-16 flex items-center justify-center">
        <h1 className="font-opun text-[#e1a0aa] text-stroke-cake text-7xl">
          Chewy Cake Bites
        </h1>
      </div>
      <div className="w-full max-w-7xl px-8 pt-12 flex justify-center gap-4">
        <button
          onClick={() => setSelectedFlavor(null)}
          className={`font-pangolin px-6 py-2 rounded-full border-2 transition-all ${
            selectedFlavor === null
              ? "bg-[#9a3140] text-white border-[#9a3140]"
              : "bg-white text-[#9a3140] border-[#9a3140]"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setSelectedFlavor("pandan")}
          className={`font-pangolin px-6 py-2 rounded-full border-2 transition-all ${
            selectedFlavor === "pandan"
              ? "bg-[#9a3140] text-white border-[#9a3140]"
              : "bg-white text-[#9a3140] border-[#9a3140]"
          }`}
        >
          Pandan
        </button>
        <button
          onClick={() => setSelectedFlavor("ube")}
          className={`font-pangolin px-6 py-2 rounded-full border-2 transition-all ${
            selectedFlavor === "ube"
              ? "bg-[#9a3140] text-white border-[#9a3140]"
              : "bg-white text-[#9a3140] border-[#9a3140]"
          }`}
        >
          Ube
        </button>
        <button
          onClick={() => setSelectedFlavor("mango")}
          className={`font-pangolin px-6 py-2 rounded-full border-2 transition-all ${
            selectedFlavor === "mango"
              ? "bg-[#9a3140] text-white border-[#9a3140]"
              : "bg-white text-[#9a3140] border-[#9a3140]"
          }`}
        >
          Mango
        </button>
      </div>
      <div className="mt-16 p-16 bg-white border-2 border-black rounded-4xl">
        <div className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {items
            .filter((item) =>
              selectedFlavor === null
                ? true
                : item.name.toLowerCase().includes(selectedFlavor.toLowerCase())
            )
            .map((item) => (
              <Item
                key={item.id}
                name={item.name}
                price={item.price}
                image={item.image}
                onAddToCart={() => handleAddToCart(item)}
              />
            ))}
        </div>
      </div>
      <Link
        to="/cart"
        aria-label={`Go to checkout, ${cartCount} item${cartCount === 1 ? "" : "s"} in cart`}
        className="font-pangolin fixed bottom-6 right-6 z-50 flex h-20 w-20 flex-col items-center justify-center rounded-full bg-[#9a3140] text-white shadow-lg ring-4 ring-[#e1a0aa]"
      >
        <span className="text-sm leading-none">CART</span>
        <span className="text-xl leading-none">{cartCount}</span>
      </Link>
    </div>
  );
}

export default OrderPage;
