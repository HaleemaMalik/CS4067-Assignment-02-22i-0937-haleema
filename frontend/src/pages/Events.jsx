import { useState, useEffect } from "react";
import axios from "axios";

// const EVENT_API_URL = "/events";
const EVENT_API_URL = "/api/event/events";
const BOOKING_API_URL = "/api/booking/bookings";
const USER_API_URL = "/api/user/users";


const Events = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [bookingMessage, setBookingMessage] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token"); // Optional: Use if you have JWT auth

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(EVENT_API_URL);
        setEvents(response.data);
      } catch (err) {
        setError("❌ Failed to load events");
        console.error("Error fetching events:", err);
      }
    };

    // const checkAdmin = async () => {
    //   if (!userId) return;
    //   try {
    //     const response = await axios.get(`${USER_API_URL}/${userId}`);
    //     if (response.data.role === "admin") {
    //       setIsAdmin(true);
    //     }
    //   } catch (err) {
    //     console.error("Error checking admin status:", err);
    //   }
    // };

    fetchEvents();
    // checkAdmin();
  }, [userId]);

  const handleBookEvent = async (eventId) => {
    if (!userId) {
      setBookingMessage("⚠️ You must be logged in to book an event.");
      return;
    }

    try {
      const response = await axios.post(
        BOOKING_API_URL,
        {
          userId,
          eventId,
          status: "confirmed",
          paymentStatus: "unpaid",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBookingMessage(`✅ Booking successful for Event ID: ${eventId}`);
      console.log("Booking Success:", response.data);
    } catch (err) {
      setBookingMessage("❌ Booking failed. Please try again.");
      console.error("Error booking event:", err);
    }
  };

  const handleAddEvent = async () => {
    const title = prompt("Enter Event Title:");
    const description = prompt("Enter Event Description:");
    const date = prompt("Enter Event Date (YYYY-MM-DD):");
    const location = prompt("Enter Event Location:");
    const price = prompt("Enter Event Price:");

    if (!title || !description || !date || !location || !price) {
      alert("⚠️ All fields are required!");
      return;
    }

    try {
      const response = await axios.post(
        EVENT_API_URL,
        {
          title,
          description,
          date,
          location,
          price: parseFloat(price),
          createdBy: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEvents([...events, response.data]);
      alert("✅ Event added successfully!");
    } catch (err) {
      console.error("Error adding event:", err);
      alert("❌ Failed to add event.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Available Events</h2>

      {/* Show Add Event button */}
      {(
        <button className="btn btn-success mb-3" onClick={handleAddEvent}>
          ➕ Add Event
        </button>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
      {bookingMessage && <p style={{ color: "blue" }}>{bookingMessage}</p>}

      <div className="row">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event._id} className="col-md-4 mb-3">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{event.title}</h5>
                  <p className="card-text">{event.description}</p>
                  <p className="card-text">
                    <strong>Date:</strong>{" "}
                    {new Date(event.date).toDateString()}
                  </p>
                  <p className="card-text">
                    <strong>Location:</strong> {event.location}
                  </p>
                  <p className="card-text">
                    <strong>Price:</strong> ${event.price}
                  </p>

                  <button
                    className="btn btn-primary mt-2"
                    onClick={() => handleBookEvent(event._id)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No events available.</p>
        )}
      </div>
    </div>
  );
};

export default Events;
