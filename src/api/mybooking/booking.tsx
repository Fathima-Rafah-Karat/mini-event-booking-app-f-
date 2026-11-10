import api from "../axios";

// Get My Bookings API
export const getMyBookings = async () => {
  const res = await api.get("/api/book/my-bookings");

  return res.data.bookings;
};