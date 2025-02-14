"use client"

import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Stats {
  fire: number;
  grass: number;
  water: number;
}

const StatsChart = ({ stats }: { stats: Stats }) => {
  const chartData = [
    { type: "🔥 Feu", count: stats.fire, fill: "hsl(var(--chart-1))" },
    { type: "🌱 Plante", count: stats.grass, fill: "hsl(var(--chart-2))" },
    { type: "💧 Eau", count: stats.water, fill: "hsl(var(--chart-3))" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistiques d'utilisation des Pokémon</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} layout="vertical">
            <YAxis dataKey="type" type="category" tickLine={false} axisLine={false} />
            <XAxis type="number" hide />
            <Tooltip formatter={(value: number) => `${value}% d'utilisation`} />
            <Bar dataKey="count" fill="#8884d8" radius={5} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default StatsChart
