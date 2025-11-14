import { createSlice } from "@reduxjs/toolkit";
 
const initialState = {
  category_id: "", // Stores category ID (not name)
  Subcategory_id: "", // Stores subcategory ID
  min_price: null,
  max_price: null,
  sort: "",
  search: "",
  on_sale: false,
  selectedColors: [], // New state for selected colors
  selectedSizes: [], // New state for selected sizes
};
 
const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category_id = action.payload; // Ensure this is the category ID
    },
    setSubcategory: (state, action) => {
      state.Subcategory_id = action.payload; // Ensure this is the subcategory ID
    },
    setPriceRange: (state, action) => {
      state.min_price = action.payload.min;
      state.max_price = action.payload.max;
    },
    setSortOption: (state, action) => {
      state.sort = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.search = action.payload;
    },
    toggleOnSale: (state) => {
      state.on_sale = !state.on_sale;
    },
    setSelectedColors: (state, action) => {
      const color = action.payload;
      if (state.selectedColors.includes(color)) {
        state.selectedColors = state.selectedColors.filter((c) => c !== color);
      } else {
        state.selectedColors.push(color);
      }
    },
    setSelectedSizes: (state, action) => {
      const size = action.payload;
      if (state.selectedSizes.includes(size)) {
        state.selectedSizes = state.selectedSizes.filter((s) => s !== size);
      } else {
        state.selectedSizes.push(size);
      }
    },
    clearFilters: () => initialState,
  },
});
 
export const {
  setCategory,
  setSubcategory,
  setPriceRange,
  setSortOption,
  setSearchQuery,
  toggleOnSale,
  setSelectedColors,
  setSelectedSizes,
  clearFilters,
} = filterSlice.actions;
 
export default filterSlice.reducer;
 
 