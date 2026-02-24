import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAlerts } from "@/hooks/useAlerts";
import AlertForm from "@/components/AlertForm";
import AlertList from "@/components/AlertList";
import Dashboard from "@/components/Dashboard";
import { AlertTriangle } from "lucide-react";

const Index = () => {
  const { alerts, addAlert, toggleStatus,handleDelete } = useAlerts();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container flex items-center gap-3 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <AlertTriangle className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold leading-tight text-foreground">
              On Alertas
            </h1>
            <p className="text-xs text-muted-foreground">
              Gerenciamento de alertas em tempo real
            </p>
          </div>
        </div>
      </header>

      <main className="container py-6">
        <Tabs defaultValue="alerts" className="space-y-5">
          <TabsList>
            <TabsTrigger value="alerts">Alertas</TabsTrigger>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          </TabsList>

          <TabsContent value="alerts" className="space-y-6">
            <AlertForm onSubmit={addAlert} />
            <AlertList
              alerts={alerts}
              onToggleStatus={toggleStatus}
              onDelete={handleDelete}
            />
          </TabsContent>

          <TabsContent value="dashboard">
            <Dashboard alerts={alerts} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
