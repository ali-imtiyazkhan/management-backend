import { Card } from "@/components/ui/card"
import { Ticket, Clock } from "lucide-react"

interface BookingCardProps {
  booking: {
    id: number
    name: string
    event: string
    date: string
    tickets: number
  }
}

export function BookingCard({ booking }: BookingCardProps) {
  return (
    <Card className="border-slate-700 bg-slate-800/50 p-4 hover:bg-slate-800/70 transition-colors">
      <div className="space-y-2">
        <div>
          <p className="font-semibold text-white text-sm">{booking.name}</p>
          <p className="text-xs text-slate-400">{booking.event}</p>
        </div>
        <div className="flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-cyan-400" />
            {booking.date}
          </div>
          <div className="flex items-center gap-1 text-emerald-400">
            <Ticket className="h-3 w-3" />
            {booking.tickets} ticket{booking.tickets !== 1 ? "s" : ""}
          </div>
        </div>
      </div>
    </Card>
  )
}
