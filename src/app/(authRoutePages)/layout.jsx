"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const Layout = ({ children }) => {
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated === false) {
      router.replace("/login"); // redirect
    }
  }, [isAuthenticated, router]);

  // Prevent flashing before redirect
  if (isAuthenticated === false) return null;

  return <>{children}</>;
};

export default Layout;
