import api from "./api";

export const getPlayersRequest = async () => {
  const response = await api.get("/players");
  return response.data;
};

export const createPlayerRequest = async (data) => {
  const response = await api.post("/players", data);
  return response.data;
};

export const deletePlayerRequest = async (id) => {
  const response = await api.delete(`/players/${id}`);
  return response.data;
};
