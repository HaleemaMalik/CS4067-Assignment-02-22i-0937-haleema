import { useState, useEffect } from "react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const userId = localStorage.getItem("userId"); // Get logged-in user ID

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Smart environment handling
        const baseURL = "/api/notification";
          // import.meta.env.VITE_NOTIFICATION_API_URL || "http://localhost:5004";

        const response = await fetch(`${baseURL}/notifications`);
        const data = await response.json();

        console.log("Fetched Notifications:", data);

        // Validate array
        if (Array.isArray(data)) {
          const userNotifications = data.filter(
            (notification) => notification.userId === userId
          );
          setNotifications(userNotifications);
        } else {
          console.error("Unexpected response format:", data);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    if (userId) fetchNotifications();
  }, [userId]);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-5">Notifications</h2>
      {notifications.length > 0 ? (
        <ul className="space-y-4">
          {notifications.map((notification) => (
            <li
              key={notification.id || notification._id}
              className="p-4 border rounded-lg bg-gray-50"
            >
              <p>
                <strong>Message:</strong> {notification.message}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Time:</strong>{" "}
                {new Date(notification.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No new notifications.</p>
      )}
    </div>
  );
};

export default Notifications;
