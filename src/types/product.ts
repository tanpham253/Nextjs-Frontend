export type Product = {
  product_name: string;
  stock: number;
  slug: string;
  reviews?: number;
  model_year: number;
  price: number;
  discountedPrice: number;
  description?: string;
  category_id?: string;
  brand_id?: string;
  discount: number;
  thumbnail?: string;
  star_number?: number;
  _id: string;
  imgs?: {
    thumbnails: string[];
    previews: string[];
  };
};
