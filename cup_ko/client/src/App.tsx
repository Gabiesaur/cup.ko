import { useMemo, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.tsx";
import OrderPage from "./pages/OrderPage.tsx";
import CartPage from "./pages/CartPage.tsx";
import ModePage from "./pages/ModePage.tsx";
import CheckOutPage from "./pages/CheckOutPage.tsx";
import SalesTrackerPage from "./pages/SalesTrackerPage.tsx";
import PurchaseFormPage from "./pages/PurchaseFormPage.tsx";
import PaymentPage from "./pages/PaymentPage.tsx";
import Mango_Coconut from "./assets/Mango_Coconut.png";
import Mango_Graham from "./assets/Mango_Graham.png";
import Mango_Rice from "./assets/Mango_Rice.png";
import Mango_Sesame from "./assets/Mango_Sesame.png";
import Ube_Coconut from "./assets/Ube_Coconut.png";
import Ube_Graham from "./assets/Ube_Graham.png";
import Ube_Rice from "./assets/Ube_Rice.png";
import Ube_Sesame from "./assets/Ube_Sesame.png";
import Pandan_Coconut from "./assets/Pandan_Coconut.png";
import Pandan_Graham from "./assets/Pandan_Graham.png";
import Pandan_Rice from "./assets/Pandan_Rice.png";
import Pandan_Sesame from "./assets/Pandan_Sesame.png";
import type { CartItem, Product } from "./types/shop";

const products: Product[] = [
  { id: 1, name: "Chewy Pandan Cake w/ Sesame Seed", price: 40, image: Pandan_Sesame },
  { id: 2, name: "Chewy Pandan Cake w/ Rice Krispy", price: 40, image: Pandan_Rice },
  { id: 3, name: "Chewy Pandan Cake w/ Graham Powder", price: 40, image: Pandan_Graham },
  { id: 4, name: "Chewy Pandan Cake w/ Coconut Flakes", price: 40, image: Pandan_Coconut },
  { id: 5, name: "Chewy Ube Cake w/ Sesame Seed", price: 40, image: Ube_Sesame },
  { id: 6, name: "Chewy Ube Cake w/ Rice Krispy", price: 40, image: Ube_Rice },
  { id: 7, name: "Chewy Ube Cake w/ Graham Powder", price: 40, image: Ube_Graham },
  { id: 8, name: "Chewy Ube Cake w/ Coconut Flakes", price: 40, image: Ube_Coconut },
  { id: 9, name: "Chewy Mango Cake w/ Sesame Seed", price: 40, image: Mango_Sesame },
  { id: 10, name: "Chewy Mango Cake w/ Rice Krispy", price: 40, image: Mango_Rice },
  { id: 11, name: "Chewy Mango Cake w/ Graham Powder", price: 40, image: Mango_Graham },
  { id: 12, name: "Chewy Mango Cake w/ Coconut Flakes", price: 40, image: Mango_Coconut },
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
        <Route path="/purchaseform" element={<PurchaseFormPage />} />
        <Route path="/payment" element={<PaymentPage />} />
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
