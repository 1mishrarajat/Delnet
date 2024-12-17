
"use client";
import React, { useEffect, useState } from "react";
import { useRouter} from "next/navigation";
import { Helmet } from "react-helmet";

export default function Page() {
  const Router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const itemsPerPage = 10;
  const [filteredData, setFilteredData] = useState([]);
  const [token, setToken] = useState(null); // Store token in state

  // Redirect to login if no token is available
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      Router.push("/Login");
    } else {
      setToken(token);
    }
  }, [Router]);

  // Fetch data when token is available
  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]); // Refetch data when token changes

  const fetchData = async (page) => {
    if (!token) {
      console.error("No token found, please log in.");
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(
        `https://dir.mripub.com/api/pharmacy.php?page=${page}`, // Adjust this URL to match your API's pagination parameter
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error fetching data.");
      }

      const result = await response.json();
      setData(result);
      setFilteredData(result); // Update both full data and filtered data
    } catch (error) {
      setError(error.message || "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = Array.isArray(filteredData)
    ? filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : [];

  const highlightText = (text, searchTerm) => {
    if (!searchTerm) return text;

    const regex = new RegExp(`(${searchTerm})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={index} className="bg-yellow-300">{part}</span>
      ) : (
        part
      )
    );
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      const filtered = data.filter(
        (item) =>
          (item?.category_name &&
            item.category_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item?.journal_name &&
            item.journal_name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data); // reset filtered data to all items if no search term
    }
    setCurrentPage(1); // reset to the first page after search
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      Router.push(`?page=${currentPage - 1}`);
    }
  };

  const handleNextPage = () => {
    Router.push(`?page=${currentPage + 1}`);
  };

  // Update currentPage when the URL changes
useEffect(() => {
  if (typeof window !== "undefined") {
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get("page") || 1;
    setCurrentPage(Number(page));
    if (token) {
      fetchData(Number(page));
    }
  }
}, [token]);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleDropdownItemClick = (loc) => {
    setLocation(loc);
    setDropdownOpen(false);
  };

  const handleLogout = () => {
    // Clear the token from localStorage during logout
    localStorage.removeItem("authToken");
    // Update token state immediately
    setToken(null);
    // Redirect to login page
    Router.push("/Login");
  };

  return (
    <>
     
   <Helmet>
                <meta charSet="utf-8" />
                <title>Pharmanet</title>
              
            </Helmet>
     
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
      />
     <header className="sticky top-0 z-50 bg-white shadow-md">
  <div className="bg-gray-200 text-gray-600 p-2 text-sm">
    <div className="container mx-auto flex justify-between items-center">
      <p>Emergency Help!</p>
      <div>
        <i className="fa-brands fa-facebook p-1 text-[#1301DB]" aria-label="Facebook"></i>
        <i className="fa-brands fa-twitter p-1 text-[#14C9D3]" aria-label="Twitter"></i>
        <i className="fa-brands fa-google-plus-g p-1 text-[#E61C1C]" aria-label="Google Plus"></i>
        <i className="fa-brands fa-youtube p-1 text-[#FA0C0C]" aria-label="YouTube"></i>
      </div>
    </div>
  </div>

  <div className="container mx-auto  flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
    <div className="p-3 md:mb-0 cursor-pointer" onClick={() => Router.push("/")}>
      <img
        src="./Pharmanetlogo.png"
        alt="Logo"
        width={128}
        height={128}
        className="w-32 object-contain"
      />
    </div>

    <div className="text-center md:text-left">
      <p className="text-red-500">
        <span className="text-blue-900 font-semibold">Institution: <span className="text-red-500">"Hello world!"</span> </span>
      </p>
      <p className="text-blue-900">(DELNET Membership number: IM-3250)</p>
    </div>
    <div className="flex items-center space-x-2 cursor-pointer">
      <img
        onClick={() => Router.push("/settings")}
        src="profile.png"
        className="h-16 w-16 rounded-full"
        alt="User Profile"
      />
      <p onClick={handleLogout} className="text-white bg-blue-900 px-5 py-2 rounded-full">
        Logout
      </p>
    </div>
  </div>
</header>
      <div className="bg-gray-800 py-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 p-4 bg-gray-700 rounded-lg">
          <div className="relative flex-grow">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <i className="fa-solid fa-magnifying-glass text-gray-400"></i>
            </span>
            <input
              value={searchTerm}
              type="text"
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Doctors, clinics, hospitals..."
              className="pl-10 p-2 w-full text-sm text-gray-600 bg-white rounded-md outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500"
            />
          </div>
          {/* Location Dropdown */}
          <div
            className="relative flex-grow "
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <i className="fa-solid fa-location-dot text-gray-400"></i>
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3">
              <i className="fa-solid fa-chevron-down text-gray-400" onClick={toggleDropdown}></i>
            </span>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Select your Location"
              className="pl-10 pr-10 p-2 w-full text-sm text-gray-600 bg-white rounded-md outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500"
            />
            {dropdownOpen && (
              <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-md">
                <ul>
                  <li onClick={() => handleDropdownItemClick("New York")} className="p-2 cursor-pointer hover:bg-gray-200">New York</li>
                  <li onClick={() => handleDropdownItemClick("Los Angeles")} className="p-2 cursor-pointer hover:bg-gray-200">Los Angeles</li>
                </ul>
              </div>
            )}
          </div>
          <button
            onClick={handleSearch}
            className="px-6 py-2 text-sm font-semibold text-white bg-teal-500 rounded-md hover:bg-teal-600"
          >
            Search
          </button>
        </div>
      </div>
      <main className=" container mx-auto mt-6 grid grid-cols-1 md:grid-cols-12 gap-4 px-4 md:px-10">
  <div className="col-span-12 md:col-span-9">
    <div className="space-y-4">
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        currentData.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-100 shadow-md rounded-lg p-4 space-y-2 md:space-y-0 h-full"
            style={{ minHeight: "100px" }}
          >
            <div className="flex flex-col space-y-1">
              {/* <h3 className="font-bold text-gray-900 text-lg sm:text-xl">
                {highlightText(item?.journal_name || "Unknown Category", searchTerm)
                }
              </h3> */}
              <h3 className="font-bold text-gray-900 text-lg sm:text-xl">
  {item?.url && typeof item.url === "string" ? (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-blue-600"
    >
      {highlightText(item?.journal_name || "Unknown Category", searchTerm)}
    </a>
  ) : (
    highlightText(item?.journal_name || "Unknown Category", searchTerm)
  )}
</h3>

              <p className="text-sm sm:text-base text-gray-600">
                {highlightText(item?.category_name || "No Journal Name", searchTerm)}
              </p>
            </div>
            <div className="text-gray-500 hover:text-blue-600 cursor-pointer mt-2 md:mt-0">
              {item?.url && typeof item.url === "string" ? (
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
              ) : (
                <i className="fa-solid fa-arrow-up-right-from-square opacity-50 cursor-not-allowed"></i>
              )}
            </div>
          </div>
        ))
      )}
    </div>

    <div className="flex justify-between items-center   mt-4 flex-col md:flex-row">
      <div className="w-full flex justify-between items-center mx-auto space-x-4 md:w-auto">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 text-sm bg-blue-900 text-white rounded-md disabled:bg-gray-300 w-full md:w-auto"
        >
          Previous
        </button>
        <span className="text-gray-700 text-center ">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-sm bg-blue-900 text-white rounded-md disabled:bg-gray-300 w-full md:w-auto"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</main>

      <footer className="bg-gray-800  text-white px-2 py-4 mt-6">
        <div className="container sticky mx-auto flex justify-between items-center">
        <a href="https://mripub.com/" target="_blank" rel="noopener noreferrer">
  <p className="cursor-pointer hover:text-white text-white ">&copy; 2024 MRI Publication</p>
</a>
          <div>
            <i
              className="fa-brands fa-facebook p-2 text-[#1301DB]"
              aria-label="Facebook"
            ></i>
            <i
              className="fa-brands fa-twitter p-2 text-[#14C9D3]"
              aria-label="Twitter"
            ></i>
            <i
              className="fa-brands fa-google-plus-g p-2 text-[#E61C1C]"
              aria-label="Google Plus"
            ></i>
            <i
              className="fa-brands fa-youtube p-2 text-[#FA0C0C]"
              aria-label="YouTube"
            ></i>
          </div>
        </div>
      </footer>
    </>
  );
}
