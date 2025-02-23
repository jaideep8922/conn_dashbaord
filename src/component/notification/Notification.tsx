// 'use client'

// import { useEffect, useState } from 'react'
// import { Bell } from 'lucide-react'

// export default function Notifications() {
//   const [showComposeModal, setShowComposeModal] = useState(false)
//   const [showUserSelect, setShowUserSelect] = useState(false)
//   const [selectedUsers, setSelectedUsers] = useState<string[]>([])
//   const [message, setMessage] = useState('')

//   const [notificationId, setNotificationId] = useState<string | null>(null);

//   const sendMessage = async () => {
//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/generate-notification`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ message }),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         setNotificationId(data.notificationId);
//         setShowComposeModal(false);
//         setShowUserSelect(true);
//       } else {
//         console.error('Failed to send message:', data.error);
//       }
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   };

//   useEffect(() => {
//     sendMessage()
//   }, [notificationId, message])

//   const [getAll, setGetAll] = useState<string>('')

//   const getMessage = async () => {
//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/get-all-notification`, {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' },
//       });
//       const data = await response.json();
//       if (response.ok) {
//         setGetAll(data?.notification);

//       } else {
//         console.error('Failed to send message:', data.error);
//       }
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   };

//   useEffect(() => {
//     sendMessage()
//   }, [notificationId, message])

//   useEffect(() => {
//     getMessage()
//   }, [])

//   // get-all-notification
//   console.log("getAll", getAll)

//   return (
//     <div className="w-full m-3 p-4 ">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <div className="flex items-center gap-4">
//           {/* <select className="p-2 rounded-md border bg-white">
//             <option>10</option>
//             <option>20</option>
//             <option>30</option>
//           </select> */}

//           <div className="flex items-center gap-2">
//             {/* <button className="p-2 hover:bg-gray-100 rounded-md">
//               <Filter className="w-5 h-5 text-gray-500" />
//             </button> */}
//             <h1 className="text-xl font-semibold">Notifications</h1>
//           </div>
//         </div>

//         <div className="flex items-center gap-4 ">
//           {/* <div className="relative">
//             <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//             <input
//               type="search"
//               placeholder="Search.."
//               className="pl-10 pr-4 py-2 border rounded-md w-64"
//             />
//           </div> */}
//           <button
//             onClick={() => setShowComposeModal(true)}
//             className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
//           >
//             <Bell className="w-4 h-4" />
//             Compose New Notice
//           </button>
//         </div>
//       </div>

//       {/* Notifications List */}
//       <div className="space-y-4">
//         {getAll?.length > 0 ? (
//           Array.isArray(getAll) && getAll?.map((notification) => (
//             <div
//               key={notification.id}
//               className="flex items-start gap-4 p-4 bg-white rounded-lg border hover:shadow-md transition-shadow cursor-pointer"
//             >
//               <input type="checkbox" className="mt-2" />
//               <div className="relative">
//                 <div className="w-10 h-10 bg-gray-200 rounded-full" />
//                 {notification.isOnline && (
//                   <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
//                 )}
//               </div>
//               <div className="flex-1 min-w-0">
//                 <p className="text-gray-600 truncate">{notification.message}</p>
//               </div>
//               <div className="text-sm text-gray-500">{notification.createdAt}</div>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500">No notifications available</p>
//         )}

//       </div>

//       {/* Pagination */}
//       {/* <div className="flex items-center justify-between mt-6">
//         <span className="text-sm text-gray-500">Showing 1 to 10 of 50 entries</span>
//         <div className="flex items-center gap-2">
//           <button className="px-3 py-1 border rounded hover:bg-gray-50">Previous</button>
//           <button className="px-3 py-1 bg-blue-600 text-white rounded">1</button>
//           <button className="px-3 py-1 border rounded hover:bg-gray-50">2</button>
//           <button className="px-3 py-1 border rounded hover:bg-gray-50">3</button>
//           <button className="px-3 py-1 border rounded hover:bg-gray-50">4</button>
//           <button className="px-3 py-1 border rounded hover:bg-gray-50">5</button>
//           <button className="px-3 py-1 border rounded hover:bg-gray-50">Next</button>
//         </div>
//       </div> */}

