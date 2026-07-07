import api from "./api";

export async function getAllDishes() {
  const response = await api.get("/today-specials");
  return response.data.data;
}

export async function getDishById(id) {
  const response = await api.get(`/today-specials/${id}`);
  return response.data.data;
}

export async function createDish(payload) {
  const response = await api.post("/today-specials", payload);
  return response.data.data;
}

export async function updateDish(id, payload) {
  const response = await api.put(`/today-specials/${id}`, payload);
  return response.data.data;
}

export async function deleteDish(id) {
  const response = await api.delete(`/today-specials/${id}`);
  return response.data.data;
}

export async function toggleDishActive(id, isActive) {
  return updateDish(id, { isActive });
}
