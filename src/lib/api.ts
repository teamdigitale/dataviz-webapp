import * as auth from "./auth";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

let headers: HeadersInit | undefined = { "Content-Type": "application/json" };

/** Upsert */
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
  const token = auth.getAuth();
  if (!token) return null;

  const url = id ? `${SERVER_URL}/charts/${id}` : `${SERVER_URL}/charts/`;
  const payload = JSON.stringify(item);
  const method = id ? "PUT" : "POST";

  const response = await fetch(url, {
    method,
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
    body: payload,
  });
  console.log("UPSERT-CHART", response.status);

  if (response.status === 401) {
    return auth.logout();
  }

  if (response.status === 200) {
    const data = await response.json();
    return data;
  }

  return null;
}

/** Delete */
export async function deleteChart(id: string) {
  const token = auth.getAuth();
  if (!token) return null;

  const response = await fetch(`${SERVER_URL}/charts/${id}`, {
    method: "DELETE",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("deleteChart", response.status);
  if (response.status === 401) {
    return auth.logout();
  }
  if (response.status === 200) {
    const data = await response.json();
    return data;
  }
  return null;
}

/** List */
export async function getCharts() {
  const token = auth.getAuth();
  if (!token) return null;
  const response = await fetch(`${SERVER_URL}/charts`, {
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

/** Login */
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
    headers,
    body: JSON.stringify({ email, password }),
  });
  if (response.status === 200) {
    const data = await response.json();

    auth.saveAuth(data.accessToken, rememberMe || false);
    return true;
  } else {
    const data = await response.json();
    if (data.message) {
      throw new Error(data.message);
    }
  }
}

/** Register */
export async function register({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const response = await fetch(`${SERVER_URL}/auth/register`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password }),
  });
  if (response.status === 200) {
    const data = await response.json();
    auth.saveAuth(data.accessToken, false);
    return true;
  } else {
    const data = await response.json();
    if (data.message) {
      throw new Error(data.message);
    }
  }
}

export async function showChart(id: string) {
  const response = await fetch(`${SERVER_URL}/charts/show/${id}`, {
    method: "GET",
    headers,
  });
  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else {
    return [];
  }
}

type FetcherProps = {
  path: string;
  method: string;
  open?: boolean;
};
const fetcher = ({ path, method = "GET", open = true }: FetcherProps) => {
  let options = {
    method,
    headers,
  };
  if (!open) {
    const token = auth.getAuth();
    options.headers = { ...headers, Authorization: `Bearer ${token}` };
  }
  fetch(`${SERVER_URL}/${path}`, options).then((res) => res.json());
};

// function useApi() {
//   let path = "/charts";
//   const { data, error, isLoading } = useSWR(path, getCharts);
//   return { data, error, isLoading };
// }
