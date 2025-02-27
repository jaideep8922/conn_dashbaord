// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { Home, Users, BarChart3, Bell, LogOut } from "lucide-react";
// import File from "../assets/profile_user.jpg";
// import Logo from "../assets/logo.png";
// import { useState, useEffect } from "react";
// import Cookies from "js-cookie";
// import { useRouter } from "next/navigation";

// type SidebarProps = {
//   setActivePage: React.Dispatch<React.SetStateAction<string>>;
// };


// const Sidebar = () => {

//   const router = useRouter()

//   const menuItems = [
//     { id: "dashboard", label: "Dashboard", icon: Home, path: "/" },
//     { id: "catalogue", label: "User Management", icon: Users, path: "/user-list" },
//     { id: "products", label: "Product Management", icon: BarChart3, path: "/product-management" },
//     { id: "notifications", label: "Notification", icon: Bell, path: "/notification" },
//   ];

//   const[name, setName]= useState()


//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const data = localStorage.getItem("user");
//       if (data) {
//         const parsedData = JSON.parse(data);
//         setName(parsedData.name);
//       }
//     }
//   }, []);

//   const handleLogout = ()=>{
//     Cookies.remove("token")
//     router.push('/login')
//   }

//   return (
//     <div className="w-64 fixed top-0 left-0 h-full bg-white shadow-md flex flex-col">
//       {/* Logo Section */}
//       <div className="p-4">
//         <Image src={Logo} alt="Logo" width={150} height={120} />
//       </div>

//       {/* Navigation Menu */}
//       <nav className="flex-1 mt-6">
//         <ul className="space-y-2">
//           {menuItems.map((item) => {
//             const Icon = item.icon;
//             return (
//               <li key={item.id}>
//                 <Link
//                   href={item.path}
//                   className={`w-full flex items-center px-6 py-3 text-sm transition-colors ${
//                     item.id === "dashboard"
//                       ? "bg-blue-600 text-white"
//                       : "text-gray-600 hover:bg-gray-50"
//                   }`}
//                 >
//                   <Icon className="h-5 w-5 mr-3" />
//                   {item.label}
//                 </Link>
//               </li>
//             );
//           })}
//         </ul>
//       </nav>

//       {/* User Profile Section */}
//       <div className="p-4 border-t">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center">
//             <div className="h-10 w-10 rounded-full overflow-hidden">
//               <Image
//                 src={File}
//                 alt="Profile"
//                 width={40}
//                 height={40}
//                 className="rounded-full"
//               />
//             </div>
//             <div className="ml-3">
//               <p className="text-sm font-medium text-gray-700">{name}</p>
//               {/* <p className="text-xs text-gray-500">Prashant@hie.com</p> */}
//             </div>
//           </div>
//           <button className="p-2 hover:bg-gray-100 rounded-full">
//             <LogOut className="h-5 w-5 text-gray-500" onClick={handleLogout}/>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Sidebar;


"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Users, BarChart3, Bell, LogOut } from "lucide-react";
import File from "../assets/profile_user.jpg";
import Logo from "../assets/logo.png";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname(); // Get current URL path

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, path: "/" },
    { id: "catalogue", label: "User Management", icon: Users, path: "/user-list" },
    { id: "products", label: "Product Management", icon: BarChart3, path: "/product-management" },
    { id: "notifications", label: "Notification", icon: Bell, path: "/notification" },
  ];

  const [name, setName] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("user");
      if (data) {
        const parsedData = JSON.parse(data);
        setName(parsedData.name);
      }
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/login");
  };

  return (
    <div className="w-64 fixed top-0 left-0 h-full bg-white shadow-md flex flex-col">
      {/* Logo Section */}
      <div className="p-4">
        <Image src={Logo} alt="Logo" width={150} height={120} />
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 mt-6">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path; // Check if menu item matches current URL

            return (
              <li key={item.id}>
                <Link
                  href={item.path}
                  className={`w-60 ml-2 flex items-center px-6 py-3 text-sm transition-colors rounded-md ${
                    isActive
                      ? "bg-blue-600 text-white" // Active item styles
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full overflow-hidden">
              <Image
                src={File}
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">{name}</p>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full" onClick={handleLogout}>
            <LogOut className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
