"use client"

import { ApexOptions } from "apexcharts";
import { useState } from "react"
import ReactApexChart from "react-apexcharts"

interface DonutChartProps {
  registeredProducts: number[];
}

export function DonutChart({ registeredProducts }: DonutChartProps) {
  console.log("received registeredProducts prop:", registeredProducts)
  
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = () => {
    setIsClicked(!isClicked)
  }

  // Fallback if registeredProducts is a single number, e.g., [1]
  const series = Array.isArray(registeredProducts) 
    ? registeredProducts 
    : [registeredProducts, 0, 0, 0, 0]; // Default other values to 0 if it's a single number

  const options: ApexOptions  = {
    chart: {
      type: "donut",
      events: {
        click: handleClick, // Trigger the handleClick on chart click
      },
    },
    colors: ["#8884d8", "#fbbf24", "#ec4899", "#22c55e", "#ef4444"], // Custom colors
    labels: ["Completed", "Pending", "Cancelled", "Accepted", "Rejected"], 
    legend: {
      position: "bottom",
    },
    // animations: {
    //   enabled: true,
    //   easing: "easeinout",
    //   speed: 800,
    //   animateGradually: {
    //     enabled: true,
    //     delay: 150,
    //   },
    // },
  }

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <ReactApexChart
        options={options}
        series={series}
        type="donut"
        height="100%"
      />
    </div>
  )
}
