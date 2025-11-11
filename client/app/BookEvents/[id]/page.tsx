"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Calendar, MapPin, Users, ArrowLeft } from "lucide-react"

interface Event {
  id: number
  title: string
  date_time: string
  location: string
  capacity: number
}

export default function EventBookingPage() {
  const params = useParams()
  const router = useRouter()
  const { id } = params
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [mounted, setMounted] = useState(false)

  // ✅ Ensure localStorage exists
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || !id) return // ⛔ don't fetch before hydration

    const fetchEvent = async () => {
      try {
        const token = localStorage.getItem("authToken")
        const res = await axios.get(`http://localhost:3000/events/${id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        })
        setEvent(res.data)
      } catch (error) {
        console.error("Error fetching event:", error)
      }
    }

    fetchEvent()
  }, [mounted, id])

  const handleBookEvent = async () => {
    setLoading(true)
    setMessage("")

    try {
      const token = localStorage.getItem("authToken")
      if (!token) {
        setMessage("❌ You must be logged in to book an event.")
        setLoading(false)
        return
      }

      const res = await axios.post(
        `http://localhost:3000/events/${id}/register`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (res.status === 200) setMessage("✅ Successfully booked the event!")
    } catch (error: any) {
      setMessage(`❌ ${error.response?.data?.error || "Server error"}`)
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) return null // ⛔ render nothing until hydrated

  return (
    <div className="min-h-screen bg-slate-900 text-white px-6 py-10">
      <div className="max-w-2xl mx-auto bg-slate-800/60 rounded-xl p-8 border border-slate-700 shadow-lg">
        <button
          onClick={() => router.push("/BookEvents")}
          className="flex items-center text-slate-400 hover:text-white mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Events
        </button>

        {event ? (
          <>
            <h1 className="text-3xl font-bold text-cyan-400 mb-4">{event.title}</h1>
            <div className="space-y-2 text-slate-300">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-cyan-500" />
                {new Date(event.date_time).toLocaleString()}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-cyan-500" />
                {event.location}
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-cyan-500" />
                Capacity: {event.capacity}
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={handleBookEvent}
                disabled={loading}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg py-3 transition disabled:opacity-50"
              >
                {loading ? "Booking..." : "Book Now"}
              </button>
              {message && (
                <p className="text-center mt-4 text-sm text-emerald-400">{message}</p>
              )}
            </div>
          </>
        ) : (
          <p className="text-center text-slate-400">Loading event details...</p>
        )}
      </div>
    </div>
  )
}
