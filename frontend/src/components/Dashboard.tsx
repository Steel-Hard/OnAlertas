import { UrbanAlert, ALERT_TYPES } from "@/types/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface Props {
  alerts: UrbanAlert[];
}

const COLORS = [
  "hsl(210, 100%, 50%)",
  "hsl(35, 92%, 50%)",
  "hsl(0, 72%, 51%)",
  "hsl(142, 71%, 45%)",
  "hsl(270, 60%, 55%)",
];

export default function Dashboard({ alerts }: Props) {
  const totalActive = alerts.filter((a) => a.status === "ativo").length;
  const totalResolved = alerts.filter((a) => a.status === "resolvido").length;

  const byType = ALERT_TYPES.map((type, i) => ({
    name: type,
    total: alerts.filter((a) => a.type === type).length,
    ativos: alerts.filter((a) => a.type === type && a.status === "ativo").length,
    resolvidos: alerts.filter((a) => a.type === type && a.status === "resolvido").length,
    fill: COLORS[i],
  }));

  const pieData = [
    { name: "Ativos", value: totalActive, fill: "hsl(35, 92%, 50%)" },
    { name: "Resolvidos", value: totalResolved, fill: "hsl(142, 71%, 45%)" },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Dashboard</h2>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Total" value={alerts.length} />
        <StatCard label="Ativos" value={totalActive} className="border-warning/30" />
        <StatCard label="Resolvidos" value={totalResolved} className="border-success/30" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Alertas por Tipo</CardTitle>
          </CardHeader>
          <CardContent className="h-[260px]">
            {alerts.length === 0 ? (
              <EmptyChart />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={byType}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,20%,88%)" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="ativos" stackId="a" fill="hsl(35, 92%, 50%)" name="Ativos" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="resolvidos" stackId="a" fill="hsl(142, 71%, 45%)" name="Resolvidos" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Status Geral</CardTitle>
          </CardHeader>
          <CardContent className="flex h-[260px] items-center justify-center">
            {alerts.length === 0 ? (
              <EmptyChart />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                    {pieData.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ label, value, className = "" }: { label: string; value: number; className?: string }) {
  return (
    <Card className={className}>
      <CardContent className="flex flex-col items-center justify-center py-5">
        <span className="text-3xl font-bold text-foreground">{value}</span>
        <span className="text-sm text-muted-foreground">{label}</span>
      </CardContent>
    </Card>
  );
}

function EmptyChart() {
  return <p className="text-sm text-muted-foreground">Sem dados para exibir.</p>;
}
