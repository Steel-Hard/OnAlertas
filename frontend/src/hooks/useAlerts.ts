import { useState, useEffect, useCallback } from "react";
import { UrbanAlert } from "@/types/alert";

const STORAGE_KEY = "urban-alerts";

function loadAlerts(): UrbanAlert[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveAlerts(alerts: UrbanAlert[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(alerts));
}

export function useAlerts() {
  const [alerts, setAlerts] = useState<UrbanAlert[]>(loadAlerts);

  useEffect(() => {
    saveAlerts(alerts);
  }, [alerts]);

  const addAlert = useCallback((alert: Omit<UrbanAlert, "id" | "createdAt" | "status">) => {
    const newAlert: UrbanAlert = {
      ...alert,
      id: crypto.randomUUID(),
      status: "ativo",
      createdAt: new Date().toISOString(),
    };
    setAlerts((prev) => [newAlert, ...prev]);
  }, []);

  const toggleStatus = useCallback((id: string) => {
    setAlerts((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: a.status === "ativo" ? "resolvido" : "ativo" } : a
      )
    );
  }, []);

  return { alerts, addAlert, toggleStatus };
}
