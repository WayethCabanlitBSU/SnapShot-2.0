import { useState } from "react";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import CartDrawer from "../components/CartDrawer";

import camera1 from "../assets/camera1.png";
import camera2 from "../assets/camera2.png";
import camera3 from "../assets/camera3.png";
import camera4 from "../assets/camera4.jpg";
import camera5 from "../assets/camera5.jpg";
import camera6 from "../assets/camera6.jpg";
import camera7 from "../assets/camera7.jpg";
import camera8 from "../assets/camera8.jpg";
import camera9 from "../assets/camera9.jpg";

export default function Home() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const products = [
    {
      id: 1,
      name: "Polaroid Go Instant Camera",
      color: "Black",
      rating: 4.7,
      price: 129.99,
      image: camera1,
    },
    {
      id: 2,
      name: "Polaroid Now i-Type Instant Camera",
      color: "Yellow",
      rating: 4.5,
      price: 149.99,
      image: camera2,
    },
    {
      id: 3,
      name: "Polaroid Go Generation 2 Instant Camera",
      color: "White",
      rating: 4.8,
      price: 159.99,
      image: camera3,
    },
    {
      id: 4,
      name: "Fujifilm Instax Mini 12",
      color: "Mint Green",
      rating: 4.6,
      price: 114.99,
      image: camera4,
    },
    {
      id: 5,
      name: "Fujifilm Instax Square SQ1",
      color: "Terracotta Orange",
      rating: 4.7,
      price: 129.99,
      image: camera5,
    },
    {
      id: 6,
      name: "Kodak Printomatic Instant Camera",
      color: "Blue",
      rating: 4.4,
      price: 59.99,
      image: camera6,
    },
    {
      id: 7,
      name: "Canon Ivy Cliq+2",
      color: "Rose Gold",
      rating: 4.5,
      price: 149.99,
      image: camera7,
    },
    
    {
      id: 8,
      name: "Fujifilm Instax Mini 99",
      color: "Matte Black",
      rating: 4.9,
      price: 199.0,
      image: camera8,
    },
    {
      id: 9,
      name: "Polaroid Supercolor SX-70 Land Camera",
      color: "Vintage Brown",
      rating: 4.8,
      price: 289.99,
      image: camera9,
    },
  ];

  // ➕ ADD TO CART (increase quantity)
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);

      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });

    setCartOpen(true); // auto-open drawer
  };

  // ➖ REMOVE FROM CART (decrease quantity)
  const removeFromCart = (product) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // 🗑 CLEAR CART
  const clearCart = () => {
    setCart([]);
  };

  // After placing order → clear cart + close drawer
  const handleOrderComplete = () => {
    setCart([]);
    setCartOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar openCart={() => setCartOpen(true)} />

      {/* Header */}
      <section className="text-center mt-12">
        <h1 className="text-4xl font-bold text-gray-900">Our Bestsellers</h1>
        <p className="text-gray-600 mt-2">Find Your Perfect Camera</p>
      </section>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-8 py-12">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>

      {/* Cart Drawer */}
      {cartOpen && (
        <CartDrawer
          cart={cart}
          closeCart={() => setCartOpen(false)}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          onOrderComplete={handleOrderComplete}
        />
      )}
    </div>
  );
}
