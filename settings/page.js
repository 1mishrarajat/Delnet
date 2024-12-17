// "use client";
// import Swal from "sweetalert2";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import {Helmet} from "react-helmet";
// const SettingsPage = () => {
//   const [profileImage, setProfileImage] = useState("/default-avatar.png");
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const router = useRouter();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setProfileImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = () => {
//     const { firstName, lastName, email, password, confirmPassword } = formData;

//     if (!firstName || !lastName || !email || !password || !confirmPassword) {
//       Swal.fire({
//         icon: "warning",
//         title: "Incomplete Form",
//         text: "Please fill in all the fields.",
//       });
//       return;
//     }

//     if (password !== confirmPassword) {
//       Swal.fire({
//         icon: "error",
//         title: "Password Mismatch",
//         text: "Passwords do not match. Please check again.",
//       });
//       return;
//     }

//     Swal.fire({
//       icon: "success",
//       title: "Profile Updated",
//       text: "Your profile has been updated successfully.",
//     }).then(() => {
//       // Add navigation logic if necessary
//     });
//   };

//   return (
//     <>
//    <Helmet>
//                 <meta charSet="utf-8" />
//                 <title>Settings</title>
            
//             </Helmet>
//     <main className="flex-1 max-w-full mx-auto p-6 space-y-8">

//          <header className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
//         <img
//           src="./Pharmanetlogo.png"
//           alt="Logo"
//           className="w-28 object-contain"
//         />
//         <button
//           onClick={() => {
//             Swal.fire({
//               title: "Logged Out",
//               text: "You have been logged out!",
//               icon: "success",
//               confirmButtonText: "OK",
//             }).then(() => {
//               localStorage.removeItem("authToken"); // Clear the token on logout
//               router.push("/Login"); // Redirect to the login page
//             });
//           }}
//           className="px-4 py-2 bg-blue-900 text-white font-medium rounded-lg shadow hover:bg-blue-900"
//         >
//           Logout
//         </button>
//       </header>
//       <div className="bg-gray-100 p-6 rounded-xl shadow-lg flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
//   <div className="relative">
//     <img
//       src='flat.png' // Replace `profileImage` with a static image URL or import
//       alt="Profile"
//       className="w-40 h-40 sm:w-40 sm:h-40 "
//     />
//   </div>
//   <div>
//     <h3 className="text-xl font-semibold text-gray-700">
//       Welcome, Admin!
//     </h3>
//     <p className="text-sm text-gray-500">
//       Keep your profile updated for better account security.
//     </p>
//   </div>
// </div>

//       <div className="bg-white p-6 rounded-xl shadow-lg">
//         <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           {[
//             { label: "First Name", name: "firstName", type: "text" },
//             { label: "Last Name", name: "lastName", type: "text" },
//             { label: "Email", name: "email", type: "email" },
//             { label: "Password", name: "password", type: "password" },
//             { label: "Confirm Password", name: "confirmPassword", type: "password" },
//           ].map(({ label, name, type }) => (
//             <div key={name}>
//               <label className="block text-sm font-medium text-gray-600">
//                 {label}
//               </label>
//               <input
//                 type={type}
//                 name={name}
//                 value={formData[name]}
//                 placeholder={`Enter your ${label.toLowerCase()}`}
//                 onChange={handleChange}
//                 className="mt-1 px-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-teal-400"
//               />
//             </div>
//           ))}
//         </div>
//         <div className="mt-6 text-right">
//           <button
//             onClick={handleSubmit}
//             className="px-6 py-2 bg-teal-500 text-white rounded-lg shadow hover:bg-teal-600 focus:ring-2 focus:ring-teal-400 focus:outline-none"
//           >
//             Save Profile
//           </button>
//         </div>
//       </div>
//     </main>
//     </>
//   );
// };

// export default SettingsPage;
"use client";
import Swal from "sweetalert2";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Helmet } from "react-helmet";

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

  const handleSubmit = async () => {
    const { firstName, lastName, email, password, confirmPassword } = formData;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Form",
        text: "Please fill in all the fields.",
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "Passwords do not match. Please check again.",
      });
      return;
    }

    try {
      const response = await fetch("http://localhost/Api/settingsave.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save settings");
      }

      const result = await response.json();

      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "Profile Updated",
          text: "Your profile has been updated successfully.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: result.message || "An error occurred while updating your profile.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "An unexpected error occurred.",
      });
    }
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Settings</title>
      </Helmet>
      <main className="flex-1 max-w-full mx-auto p-6 space-y-8">
        <header className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
          <img
            src="./Pharmanetlogo.png"
            alt="Logo"
            className="w-28 object-contain"
          />
          <button
            onClick={() => {
              Swal.fire({
                title: "Logged Out",
                text: "You have been logged out!",
                icon: "success",
                confirmButtonText: "OK",
              }).then(() => {
                localStorage.removeItem("authToken");
                router.push("/Login");
              });
            }}
            className="px-4 py-2 bg-blue-900 text-white font-medium rounded-lg shadow hover:bg-blue-900"
          >
            Logout
          </button>
        </header>
        <div className="bg-gray-100 p-6 rounded-xl shadow-lg flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="relative">
            <img
              src="flat.png"
              alt="Profile"
              className="w-40 h-40 sm:w-40 sm:h-40"
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-700">Welcome, Admin!</h3>
            <p className="text-sm text-gray-500">
              Keep your profile updated for better account security.
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "First Name", name: "firstName", type: "text" },
              { label: "Last Name", name: "lastName", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Password", name: "password", type: "password" },
              { label: "Confirm Password", name: "confirmPassword", type: "password" },
            ].map(({ label, name, type }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-600">
                  {label}
                </label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  placeholder={`Enter your ${label.toLowerCase()}`}
                  onChange={handleChange}
                  className="mt-1 px-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-teal-400"
                />
              </div>
            ))}
          </div>
          <div className="mt-6 text-right">
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-teal-500 text-white rounded-lg shadow hover:bg-teal-600 focus:ring-2 focus:ring-teal-400 focus:outline-none"
            >
              Save Profile
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default SettingsPage;
