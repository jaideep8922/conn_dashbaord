"use client"

import { LineChart as Chart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 400 },
  { name: "May", value: 500 },
  { name: "Jun", value: 350 },
]

const multiData = [
  { name: "Jan", app: 400, web: 240 },
  { name: "Feb", app: 300, web: 139 },
  { name: "Mar", app: 600, web: 980 },
  { name: "Apr", app: 400, web: 390 },
  { name: "May", app: 500, web: 480 },
  { name: "Jun", app: 350, web: 380 },
]

interface LineChartProps {
  variant?: "default" | "yellow" | "multi"
}

export function LineChart({ variant = "default" }: LineChartProps) {
  if (variant === "multi") {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <Chart data={multiData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="app" stroke="#8884d8" />
          <Line type="monotone" dataKey="web" stroke="#82ca9d" />
        </Chart>
      </ResponsiveContainer>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <Chart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="value"
          stroke={variant === "yellow" ? "#fbbf24" : "#8884d8"}
        />
      </Chart>
    </ResponsiveContainer>
  )
}

