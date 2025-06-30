import { PRODUCTS_URL } from "../constants"
import { apiSlice } from "./api-slice"

// NOTE: these are the _SAME_ API reference!
const productSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url:PRODUCTS_URL
      }),
       keepUnusedDataFor: 5,
    }),
  }),
  
})

export const { useGetProductsQuery, } = productSlice