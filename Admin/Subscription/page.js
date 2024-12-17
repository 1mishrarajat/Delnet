

"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Sidebar";
import Header from "../Header";
import {Helmet} from "react-helmet";
export default function Subscription() {
  const [data, setData] = useState([]);
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
    } else {
      setError("No token found. Please log in.");
    }
  }, []);

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://dir.mripub.com/api/activeusers.php",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch data. Please try again.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-lg font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-lg font-semibold text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <>
     
     <Helmet>
                <meta charSet="utf-8" />
                <title>Admin/Subscriptions</title>

            </Helmet>
 
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 text-gray-800">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 overflow-auto p-4 sm:p-6 md:p-8">
          <div className="max-w-full mx-auto bg-white shadow-xl rounded-lg p-6 sm:p-8 md:p-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-6 md:mb-8">
              Subscription Data
            </h2>


            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm text-left border-collapse border border-gray-300">
                <thead className="bg-gray-700 text-white text-sm sm:text-md font-semibold">
                  <tr>
                    <th className="px-2 py-2 sm:px-4 sm:py-3 border">S.No.</th>
                    <th className="px-2 py-2 sm:px-4 sm:py-3 border">First Name</th>
                    <th className="px-2 py-2 sm:px-4 sm:py-3 border">Last Name</th>
                    <th className="px-2 py-2 sm:px-4 sm:py-3 border">Email</th>
                    <th className="px-2 py-2 sm:px-4 sm:py-3 border">Phone</th>
                    <th className="px-2 py-2 sm:px-4 sm:py-3 border">Country</th>
                    <th className="px-2 py-2 sm:px-4 sm:py-3 border">Address</th>
                    <th className="px-2 py-2 sm:px-4 sm:py-3 border">City</th>
                    <th className="px-2 py-2 sm:px-4 sm:py-3 border">State</th>
                    <th className="px-2 py-2 sm:px-4 sm:py-3 border">Institute</th>
                    <th className="px-2 py-2 sm:px-4 sm:py-3 border">IP Address</th>
                    <th className="px-2 py-2 sm:px-4 sm:py-3 border">Pin</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 ? (
                    data.map((item, index) => (
                      <tr
                        key={item.id}
                        className="bg-white hover:bg-gray-100 transition-colors duration-200 border-t"
                      >
                        <td className="px-2 sm:px-4 py-2 border">{index + 1}</td>
                        <td className="px-2 sm:px-4 py-2 border">{item.first_name}</td>
                        <td className="px-2 sm:px-4 py-2 border">{item.last_name}</td>
                        <td className="px-2 sm:px-4 py-2 border">{item.username}</td>
                        <td className="px-2 sm:px-4 py-2 border">{item.phone}</td>
                        <td className="px-2 sm:px-4 py-2 border">{item.country}</td>
                        <td className="px-2 sm:px-4 py-2 border">{item.address}</td>
                        <td className="px-2 sm:px-4 py-2 border">{item.city}</td>
                        <td className="px-2 sm:px-4 py-2 border">{item.state}</td>
                        <td className="px-2 sm:px-4 py-2 border">{item.institute}</td>
                        <td className="px-2 sm:px-4 py-2 border">{item.ip_address}</td>
                        <td className="px-2 sm:px-4 py-2 border">{item.pin}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="12"
                        className="px-4 py-4 text-center text-gray-500"
                      >
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
