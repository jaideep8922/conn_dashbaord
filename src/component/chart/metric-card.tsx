
interface MetricCardProps {
  title: string
  value: string
  icon: React.ReactNode
}

export function MetricCard({ title, value, icon }: MetricCardProps) {
  return (
<div className="bg-white rounded-lg shadow-sm p-4 border">
  <div className="flex items-center mb-2">
    <div className="p-2 bg-gray-100 rounded-full mr-4">{icon}</div>
    <div className="flex-1"></div>
  </div>
  <div className="text-center">
    <p className="text-2xl font-semibold mb-1">{value}</p>
    <p className="text-xs text-muted-foreground">{title}</p>
  </div>
</div>

  )
}

