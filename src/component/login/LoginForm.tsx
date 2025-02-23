"use client"
import Image from "next/image";
import { useState } from "react";
import Logo from '../../assets/logo.png';
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";


export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // For handling loading state
  const [error, setError] = useState<string | null>(null); // For displaying error message

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Clear any previous errors

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/admin-login`, {
        email,
        password,
      });

      if (response.data.success) {
        console.log("response.data.success", response.data);
      
        // Save token and user data in localStorage
        localStorage.setItem("token", response.data.data.token); 
        localStorage.setItem("user", JSON.stringify(response.data.data.user)); 
        router.replace("/product-management"); 

        if (response.data.data.token) {
          Cookies.set('token', response.data.data.token, { expires: 7 });
        }

        // setTimeout(()=>{
        //   router.push("/"); 

        // }, 3000)
      } else {
        setError("Login failed. Please check your credentials.");
      }
      
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      // setError("An error occurred. Please try again.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="flex justify-center mb-6">
          <Image src={Logo} alt="Company Logo" width={100} height={100} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            disabled={loading} // Disable button while loading
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}

        <button
          className="my-2 text-blue-500 font-semibold"
          onClick={() => router.push("/register")}
        >
          Register
        </button>
      </div>
    </div>
  );
}
