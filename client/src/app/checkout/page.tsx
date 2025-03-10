'use client';

import { useState } from 'react';
import { useCart } from '../context/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CheckoutForm() {
  const { cart, clearCart } = useCart();
  const router=useRouter();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxes = subtotal * 0.18;
  const total = subtotal + taxes;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    company: '',
    postalCode: '',
    city: '',
    country: 'India',
    state: '',
    email: '',
    phone: '',
    billingSameAsShipping: true,
  });

  const handleChange = (e:any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    router.push('/order');
    clearCart();
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg grid grid-cols-12 gap-6">
      {/* Shipping Address Form */}
      <div className="col-span-8">
        <h2 className="text-2xl font-semibold mb-4">Shipping Address</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input type="text" name="firstName" placeholder="First name*" required onChange={handleChange} className="p-2 border rounded" />
          <input type="text" name="lastName" placeholder="Last name*" required onChange={handleChange} className="p-2 border rounded" />
          <input type="text" name="address" placeholder="Address*" required onChange={handleChange} className="p-2 border rounded col-span-2" />
          <input type="text" name="company" placeholder="Company" onChange={handleChange} className="p-2 border rounded" />
          <input type="text" name="postalCode" placeholder="Postal code*" required onChange={handleChange} className="p-2 border rounded" />
          <input type="text" name="city" placeholder="City*" required onChange={handleChange} className="p-2 border rounded" />
          <select name="country" onChange={handleChange} value={formData.country} className="p-2 border rounded">
            <option value="India">India</option>
          </select>
          <input type="text" name="state" placeholder="State / Province" onChange={handleChange} className="p-2 border rounded" />
          <label className="col-span-2 flex items-center space-x-2">
            <input type="checkbox" name="billingSameAsShipping" checked={formData.billingSameAsShipping} onChange={handleChange} className="w-4 h-4" />
            <span>Billing address same as shipping address</span>
          </label>
          <input type="email" name="email" placeholder="Email*" required onChange={handleChange} className="p-2 border rounded col-span-2" />
          <input type="text" name="phone" placeholder="Phone" onChange={handleChange} className="p-2 border rounded col-span-2" />
          <button type="submit" className="bg-black text-white p-2 rounded col-span-2">Continue to delivery</button>
        </form>
      </div>

      {/* Cart Summary */}
      <div className="col-span-4 bg-gray-100 p-4 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">In your Cart</h2>
        <div className="border-b pb-2 mb-2">
          <p className="flex justify-between"><span>Subtotal</span> <span>₹{subtotal?.toFixed(2)}</span></p>
          <p className="flex justify-between"><span>Shipping</span> <span>₹0.00</span></p>
          <p className="flex justify-between"><span>Taxes</span> <span>₹{taxes?.toFixed(2)}</span></p>
        </div>
        <p className="flex justify-between font-bold text-lg"><span>Total</span> <span>₹{total?.toFixed(2)}</span></p>
        {cart.map((item:any, index:number) => (
          <div key={index} className="flex items-center gap-4 mt-4">
            <img src={item.image} alt={item.name} className="w-16 h-16" />
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-600">Variant: {item.variant}</p>
              <p className="font-bold">{item.quantity}x ₹{item?.price?.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}