import { createSlice } from "@reduxjs/toolkit";
import { wishlistApi } from "../api/wishlistApi";

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        items: [],
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            /* GET */
            .addMatcher(
                wishlistApi.endpoints.getWishlistItems.matchPending,
                (state) => {
                    state.loading = true;
                }
            )
            .addMatcher(
                wishlistApi.endpoints.getWishlistItems.matchFulfilled,
                // console.log("getWishlistItems.fulfilled"),
                (state, action) => {
                    console.log(action);
                    state.loading = false;
                    state.items = action;
                }
            )
            .addMatcher(
                wishlistApi.endpoints.getWishlistItems.matchRejected,
                (state) => {
                    state.loading = false;
                }
            )

            /* ADD */
            .addMatcher(
                wishlistApi.endpoints.addWishlistItem.matchFulfilled,
                (state, action) => {
                    state.items.unshift(action.payload);
                }
            )

            /* DELETE */
            .addMatcher(
                wishlistApi.endpoints.deleteWishlistItem.matchFulfilled,
                (state, action) => {
                    state.items = state.items.filter(
                        (item) => item._id !== action.meta.arg
                    );
                }
            )

            /* CLEAR */
            .addMatcher(
                wishlistApi.endpoints.clearWishlist.matchFulfilled,
                (state) => {
                    state.items = [];
                }
            );
    },
});

export default wishlistSlice.reducer;
