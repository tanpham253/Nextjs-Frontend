import React from "react";
import ShopDetails from "@/components/ShopDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Details Page | NextCommerce Nextjs E-commerce template",
  description: "This is Shop Details Page for NextCommerce Template",
  // other metadata
};

const ShopDetailsPage = () => {
  return (
    <main>
      <ShopDetails product={{
        product_name: "",
        stock: 0,
        slug: "",
        reviews: 0,
        model_year: 0,
        price: 0,
        discountedPrice: 0,
        description: "",
        category_id: "",
        brand_id: "",
        discount: 0,
        _id: "",
        imgs: {
          thumbnails: [],
          previews: []
        }
      }} />
    </main>
  );
};

export default ShopDetailsPage;
