"use client"
import Swal from "sweetalert2";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../Sidebar"
import Header from "../Header"
import {Helmet} from "react-helmet";
const SettingsPage = () => {
  const [profileImage, setProfileImage] = useState("/default-avatar.png");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    const { firstName, lastName, email, password, confirmPassword } = formData;

    // Check if all fields are filled
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Form",
        text: "Please fill in all the fields.",
      });
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "Passwords do not match. Please check again.",
      });
      return;
    }

    // If all conditions are met
    Swal.fire({
      icon: "success",
      title: "Profile Updated",
      text: "Your profile has been updated successfully.",
    }).then(() => {
          // Redirect to the login page after clicking "OK"
          router.push("/");
        });
      }

  return (
    <>
 <Helmet>
                <meta charSet="utf-8" />
                <title>Admin/Settings</title>
              
            </Helmet>
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        rel="stylesheet"
      />
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 text-gray-800">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-4 sm:p-8 space-y-6">
            {/* Profile Section */}
            <div className="flex flex-col sm:flex-row items-center justify-between bg-gradient-to-br from-white via-gray-100 to-gray-200 p-4 sm:p-8 rounded-3xl shadow-lg">
              <div className="relative inline-block mb-4 sm:mb-0">
                <img
                  src={profileImage}
                  alt=""
                  onClick={() => document.getElementById("image-upload").click()}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-teal-500 shadow-lg transform transition-transform hover:scale-110 mx-auto cursor-pointer"
                  title="Click to change profile picture"
                />
                <label
                  htmlFor="image-upload"
                  className="absolute bottom-2 right-2 bg-teal-600 text-white p-2 rounded-full shadow-lg cursor-pointer transform transition-transform hover:scale-105"
                  title="Change Profile Picture"
                >
                  <i className="fas fa-camera"></i>
                </label>
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-700">
                  Welcome, Admin!
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Keep your profile updated for better account security.
                </p>
              </div>
            </div>

            {/* Form Section */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 sm:p-8">
              <h2 className="text-lg sm:text-xl font-semibold mb-4">Edit Profile</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    placeholder="Enter the First Name"
                    onChange={handleChange}
                    className="mt-1 px-4 py-2 w-full border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    placeholder="Enter the Last Name"
                    onChange={handleChange}
                    className="mt-1 px-4 py-2 w-full border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder="Enter your email"
                    onChange={handleChange}
                    className="mt-1 px-4 py-2 w-full border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter a new password"
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-1 px-4 py-2 w-full border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="mt-1 px-4 py-2 w-full border rounded-lg"
                  />
                </div>
              </div>
              <div className="mt-6 text-right">
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                >
                  Save Profile
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;

