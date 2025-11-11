"use client"

import { useRouter } from "next/navigation"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Calendar, Users, TrendingUp, BookOpen } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { EventCard } from "./event-card"
import { BookingCard } from "./booking-card"
import { StatCard } from "./stat-card"

const mockEventData = [
  { month: "Jan", events: 12, bookings: 45 },
  { month: "Feb", events: 19, bookings: 52 },
  { month: "Mar", events: 15, bookings: 48 },
  { month: "Apr", events: 22, bookings: 61 },
  { month: "May", events: 18, bookings: 55 },
  { month: "Jun", events: 25, bookings: 68 },
]

const mockUpcomingEvents = [
  {
    id: 1,
    title: "Tech Conference 2025",
    date: "2025-12-15",
    time: "09:00 AM",
    location: "San Francisco, CA",
    attendees: 245,
    status: "confirmed",
  },
  {
    id: 2,
    title: "Product Launch Event",
    date: "2025-12-18",
    time: "02:00 PM",
    location: "New York, NY",
    attendees: 189,
    status: "confirmed",
  },
  {
    id: 3,
    title: "Networking Mixer",
    date: "2025-12-22",
    time: "06:00 PM",
    location: "Los Angeles, CA",
    attendees: 156,
    status: "pending",
  },
] as const

const mockRecentBookings = [
  { id: 1, name: "Sarah Johnson", event: "Tech Conference 2025", date: "2 hours ago", tickets: 2 },
  { id: 2, name: "Michael Chen", event: "Product Launch Event", date: "4 hours ago", tickets: 1 },
  { id: 3, name: "Emma Williams", event: "Networking Mixer", date: "6 hours ago", tickets: 3 },
]

export function Dashboard() {
  const router = useRouter();

  function handleCreateEvents() {
    router.push("/BookEvents")
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-950/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Events Dashboard</h1>
              <p className="mt-1 text-slate-400">Manage and track your events and bookings</p>
            </div>
            <Button onClick={handleCreateEvents} className="bg-blue-600 hover:bg-blue-700">
              Create Event
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Events" value="128" icon={BookOpen} trend="+12%" color="blue" />
          <StatCard title="Total Bookings" value="1,245" icon={Users} trend="+8%" color="cyan" />
          <StatCard title="Upcoming Events" value="12" icon={Calendar} trend="+3" color="emerald" />
          <StatCard title="Revenue" value="$48,500" icon={TrendingUp} trend="+24%" color="violet" />
        </div>

        
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
         
          <Card className="border-slate-700 bg-slate-800/50 p-6">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
              <TrendingUp className="h-5 w-5 text-cyan-400" />
              Events & Bookings Trend
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={mockEventData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569" }}
                  cursor={{ stroke: "#60a5fa" }}
                />
                <Legend />
                <Line type="monotone" dataKey="events" stroke="#06b6d4" strokeWidth={2} dot={{ fill: "#06b6d4" }} />
                <Line type="monotone" dataKey="bookings" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: "#8b5cf6" }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

        
          <Card className="border-slate-700 bg-slate-800/50 p-6">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
              <BarChart className="h-5 w-5 text-violet-400" />
              Event Status Distribution
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={[
                  { status: "Confirmed", value: 85 },
                  { status: "Pending", value: 28 },
                  { status: "Completed", value: 15 },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="status" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569" }}
                  cursor={{ fill: "#1e293b" }}
                />
                <Bar dataKey="value" fill="#06b6d4" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

      
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-cyan-400" />
              <h3 className="text-lg font-semibold text-white">Upcoming Events</h3>
            </div>
            <div className="space-y-4">
              {mockUpcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>

       
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-emerald-400" />
              <h3 className="text-lg font-semibold text-white">Recent Bookings</h3>
            </div>
            <div className="space-y-3">
              {mockRecentBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
