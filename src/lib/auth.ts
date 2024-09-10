import { useEffect, useState } from "react";

function getItem(name: string) {
  return sessionStorage.getItem(name) || localStorage.getItem(name);
}

export function isAuth() {
  const token = getItem("token");
  return token ? true : false;
}

export function getAuth() {
  return getItem("token");
}

export function saveAuth(token: string, remember: boolean) {
  if (remember) {
    localStorage.setItem("token", token);
  } else {
    sessionStorage.setItem("token", token);
  }
}

export function logout() {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
  try {
    window.location.reload();
  } catch (error) {}
}

export function useAuth() {
  const item = getItem("token");
  const [auth, setAuth] = useState(isAuth());
  useEffect(() => {
    setAuth(isAuth());
  }, [item]);
  return auth;
}
