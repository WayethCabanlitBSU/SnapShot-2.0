export default function Navbar() {
  return (
    <nav className="w-full py-5 px-8 flex justify-between items-center shadow-sm bg-white sticky top-0 z-50">
      <h1 className="text-2xl font-bold text-gray-900">SnapShot 📸</h1>
      <div className="flex items-center gap-6 text-gray-700 font-medium">
        <a href="#" className="hover:text-black">Home</a>
        <a href="#" className="hover:text-black">Products</a>
        <a href="#" className="hover:text-black">Cart</a>
      </div>
    </nav>
  );
}
