// "use client";
// import { useState } from "react";
// import Sidebar from "../component/Sidebar";
// // import Header from "../component/Header";
// import UserList from "../component/UserList";
// import UsersPage from "@/component/UserManagement";
// import Notification from "@/component/notification/Notification";
// import ProductManagement from "@/component/productManagement/ProductManagement";

// // const Catalogue = () => <div className="p-6">Catalogue Content</div>;
// // const Products = () => <div className="p-6">Products Content</div>;


// export default function Home() {
//   const [activePage, setActivePage] = useState("dashboard");

//   const renderContent = () => {
//     switch (activePage) {
//       case "dashboard":
//         return <UserList />;
//       case "catalogue":
//         return <UsersPage />;
//       case "products":
//         return <ProductManagement  />;
//       case "notifications":
//         return <Notification />;
//       default:
//         return <UserList />;
//     }
//   };

//   return (
//     <div className="flex">
//       {/* Sidebar */}
//       <Sidebar setActivePage={setActivePage} />
//       {/* Main Content */}
//       <div className="flex-1">
//         <main className="p-6">{renderContent()}</main>
//       </div>
//     </div>
//   );
// }


import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page