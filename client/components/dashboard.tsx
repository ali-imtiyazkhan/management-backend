"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, TrendingUp, Users, BookOpen, LogOut, Plus, Ticket, ArrowRight } from "lucide-react"

interface Event {
  id: number
  title: string
  date_time: string
  location: string
  capacity: number
}

export default function DashboardHome() {
  const router = useRouter()
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalBookings: 0,
    upcoming: 0,
  })
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([])
  const [mounted, setMounted] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("authToken")
        if (!token) {
          router.push("/SignIn")
          return
        }

        const res = await axios.get("https://management-backend-1-efov.onrender.com/events/upcoming", {
          headers: { Authorization: `Bearer ${token}` },
        })

        setUpcomingEvents(res.data)
        setStats({
          totalEvents: res.data.length,
          totalBookings: Math.floor(Math.random() * 1000),
          upcoming: res.data.length,
        })
      } catch (err) {
        console.error(err)
        setMessage(" Failed to load dashboard data.")
      }
    }

    fetchDashboardData()
  }, [mounted])

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    router.push("/SignIn")
  }

  if (!mounted) return null

  return (

    <div className="bg-white">
      <div className="min-h-screen bg-white text-foreground mx-auto max-w-5xl">
        <header className="border-b border-border/40 bg-card backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-black">
                Events Dashboard
              </h1>
              <p className="text-sm text-muted-foreground mt-1">Manage and track your events</p>
            </div>
            <Button
              onClick={handleLogout}
              className="bg-destructive hover:bg-destructive/90 gap-2 rounded-lg text-black cursor-pointer"
            >
              <LogOut className="h-4 w-4 text-black" />
              Logout
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-12">
            <h2 className="text-lg font-semibold text-foreground mb-6">Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Total Events Card */}
              <Card className="p-6 bg-card border-border/40 hover:border-accent/50 transition-all duration-300 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                    <BookOpen className="h-6 w-6 text-black" />
                  </div>
                </div>
                <h3 className="text-sm font-medium text-muted-foreground">Total Events</h3>
                <p className="mt-3 text-3xl font-bold text-foreground">{stats.totalEvents}</p>
              </Card>

              {/* Total Bookings Card */}
              <Card className="p-6 bg-card border-border/40 hover:border-primary/50 transition-all duration-300 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-sm font-medium text-muted-foreground">Total Bookings</h3>
                <p className="mt-3 text-3xl font-bold text-foreground">{stats.totalBookings}</p>
              </Card>

              {/* Upcoming Events Card */}
              <Card className="p-6 bg-card border-border/40 hover:border-accent/50 transition-all duration-300 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                    <Calendar className="h-6 w-6 text-black" />
                  </div>
                </div>
                <h3 className="text-sm font-medium text-muted-foreground">Upcoming Events</h3>
                <p className="mt-3 text-3xl font-bold text-foreground">{stats.upcoming}</p>
              </Card>

              {/* Revenue Card */}
              <Card className="p-6 bg-card border-border/40 hover:border-primary/50 transition-all duration-300 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-sm font-medium text-muted-foreground">Revenue</h3>
                <p className="mt-3 text-3xl font-bold text-foreground">$48,500</p>
              </Card>
            </div>
          </div>

          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => router.push("/AddEvents")}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground gap-2 py-6 text-base font-semibold rounded-lg transition-all duration-300 cursor-pointer"
              >
                Create Event
              </Button>
              <Button
                onClick={() => router.push("/BookEvents")}
                className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground gap-2 py-6 text-base font-semibold rounded-lg transition-all duration-300 cursor-pointer"
              >
                Book Event
              </Button>
            </div>
          </div>

          <section>
            <h2 className="text-lg font-semibold mb-6 text-foreground">Upcoming Events</h2>
            {upcomingEvents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((event) => (
                  <Card
                    key={event.id}
                    className="p-6 bg-card border-border/40 hover:border-accent/60 hover:shadow-lg hover:shadow-accent/10 hover:text-black transition-all duration-300 group cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground transition-colors">
                          {event.title}
                        </h3>
                      </div>
                    </div>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 text-accent/60" />
                        <span>{new Date(event.date_time).toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4 text-primary/60" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <Button
                      onClick={() => router.push(`/BookEvents/${event.id}`)}
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground gap-2 group/btn transition-all duration-300 cursor-pointer"
                    >
                      View Details
                      <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">No upcoming events found.</p>
                <p className="text-muted-foreground/60 text-sm mt-1">Create one to get started</p>
              </div>
            )}
          </section>

          {message && <p className="text-center text-destructive mt-8 text-sm font-medium">{message}</p>}
        </main>
      </div>
    </div>

  )
}
