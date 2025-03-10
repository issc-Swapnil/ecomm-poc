"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, updateQuantity, deleteItem } = useCart();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxes = subtotal * 0.18;
  const total = subtotal + taxes;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg flex gap-8">
      <div className="w-2/3 md:w-8/12">
        <h2 className="text-2xl font-semibold mb-4">Cart</h2>
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <h2 className="text-2xl font-semibold">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven’t added anything to your cart yet.</p>
          <Link href="/">
            <button>
              Continue Shopping
            </button>
          </Link>
        </div>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b pb-4 mb-4">
              <div className="flex items-center gap-4">
                <img src={item.image} alt={item.title} className="w-16 h-16 object-cover" />
                <div>
                  <h3 className="font-medium">{item.title}</h3>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={() => updateQuantity(item.id, -1)} className="px-2 py-1 bg-gray-200 rounded">-</button>
                <span className="px-4 py-1 border">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)} className="px-2 py-1 bg-gray-200 rounded">+</button>
              </div>
              <p className="font-semibold">₹{(item.price * item.quantity).toLocaleString()}</p>
              <button onClick={() => deleteItem(item.id)} className="ml-4 px-2 py-1 bg-red-500 text-white rounded">X</button>
            </div>
          ))
        )}
      </div>

      <div className="w-1/3 md:w-4/12 p-6 bg-gray-100 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Summary</h3>
        <div className="flex justify-between"><p>Subtotal</p><p>₹{subtotal.toLocaleString()}</p></div>
        <div className="flex justify-between"><p>Taxes</p><p>₹{taxes.toLocaleString()}</p></div>
        <div className="flex justify-between font-bold text-lg mt-2"><p>Total</p><p>₹{total.toLocaleString()}</p></div>
        <Link href={`/checkout`} className="hover:underline"><button className="w-full mt-4 bg-black text-white py-2 rounded hover:bg-gray-800">Go to Checkout</button></Link>
      </div>
    </div>
  );
};

export default Cart;
