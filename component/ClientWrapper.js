
"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ClientWrapper({ children }) {
  const router = useRouter();
  useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if (isLoggedIn && router.asPath === "/Login") {
          router.push("/Login");
        }
      }, [router]);
    
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userRole = localStorage.getItem("userRole"); // Fetch user role (e.g., "user" or "admin")

    if (isLoggedIn) {
      // If not logged in, redirect to Login
      if (router.asPath !== "/Login") {
        router.push("/");
      }
    } else if (userRole === "admin") {
      // If admin, ensure they're on an admin route
      if (!router.asPath.startsWith("/Admin")) {
        router.push("/Admin");
      }
    } else if (userRole === "user") {
      // If regular user, ensure they're not accessing admin routes
      if (router.asPath.startsWith("/Admin")) {
        router.push("/");
      }
    }
  }, [router]);

  return <>{children}</>;
}
// "use client"
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export default function ClientWrapper({ children }) {
//   const router = useRouter();

//   useEffect(() => {
//     const isLoggedIn = localStorage.getItem("isLoggedIn");
//     console.log("Checking token in localStorage:", isLoggedIn);

//     if (!isLoggedIn && router.asPath !== "/Login") {
//       console.log("No token found, redirecting to /Login...");
//       router.push("/Login");
//     }
//   }, [router]);

//   return <>{children}</>;
// }
// "use client"; // Mark this as a client component

// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export default function ClientWrapper({ children }) {
//   const router = useRouter();

//   useEffect(() => {
//     const isLoggedIn = localStorage.getItem("isLoggedIn");
//     console.log("Checking token in localStorage:", isLoggedIn);

//     if (isLoggedIn) {
//       // If the user is logged in
//       if (router.asPath === "/Login" || router.asPath === "/Login") {
//         console.log("User is logged in, redirecting to /...");
//         router.push("/"); // Redirect to home if on Login or root
//       }
//     } else {
//       // If the user is not logged in
//       if (router.asPath !== "/Login") {
//         console.log("User is not logged in, redirecting to /Login...");
//         router.push("/Login"); // Redirect to Login for unauthenticated users
//       }
//     }
//   }, [router]);

//   return <>{children}</>;
// }
