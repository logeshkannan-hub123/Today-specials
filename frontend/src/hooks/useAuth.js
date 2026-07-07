import { useCallback, useState } from "react";
import * as authService from "../services/authService";

export function useAuth() {
  const [user, setUser] = useState(() => authService.getCurrentUser());

  const login = useCallback(async (username, password) => {
    const loggedInUser = await authService.login(username, password);
    setUser(loggedInUser);
    return loggedInUser;
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
  }, []);

  return {
    user,
    isAuthenticated: Boolean(user),
    login,
    logout,
  };
}
