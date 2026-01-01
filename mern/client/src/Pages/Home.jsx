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

// Shop page with product catalog and cart
export default function Home() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Navbar notification message
  const [notif, setNotif] = useState("");

  // Success popup on order placement
  const [successPopup, setSuccessPopup] = useState(false);

  // Camera product data
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

  // ➕ ADD TO CART
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

    // 🔔 SHOW NOTIFICATION
    setNotif("Added to cart");
    setTimeout(() => setNotif(""), 1800);

    // Desktop auto-open only
    if (window.innerWidth > 768) {
      setCartOpen(true);
    }
  };

  // ➖ REMOVE FROM CART
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
  const clearCart = () => setCart([]);

  // 🎉 ORDER COMPLETE HANDLER
  const handleOrderComplete = () => {
    setCart([]);
    setCartOpen(false);

    setSuccessPopup(true);
    setTimeout(() => setSuccessPopup(false), 1500);
  };

  return (
    <div className="min-h-screen bg-white relative">

      {/* NAVBAR */}
      <Navbar openCart={() => setCartOpen(true)} />

      {/* 🔔 NAVBAR NOTIFICATION */}
      {notif && (
        <div className="fixed top-4 right-4 nav-notif animate-fade z-[9999]">
          {notif}
        </div>
      )}

      {/* 🎉 SUCCESS POPUP */}
      {successPopup && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                        bg-green-600 text-white px-6 py-3 rounded-xl shadow-xl z-[9999]
                        animate-fade">
          Order Placed Successfully! 🎉
        </div>
      )}

      {/* HEADER */}
      <section className="text-center mt-12">
        <h1 className="text-4xl font-bold text-gray-900">Our Bestsellers</h1>
        <p className="text-gray-600 mt-2">Find Your Perfect Camera</p>
      </section>

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-8 py-12">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>

      {/* CART DRAWER */}
      {cartOpen && (
        <CartDrawer
          cart={cart}
          closeCart={() => setCartOpen(false)}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          onOrderComplete={handleOrderComplete}
        />
      )}

      {/* Footer */}
      <footer id="contact">
        <div className="section__container footer__container">
          <div className="footer__col">
            <div className="footer__logo">
              <a href="#home" className="logo">SnapShot</a>
            </div>
            <p>
              Explore the world through the lens of creativity with SnapShot, your ultimate photography platform.
            </p>
            <ul className="footer__socials">
              <li><a href="#"><i className="ri-facebook-fill"></i></a></li>
              <li><a href="#"><i className="ri-instagram-line"></i></a></li>
              <li><a href="#"><i className="ri-youtube-line"></i></a></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4>Quick Links</h4>
            <ul className="footer__links">
              <li><a href="#home">HOME</a></li>
              <li><a href="#about">ABOUT</a></li>
              <li><a href="#service">SERVICE</a></li>
              <li><a href="#cameras">CAMERAS</a></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4>Contact Us</h4>
            <ul className="footer__links">
              <li>
                <a href="#"><span><i className="ri-phone-fill"></i></span> +971 55 224 8602</a>
              </li>
              <li>
                <a href="#"><span><i className="ri-record-mail-line"></i></span> support@snapshot.com</a>
              </li>
              <li>
                <a href="#"><span><i className="ri-map-pin-2-fill"></i></span> RAK, UAE</a>
              </li>
            </ul>
          </div>

          <div className="footer__col">
            <h4>Subscribe</h4>
            <form onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Enter your email" />
              <button className="btn btn-enhanced" type="submit">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="footer__bar">
          Copyright © 2025 Wayeth Ken C. Cabanlit. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
