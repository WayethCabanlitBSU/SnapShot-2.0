// client/src/components/CartDrawer.jsx
import { useState } from "react";

export default function CartDrawer({
  cart,
  closeCart,
  removeFromCart,
  clearCart,
  onOrderComplete,
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // total including quantity
  const total = cart
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!cart.length) {
      setMessage("Your cart is empty.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        items: cart.map((item) => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        total: Number(total),
        name: form.name,
        email: form.email,
        address: form.address,
        phone: form.phone,
      };

      const res = await fetch("http://localhost:5050/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(await res.text());

      setMessage("✅ Order placed successfully!");
      setForm({ name: "", email: "", address: "", phone: "" });

      if (onOrderComplete) onOrderComplete();
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed top-0 right-0 w-full sm:w-96 h-full bg-white shadow-2xl p-6 z-50">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Your Cart</h2>
        <button onClick={closeCart} className="text-gray-500 hover:text-black text-xl">
          ✕
        </button>
      </div>

      {/* Clear Cart Button */}
      {cart.length > 0 && (
        <button
          onClick={clearCart}
          className="text-red-600 text-sm mb-2 underline hover:text-red-800"
        >
          Clear Cart
        </button>
      )}

      {/* Cart Items */}
      <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto pr-2 mb-4">
        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="border rounded-xl p-3 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">
                  {item.name}
                  {item.quantity > 1 && (
                    <span className="text-gray-500 ml-1">× {item.quantity}</span>
                  )}
                </p>
                <p className="text-sm text-gray-500">${item.price}</p>
              </div>

              <button
                onClick={() => removeFromCart(item)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      {/* Total */}
      <div className="mb-4">
        <p className="font-semibold text-lg">
          Total: <span className="text-gray-900">${total}</span>
        </p>
      </div>

      {/* Checkout Form */}
      <form onSubmit={handleSubmit} className="space-y-3 mt-8">
        <h3 className="font-semibold text-lg mb-1">Checkout Details</h3>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full bg-gray-100 border border-gray-300 rounded-lg p-2 text-sm"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full bg-gray-100 border border-gray-300 rounded-lg p-2 text-sm"
        />

        <textarea
          name="address"
          placeholder="Delivery Address"
          value={form.address}
          onChange={handleChange}
          required
          className="w-full bg-gray-100 border border-gray-300 rounded-lg p-2 text-sm h-20"
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
          className="w-full bg-gray-100 border border-gray-300 rounded-lg p-2 text-sm"
        />

        <button
          type="submit"
          disabled={loading || cart.length === 0}
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </form>

      {message && <p className="mt-3 text-sm text-gray-700">{message}</p>}
    </div>
  );
}
