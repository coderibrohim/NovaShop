import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CartContext from "../Context/CartContext";
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft } from "lucide-react";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useContext(CartContext);

  const totalPrice = cart.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  const totalItems = cart.reduce(
    (total, product) => total + product.quantity,
    0
  );
  

  if (cart.length === 0) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-7xl flex-col items-center justify-center px-4 text-center">
        <div className="mb-6 rounded-full bg-blue-50 p-7 text-blue-600">
          <ShoppingCart size={55} />
        </div>

        <h2 className="text-3xl font-bold text-gray-900">Your cart is empty</h2>

        <p className="mt-3 max-w-md text-gray-500">
          You haven't added any products to your cart yet. Explore our products
          and find something you like.
        </p>

        <Button asChild className="mt-7 bg-blue-600 hover:bg-blue-700">
          <Link to="/products">
            <ArrowLeft className="mr-2" size={18} />
            Continue Shopping
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>
        <p className="mt-2 text-gray-500">
          You have {totalItems} items in your cart
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {cart.map((product) => (
            <div
              key={product.id}
              className="flex flex-col gap-5 rounded-2xl border bg-white p-4 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center"
            >
              <div className="flex h-36 w-full shrink-0 items-center justify-center rounded-xl bg-gray-50 sm:h-32 sm:w-32">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-full w-full object-contain p-3"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div className="min-w-0">
                  <h2 className="line-clamp-2 font-semibold text-gray-900">
                    {product.title}
                  </h2>

                  <p className="mt-2 text-lg font-bold text-blue-600">
                    ${product.price}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                  <div className="flex items-center gap-3 rounded-xl border p-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(product.id, -1)}
                    >
                      <Minus size={15} />
                    </Button>

                    <span className="min-w-5 text-center font-semibold">
                      {product.quantity}
                    </span>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(product.id, 1)}
                    >
                      <Plus size={15} />
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:bg-red-50 hover:text-red-600"
                    onClick={() => removeFromCart(product.id)}
                  >
                    <Trash2 size={16} className="mr-2" />
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          ))}

          <Link
            to="/products"
            className="inline-flex items-center gap-2 pt-3 text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft size={16} />
            Continue Shopping
          </Link>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm lg:sticky lg:top-24">
          <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>

          <div className="mt-6 space-y-4">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal ({totalItems} items)</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span className="font-medium text-green-600">Free</span>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between text-lg font-bold text-gray-900">
                <span>Total</span>
                <span className="text-blue-600">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <Button className="mt-7 h-12 w-full bg-blue-600 text-base hover:bg-blue-700">
            Proceed to Checkout
          </Button>

          <p className="mt-4 text-center text-xs text-gray-400">
            Secure checkout experience
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
