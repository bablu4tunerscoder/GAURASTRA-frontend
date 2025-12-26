import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedCategory: null,
    selectedSubcategory: null,
};

const productSidebarSlice = createSlice({
    name: "productSidebar",
    initialState,
    reducers: {
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
        setSelectedSubcategory: (state, action) => {
            state.selectedSubcategory = action.payload;
        },
        resetSidebarFilters: () => initialState,
    },
});

export const {
    setSelectedCategory,
    setSelectedSubcategory,
    resetSidebarFilters,
} = productSidebarSlice.actions;

export default productSidebarSlice.reducer;
