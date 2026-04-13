import { useMemo, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.tsx";
import OrderPage from "./pages/OrderPage.tsx";
import CartPage from "./pages/CartPage.tsx";
import ModePage from "./pages/ModePage.tsx";
import CheckOutPage from "./pages/CheckOutPage.tsx";
import SalesTrackerPage from "./pages/SalesTrackerPage.tsx";
import type { CartItem, Product } from "./types/shop";

const products: Product[] = [
  { id: 1, name: "Chewy Pandan Cake w/ Sesame Seed", price: 40 },
  { id: 2, name: "Chewy Pandan Cake w/ Rice Krispy", price: 40 },
  { id: 3, name: "Chewy Pandan Cake w/ Graham Powder", price: 40 },
  { id: 4, name: "Chewy Pandan Cake w/ Coconut Flakes", price: 40 },
  { id: 5, name: "Chewy Ube Cake w/ Sesame Seed", price: 40 },
  { id: 6, name: "Chewy Ube Cake w/ Rice Krispy", price: 40 },
  { id: 7, name: "Chewy Ube Cake w/ Graham Powder", price: 40 },
  { id: 8, name: "Chewy Ube Cake w/ Coconut Flakes", price: 40 },
  { id: 9, name: "Chewy Mango Cake w/ Sesame Seed", price: 40 },
  { id: 10, name: "Chewy Mango Cake w/ Rice Krispy", price: 40 },
  { id: 11, name: "Chewy Mango Cake w/ Graham Powder", price: 40 },
  { id: 12, name: "Chewy Mango Cake w/ Coconut Flakes", price: 40 },
];

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  );

  const addToCart = (product: Product) => {
    setCartItems((previousItems) => {
      const existingItem = previousItems.find((item) => item.id === product.id);

      if (!existingItem) {
        return [...previousItems, { ...product, quantity: 1 }];
      }

      return previousItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    });
  };

  const incrementItem = (id: number) => {
    setCartItems((previousItems) =>
      previousItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decrementItem = (id: number) => {
    setCartItems((previousItems) =>
      previousItems.flatMap((item) => {
        if (item.id !== id) {
          return [item];
        }

        if (item.quantity === 1) {
          return [];
        }

        return [{ ...item, quantity: item.quantity - 1 }];
      }),
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/mode" element={<ModePage />} />
        <Route path="/checkout" element={<CheckOutPage />} />
        <Route path="/sales-tracker" element={<SalesTrackerPage />} />
        <Route
          path="/order"
          element={
            <OrderPage
              items={products}
              onAddToCart={addToCart}
              cartCount={cartCount}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <CartPage
              cartItems={cartItems}
              onIncrement={incrementItem}
              onDecrement={decrementItem}
              onClearCart={clearCart}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
