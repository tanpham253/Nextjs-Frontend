"use client";
import React from "react";
import Image from "next/image";
import { useAppSelector } from "@/redux/store";
import { selectCartItems, selectTotalPrice } from "@/redux/features/cart-slice";

const OrderList = () => {
  const items = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectTotalPrice);

  return (
    <div className="bg-white shadow-1 rounded-[10px]">
      {/* Header */}
      <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
        <h3 className="font-medium text-xl text-dark">Your Order</h3>
      </div>

      {/* Body */}
      <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5">
        {/* Table header */}
        <div className="flex items-center justify-between py-5 border-b border-gray-3">
          <h4 className="font-medium text-dark">Product</h4>
          <h4 className="font-medium text-dark text-right">Subtotal</h4>
        </div>

        {/* Items */}
        {items.length > 0 ? (
          items.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between py-5 border-b border-gray-3"
            >
              <div className="flex items-center gap-3">
                {/* {item.imgs?.thumbnails?.[0] && (
                  <div className="w-12 h-12 relative rounded overflow-hidden">
                    <Image
                      src={
                        item.imgs.thumbnails[0].startsWith("/")
                          ? item.imgs.thumbnails[0]
                          : `/${item.imgs.thumbnails[0]}`
                      }
                      alt={item.product_name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )} */}
                <p className="text-dark text-sm leading-snug">
                  {item.product_name} × {item.quantity}
                </p>
              </div>
              <p className="text-dark text-right text-sm">
                ${(item.discountedPrice * item.quantity).toFixed(2)}
              </p>
            </div>
          ))
        ) : (
          <div className="py-6 text-center text-dark-5">
            Your cart is empty.
          </div>
        )}

        {/* Shipping Fee
        <div className="flex items-center justify-between py-5 border-b border-gray-3">
          <p className="text-dark">Shipping Fee</p>
          <p className="text-dark text-right">${shippingFee.toFixed(2)}</p>
        </div> */}

        {/* Total */}
        <div className="flex items-center justify-between pt-5">
          <p className="font-medium text-lg text-dark">Total</p>
          <p className="font-medium text-lg text-dark text-right">
            ${totalPrice.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
