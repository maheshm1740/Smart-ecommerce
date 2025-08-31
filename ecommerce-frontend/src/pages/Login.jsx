import { Link, useNavigate } from "react-router-dom";
import SVGComponent from "../components/logSvg";
import { useState } from "react";
import { loginApi } from "../api/authApi";

export default function Login() {

  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");
  const [error, setError]=useState("");
  const navigate=useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await loginApi(email, password); // ⬅️ add await
    // check how backend returns token
    // if backend sends { token: "..." }
    localStorage.setItem("token", response.token);

    console.log("login success", response.token);
    navigate("/home");

    } catch (err) {
    console.error("Login failed:", err, error);
    setError("Invalid credentials! Please try again");
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center px-6 py-12 min-h-screen bg-gray-900">
        
        <div className="p-8 bg-gray-800 rounded-2xl shadow-lg sm:mx-auto sm:w-full sm:max-w-md">
          
          <div className="text-center">
            <SVGComponent className="object-contain mx-auto h-16" />
            
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white">
              Sign in to your account
            </h2>
          </div>

          <form onSubmit={handleLogin} method="POST" className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  onChange={(e)=>setEmail(e.target.value)}
                  className="block px-3 py-2 w-full text-base placeholder-gray-400 text-white bg-gray-700 rounded-md border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <a href="#" className="text-sm font-semibold text-indigo-400 hover:text-indigo-300">
                  Forgot password?
                </a>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  onChange={(e)=>setPassword(e.target.value)}
                  className="block px-3 py-2 w-full text-base placeholder-gray-400 text-white bg-gray-700 rounded-md border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex justify-center px-3 py-2 w-full text-sm font-semibold text-white bg-indigo-500 rounded-md hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-8 text-sm text-center text-gray-400">
            Your cart’s waiting..! {' '}
            <Link
              to="/signup"
              className="font-semibold text-indigo-400 hover:text-indigo-300"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
