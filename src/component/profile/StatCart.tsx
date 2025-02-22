interface StatCardProps {
    title: string
    value: string
    viewAll?: () => void
  }
  
  export function StatCard({ title, value, viewAll }: StatCardProps) {
    return (
      <div className="rounded-lg bg-white p-4 shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">{title}</p>
            <h3 className="mt-1 text-2xl font-semibold text-gray-900">{value}</h3>
          </div>
          <button
            onClick={viewAll}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            View all →
          </button>
        </div>
      </div>
    )
  }
  
  