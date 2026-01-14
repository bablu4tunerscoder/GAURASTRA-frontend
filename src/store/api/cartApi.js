import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";

export const cartApi = createApi({
    reducerPath: "cartApi",
    baseQuery,
    tagTypes: ["Cart"],
    endpoints: (builder) => ({
        getCart: builder.query({
            query: () => "/api/cart/get-cart",
            providesTags: ["Cart"],
        }),

        addToCart: builder.mutation({
            query: (data) => ({
                url: "/api/cart/add-cart",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Cart"],
        }),

        increaseCart: builder.mutation({
            query: (data) => ({
                url: "/api/cart/increase-cart",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Cart"],
        }),

        decreaseCart: builder.mutation({
            query: (data) => ({
                url: "/api/cart/decrease-cart",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Cart"],
        }),
    }),
});

export const {
    useGetCartQuery,
    useAddToCartMutation,
    useIncreaseCartMutation,
    useDecreaseCartMutation,
} = cartApi;
