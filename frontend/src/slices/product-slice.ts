import { PRODUCTS_URL } from "../constants"
import { apiSlice } from "./api-slice"
import { ProductType} from "../components/types/products";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductType[],void>({
      query: () => ({
        url:PRODUCTS_URL
      }),
       keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query<ProductType, string | undefined>({
      query: (productId) => ({
          url:`${PRODUCTS_URL}/${productId}`
      }),
      keepUnusedDataFor: 5,
      })
  }),
})

export const { useGetProductsQuery, useGetProductDetailsQuery } = productsApiSlice