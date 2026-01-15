import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";


export const wishlistApi = createApi({
    reducerPath: "wishlistApi",
    baseQuery,
    tagTypes: ["Wishlist"],
    endpoints: (builder) => ({

        /* GET (POST) */
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
        }),

        /* DELETE */
        deleteWishlistItem: builder.mutation({
            query: (wishlist_id) => ({
                url: "api/wishlist/delete",
                method: "POST",
                body: { wishlist_id },
            }),
        }),

        /* CLEAR */
        clearWishlist: builder.mutation({
            query: () => ({
                url: "api/wishlist/clear",
                method: "POST",
            }),
        }),
    }),
});

export const {
    useGetWishlistItemsQuery,
    useAddWishlistItemMutation,
    useDeleteWishlistItemMutation,
    useClearWishlistMutation,
} = wishlistApi;
