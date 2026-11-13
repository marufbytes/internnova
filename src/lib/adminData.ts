import type { AxiosError } from "axios";

/** Pull an array out of the many shapes a NestJS list endpoint may return. */
export function extractList<T = any>(data: any, ...keys: string[]): T[] {
  if (Array.isArray(data)) return data;
  for (const key of [...keys, "data", "items", "results"]) {
    if (Array.isArray(data?.[key])) return data[key];
  }
  return [];
}

/** True when the backend route/method does not exist (or the server is unreachable). */
export function isEndpointMissing(err: unknown): boolean {
  const e = err as AxiosError;
  if (!e?.response) return true;
  return [404, 405, 501].includes(e.response.status);
}

export function apiErrorMessage(err: unknown, fallback: string): string {
  const e = err as AxiosError<{ message?: string | string[] }>;
  const message = e?.response?.data?.message;
  if (Array.isArray(message)) return message.join(", ");
  return message || fallback;
}

export function fullName(u: any, fallback = "Unknown"): string {
  const joined = `${u?.firstName || ""} ${u?.lastName || ""}`.trim();
  return joined || u?.name || u?.fullName || fallback;
}

export function toDateString(value?: string | null): string {
  if (!value) return "\u2014";
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? "\u2014" : d.toISOString().slice(0, 10);
}