//       {/* Compose Modal */}
//       {showComposeModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-semibold">Compose New Notice</h2>
//               <button
//                 onClick={() => setShowComposeModal(false)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 ×
//               </button>
//             </div>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Message
//                 </label>
//                 <textarea
//                   value={message}
//                   onChange={(e) => setMessage(e.target.value)}
//                   className="w-full p-2 border rounded-md"
//                   rows={4}
//                 />
//               </div>
//               <div className="flex justify-end gap-2">
//                 <button
//                   onClick={() => setShowComposeModal(false)}
//                   className="px-4 py-2 border rounded-md hover:bg-gray-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={() => {
//                     setShowComposeModal(false)
//                     setShowUserSelect(true)
//                   }}
//                   className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//                 >
//                   Send
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* User Selection Modal */}
//       {showUserSelect && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-semibold">Select Users</h2>
//               <div className="text-sm text-gray-500">
//                 Selected User: {selectedUsers.length}
//               </div>
//             </div>
//             <div className="mb-4">
//               <input
//                 type="text"
//                 placeholder="Search users..."
//                 className="w-full p-2 border rounded-md"
//               />
//             </div>
//             <div className="max-h-96 overflow-y-auto">
//               {users.map((user) => (
//                 <div
//                   key={user.id}
//                   className="flex items-center justify-between p-3 hover:bg-gray-50 border-b"
//                 >
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 bg-gray-200 rounded-full" />
//                     <div>
//                       <div className="font-medium">{user.name}</div>
//                       <div className="text-sm text-gray-500">{user.email}</div>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => {
//                       setSelectedUsers(prev =>
//                         prev.includes(user.id)
//                           ? prev.filter(id => id !== user.id)
//                           : [...prev, user.id]
//                       )
//                     }}
//                     className={`px-3 py-1 rounded-full text-sm ${selectedUsers.includes(user.id)
//                         ? 'bg-green-100 text-green-800'
//                         : 'bg-gray-100 text-gray-800'
//                       }`}
//                   >
//                     {selectedUsers.includes(user.id) ? 'Selected' : 'Select'}
//                   </button>
//                 </div>
//               ))}
//             </div>
//             <div className="flex justify-end gap-2 mt-4">
//               <button
//                 onClick={() => setShowUserSelect(false)}
//                 className="px-4 py-2 border rounded-md hover:bg-gray-50"
//               >
//                 Back
//               </button>
//               <button
//                 onClick={() => {
//                   setShowUserSelect(false)
//                   // Here you would typically send the notification to selected users
//                   console.log('Sending to users:', selectedUsers)
//                   setSelectedUsers([])
//                 }}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//               >
//                 Send
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }



// const users = [
//   {
//     id: '1',
//     name: 'John Doe',
//     email: 'john@example.com',
//   },
//   {
//     id: '2',
//     name: 'Jane Smith',
//     email: 'jane@example.com',
//   },
//   {
//     id: '3',
//     name: 'Bob Johnson',
//     email: 'bob@example.com',
//   },
// ]

"use client"

import { useState, useEffect } from "react";
import { Bell } from "lucide-react";

const NotificationComponent = () => {
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [showUserSelect, setShowUserSelect] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [notificationId, setNotificationId] = useState<string | null>(null);
  const [getAll, setGetAll] = useState<string>("");

  // ✅ Send message when button is clicked, not inside useEffect
  const sendMessage = async () => {
    if (!message.trim()) {
      console.error("Message cannot be empty");
      return;
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/generate-notification`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setNotificationId(data.notificationId);
        setShowComposeModal(false);
        setShowUserSelect(true);
        setMessage(""); // ✅ Clear message after sending
        getMessage(); // ✅ Refresh notifications after sending
      } else {
        console.error("Failed to send message:", data.error);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // ✅ Fetch notifications on component mount
  const getMessage = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/get-all-notification`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setGetAll(data?.notification);
      } else {
        console.error("Failed to fetch messages:", data.error);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    getMessage();
  }, []); // ✅ Fetch notifications only on mount

  console.log("getAll", getAll);

  return (
    <div className="w-full m-3 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Notifications</h1>
        <button
          onClick={() => setShowComposeModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
        >
          <Bell className="w-4 h-4" />
          Compose New Notice
        </button>
      </div>

      {/* Compose Modal */}
      {showComposeModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Compose Message</h2>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message..."
              className="w-full p-2 border rounded-md"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowComposeModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={sendMessage}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notifications List */}
      <div className="space-y-4">
        {getAll?.length > 0 ? (
          Array.isArray(getAll) &&
          getAll?.map((notification) => (
            <div
              key={notification.id}
              className="flex items-start gap-4 p-4 bg-white rounded-lg border hover:shadow-md transition-shadow cursor-pointer"
            >
              <input type="checkbox" className="mt-2" />
              <div className="relative">
                <div className="w-10 h-10 bg-gray-200 rounded-full" />
                {notification.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-600 truncate">{notification.message}</p>
              </div>
              <div className="text-sm text-gray-500">
  {new Date(notification.createdAt).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })}
</div>

              {/* <div className="text-sm text-gray-500">{notification.createdAt}</div> */}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No notifications available</p>
        )}
      </div>
    </div>
  );
};

export default NotificationComponent;
