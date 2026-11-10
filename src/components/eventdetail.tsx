import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

interface Event {
  _id: string;
  title: string;
  date: string;
  price: number;
  totalSeats: number;
  photo?: string;
}

const UPLOADS_URL = "http://localhost:5000/uploads";

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [seats, setSeats] = useState(1);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await axios.get(`http://localhost:5000/api/event/${id}`);
        setEvent(data.data ?? null);
      } catch (err) {
        console.error("Fetch event failed:", err);
        setError("Failed to load event. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans">

      {/* Navbar */}
      <header className="flex h-[42px] items-center justify-between bg-[#1e293b] px-[18px] text-white">
        <h2 className="text-[16px] font-bold">EventBook</h2>

        <div className="flex gap-4 text-[12px]">
          <a href="#">Events</a>
          <a href="#">My Bookings</a>
          <a href="#">Admin</a>
          <a href="#">Logout</a>
        </div>
      </header>

      {/* Content */}
      <main className="px-[18px] pt-[15px]">

        <div className="mx-auto w-full max-w-[1000px]">

          <Link to="/event" className="mb-[13px] block text-[12px] text-blue-700">
            &lt; Back to events
          </Link>

          {loading ? (
            <p className="py-[40px] text-center text-[13px] text-[#94a3b8]">
              Loading event...
            </p>
          ) : error ? (
            <p className="py-[40px] text-center text-[13px] text-red-500">
              {error}
            </p>
          ) : !event ? (
            <p className="py-[40px] text-center text-[13px] text-[#94a3b8]">
              Event not found.
            </p>
          ) : (
            <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-[420px_1fr]">

              {/* Image */}
              <div className="flex h-[200px] items-center justify-center overflow-hidden rounded-[6px] bg-[#e5e7eb] text-[13px] text-[#94a3b8]">
                {event.photo ? (
                  <img
                    src={`${UPLOADS_URL}/${event.photo}`}
                    alt={event.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  "event image"
                )}
              </div>

              {/* Details */}
              <div>

                <h1 className="mb-[13px] text-[21px] font-bold leading-[25px] text-[#1e293b]">
                  {event.title}
                </h1>

                {/* Description */}
                <p className="mb-[11px] text-[13px] leading-[20px] text-[#475569]">
                  Book your seats for {event.title} on {formatDate(event.date)}.{" "}
                  {event.totalSeats} seats available at Rs. {event.price} per seat.
                </p>

                {/* Date */}
                <div className="flex items-center gap-[14px] text-[13px] text-[#111827]">
                  <span>{formatDate(event.date)}</span>
                  <span>|</span>
                  <span>Rs. {event.price} per seat</span>
                </div>

                {/* Seats */}
                <p className="mb-[13px] mt-[17px] text-[13px] font-bold text-[#047857]">
                  Seats left: {event.totalSeats}
                </p>

                {/* Booking */}
                <div className="flex items-center gap-[18px]">

                  <label className="text-[12px] font-bold text-[#1e293b]">
                    Seats
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={seats}
                    onChange={(e) => setSeats(Number(e.target.value))}
                    className="h-[28px] w-[84px] rounded-[4px] border border-[#94a3b8] bg-white px-[8px] text-[11px] outline-none"
                  />

                  <button
                    onClick={() => setMessage("Booking successful!")}
                    className="h-[28px] w-[168px] rounded-[4px] bg-[#3454df] text-[12px] font-bold text-white hover:bg-blue-700"
                  >
                    Book Now
                  </button>

                </div>

                {/* Message */}
                <p className="mt-[36px] text-[11px] text-red-500">
                  {message || "Show success or error message"}
                </p>

              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
