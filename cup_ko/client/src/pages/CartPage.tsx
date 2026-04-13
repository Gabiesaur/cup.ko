import { Link } from "react-router-dom";
import type { CartItem } from "../types/shop";
import PageLayout from "../components/PageLayout";

type CartPageProps = {
  cartItems: CartItem[];
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
  onClearCart: () => void;
};

function CartPage({
  cartItems,
  onIncrement,
  onDecrement,
  onClearCart,
}: CartPageProps) {
  const total = cartItems.reduce(
    (runningTotal, item) => runningTotal + item.price * item.quantity,
    0,
  );

  return (
    <PageLayout>
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex flex-col items-center justify-between">
          <h1 className="font-opun text-6xl text-[#e1a0aa] text-stroke-cake">
            Checkout
          </h1>
          <Link
            to="/order"
            className="font-pangolin rounded-full bg-[#ffe7b5] mt-8 md:mt-4 px-4 py-2 text-[#9a3140]"
          >
            BACK TO ORDER PAGE
          </Link>
        </div>

        <div className="bg-white border-2 border-black mt-8 p-4 md:p-12 rounded-4xl">
          {cartItems.length === 0 ? (
            <div className="rounded-3xl bg-pink-100 text-center">
              <p className="font-pangolin text-2xl text-rose-900">
                Your cart is empty.
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-4 rounded-3xl bg-rose-100 p-5"
                  >
                    <div>
                      <p className="font-opun text-xl md:text-2xl text-[#9a3140]">
                        {item.name}
                      </p>
                      <p className="font-pangolin text-lg text-[#9a3140]">
                        P{item.price} each
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onDecrement(item.id)}
                        className="font-pangolin rounded-full bg-[#9a3140] px-3 py-1 text-white"
                      >
                        -
                      </button>
                      <span className="font-pangolin w-8 text-center text-xl text-[#9a3140]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onIncrement(item.id)}
                        className="font-pangolin rounded-full bg-[#9a3140] px-3 py-1 text-white"
                      >
                        +
                      </button>
                    </div>

                    <p className="font-pangolin text-2xl text-rose-900">
                      P{item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center justify-between rounded-3xl bg-[#9a3140] px-4 py-4">
                <p className="font-opun text-xl md:text-3xl text-white">
                  Total: P{total}
                </p>
                <Link
                  onClick={onClearCart}
                  to="/payment"
                  className="font-pangolin text-sm rounded-full bg-[#ffe7b5] px-5 py-2 text-[#9a3140]"
                >
                  PLACE ORDER
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </PageLayout>
  );
}

export default CartPage;
