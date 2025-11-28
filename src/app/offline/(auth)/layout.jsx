"use client";
import useSessionAuth from "../hook/useSessionAuth";
import { useEffect } from "react";

export default function AuthLayout({ children }) {
  const { isAuthenticated, loading } = useSessionAuth();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      window.location.href = "/offline/dashboard";
    }
  }, [loading, isAuthenticated]);

  if (loading) return null; 

  return <>{children}</>;
}
