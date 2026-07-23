import apiFetch from "./api";

export function createAdminService<T>(endpoint: string) {
  const getAll = () => apiFetch<{ success: boolean; data: T[] }>(endpoint);

  const create = (payload: Partial<T>) =>
    apiFetch<{ success: boolean; data: T }>(endpoint, {
      method: "POST",
      body: JSON.stringify(payload),
    });

  const update = (id: string, payload: Partial<T>) =>
    apiFetch<{ success: boolean; data: T }>(`${endpoint}/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });

  const remove = (id: string) =>
    apiFetch<{ success: boolean }>(`${endpoint}/${id}`, { method: "DELETE" });

  return { getAll, create, update, remove };
}
