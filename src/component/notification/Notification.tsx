// "use client"

// import { useState, useEffect } from "react";
// import { Bell } from "lucide-react";

// const NotificationComponent = () => {
//   const [showComposeModal, setShowComposeModal] = useState(false);
//   const [showUserSelect, setShowUserSelect] = useState(false);
//   const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
//   const [message, setMessage] = useState("");
//   const [notificationId, setNotificationId] = useState<string | null>(null);
//   const [getAll, setGetAll] = useState<string>("");

//   const sendMessage = async () => {
//     if (!message.trim()) {
//       console.error("Message cannot be empty");
//       return;
//     }
//     try {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}/generate-notification`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ message }),
//         }
//       );
//       const data = await response.json();
//       if (response.ok) {
//         setNotificationId(data.notificationId);
//         setShowComposeModal(false);
//         setShowUserSelect(true);
//         setMessage(""); // ✅ Clear message after sending
//         getMessage(); // ✅ Refresh notifications after sending
//       } else {
//         console.error("Failed to send message:", data.error);
//       }
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   const getMessage = async () => {
//     try {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}/get-all-notification`,
//         {
//           method: "GET",
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//       const data = await response.json();
//       if (response.ok) {
//         setGetAll(data?.notification);
//       } else {
//         console.error("Failed to fetch messages:", data.error);
//       }
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//     }
//   };

//   useEffect(() => {
//     getMessage();
//   }, []);


//   return (
//     <div className="w-full m-3 p-4">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-xl font-semibold">Notifications</h1>
//         <button
//           onClick={() => setShowComposeModal(true)}
//           className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
//         >
//           <Bell className="w-4 h-4" />
//           Compose New Notice
//         </button>
//       </div>

//       {/* Compose Modal */}
//       {showComposeModal && (
//         <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//             <h2 className="text-lg font-semibold mb-4">Compose Message</h2>
//             <textarea
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               placeholder="Enter your message..."
//               className="w-full p-2 border rounded-md"
//             />
//             <div className="flex justify-end gap-2 mt-4">
//               <button
//                 onClick={() => setShowComposeModal(false)}
//                 className="bg-gray-400 text-white px-4 py-2 rounded-md"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={sendMessage}
//                 className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
//               >
//                 Send
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Notifications List */}
//       <div className="space-y-4">
//         {getAll?.length > 0 ? (
//           Array.isArray(getAll) &&
//           getAll?.map((notification) => (
//             <div
//               key={notification.id}
//               className="flex items-start gap-4 p-4 bg-white rounded-lg border hover:shadow-md transition-shadow cursor-pointer"
//             >
//               <div className="relative">
//                 <div className="w-10 h-10 bg-gray-200 rounded-full" />
//                 {notification && (
//                   <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
//                 )}
//               </div>
//               <div className="flex-1 min-w-0">
//                 <p className="text-gray-600 truncate">{notification.message}</p>
//               </div>
//               <div className="text-sm text-gray-500">
//                 {new Date(notification.createdAt).toLocaleString('en-US', {
//                   year: 'numeric',
//                   month: 'short',
//                   day: 'numeric',
//                   hour: '2-digit',
//                   minute: '2-digit',
//                   hour12: true,
//                 })}
//               </div>

//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500">No notifications available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default NotificationComponent;


"use client";

import { useState, useEffect } from "react";
import { Bell } from "lucide-react";

const NotificationComponent = () => {
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [users, setUsers] = useState<{ customId: string; businessName: string }[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [notifications, setNotifications] = useState<any[]>([]);

  // ✅ Fetch users (retailers/sellers)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/get-users`);
        const data = await response.json();
        setUsers(data?.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
    getMessage(); // Fetch notifications
  }, []);

  // ✅ Handle recipient selection
  const toggleUserSelection = (customId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(customId) ? prev.filter((id) => id !== customId) : [...prev, customId]
    );
  };

  console.log("users", users)

  // ✅ Send Notification with selected recipients
  const sendMessage = async () => {
    if (!message.trim() || selectedUsers.length === 0) {
      console.error("Message and at least one recipient are required");
      return;
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/generate-notification`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, recipients: selectedUsers }),
      });
      const data = await response.json();
      if (response.ok) {
        setShowComposeModal(false);
        setMessage("");
        setSelectedUsers([]);
        getMessage(); // Refresh notifications list
      } else {
        console.error("Failed to send message:", data.error);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // ✅ Fetch Notifications
  const getMessage = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/get-all-notification`);
      const data = await response.json();
      if (response.ok) {
        setNotifications(data?.notification);
      } else {
        console.error("Failed to fetch messages:", data.error);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

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

            {/* Message Input */}
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message..."
              className="w-full p-2 border rounded-md"
            />

            {/* Select Recipients */}
            <h3 className="text-md font-semibold mt-4">Select Recipients</h3>
            <div className="max-h-40 overflow-y-auto border p-2 rounded-md mt-1">
              {users.length > 0 ? (
                <>
                  <p className="text-gray-500 my-2">Users Found: {users.length}</p> {/* ✅ Debugging */}
                  {users.map((user) => (
                    <label key={user.customId} className="flex items-center gap-2 mb-2 ">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.customId)}
                        onChange={() => toggleUserSelection(user.customId)}
                        className="w-4 h-4"
                      />
                      {user.businessName}
                    </label>
                  ))}
                </>
              ) : (
                <p className="text-gray-500">No users found</p>
              )}
            </div>


            {/* Buttons */}
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
        {notifications?.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex flex-col p-4 bg-white rounded-lg border hover:shadow-md transition-shadow cursor-pointer"
            >
              <p className="text-gray-600">{notification.message}</p>
              <div className="text-sm text-gray-500">
                {new Date(notification.createdAt).toLocaleString()}
              </div>
              <div className="text-sm text-gray-700 mt-2">
                <strong>Recipients:</strong>{" "}
                {notification.recipients?.join(", ") || "N/A"}
              </div>
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
