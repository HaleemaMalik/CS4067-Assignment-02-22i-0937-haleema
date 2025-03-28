import { useState, useEffect } from "react";

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const userId = localStorage.getItem("userId"); // Get logged-in user ID

  useEffect(() => {
    fetch("/api/booking/bookings/")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Bookings Data:", data); // Debugging

        // Filter bookings to show only those for the logged-in user
        const userBookings = data.filter((booking) => booking.userId === userId);
        setBookings(userBookings);
      })
      .catch((error) => console.error("Error fetching bookings:", error));
  }, [userId]);

  // Function to update payment status to "paid"
  const markAsPaid = async (bookingId) => {
    try {
      const response = await fetch(`/api/booking/bookings/${bookingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentStatus: "paid" }),
      });

      if (!response.ok) throw new Error("Failed to update payment status");

      // Update state to reflect payment change
      setBookings(bookings.map((booking) =>
        booking.id === bookingId ? { ...booking, paymentStatus: "paid" } : booking
      ));

      alert("✅ Payment marked as paid!");
    } catch (error) {
      console.error("Error updating payment status:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-5">Your Bookings</h2>
      {bookings.length > 0 ? (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id} className="p-3 border-b">
              <strong>Booking ID:</strong> {booking.id} <br />
              <strong>Status:</strong> {booking.status} <br />
              <strong>Payment:</strong> {booking.paymentStatus} <br />
              <strong>Date:</strong> {new Date(booking.createdAt).toLocaleString()} <br />
              
              {/* Show "Mark as Paid" button only if paymentStatus is "unpaid" */}
              {booking.paymentStatus === "unpaid" && (
                <button 
                  className="bg-green-500 text-black px-3 py-1 rounded mt-2"
                  onClick={() => markAsPaid(booking.id)}
                >
                  Mark as Paid
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings available.</p>
      )}
    </div>
  );
};

export default Booking;
