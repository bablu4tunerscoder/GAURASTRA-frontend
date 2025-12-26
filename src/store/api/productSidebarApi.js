import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productSidebarApi = createApi({
    reducerPath: "productSidebarApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "",
        credentials: "include",
    }),
    tagTypes: ["ProductSidebar"],
    endpoints: (builder) => ({
        getProductSidebar: builder.query({
            query: () => ({
                url: "/api/Productes/product-page-sidebar",
                method: "GET",
            }),
            providesTags: ["ProductSidebar"],
        }),
    }),
});

export const {
    useGetProductSidebarQuery,
} = productSidebarApi;
