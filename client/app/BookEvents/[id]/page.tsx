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
  imageUrl?: string   // <-- added
}

export default function EventBookingPage() {
  const params = useParams()
  const router = useRouter()
  const { id } = params
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || !id) return

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
        setMessage(" You must be logged in to book an event.")
        setLoading(false)
        return
      }

      const res = await axios.post(
        `http://localhost:3000/events/${id}/register`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (res.status === 200) setMessage(" Successfully booked the event!")
    } catch (error: any) {
      setMessage(` ${error.response?.data?.error || "Server error"}`)
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-white text-black px-6 py-10">
      <div className="max-w-2xl mx-auto bg-zinc-100 rounded-xl p-8 border border-zinc-200 shadow-lg">

        {/* BACK BUTTON */}
        <button
          onClick={() => router.push("/BookEvents")}
          className="flex items-center text-black hover:text-neutral-800 mb-4 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Events
        </button>

        {event ? (
          
          <>
            {/* EVENT IMAGE */}
            <img
              src={event.imageUrl || "https://via.placeholder.com/800x400?text=No+Image"}
              alt={event.title}
              className="w-full h-56 object-cover rounded-lg shadow mb-5"
            />

            {/* EVENT DETAILS */}
            <h1 className="text-3xl font-bold text-black mb-4">
              {event.title}
            </h1>

            <div className="space-y-2 text-slate-300">
              <div className="flex items-center gap-2 text-black">
                <Calendar className="h-5 w-5 text-black" />
                {new Date(event.date_time).toLocaleString()}
              </div>

              <div className="flex items-center gap-2 text-black">
                <MapPin className="h-5 w-5 text-black" />
                {event.location}
              </div>

              <div className="flex items-center gap-2 text-black">
                <Users className="h-5 w-5 text-black" />
                Capacity: {event.capacity}
              </div>
            </div>

            {/* BOOK BUTTON */}
            <div className="mt-8">
              <button
                onClick={handleBookEvent}
                disabled={loading}
                className="w-full bg-black hover:bg-neutral-800 cursor-pointer text-white font-semibold rounded-lg py-3 transition disabled:opacity-50"
              >
                {loading ? "Booking..." : "Book Now"}
              </button>

              {message && (
                <p className="text-center mt-4 text-sm text-black">{message}</p>
              )}
            </div>
          </>
        ) : (
          <p className="text-center text-black">Loading event details...</p>
        )}
      </div>
    </div>
  )
}
