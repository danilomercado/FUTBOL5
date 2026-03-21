import api from "./api";

export const loginRequest = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const registerRequest = async (data) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const meRequest = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};
