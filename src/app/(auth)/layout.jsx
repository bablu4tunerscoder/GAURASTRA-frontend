"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";





export default function AuthLayout({ children }) {

  const router = useRouter();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  
    useEffect(() => {
      if (isAuthenticated === true) {
        router.replace("/"); 
      }
    }, [isAuthenticated, router]);
  
    
    if (isAuthenticated === true) return null;
  
    return <>{children}</>;
 
  
}
