"use client";
import React ,{ useState , useEffect} from "react";
import axiosInstance from "@/Helper/axiosinstance";
import toast from "react-hot-toast";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const payload = { email, password };

    const { data } = await axiosInstance.post(
      `/api/offline/user/login`,
      payload
    );

    if (data) {

      sessionStorage.setItem("offline_user", JSON.stringify(data.data));
      sessionStorage.setItem("offline_access_token", data.token); 
      setTimeout(()=>{
        window.location.href = "/offline/dashboard";
      },0)
      
    }

  } catch (err) {
    toast.error(err.response?.data?.message || "Login failed");
    console.log("error", err);
  }

  setLoading(false);
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <form
        onSubmit={handleLogin}
        className="p-6 rounded-2xl bg-white shadow-2xl w-full max-w-sm border"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Login
        </h2>

        {/* EMAIL */}
        <div className="mb-4">
          <label className="block text-black text-sm mb-1 font-medium">Email</label>
          <div className="flex items-center border rounded-md px-3 gap-2 bg-gray-100">
            <HiOutlineMail className="text-xl text-gray-500" />
            <input
              type="email"
              className="w-full p-2 bg-transparent text-black outline-none"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        {/* PASSWORD */}
        <div className="mb-6">
          <label className="block text-black text-sm mb-1 font-medium">Password</label>
          <div className="flex items-center border rounded-md px-3 gap-2 bg-gray-100">
            <RiLockPasswordLine className="text-xl text-gray-500" />

            <input
              type={showPassword ? "text" : "password"}
              className="w-full p-2 text-black bg-transparent outline-none"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Toggle Icon */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-xl text-gray-600"
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-md text-white font-medium transition 
            ${loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"}
          `}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
