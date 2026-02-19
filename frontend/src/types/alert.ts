export type AlertType = "Alagamento" | "Deslizamento" | "Incêndio" | "Acidente" | "Outro";

export type AlertStatus = "ativo" | "resolvido";

export interface UrbanAlert {
  id: string;
  title: string;
  description: string;
  type: AlertType;
  status: AlertStatus;
  location: string;
  createdAt: string; // ISO string
}

export const ALERT_TYPES: AlertType[] = ["Alagamento", "Deslizamento", "Incêndio", "Acidente", "Outro"];
