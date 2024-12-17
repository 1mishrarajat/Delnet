'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../Sidebar";
import Header from "../Header";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Helmet } from "react-helmet";


export default function Dashboard() {
  const Router = useRouter();
  const { query } = Router; // Using useRouter to access query parameters

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [editData, setEditData] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
  const itemsPerPage = 10;

  // Fetch data from the API
  const fetchData = async () => {
    if (!token) {
      Router.push("/");
      return;
    }

    try {
      const response = await fetch("https://dir.mripub.com/api/journal.php", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Subscribe please");
      }

      const result = await response.json();
      setData(result);
      setFilteredData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message || "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Run fetch data if token exists
  useEffect(() => {
    if (token) {
      fetchData();
    } else {
      Router.push("/");
    }
  }, [Router, token]);

  // Handling the edit modal opening
  const openEditModal = (id) => {
    const selectedItem = data.find((item) => item.id === id);
    setEditData({ ...selectedItem });
    setEditModalOpen(true);

    // Update the URL with the `edit` parameter
    Router.push({
      pathname: Router.pathname,
      query: { ...query, edit: id },
    });
  };

  // Close the edit modal and clear query parameter
  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditData(null);

    // Clear the `edit` parameter from the URL
    Router.push({
      pathname: Router.pathname,
      query: { ...query, edit: undefined },
    });
  };

  // Handling edit save
  const handleEditSave = () => {
    const originalItem = data.find((item) => item.id === editData.id);
    if (
      originalItem.category_name !== editData.category_name ||
      originalItem.journal_name !== editData.journal_name ||
      originalItem.url !== editData.url
    ) {
      setData((prevData) =>
        prevData.map((item) =>
          item.id === editData.id ? editData : item
        )
      );
      setFilteredData((prevData) =>
        prevData.map((item) =>
          item.id === editData.id ? editData : item
        )
      );
    }
    closeEditModal();
  };

  // When `edit` parameter is updated in the URL, set edit modal
  useEffect(() => {
    const editId = query?.edit;  // Optional chaining to avoid errors when query is undefined
    if (editId) {
      const selectedItem = data.find((item) => item.id === parseInt(editId));
      if (selectedItem) {
        setEditData({ ...selectedItem });
        setEditModalOpen(true);
      }
    } else {
      setEditModalOpen(false);
    }
  }, [query, data]);
  

  // Handle delete functionality
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) return;

    try {
      setData((prevData) => prevData.filter((item) => item.id !== id));
      setFilteredData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Handle search
  const handleSearch = () => {
    if (searchTerm.trim()) {
      const filtered = data.filter(
        (item) =>
          (item?.category_name && item.category_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item?.journal_name && item.journal_name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
    setCurrentPage(1);
  };

  // Handle pagination
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Paginate data
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Admin/Journals</title>
      </Helmet>

      <div className="flex flex-col md:flex-row h-screen bg-gray-100 text-gray-800">
        <Sidebar className="bg-gray-900 text-white w-full md:w-64 flex-none" />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="container mx-auto mt-6 px-4 md:px-10">
            <div className="space-y-4">
              <div className="flex flex-wrap justify-between items-center gap-2">
                <input
                  type="text"
                  placeholder="Search..."
                  className="border border-gray-300 rounded-md py-2 px-4 flex-1"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  onClick={handleSearch}
                  className="bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700"
                >
                  Search
                </button>
              </div>
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>{error}</p>
              ) : currentData.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white shadow-lg rounded-lg">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-2 px-4 text-left">Category</th>
                        <th className="py-2 px-4 text-left">Journal Name</th>
                        <th className="py-2 px-4 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentData.map((item) => (
                        <tr key={item.id} className="border-b">
                          <td className="py-2 px-4">{item.category_name}</td>
                          <td className="py-2 px-4">{item.journal_name}</td>
                          <td className="py-2 px-4 flex space-x-4">
                            <button
                              onClick={() => openEditModal(item.id)}
                              className="text-teal-500 hover:text-teal-700"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <i className="fas fa-trash-alt"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No data found</p>
              )}
              <div className="flex flex-wrap justify-between items-center gap-2 mt-6">
                <button
                  className="bg-gray-400 text-white py-2 px-4 rounded-md disabled:bg-gray-600 w-full sm:w-auto"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span className="text-center w-full sm:w-auto">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="bg-gray-400 text-white py-2 px-4 rounded-md disabled:bg-gray-600 w-full sm:w-auto"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </main>
        </div>

        {editModalOpen && editData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
              <h2 className="text-xl font-bold mb-4">Edit Journal</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Category Name</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md py-2 px-4 w-full"
                  value={editData.category_name}
                  onChange={(e) => setEditData({ ...editData, category_name: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Journal Name</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md py-2 px-4 w-full"
                  value={editData.journal_name}
                  onChange={(e) => setEditData({ ...editData, journal_name: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">URL</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md py-2 px-4 w-full"
                  value={editData.url}
                  onChange={(e) => setEditData({ ...editData, url: e.target.value })}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={closeEditModal}
                  className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditSave}
                  className="bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
