export type User = {
  _id: string;
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
  city: string;
  zip_code: string;
  fullName: string;
  email: string;
  image: string;
  accessToken?: string;
  refreshToken?: string;
  createdAt?: string;
};
