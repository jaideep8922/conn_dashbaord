// "use client"

// import { AreaChart as Chart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// const data = [
//   { name: "Jan", value: 400 },
//   { name: "Feb", value: 300 },
//   { name: "Mar", value: 600 },
//   { name: "Apr", value: 400 },
//   { name: "May", value: 500 },
//   { name: "Jun", value: 350 },
// ]

// export function AreaChart() {
//   return (
//     <ResponsiveContainer width="100%" height={300}>
//       <Chart data={data}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="name" />
//         <YAxis />
//         <Tooltip />
//         <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
//       </Chart>
//     </ResponsiveContainer>
//   )
// }


"use client"

import { AreaChart as Chart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface AreaChartProps {
  data: { name: string; value: number }[];
}

export function AreaChart({ data }: AreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <Chart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
      </Chart>
    </ResponsiveContainer>
  )
}
