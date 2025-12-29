import {
  ApiError,
  RequestOptions,
  RequestOptionsQuery,
  ServiceConfig,
} from "@/types/base-api";

const DEFAULT_CONFIG: ServiceConfig = {
  baseUrl: import.meta.env.VITE_API_BASE_URL ?? "",
  defaultHeaders: {
    "Content-Type": "application/json",
  },
};

const buildQueryString = (query?: RequestOptionsQuery) => {
  if (!query) return "";
  const params = new URLSearchParams();

  Object.entries(query).forEach(([k, v]) => {
    if (v === undefined || v === null) return;
    params.set(k, String(v));
  });

  const qs = params.toString();
  return qs ? `?${qs}` : "";
};

const parseError = async (res: Response): Promise<ApiError> => {
  let details: unknown = undefined;

  try {
    details = await res.json();
  } catch {
    console.error("Error in parser");
  }

  return {
    message:
      (typeof details === "object" &&
        details !== null &&
        "message" in details &&
        typeof details.message === "string" &&
        details.message) ||
      res.statusText ||
      "Request failed",
    status: res.status,
    details,
  };
};

export class BaseService {
  private config: ServiceConfig;

  constructor(config: Partial<ServiceConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  get<T>(path: string, options?: RequestOptions) {
    return this.request<T>("GET", path, undefined, options);
  }

  post<T>(path: string, body?: unknown, options?: RequestOptions) {
    return this.request<T>("POST", path, body, options);
  }

  put<T>(path: string, body?: unknown, options?: RequestOptions) {
    return this.request<T>("PUT", path, body, options);
  }

  patch<T>(path: string, body?: unknown, options?: RequestOptions) {
    return this.request<T>("PATCH", path, body, options);
  }

  delete<T>(path: string, options?: RequestOptions) {
    return this.request<T>("DELETE", path, undefined, options);
  }

  private async request<T>(
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    path: string,
    body?: unknown,
    options: RequestOptions = {}
  ): Promise<T> {
    const url = `${this.config.baseUrl}${path}${buildQueryString(
      options.query
    )}`;

    const res = await fetch(url, {
      method,
      signal: options.signal,
      headers: {
        ...(this.config.defaultHeaders ?? {}),
        ...(options.headers ?? {}),
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });

    if (!res.ok) {
      throw await parseError(res);
    }

    // Some endpoints might return 204 No Content
    if (res.status === 204) return undefined as T;

    return (await res.json()) as T;
  }
}

export const api = new BaseService();
