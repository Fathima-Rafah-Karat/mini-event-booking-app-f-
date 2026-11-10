
import api from "../axios";

export const registerUser = async (payload: {
  email: string;
  password: string;
}) => {
  const res = await api.post("/api/auth/register", payload);

  return res.data.data;
};
