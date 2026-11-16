import { createContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
 const [cart, setCart] = useState(() => {
   const savedCart = localStorage.getItem("cart");
   return savedCart ? JSON.parse(savedCart) : [];
   
 });
 const removeFromCart = (productId) => {
   setCart(cart.filter((item) => item.id !== productId));
 };
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
    
  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };
 const updateQuantity = (productId, change) => {
   const product = cart.find((item) => item.id === productId);

   if (product.quantity + change === 0) {
     setCart(cart.filter((item) => item.id !== productId));
   } else {
     setCart(
       cart.map((item) =>
         item.id === productId
           ? { ...item, quantity: item.quantity + change }
           : item
       )
     );
   }
 };

  return (
    <CartContext.Provider
      value={{ cart, setCart, addToCart, updateQuantity, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
