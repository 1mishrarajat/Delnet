import React from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const Router = useRouter()
  return (
    <div>
      <header className="flex items-center justify-between p-5 bg-white shadow-md">
       
      <img
              src="/Pharmanetlogo.png"
             alt="Logo"
              width={128}
              height={128}
              className="w-32 object-contain"
            />
        <button
     onClick={() => {
      //Clear the token from localStorage during logout
      localStorage.removeItem("authToken");
      localStorage.removeItem("role");
      // Redirect to home page 
     Router.push("/Login");
    }}
          className="bg-teal-600 text-white font-semibold py-2 px-8 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-transform"
        >
          Logout
        </button>
      </header>
    </div>
  );
}