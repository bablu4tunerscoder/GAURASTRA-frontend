"use client";
import { useState } from "react";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("/api/login", { email, password });

      if (res.data.success) {
        const user = res.data.user;
        const token = res.data.token;

        // ✅ Save user + token in sessionStorage
        sessionStorage.setItem(
          "auth",
          JSON.stringify({ user, token })
        );

        window.location.href = "/offline/billing";
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4">
      <form
        onSubmit={handleLogin}
        className="p-6 rounded-xl text-black shadow-xl w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        {error && (
          <p className="text-red-500 text-sm mb-2 text-center">{error}</p>
        )}

        <label className="block mb-2">Email</label>
        <input
          type="email"
          className="w-full p-2 border rounded-md mb-4"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="block mb-2">Password</label>
        <input
          type="password"
          className="w-full p-2 border rounded-md mb-4"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
