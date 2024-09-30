import { useEffect, useState } from "react";
import { AuthResponse, User } from "../types/auth";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );
  const [tokenExpiry, setTokenExpiry] = useState<number | null>(() => {
    const storedExpiry = localStorage.getItem("tokenExpiry");
    return storedExpiry ? parseInt(storedExpiry, 10) : null;
  });
  const hasPermissions = (roles: string[]) => {
    for (let role of roles) {
      if (user?.roles.includes(role)) {
        return true;
      }
    }
    return false;
  };
  const logout = () => {
    setUser(null);
    setToken(null);
    setTokenExpiry(null);
    localStorage.clear();
    window.location.href = `/login`;
  };
  const authenticate = (data: AuthResponse) => {
    if (!data?.token?.accessToken) return;
    const expiryTime = Date.now() + data.token.expiresIn * 1000;
    setUser(data.user);
    setToken(data.token.accessToken);
    setTokenExpiry(expiryTime);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token.accessToken);
    localStorage.setItem("tokenExpiry", expiryTime.toString());
  };
  useEffect(() => {
    if (tokenExpiry && Date.now() >= tokenExpiry) {
      logout();
    }
  }, [tokenExpiry]);
  
  return {
    user,
    token,
    tokenExpiry,
    authenticate,
    logout,
    hasPermissions,
  };
};