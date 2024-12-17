
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUser, FaLock } from "react-icons/fa";
import { useAuth } from "../Auth/useAuth";
import {Helmet} from "react-helmet"; 
export default function Login() {
  const [valuedata, setvaluedata] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [isClient, setIsClient] = useState(false);
  const Router = useRouter();
 
  useAuth();
  useEffect(() => {
    setIsClient(true); // Ensure client-side rendering
  }, []);

  useEffect(() => {
    if (isClient) {
      const authToken = localStorage.getItem("authToken"); 
      if (authToken) {
        toast.info("Already logged in. Redirecting...");
        Router.push("/"); // Redirect authenticated users
      }
    }
  }, [isClient, Router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {
      username: valuedata.username.trim() ? "" : "Username is required.",
      password: valuedata.password.trim() ? "" : "Password is required.",
    };
    setErrors(newErrors);

    if (newErrors.username || newErrors.password) {
      toast.error("Please fill all required fields.");
      return;
    }

    await fetchData();
  };

  const fetchData = async () => {
    try {
      const response = await fetch("https://dir.mripub.com/api/signin.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: valuedata.username,
          password: valuedata.password,
        }),
      });

      if (!response.ok) throw new Error("Invalid credentials");

      const result = await response.json();

      if (result.message === "Admin login successful") {
        localStorage.setItem("authToken", result.token);
        localStorage.setItem("role", "admin");
        toast.success("Admin login successful");
        Router.push("/Admin");
      } else if (result.message === "User login successful") {
        localStorage.setItem("authToken", result.token);
        localStorage.setItem("role", "user");
        toast.success("Login successful! Redirecting...");
        Router.push(result.success ? "/" : "/register");
      } else {
        toast.error(result.message || "Invalid username or password.");
      }
    } catch (error) {
      toast.error(error.message || "Error during login.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setvaluedata({ ...valuedata, [name]: value });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value.trim() ? "" : `${name} is required.`,
    }));
  };

  return (
    <>
      <ToastContainer />
      <Helmet>
                <meta charSet="utf-8" />
                <title>Login</title>
              
            </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 bg-[url('/bg-10.png')] bg-no-repeat bg-cover bg-center">
        <div className="relative w-full max-w-md bg-white shadow-2xl rounded-3xl overflow-hidden p-8">
          <div className="flex justify-center">
            <img
              src="./Pharmanetlogo.png"
              alt="Logo"
              width={128}
              height={128}
              className="w-32 object-contain"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Login Now
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6 relative">
              <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">
                Username
              </label>
              <div className="absolute left-3 top-12 text-gray-500">
                <FaUser />
              </div>
              <input
                onChange={handleChange}
                type="text"
                name="username"
                id="username"
                className="w-full p-4 pl-10 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your username"
                value={valuedata.username}
              />
              {errors.username && <span className="text-red-500 text-sm mt-1">{errors.username}</span>}
            </div>

            <div className="mb-6 relative">
              <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                Password
              </label>
              <div className="absolute left-3 top-12 text-gray-500">
                <FaLock />
              </div>
              <input
                onChange={handleChange}
                type="password"
                name="password"
                id="password"
                className="w-full p-4 pl-10 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your password"
                value={valuedata.password}
              />
              {errors.password && <span className="text-red-500 text-sm mt-1">{errors.password}</span>}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-teal-700 text-white font-bold rounded-lg shadow-xl hover:bg-teal-700 transition-transform transform hover:scale-105"
            >
              Log In
            </button>
          </form>

          <p className="cursor-pointer text-sm text-center text-gray-500 mt-6">
            Don’t have an account?{" "}
            <a
              onClick={() => Router.push("/register")}
              className="text-teal-600 hover:underline"
            >
              Register Now
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
