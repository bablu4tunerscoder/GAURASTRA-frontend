"use client";
import { useEffect, useState } from "react";

export default function useSessionAuth() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const storedUser = sessionStorage.getItem("offline_user");
      const storedToken = sessionStorage.getItem("offline_access_token");

      if (storedUser) setUser(JSON.parse(storedUser));
      if (storedToken) setToken(storedToken);

      setLoading(false);  
    }, 0);
  }, []);

  const logout = () => {
    sessionStorage.removeItem("offline_user");
    sessionStorage.removeItem("offline_access_token");
    setUser(null);
    setToken(null);
  };

  return {
    user,
    token,
    loading,
    isAuthenticated: !!user && !!token,
    logout,
  };
}
