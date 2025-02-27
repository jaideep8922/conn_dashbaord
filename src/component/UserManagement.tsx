'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import File from '../assets/profile_user.jpg'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import axios from 'axios';
import { saveAs } from 'file-saver';
import toast, { Toaster } from 'react-hot-toast'


export default function UsersPage() {
  const [filterOpen, setFilterOpen] = useState(false)
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string[]>([])
  const router = useRouter()


  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (categoryOpen && !(event.target as Element).closest('.relative')) {
        setCategoryOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [categoryOpen])

  const [users, setUsers] = useState([]);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

  // Function to fetch users for a specific page
  const fetchUsers = async (pageNumber: number) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/get-all-users`, {
        pageNumber,
        pageSize: 100,
        searchValue: null,
        userType: null,
      });
      setUsers(response?.data?.data)
    } catch (error) {
      console.error("Error fetching users", error);
      return [];
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers(1);
  }, []);

  const exportToCSV = () => {
    if (!users || users.length === 0) {
      alert("No user data to export.");
      return;
    }

    // Define headers
    const headers = ['ID', 'Name'];

    // Flatten seller and retailer lists
    const sellerList = users?.data?.sellerList || [];
    const retailerList = users?.data?.retailerList || [];

    const allUsers = [...sellerList, ...retailerList];

    const csvRows = [];
    csvRows.push(headers.join(',')); // Add headers

    allUsers.forEach(user => {
      const row = [
        user?.customId || 'N/A',
        user?.businessOwner || 'N/A',
        // user?.customId?.includes("SU")? <>Seller</>:<>Retailer</> 
      ];
      csvRows.push(row.join(','));
    });

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });

    saveAs(blob, 'user_list.csv');
  };


  const handleDropdownToggle = (index: number) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };


  const [editUser, setEditUser] = useState(null);
  interface FormData {
    businessName: string;
    businessOwner: string;
    phone: string;
    city: string;
    state: string;
  }

  const [formData, setFormData] = useState<FormData>({
    businessName: '',
    businessOwner: '',
    phone: '',
    city: '',
    state: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openEditModal = (user) => {
    setEditUser(user);
    setFormData({
      businessName: user.businessName,
      businessOwner: user.businessOwner,
      phone: user.phone,
      city: user.city,
      state: user.state,
    });
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  console.log("editUsereditUsereditUser", editUser)

  const handleSave = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/update-user-details`, {
        id: editUser.id,
        userType: editUser.customId.includes("SU") ? 'Supplier' : 'Retailer',
        updatedData: formData,
      });

      toast.success("User updated successfully");
      setIsModalOpen(false);
      window.location.reload();

    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user");
    }
  };

  const deleteUser = async (customId: number, userType: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/delete-user-details`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customId, userType }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("User deleted successfully");
        window.location.reload();
      } else {
        toast.error(data.error || "Failed to delete user");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
    }
  };


  const [selectedType, setSelectedType] = useState<"all" | "seller" | "retailer">("all");
  const handleSelect = (type: "all" | "seller" | "retailer") => {
    setSelectedType(type);
  };
  
  const userList =
  selectedType === "all"
    ? [...(users?.data?.sellerList || []), ...(users?.data?.retailerList || [])] 
    : selectedType === "seller"
    ? users?.data?.sellerList
    : users?.data?.retailerList;

  
  // const userList = selectedType === "seller" ? users?.data?.sellerList : users?.data?.retailerList ;

  return (
    <div className="container py-6 px-4 m-3">
      <Toaster />
      <div className="flex flex-wrap items-center gap-4 mb-6">
        {/* <div className="relative">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
            </svg>
            Filter By
          </button>

        </div> */}

        <div className="relative">
          <button
            onClick={() => setCategoryOpen(!categoryOpen)}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
            </svg>
            Category
          </button>

          {categoryOpen && (
            <div className="absolute top-full left-0 mt-1 w-60 bg-white rounded-lg shadow-lg border p-2 z-10">



<label className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedType.includes('all')}
                  onClick={() => handleSelect("all")}
                  className="rounded border-gray-300"
                />
                All
              </label>

              <label className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedType.includes('seller')}
                  onClick={() => handleSelect("seller")}

                  className="rounded border-gray-300"
                />
                Supplier
              </label>

              <label className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedType.includes('retailer')}
                  onClick={() => handleSelect("retailer")}

                  className="rounded border-gray-300"
                />
                Retailer
              </label>


              
            </div>
          )}
        </div>

        {/* <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50" 
        
        // onClick={() => router.push('/location')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-locate-fixed"><line x1="2" x2="5" y1="12" y2="12"/><line x1="19" x2="22" y1="12" y2="12"/><line x1="12" x2="12" y1="2" y2="5"/><line x1="12" x2="12" y1="19" y2="22"/><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="3"/></svg>
          Location
        </button>
         */}
        <button className="ml-auto flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={() => router.push('/add-user')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <line x1="19" y1="8" x2="19" y2="14" />
            <line x1="22" y1="11" x2="16" y2="11" />
          </svg>
          Add User
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">User List</h2>
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-sm font-semibold rounded-full">{users?.data?.sellerList?.length + users?.data?.retailerList?.length || 0}</span>
            </div>
            <div className="flex flex-wrap items-center gap-4">

              <div className="relative">
                <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50" onClick={exportToCSV}
                >
                  Export
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {userList?.map((user, index) => (
                <React.Fragment key={user.id + user.name}>
                  <tr className="cursor-pointer">
                    <td
                      className="px-6 py-4 whitespace-nowrap"
                      // onClick={() => router.push(`/single-user`)}
                      onClick={() => router.push(`/user-list/${user.customId}`)}

                    >
                      <div className="flex items-center gap-3">
                        {user.filePath ? (
                          <img
                            src={user.filePath || File}
                            alt={`${user.name}'s avatar`}
                            className="w-10 h-10 rounded-full border"
                          />
                        ) : (
                          <Image
                            src={File}
                            alt={`${user.name}'s avatar`}
                            className="w-10 h-10 rounded-full border"
                          />
                        )}
                        <td className="px-6 py-4 whitespace-nowrap">{user.businessOwner || "no data"}</td>

                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.customId}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.businessOwner || "no data"}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user?.customId?.includes("SU") === 'Supplier'
                          ? 'bg-green-100 text-green-600'
                          : user?.adminId?.length > 0
                            ? 'bg-red-100 text-red-600'
                            : 'bg-green-100 text-gray-600'
                          }`}
                      >
                        {user.businessName || "no data found"}
                      </span>
                    </td>

                    {/* <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user?.customId?.includes("SU") === 'Supplier'
                            ? 'bg-green-100 text-green-600'
                            : 'bg-green-100 text-gray-600'
                          }`}
                      >
                        {user.businessName}
                      </span>
                    </td> */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button className="p-1 hover:bg-gray-100 rounded"
                          onClick={() => openEditModal(user)}

                        // onClick={() => router.push('/edit-profile')}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                          </svg>
                        </button>
                        <button
                          className="p-1 hover:bg-gray-100 rounded"
                          onClick={() => deleteUser(user.customId, user.customId.includes("SU") ? "Seller" : "Retailer")}

                          // onClick={() => deleteUser(user.customId, "Seller")} // Change "Seller" dynamically if needed
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M3 6h18" />
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                          </svg>
                        </button>

                        {/*                         
                        <div className="relative">
                          <button
                            className="p-1 hover:bg-gray-100 rounded"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDropdownToggle(index);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <circle cx="12" cy="12" r="1" />
                              <circle cx="12" cy="5" r="1" />
                              <circle cx="12" cy="19" r="1" />
                            </svg>
                          </button>
                          {openDropdownIndex === index && (
                            <span className="absolute top-0 right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                              <span className="py-1">
                                <button className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-yellow-500"
                                  >
                                    <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
                                  </svg>
                                  Premium User
                                </button>
                                <button className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-red-500"
                                  >
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                  </svg>
                                  Bad User
                                </button>
                                <button className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-gray-500"
                                  >
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                                  </svg>
                                  Suspend User
                                </button>
                              </span>
                            </span>
                          )}
                        </div> */}
                      </div>
                    </td>
                  </tr>
                  {openDropdownIndex === index && (
                    <tr>
                      <td colSpan={5}>
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setOpenDropdownIndex(null)}
                        />
                      </td>
                    </tr>
                  )}

                  {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
                      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-lg font-bold mb-4 flex justify-center">Update User </h2>
                        <input
                          type="text"
                          name="businessName"
                          value={formData.businessName}
                          onChange={handleChange}
                          className="border p-2 w-full mb-2"
                          placeholder="Business Name"
                        />
                        <input
                          type="text"
                          name="businessOwner"
                          value={formData.businessOwner}
                          onChange={handleChange}
                          className="border p-2 w-full mb-2"
                          placeholder="Business Owner"
                        />
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="border p-2 w-full mb-2"
                          placeholder="Phone"
                        />
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className="border p-2 w-full mb-2"
                          placeholder="City"
                        />
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          className="border p-2 w-full mb-2"
                          placeholder="State"
                        />
                        <div className="flex justify-end gap-2 mt-4">
                          <button
                            className="bg-gray-400 text-white px-4 py-2 rounded"
                            onClick={() => setIsModalOpen(false)}
                          >
                            Cancel
                          </button>
                          <button
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                            onClick={handleSave}
                          >
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}

              {/* {users?.data?.retailerList?.map((user, index) => (
                <React.Fragment key={user.id + user.name}>
                  <tr className="cursor-pointer">
                    <td
                      className="px-6 py-4 whitespace-nowrap"
                      onClick={() => router.push(`/user-list/${user.customId}`)}

                    >
                      <div className="flex items-center gap-3">
                        {user.filePath ? (
                          <img
                            src={user.filePath || File}
                            alt={`${user.name}'s avatar`}
                            className="w-10 h-10 rounded-full border"
                          />
                        ) : (
                          <Image
                            src={File}
                            alt={`${user.name}'s avatar`}
                            className="w-10 h-10 rounded-full border"
                          />
                        )}

                        <td className="px-6 py-4 whitespace-nowrap">{user.businessOwner}</td>

                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.customId}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.businessName}</td>


                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-4 py-1 text-xs font-semibold rounded-full ${user?.customId || user?.adminId?.length > 0
                          ? 'bg-red-100 text-gray-600 text-xs'
                          : 'bg-gray-100 text-gray-600 text-[10px]'
                          }`}
                      >
                        {user.businessName}
                      </span>
                    </td>


                    {/* <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.customId.includes("RE") === 'Supplier'
                            ? 'bg-green-100 text-green-600'
                            : 'bg-gray-100 text-gray-600'
                          }`}
                      >
                        {user.businessName}
                      </span>
                    </td> 
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button className="p-1 hover:bg-gray-100 rounded"
                          //  onClick={() => router.push('/edit-profile')}
                          onClick={() => openEditModal(user)}

                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                          </svg>
                        </button>
                        <button
                          className="p-1 hover:bg-gray-100 rounded"
                          onClick={() => deleteUser(user.customId, "Retailer")}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M3 6h18" />
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                          </svg>
                        </button>
                        {/* <div className="relative">
                          <button
                            className="p-1 hover:bg-gray-100 rounded"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDropdownToggle(index);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <circle cx="12" cy="12" r="1" />
                              <circle cx="12" cy="5" r="1" />
                              <circle cx="12" cy="19" r="1" />
                            </svg>
                          </button>
                          {openDropdownIndex === index && (
                            <span className="absolute top-0 right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                              <span className="py-1">
                                <button className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-yellow-500"
                                  >
                                    <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
                                  </svg>
                                  Premium User
                                </button>
                                <button className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-red-500"
                                  >
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                  </svg>
                                  Bad User
                                </button>
                                <button className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-gray-500"
                                  >
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                                  </svg>
                                  Suspend User
                                </button>
                              </span>
                            </span>
                          )}
                        </div> 
                      </div>
                    </td>
                  </tr>
                  {openDropdownIndex === index && (
                    <tr>
                      <td colSpan={5}>
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setOpenDropdownIndex(null)}
                        />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))} */}
            </tbody>

          </table>
        </div>

        {/* <div className="flex flex-wrap items-center justify-between gap-4 p-4 border-t">
          <div className="text-sm text-gray-500">
            Showing 1 to 10 of 50 entries
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button className="px-3 py-1 text-sm border rounded hover:bg-gray-50">Previous</button>
            <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded">1</button>
            <button className="px-3 py-1 text-sm border rounded hover:bg-gray-50">2</button>
            <button className="px-3 py-1 text-sm border rounded hover:bg-gray-50">3</button>
            <button className="px-3 py-1 text-sm border rounded hover:bg-gray-50">4</button>
            <button className="px-3 py-1 text-sm border rounded hover:bg-gray-50">5</button>
            <button className="px-3 py-1 text-sm border rounded hover:bg-gray-50">Next</button>
          </div>
        </div> */}
      </div>
    </div>
  )
}