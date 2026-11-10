import api from "../axios";

interface LoginPayload {
  email: string;
  password: string;
}

export const loginUser = async (payload: LoginPayload) => {
  const res = await api.post("/api/auth/login", payload);
  return res.data;
};