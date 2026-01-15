import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "@/helpers/axiosinstance";

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,

    prepareHeaders: (headers, { getState }) => {
        const token = getState()?.auth?.token;

        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }

        return headers;
    },
});

export default baseQuery;
