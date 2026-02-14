import React from "react";
import ShopDetails from "@/components/ShopDetails";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Optional: pre-generate static paths (ISR)
// export async function generateStaticParams() {
//   const res = await fetch(`${apiUrl}/api/v1/products`);
//   const data = await res.json();

// console.log("products:", data);

//   return data?.data?.map((product: any) => ({
//     id: product._id,
//   })) || [];
// }

// Fetch one product by id
async function getProduct(id: string) {
  const res = await fetch(`${apiUrl}/api/v1/products/${id}`, {
    next: { revalidate: 60 }, // ISR cache 1 minute
  });

  if (!res.ok) return null;

  const json = await res.json();
  console.log("Fetched product detail:", json.data);
  return json.data;
}

const ShopDetailPage = async ({ params }: { params: { id: string } }) => {
  const product = await getProduct(params.id);

  if (!product) {
    return (
      <div className="text-center py-10 text-red-500">
        Product not found.
      </div>
    );
  }

  return <ShopDetails product={product} />;
};

export default ShopDetailPage;
