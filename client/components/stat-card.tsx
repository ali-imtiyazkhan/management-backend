import { Card } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  icon: LucideIcon
  trend: string
  color: "blue" | "cyan" | "emerald" | "violet"
}

const colorClasses = {
  blue: "text-blue-400 bg-blue-500/10",
  cyan: "text-cyan-400 bg-cyan-500/10",
  emerald: "text-emerald-400 bg-emerald-500/10",
  violet: "text-violet-400 bg-violet-500/10",
}

export function StatCard({ title, value, icon: Icon, trend, color }: StatCardProps) {
  return (
    <Card className="border-slate-700 bg-slate-800/50 p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-400">{title}</p>
          <p className="mt-2 text-2xl font-bold text-white">{value}</p>
          <p className="mt-2 text-xs font-semibold text-emerald-400">{trend} from last month</p>
        </div>
        <div className={`rounded-lg p-3 ${colorClasses[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </Card>
  )
}
