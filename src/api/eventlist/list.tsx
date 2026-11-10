
import api from "../axios";

// Get All Events API
export const getAllEvents = async () => {
  const res = await api.get("/api/event/getevent");

  return Array.isArray(res.data)
    ? res.data
    : res.data.data ?? [];
};
