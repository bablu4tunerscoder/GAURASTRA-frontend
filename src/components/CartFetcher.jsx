"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetCartQuery } from "@/store/api/cartApi";

/**
 * Component that automatically fetches cart data when user is logged in
 * Add this to your Providers or ProvidersContent component
 */
export default function CartFetcher() {
    const { user } = useSelector((state) => state.auth || {});

    // Only fetch cart if user is logged in
    const { data, isLoading, isError } = useGetCartQuery(undefined, {
        skip: !user, // Skip query if user is not logged in
        refetchOnMountOrArgChange: true,
    });

    useEffect(() => {
        if (isError) {
            console.error("Failed to fetch cart");
        }
    }, [isError]);

    // This component doesn't render anything
    return null;
}