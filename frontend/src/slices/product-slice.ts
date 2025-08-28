import { PRODUCTS_URL } from "../constants"
import { apiSlice } from "./api-slice"
import { ProductType } from "../components/types/products";
interface GetProductsParams {
  keyword?: string;
  pageNumber?: string;
}

interface ProductsResponse {
  products: ProductType[];
  page: number;
  pages: number;
  keyword: string;
  pageNumber: string;
}


export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // getProducts: builder.query<ProductType[],void>({
    //   query: ({ keyword, pageNumber }) => ({
    //     url: PRODUCTS_URL,
    //      params: { keyword, pageNumber },
    //   }),
    //   keepUnusedDataFor: 5,
    //     providesTags: ['Product'],
    // }),
getProducts: builder.query<ProductsResponse, { keyword?: string; pageNumber?: string } | void>({
  query: (params) => {
    const { keyword, pageNumber } = params || {};
    return {
      url: PRODUCTS_URL,
      params: { keyword, pageNumber },
    };
  },
  keepUnusedDataFor: 5,
  providesTags: ['Product'],
}),

    
    getProductDetails: builder.query<ProductType, string | undefined>({
      query: (productId) => ({
          url:`${PRODUCTS_URL}/${productId}`
      }),
      keepUnusedDataFor: 5,
    }),
     createProduct: builder.mutation({
      query: () => ({
        url: `${PRODUCTS_URL}`,
        method: 'POST',
      }),
      invalidatesTags: ['Product'],
     })
     ,
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Product'],
    })
    ,
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `/api/upload`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: 'DELETE',
      }),
      //providesTags: ['Product'],
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}/reviews`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Product'],
    }),
    getTopProducts: builder.query({
      query: () => `${PRODUCTS_URL}/top`,
      keepUnusedDataFor: 5,
    }),
  }),
})

export const { useGetProductsQuery, useGetProductDetailsQuery,
  useCreateProductMutation,useUpdateProductMutation,useUploadProductImageMutation,  useDeleteProductMutation,useCreateReviewMutation, useGetTopProductsQuery} = productsApiSlice