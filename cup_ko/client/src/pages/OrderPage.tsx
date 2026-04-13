import { Link } from "react-router-dom";
import Item from "../components/order/Item";
import type { Product } from "../types/shop";

type OrderPageProps = {
  items: Product[];
  onAddToCart: (item: Product) => void;
  cartCount: number;
};

function OrderPage({ items, onAddToCart, cartCount }: OrderPageProps) {
  return (
    <div className="flex flex-col items-center pb-16">
      <div className="w-full max-w-7xl px-8 pt-10 flex items-center justify-center">
        <h1 className="font-opun text-pink-200 text-stroke-cake text-6xl">
          Chewy Cake Bites
        </h1>
      </div>
      <div className="mt-16 px-8">
        <div className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <Item
              key={item.id}
              name={item.name}
              price={item.price}
              onAddToCart={() => onAddToCart(item)}
            />
          ))}
        </div>
      </div>
      <Link
        to="/checkout"
        aria-label={`Go to checkout, ${cartCount} item${cartCount === 1 ? "" : "s"} in cart`}
        className="font-pangolin fixed bottom-6 right-6 z-50 flex h-20 w-20 flex-col items-center justify-center rounded-full bg-rose-700 text-white shadow-lg ring-4 ring-pink-200 transition hover:bg-rose-800"
      >
        <span className="text-sm leading-none">Cart</span>
        <span className="text-xl leading-none">{cartCount}</span>
      </Link>
    </div>
  );
}

export default OrderPage;
