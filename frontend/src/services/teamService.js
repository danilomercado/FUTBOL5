import api from "./api";

export const generateTeamsRequest = async () => {
  const response = await api.post("/teams/generate");
  return response.data;
};
