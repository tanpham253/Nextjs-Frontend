"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

// send billing data to parent component using props
interface BillingProps {
  onChange: (billingData: any) => void;
}

const Billing = ({ onChange }: BillingProps) => {
  const { data: session } = useSession();
  const user = session?.user as any;

  const [billing, setBilling] = useState({
    first_name: "",
    last_name: "",
    address: "",
    city: "",
    zipCode: "",
    phone: "",
    email: "",
    note: "",
  });

  // Prefill if signed in
  useEffect(() => {

    if (user) {
      setBilling({
        first_name:  user.first_name,
        last_name: user.last_name,
        address: user.address,
        city: user.city,
        zipCode: user.zip_code,
        phone: user.phone,
        email: user.email,
        note: user.note,
      });
    }
  }, [user]);

  useEffect(() => {
    onChange(billing);
  }, [billing, onChange]);

  console.log("Billing billing state:", billing.zipCode);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setBilling((prev) => ({ ...prev, [name]: value }));
  };

  console.log("Billing user:", user || null);

  return (
    <div className="mt-9">
      <h2 className="font-medium text-dark text-xl sm:text-2xl mb-5.5">
        Billing details
      </h2>

      <div className="bg-white shadow-1 rounded-[10px] p-4 sm:p-8.5">
        <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 mb-5">
          <div className="w-full">
            <label htmlFor="firstName" className="block mb-2.5">
              First Name <span className="text-red">*</span>
            </label>
            <input
              type="text"
              name="first_name"
              value={billing.first_name}
              onChange={handleChange}
              required
              placeholder=""
              className="rounded-md border border-gray-3 bg-gray-1 w-full py-2.5 px-5 outline-none focus:shadow-input focus:ring-2 focus:ring-blue/20"
            />
          </div>

          <div className="w-full">
            <label htmlFor="lastName" className="block mb-2.5">
              Last Name <span className="text-red">*</span>
            </label>
            <input
              type="text"
              name="last_name"
              value={billing.last_name}
              onChange={handleChange}
              required
              placeholder=""
              className="rounded-md border border-gray-3 bg-gray-1 w-full py-2.5 px-5 outline-none focus:shadow-input focus:ring-2 focus:ring-blue/20"
            />
          </div>
        </div>

        {/* Address 1 */}
        <div className="mb-5">
          <label htmlFor="address" className="block mb-2.5">
            Street Address <span className="text-red">*</span>
          </label>
          <input
            type="text"
            name="address"
            value={billing.address}
            onChange={handleChange}
            required
            placeholder=""
            className="rounded-md border border-gray-3 bg-gray-1 w-full py-2.5 px-5 outline-none focus:shadow-input focus:ring-2 focus:ring-blue/20"
          />
        </div>

        {/* Address 2 (always visible) */}

        <div className="mb-5">
          <label htmlFor="city" className="block mb-2.5">
            Town/City <span className="text-red">*</span>
          </label>
          <input
            type="text"
            name="city"
            value={billing.city}
            onChange={handleChange}
            required
            className="rounded-md border border-gray-3 bg-gray-1 w-full py-2.5 px-5 outline-none focus:shadow-input focus:ring-2 focus:ring-blue/20"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="zipCode" className="block mb-2.5">
            Zip Code
          </label>
          <input
            type="text"
            name="zipCode"
            value={billing.zipCode}
            onChange={handleChange}
            required
            className="rounded-md border border-gray-3 bg-gray-1 w-full py-2.5 px-5 outline-none focus:shadow-input focus:ring-2 focus:ring-blue/20"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="phone" className="block mb-2.5">
            Phone <span className="text-red">*</span>
          </label>
          <input
            type="text"
            name="phone"
            value={billing.phone}
            onChange={handleChange}
            required
            className="rounded-md border border-gray-3 bg-gray-1 w-full py-2.5 px-5 outline-none focus:shadow-input focus:ring-2 focus:ring-blue/20"
          />
        </div>

        <div className="mb-5.5">
          <label htmlFor="email" className="block mb-2.5">
            Email Address <span className="text-red">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={billing.email}
            onChange={handleChange}
            required
            className="rounded-md border border-gray-3 bg-gray-1 w-full py-2.5 px-5 outline-none focus:shadow-input focus:ring-2 focus:ring-blue/20"
          />
        </div>
      </div>
    </div>
  );
};

export default Billing;
