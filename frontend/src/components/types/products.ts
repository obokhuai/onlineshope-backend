export interface ProductType {
  _id: string ;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
}

export interface ShippingAddress {
  address: string;
  city?: string;
  postalCode?: string;
  country?: string;
  // Add other fields if needed
}

