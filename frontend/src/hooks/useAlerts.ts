import { useState, useEffect, useCallback } from "react";
import { UrbanAlert } from "@/types/alert";

const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:8080";

export function useAlerts() {
  const [alerts, setAlerts] = useState<UrbanAlert[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/api/alerts`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: UrbanAlert[] = await res.json();
        if (mounted) setAlerts(data);
      } catch (err: any) {
        if (mounted) setError(err?.message ?? "Erro ao carregar alertas");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const addAlert = useCallback(
    async (alert: Omit<UrbanAlert, "id" | "createdAt" | "status">) => {
      setError(null);
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/api/alerts`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(alert),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const created: UrbanAlert = await res.json();
        setAlerts((prev) => [created, ...prev]);
        return created;
      } catch (err: any) {
        setError(err?.message ?? "Erro ao criar alerta");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const toggleStatus = useCallback(
    async (id: string) => {
      setError(null);
      setLoading(true);
      try {
        const current = alerts.find((a) => a.id === id);
        if (!current) throw new Error("Alerta não encontrado");
        const newStatus = current.status === "ativo" ? "resolvido" : "ativo";
        const updatedObj: UrbanAlert = { ...current, status: newStatus };

        const res = await fetch(`${API_BASE}/api/alerts/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedObj),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const updated: UrbanAlert = await res.json();
        setAlerts((prev) => prev.map((a) => (a.id === id ? updated : a)));
        return updated;
      } catch (err: any) {
        setError(err?.message ?? "Erro ao atualizar status");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [alerts]
  );

  const refresh = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/alerts`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: UrbanAlert[] = await res.json();
      setAlerts(data);
    } catch (err: any) {
      setError(err?.message ?? "Erro ao recarregar alertas");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { alerts, loading, error, addAlert, toggleStatus, refresh };
}
