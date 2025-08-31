import { Link } from "react-router-dom";
import SVGComponent from "../components/logSvg";

export default function Register() {
  return (
    <>
      <div className="flex flex-col justify-center min-h-screen px-6 py-12 bg-gray-900">
        
        <div className="p-8 bg-gray-800 shadow-lg sm:mx-auto sm:w-full sm:max-w-md rounded-2xl">
          
          <div className="text-center">
            <SVGComponent className="object-contain h-16 mx-auto" />
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white">
              Create your account
            </h2>
          </div>

          <form action="#" method="POST" className="mt-8 space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                Full Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className="block w-full px-3 py-2 text-base text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-md focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Email */}
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
                  className="block w-full px-3 py-2 text-base text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-md focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="new-password"
                  className="block w-full px-3 py-2 text-base text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-md focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  autoComplete="new-password"
                  className="block w-full px-3 py-2 text-base text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-md focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Register button */}
            <div>
              <button
                type="submit"
                className="flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-indigo-500 rounded-md hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Create account
              </button>
            </div>
          </form>

          <p className="mt-8 text-sm text-center text-gray-400">
            Already have an account?{' '}
            <Link
              to="/"
              className="font-semibold text-indigo-400 hover:text-indigo-300"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
