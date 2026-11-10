
import api from "../axios";

// Get event details by ID
export const geteventbyid = async (id: string) => {
  const res = await api.get(`/api/event/${id}`);
  return res.data.data;
};

// Book an event
export const createBooking = async (
  eventId: string,
  seats: number
) => {
  const token = localStorage.getItem("token");

  const res = await api.post(
    `/api/book/${eventId}/book`,
    { eventId, seats },
    {
      headers: {
        Authorization: `Bearer ${token ?? ""}`
      }
    }
  );

  return res.data;
};

