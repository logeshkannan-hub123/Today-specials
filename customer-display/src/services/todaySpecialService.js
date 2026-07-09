import api from "./api";

export async function getActiveDishes() {
  const response = await api.get("/today-specials/active");
  return response.data.data;
}
