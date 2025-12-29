export type ApiError = {
  message: string;
  status?: number;
  code?: string;
  details?: unknown;
};

export type RequestOptionsQuery = Record<
  string,
  string | number | boolean | null | undefined
>;

export type RequestOptions = {
  signal?: AbortSignal;
  headers?: Record<string, string>;
  query?: RequestOptionsQuery;
};

export type ServiceConfig = {
  baseUrl: string;
  defaultHeaders?: Record<string, string>;
};
