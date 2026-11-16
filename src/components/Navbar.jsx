import { Link } from "react-router-dom";
import { useContext } from "react";
import CartContext from "../Context/CartContext";
import { ShoppingCart, Store } from "lucide-react";

function Navbar() {
  const { cart } = useContext(CartContext);

  const cartCount = cart.reduce(
    (total, product) => total + product.quantity,
    0
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="rounded-xl bg-blue-600 p-2 text-white">
            <Store size={22} />
          </div>
          <span className="text-2xl font-bold tracking-tight text-gray-900">
            Nova<span className="text-blue-600">Shop</span>
          </span>
        </Link>

        <div className="flex items-center gap-5 sm:gap-8">
          <Link
            to="/"
            className="text-sm font-medium text-gray-600 transition hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            to="/products"
            className="text-sm font-medium text-gray-600 transition hover:text-blue-600"
          >
            Products
          </Link>

          <Link
            to="/cart"
            className="relative flex items-center gap-2 rounded-xl bg-gray-100 px-4 py-2.5 text-sm font-semibold text-gray-800 transition hover:bg-blue-50 hover:text-blue-600"
          >
            <ShoppingCart size={19} />
            <span>Cart</span>

            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-xs font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
