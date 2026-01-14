import { createSlice } from "@reduxjs/toolkit"
import { createApi } from "@reduxjs/toolkit/query/react"
import baseQuery from "../api/baseQuery"
/* ============================
   RTK QUERY (API)
============================ */
export const sidebarApi = createApi({
    reducerPath: "sidebarApi",
    baseQuery,
    endpoints: (builder) => ({
        getSidebarItems: builder.query({
            query: () => "/api/Productes/product-page-sidebar",
        }),
    }),
})

export const { useGetSidebarItemsQuery } = sidebarApi

/* ============================
   SLICE (UI STATE)
============================ */
const sidebarSlice = createSlice({
    name: "sidebar",
    initialState: {
        isOpen: true,
        activeItem: null,
    },
    reducers: {
        toggleSidebar: (state) => {
            state.isOpen = !state.isOpen
        },
        openSidebar: (state) => {
            state.isOpen = true
        },
        closeSidebar: (state) => {
            state.isOpen = false
        },
        setActiveItem: (state, action) => {
            state.activeItem = action.payload
        },
    },
})

export const {
    toggleSidebar,
    openSidebar,
    closeSidebar,
    setActiveItem,
} = sidebarSlice.actions

export default sidebarSlice.reducer
