import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./navbar";

interface EventInfo {
  title: string;
  date: string;
  price: number;
}

interface Booking {
  _id: string;
  eventId: EventInfo;
  seats: number;
  totalPrice: number;
}

const BOOKINGS_URL = "http://localhost:5000/api/book/my-bookings";

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const MyBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(BOOKINGS_URL, {
          headers: { Authorization: `Bearer ${token ?? ""}` },
        });
        const list: Booking[] = Array.isArray(data?.bookings)
          ? data.bookings
          : [];
        setBookings(list);
      } catch (err) {
        console.error("Fetch bookings failed:", err);
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          setError("Please login to view your bookings.");
        } else {
          setError("Failed to load bookings. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="p-6" id="bookings">
        <h1 className="mb-5 text-[28px] font-bold text-black">My Bookings</h1>

        <div className="w-full overflow-hidden rounded-[6px] border border-slate-200">
          {/* Header row */}
          <div className="grid grid-cols-4 bg-[#e5e7eb] px-6 py-4 text-[14px] font-bold text-black">
            <span>Event</span>
            <span>Date</span>
            <span>Seats</span>
            <span>Total</span>
          </div>

          {loading ? (
            <p className="px-6 py-10 text-center text-sm text-slate-500">
              Loading bookings...
            </p>
          ) : error ? (
            <p className="px-6 py-10 text-center text-sm text-red-500">
              {error}
            </p>
          ) : bookings.length === 0 ? (
            <p className="px-6 py-10 text-center text-sm text-slate-500">
              No bookings found.
            </p>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking._id}
                className="grid grid-cols-4 border-t border-slate-200 px-6 py-5 text-[14px] text-black"
              >
                <span>{booking.eventId?.title ?? "—"}</span>
                <span>
                  {booking.eventId?.date
                    ? formatDate(booking.eventId.date)
                    : "—"}
                </span>
                <span>{booking.seats}</span>
                <span>Rs. {booking.totalPrice}</span>
              </div>
            ))
          )}
        </div>

       
      </main>
    </div>
  );
};

export default MyBookings;
