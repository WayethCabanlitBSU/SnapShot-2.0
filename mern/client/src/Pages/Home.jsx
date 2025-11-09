import { useState } from "react";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";

export default function Home() {
  const [cart, setCart] = useState([]);

  const products = [
    {
      id: 1,
      name: "Polaroid Go Instant Camera",
      color: "Black",
      rating: 4.7,
      price: 129.99,
      image: "/assets/camera1.png",
    },
    {
      id: 2,
      name: "Polaroid Now i-Type Instant Camera",
      color: "Yellow",
      rating: 4.5,
      price: 149.99,
      image: "/assets/camera2.png",
    },
    {
      id: 3,
      name: "Polaroid Go Generation 2 Instant Camera",
      color: "White",
      rating: 4.8,
      price: 159.99,
      image: "/assets/camera3.png",
    },
  ];

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="text-center mt-12">
        <h1 className="text-4xl font-bold text-gray-900">Our Bestsellers</h1>
        <p className="text-gray-600 mt-2">Find Your Perfect Camera</p>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-8 py-12">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}
