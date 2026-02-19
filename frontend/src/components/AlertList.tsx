import { UrbanAlert, AlertType, ALERT_TYPES } from "@/types/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, AlertTriangle, MapPin, Clock } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";

interface Props {
  alerts: UrbanAlert[];
  onToggleStatus: (id: string) => void;
}

export default function AlertList({ alerts, onToggleStatus }: Props) {
  const [filterType, setFilterType] = useState<string>("all");

  const filtered = filterType === "all" ? alerts : alerts.filter((a) => a.type === filterType);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold">Alertas ({filtered.length})</h2>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filtrar por tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os tipos</SelectItem>
            {ALERT_TYPES.map((t) => (
              <SelectItem key={t} value={t}>{t}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed bg-muted/50 py-12 text-center text-muted-foreground">
          Nenhum alerta encontrado.
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((alert) => (
            <div
              key={alert.id}
              className="animate-fade-in rounded-lg border bg-card p-4 transition-shadow hover:shadow-md"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-card-foreground">{alert.title}</h3>
                    <TypeBadge type={alert.type} />
                    <StatusBadge status={alert.status} />
                  </div>
                  {alert.description && (
                    <p className="text-sm text-muted-foreground">{alert.description}</p>
                  )}
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {alert.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {format(new Date(alert.createdAt), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                    </span>
                  </div>
                </div>
                <Button
                  variant={alert.status === "ativo" ? "default" : "outline"}
                  size="sm"
                  onClick={() => onToggleStatus(alert.id)}
                  className="shrink-0"
                >
                  {alert.status === "ativo" ? (
                    <>
                      <CheckCircle2 className="mr-1 h-3.5 w-3.5" /> Resolver
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="mr-1 h-3.5 w-3.5" /> Reativar
                    </>
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TypeBadge({ type }: { type: AlertType }) {
  return <Badge variant="secondary" className="text-xs">{type}</Badge>;
}

function StatusBadge({ status }: { status: string }) {
  const isActive = status === "ativo";
  return (
    <Badge
      variant="outline"
      className={isActive ? "border-warning text-warning" : "border-success text-success"}
    >
      {isActive ? "Ativo" : "Resolvido"}
    </Badge>
  );
}
