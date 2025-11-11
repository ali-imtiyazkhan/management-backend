import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users } from "lucide-react"

interface EventCardProps {
  event: {
    id: number
    title: string
    date: string
    time: string
    location: string
    attendees: number
    status: "confirmed" | "pending" | "completed" | "cancelled"
  }
}

export function EventCard({ event }: EventCardProps) {
  // 🎨 Dynamic badge color based on event status
  const statusColorMap: Record<EventCardProps["event"]["status"], string> = {
    confirmed: "bg-emerald-500/20 text-emerald-300 border border-emerald-600/30",
    pending: "bg-amber-500/20 text-amber-300 border border-amber-600/30",
    completed: "bg-blue-500/20 text-blue-300 border border-blue-600/30",
    cancelled: "bg-rose-500/20 text-rose-300 border border-rose-600/30",
  }

  return (
    <Card className="border-slate-700 bg-slate-800/50 p-4 hover:bg-slate-800/70 transition-all duration-200">
      <div className="flex items-start justify-between gap-4">
        {/* Left Section */}
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h4 className="font-semibold text-white">{event.title}</h4>
            <Badge className={`text-xs font-medium ${statusColorMap[event.status]}`}>
              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
            </Badge>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-cyan-400" />
              {event.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-cyan-400" />
              {event.time}
            </div>
            <div className="col-span-2 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-cyan-400" />
              {event.location}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-1 rounded-full bg-slate-700/50 px-3 py-1">
            <Users className="h-4 w-4 text-cyan-400" />
            <span className="text-sm font-medium text-white">{event.attendees}</span>
          </div>

          <Button
            size="sm"
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent transition-colors"
          >
            View Details
          </Button>
        </div>
      </div>
    </Card>
  )
}
