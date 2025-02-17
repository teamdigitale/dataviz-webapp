import * as auth from "./auth";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
let headers: HeadersInit | undefined = { "Content-Type": "application/json" };

/** Get a chart */
export async function getChart(id: string) {
  const token = auth.getAuth();
  if (!token) return null;
  const response = await fetch(`${SERVER_URL}/charts/${id}`, {
    method: "GET",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    return auth.logout();
  }
  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else {
    return [];
  }
}
/* List */
export async function getDashboards() {
  const token = auth.getAuth();
  if (!token) return null;
  const response = await fetch(`${SERVER_URL}/dashboards`, {
    method: "GET",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    return auth.logout();
  }
  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else {
    return [];
  }
}

export async function findById(id: string) {
  const token = auth.getAuth();
  if (!token) return null;
  const response = await fetch(`${SERVER_URL}/dashboards/${id}`, {
    method: "GET",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    return auth.logout();
  }
  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else {
    return [];
  }
}
