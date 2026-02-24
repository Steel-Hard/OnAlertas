import { useState } from "react";
import { AlertType, ALERT_TYPES } from "@/types/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Plus } from "lucide-react";

interface Props {
  onSubmit: (data: {
    title: string;
    description: string;
    type: AlertType;
    location: string;
  }) => void;
}

export default function AlertForm({ onSubmit }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<AlertType | "">("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return toast.error("Informe o título do alerta.");
    if (!type) return toast.error("Selecione o tipo do alerta.");
    if (!location.trim())
      return toast.error("Informe a localização.");

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      type: type as AlertType,
      location: location.trim(),
    });

    setTitle("");
    setDescription("");
    setType("");
    setLocation("");

    toast.success("Alerta criado com sucesso!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-lg border bg-card p-5"
    >
      <h2 className="text-lg font-semibold">
        Novo Alerta
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="title">Título *</Label>
          <Input
            id="title"
            placeholder="Ex: Buraco na via"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="type">Tipo *</Label>
          <Select
            value={type}
            onValueChange={(v) =>
              setType(v as AlertType)
            }
          >
            <SelectTrigger id="type">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              {ALERT_TYPES.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="location">Localização *</Label>
        <Input
          id="location"
          placeholder="Ex: Rua das Flores, 123"
          value={location}
          onChange={(e) =>
            setLocation(e.target.value)
          }
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="desc">Descrição</Label>
        <Textarea
          id="desc"
          placeholder="Detalhes do alerta..."
          rows={3}
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />
      </div>

      <Button type="submit">
        <Plus className="mr-2 h-4 w-4" />
        Criar Alerta
      </Button>
    </form>
  );
}