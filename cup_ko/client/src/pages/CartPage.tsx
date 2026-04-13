import { Link } from "react-router-dom";
import type { CartItem } from "../types/shop";

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
		<div className="mx-auto w-full max-w-5xl px-6 py-10">
			<div className="flex items-center justify-between">
				<h1 className="font-opun text-5xl text-pink-200 text-stroke-cake">Checkout</h1>
				<Link
					to="/"
					className="font-pangolin rounded-full bg-pink-200 px-4 py-2 text-rose-900"
				>
					Back To Order Page
				</Link>
			</div>

			{cartItems.length === 0 ? (
				<div className="mt-12 rounded-3xl bg-pink-100 p-8 text-center">
					<p className="font-pangolin text-2xl text-rose-900">Your cart is empty.</p>
				</div>
			) : (
				<>
					<div className="mt-8 space-y-4">
						{cartItems.map((item) => (
							<div
								key={item.id}
								className="flex items-center justify-between gap-4 rounded-3xl bg-pink-100 p-5"
							>
								<div>
									<p className="font-opun text-2xl text-rose-900">{item.name}</p>
									<p className="font-pangolin text-lg text-rose-700">P{item.price} each</p>
								</div>

								<div className="flex items-center gap-3">
									<button
										onClick={() => onDecrement(item.id)}
										className="font-pangolin rounded-full bg-rose-700 px-3 py-1 text-white"
									>
										-
									</button>
									<span className="font-pangolin w-8 text-center text-xl text-rose-900">
										{item.quantity}
									</span>
									<button
										onClick={() => onIncrement(item.id)}
										className="font-pangolin rounded-full bg-rose-700 px-3 py-1 text-white"
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

					<div className="mt-8 flex items-center justify-between rounded-3xl bg-rose-800 px-6 py-4">
						<p className="font-opun text-3xl text-white">Total: P{total}</p>
						<button
							onClick={onClearCart}
							className="font-pangolin rounded-full bg-amber-100 px-5 py-2 text-rose-900"
						>
							Place Order
						</button>
					</div>
				</>
			)}
		</div>
	);
}

export default CartPage;
