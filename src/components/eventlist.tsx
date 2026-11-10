
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Event {
  _id: string;
  title: string;
  date: string;
  price: number;
  totalSeats: number;
  photo?: string;
}

const EVENTS_URL = "http://localhost:5000/api/event/getevent";

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const App: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await axios.get(EVENTS_URL);
        setEvents(Array.isArray(data) ? data : data.data ?? []);
      } catch (err) {
        console.error("Fetch events failed:", err);
        setError("Failed to load events. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleBooking = (id: string) => {
    setEvents((prev) =>
      prev.map((event) =>
        event._id === id && event.totalSeats > 0
          ? { ...event, totalSeats: event.totalSeats - 1 }
          : event
      )
    );
  };

  return (
    <div className="min-h-screen bg-white">

      <nav className="flex min-h-10 items-center justify-between bg-slate-800 px-5 py-2 text-white">

        <h2 className=" text-white text-base font-bold tracking-[1px] ">
          EventBook
        </h2>

        <div className="flex items-center gap-4 text-xs">
          <a href="#events" className="hover:text-blue-300">Events</a>
          <a href="#bookings" className="hover:text-blue-300">My Bookings</a>
          <a href="#admin" className="hover:text-blue-300">Admin</a>
          <a href="#logout" className="hover:text-blue-300">Logout</a>
        </div>

      </nav>

      <main className="p-6" id="events">

 
        <div className="mb-6 flex gap-3">

          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-7 flex-1 rounded-md border border-slate-400 px-2 text-xs outline-none focus:border-blue-600"
          />

          <button
            onClick={() => setError("")}
            className="h-7 w-28 rounded-md bg-blue-700 text-xs font-bold text-white hover:bg-blue-800"
          >
            Search
          </button>

        </div>

 
        {error && (
          <p className="mb-4 text-sm text-red-500">
            {error}
          </p>
        )}

        {loading ? (
          <p className="py-10 text-center text-sm text-slate-500">
            Loading events...
          </p>
        ) : (

          <>


            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

              {filteredEvents.map((event) => (

                <div
                  key={event._id}
                  className="rounded-md border border-slate-400 p-5"
                >


                  <div className="mb-2 flex h-50 w-full items-center justify-center overflow-hidden rounded bg-gray-200 text-xs text-slate-400">

                    {event.photo ? (
                      <img
                        src={event.photo}
                        alt={event.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      "image"
                    )}

                  </div>

                  <h3 className="mb-1 text-sm font-bold text-slate-900">
                    {event.title}
                  </h3>

                  <p className="mb-1 text-xs text-slate-400">
                    {formatDate(event.date)}
                  </p>

                  <div className="mb-4 flex items-center justify-between text-xs font-bold">

                    <span>
                      Rs. {event.price}
                    </span>

                    {event.totalSeats > 0 ? (
                      <span>
                        {event.totalSeats} seats left
                      </span>
                    ) : (
                      <span className="text-red-600">
                        SOLD OUT
                      </span>
                    )}

                  </div>

                  <button
                    disabled={event.totalSeats === 0}
                    onClick={() => handleBooking(event._id)}
                    className={`h-7 w-full rounded text-xs font-bold transition ${
                      event.totalSeats > 0
                        ? "bg-blue-700 text-white hover:bg-blue-800"
                        : "cursor-not-allowed border border-slate-600 bg-white text-slate-800"
                    }`}
                  >
                    {event.totalSeats > 0 ? "View / Book" : "Sold out"}
                  </button>

                </div>

              ))}

            </div>

            {filteredEvents.length === 0 && (
              <div className="py-10 text-center text-sm text-slate-500">
                No events found.
              </div>
            )}

          </>

        )}

       

      </main>

    </div>
  );
};

export default App;
