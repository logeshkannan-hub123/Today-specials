import api from "./api";
import { AUTH_STORAGE_KEY } from "../utils/constants";

export async function login(username, password) {
  const response = await api.post("/auth/login", { username, password });
  const user = response.data.data;
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  return user;
}

export async function register(username, password) {
  const response = await api.post("/auth/register", { username, password });
  return response.data.data;
}

export function logout() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function getCurrentUser() {
  const raw = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  return getCurrentUser() !== null;
}
