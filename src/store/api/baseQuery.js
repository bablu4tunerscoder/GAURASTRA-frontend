import { BASE_URL } from "@/helpers/axiosinstance";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useSelector } from "react-redux";

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,

    prepareHeaders: (headers) => {

        const token = localStorage.getItem("token"); // or sessionStorage / cookie

        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }

        return headers;
    },
});

export default baseQuery;
