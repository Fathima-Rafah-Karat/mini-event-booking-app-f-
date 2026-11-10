import api from "../axios";

export const createevent = async (payload: FormData) => {
  const res = await api.post("/api/event/create", payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
};
