import api from "./api";

export const getUsersRequest = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const updateUserRoleRequest = async (id, role) => {
  const response = await api.patch(`/users/${id}/role`, { role });
  return response.data;
};
