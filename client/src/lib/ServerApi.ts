import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL || "";

export type ServerFetchOptions<TBody = any> = {
  method?: string;
  body?: TBody;
  headers?: Record<string, string>;
  revalidate?: boolean | number;
  includeAuth?: boolean;
};

export interface ServerFetchResult<T = any> {
  success: boolean;
  status: number;
  data?: T;
  error?: string;
}

export async function serverFetch<Res = any, Body = any>(
  url: string,
  options: ServerFetchOptions<Body> = {}
): Promise<ServerFetchResult<Res>> {
  const {
    method = "GET",
    body,
    headers = {},
    revalidate = false,
    includeAuth = true,
  } = options;

  // Get token from cookie (SSR safe). `cookies()` typing can vary across Next.js
  const cookieStore: any = cookies();
  const token = includeAuth ? cookieStore?.get?.("accessToken")?.value : null;

  try {
    const res = await fetch(API_BASE_URL + url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      cache: revalidate === false ? "no-store" : "force-cache",
      next:
        typeof revalidate === "number"
          ? { revalidate }
          : undefined,
    });

    if (!res.ok) {
      // Try to parse error body if available
      let errMsg = `Request failed with status ${res.status}`;
      try {
        const errBody = await res.json();
        if (errBody && typeof errBody === 'object') {
          errMsg = errBody.message || JSON.stringify(errBody);
        }
      } catch (_) {
        /* ignore json parse errors */
      }

      return {
        success: false,
        status: res.status,
        error: errMsg,
      } as ServerFetchResult<Res>;
    }

    const data = await res.json();

    return {
      success: true,
      status: res.status,
      data,
    } as ServerFetchResult<Res>;
  } catch (err) {
    return {
      success: false,
      status: 500,
      error: "Server or network error",
    };
  }
}

// Simple option + result types
type SimpleFetchOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: Record<string,string>;
  revalidate?: boolean | number;
  includeAuth?: boolean;
};

type SimpleFetchResult = {
  success: boolean;
  status: number;
  data?: any;
  error?: string;
};



// Simple serverFetch (no generics)
export async function simpleServerFetch(
  url: string,
  options: SimpleFetchOptions = {}
): Promise<SimpleFetchResult> {
  const {
    method = "GET",
    body,
    headers = {},
    revalidate = false,
    includeAuth = true,
  } = options;

  // Get token from cookie (SSR safe). `cookies()` typing can vary across Next.js
  const cookieStore: any = cookies();
  const token = includeAuth ? cookieStore?.get?.("accessToken")?.value : null;

  try {
    const res = await fetch(API_BASE_URL + url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      cache: revalidate === false ? "no-store" : "force-cache",
      next:
        typeof revalidate === "number"
          ? { revalidate }
          : undefined,
    });

    if (!res.ok) {
      // Try to parse error body if available
      let errMsg = `Request failed with status ${res.status}`;
      try {
        const errBody = await res.json();
        if (errBody && typeof errBody === 'object') {
          errMsg = errBody.message || JSON.stringify(errBody);
        }
      } catch (_) {
        /* ignore json parse errors */
      }

      return {
        success: false,
        status: res.status,
        error: errMsg,
      }
    }

    const data = await res.json();

    return {
      success: true,
      status: res.status,
      data,
    }
  } catch (err) {
    return {
      success: false,
      status: 500,
      error: "Server or network error",
    };
  }
}
