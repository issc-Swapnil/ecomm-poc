"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';



const ProductCard = ({ product }: { product: any }) => {
  return (
    <Link href={`/product/${product.id}`} className="hover:underline"  key={product.id}>
          <div
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition bg-white relative"
          >
            {/* Product Image */}
            <div className="w-full h-70 flex items-center justify-center">
              <Image
                src={product.image}
                alt={product.title}
                width={150}
                height={150}
                className="object-contain"
              />
            </div>

            {/* Product Details */}
            <p className="text-xs text-gray-500 mt-2">{product.category}</p>
            <h3 className="text-sm font-semibold line-clamp-2">{product.title}</h3>

            {/* Price & Rating */}
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">₹ {product.price}</span>
                <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
              </div>
            </div>
          </div>
          </Link>

  );
};

export default ProductCard;
