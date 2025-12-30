// store/api/productsApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "@/helpers/axiosinstance";

export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers) => {
            // Add auth tokens if needed
            return headers;
        },
    }),

    tagTypes: ["Products", "Product"],

    endpoints: (builder) => ({
        // ========================================================
        // GET FILTERED PRODUCTS
        // ========================================================
        getProducts: builder.query({
            query: (filters) => ({
                url: "/api/Productes/product-page-filter",
                method: "POST",
                body: filters,
            }),

            transformResponse: (response, meta, arg) => {
                let products = response?.data || [];

                // Sort for New Arrivals
                if (arg.category_name === "New Arrivals" || arg.category_name === "new-arrivals") {
                    products = [...products].sort(
                        (a, b) => new Date(b.created_at) - new Date(a.created_at)
                    );
                }

                return products;
            },

            providesTags: (result, error, arg) => [
                {
                    type: "Products",
                    id: `${arg.category_name || "all"}_${arg.subcategory_name || "all"}`
                },
            ],

            keepUnusedDataFor: 300,
        }),

        // ========================================================
        // GET SINGLE PRODUCT
        // ========================================================
        getProductByCanonicalURL: builder.query({
            query: (canonicalURL) => `/api/Productes/by-canonical/${canonicalURL}`,

            transformResponse: (response) => response?.data,

            providesTags: (result, error, canonicalURL) => [
                { type: "Product", id: canonicalURL },
            ],

            keepUnusedDataFor: 300,
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductByCanonicalURLQuery,
    useLazyGetProductsQuery,
    useLazyGetProductByCanonicalURLQuery,
} = productsApi;