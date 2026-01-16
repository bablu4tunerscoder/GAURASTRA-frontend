import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";

export const wishlistApi = createApi({
    reducerPath: "wishlistApi",
    baseQuery,
    tagTypes: ["Wishlist"],
    endpoints: (builder) => ({
        /* GET */
        getWishlistItems: builder.query({
            query: () => "api/wishlist/get",
            providesTags: ["Wishlist"],
        }),

        /* ADD */
        addWishlistItem: builder.mutation({
            query: ({ product_id, sku }) => ({
                url: "api/wishlist/add",
                method: "POST",
                body: {
                    product_id,
                    ...(sku && { sku }),
                },
            }),
            invalidatesTags: ["Wishlist"],
        }),

        /* DELETE */
        deleteWishlistItem: builder.mutation({
            query: (product_id) => ({
                url: "api/wishlist/remove",
                method: "POST",
                body: { product_id },
            }),
            invalidatesTags: ["Wishlist"],
        }),

        /* CLEAR */
        clearWishlist: builder.mutation({
            query: () => ({
                url: "api/wishlist/clear",
                method: "POST",
            }),
            invalidatesTags: ["Wishlist"],
        }),
    }),
});

export const {
    useGetWishlistItemsQuery,
    useAddWishlistItemMutation,
    useDeleteWishlistItemMutation,
    useClearWishlistMutation,
} = wishlistApi;
