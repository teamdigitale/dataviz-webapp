const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export async function upsertChart(
  item: {
    name: string;
    description?: string;
    chart: string;
    config?: any;
    data: any;
    publish: boolean;
  },
  id?: string
) {
  const token = sessionStorage.getItem("token");
  if (!token) return null;

  const url = id ? `${SERVER_URL}/charts/${id}` : `${SERVER_URL}/charts/`;
  const payload = JSON.stringify(item);
  const method = id ? "PUT" : "POST";

  console.log("upsertChart", url, method);

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: payload,
  });
  console.log("upsertChart", response.status);
  if (response.status === 200) {
    const data = await response.json();
    return data;
  }
  return null;
}

export async function deleteChart(id: string) {
  const token = sessionStorage.getItem("token");
  if (!token) return null;

  const response = await fetch(`${SERVER_URL}/charts/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("deleteChart", response.status);
  if (response.status === 200) {
    const data = await response.json();
    return data;
  }
  return null;
}

export async function getCharts() {
  const token = sessionStorage.getItem("token");
  if (!token) return null;
  const response = await fetch(`${SERVER_URL}/charts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else {
    return [];
  }
}

export async function login({
  email,
  password,
  rememberMe,
}: {
  email: string;
  password: string;
  rememberMe?: boolean;
}) {
  const response = await fetch(`${SERVER_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (response.status === 200) {
    const data = await response.json();
    if (rememberMe) {
      console.log("remember me!");
      // localStorage.setItem("token", data.token);
    }
    sessionStorage.setItem("token", data.accessToken);
    return true;
  } else {
    const data = await response.json();
    if (data.message) {
      throw new Error(data.message);
    }
  }
}

export async function register({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const response = await fetch(`${SERVER_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (response.status === 200) {
    const data = await response.json();
    sessionStorage.setItem("token", data.accessToken);
    return true;
  } else {
    const data = await response.json();
    if (data.message) {
      throw new Error(data.message);
    }
  }
}
