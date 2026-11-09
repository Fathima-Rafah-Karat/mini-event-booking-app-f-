
import React, { useState } from "react";

interface Event {
  _id: number;
  title: string;
  date: string;
  price: number;
  seats: number;
  image?: string;
}

const initialEvents: Event[] = [
  {
    _id: 1,
    title: "Tech Meetup",
    date: "12 Dec 2026",
    price: 500,
    seats: 24,
  },
  {
    _id: 2,
    title: "Music Night",
    date: "18 Dec 2026",
    price: 800,
    seats: 3,
  },
  {
    _id: 3,
    title: "Design Workshop",
    date: "05 Jan 2027",
    price: 300,
    seats: 0,
  },
];

const App: React.FC = () => {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleBooking = (id: number) => {
    setEvents((prev) =>
      prev.map((event) =>
        event._id === id && event.seats > 0
          ? { ...event, seats: event.seats - 1 }
          : event
      )
    );
  };

  return (
    <div className="min-h-screen bg-white">

      <nav className="flex min-h-10 items-center justify-between bg-slate-800 px-5 py-2 text-white">

        <h2 className=" text-white text-base font-bold ">
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

                    {event.image ? (
                      <img
                        src={event.image}
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
                    {event.date}
                  </p>

                  <div className="mb-4 flex items-center justify-between text-xs font-bold">

                    <span>
                      Rs. {event.price}
                    </span>

                    {event.seats > 0 ? (
                      <span>
                        {event.seats} seats left
                      </span>
                    ) : (
                      <span className="text-red-600">
                        SOLD OUT
                      </span>
                    )}

                  </div>

                  <button
                    disabled={event.seats === 0}
                    onClick={() => handleBooking(event._id)}
                    className={`h-7 w-full rounded text-xs font-bold transition ${
                      event.seats > 0
                        ? "bg-blue-700 text-white hover:bg-blue-800"
                        : "cursor-not-allowed border border-slate-600 bg-white text-slate-800"
                    }`}
                  >
                    {event.seats > 0 ? "View / Book" : "Sold out"}
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
