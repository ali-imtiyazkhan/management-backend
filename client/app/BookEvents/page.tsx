"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar, MapPin, Users } from "lucide-react"

interface Event {
    id: number
    title: string
    date_time: string
    location: string
    capacity: number
    imageUrl?: string   // <-- Added
}

export default function BookEventsPage() {
    const [events, setEvents] = useState<Event[]>([])
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get("http://localhost:3000/events/upcoming")
                setEvents(res.data)
            } catch (error) {
                console.error("Error fetching events:", error)
            }
        }
        fetchEvents()
    }, [])

    return (
        <div className="min-h-screen bg-white text-black py-10 px-4">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8">Available Events</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.length > 0 ? (
                        events.map((event) => (
                            <div
                                key={event.id}
                                className="bg-zinc-100 rounded-xl shadow-md border border-zinc-200 p-5 hover:bg-zinc-200 transition"
                            >
                                {/* IMAGE */}
                                <img
                                    src={
                                        event.imageUrl ||
                                        "https://via.placeholder.com/400x250?text=No+Image"
                                    }
                                    alt={event.title}
                                    className="w-full h-40 object-cover rounded-lg mb-4"
                                />

                                <h3 className="text-xl font-semibold mb-2 text-black">
                                    {event.title}
                                </h3>

                                <div className="flex items-center gap-2 text-black text-sm mb-1">
                                    <Calendar className="h-4 w-4 text-black" />
                                    {new Date(event.date_time).toLocaleString()}
                                </div>

                                <div className="flex items-center gap-2 text-black text-sm mb-1">
                                    <MapPin className="h-4 w-4 text-black" />
                                    {event.location}
                                </div>

                                <div className="flex items-center gap-2 text-black text-sm mb-4">
                                    <Users className="h-4 w-4 text-black" />
                                    Capacity: {event.capacity}
                                </div>

                                <button
                                    onClick={() => router.push(`/BookEvents/${event.id}`)}
                                    disabled={loading}
                                    className="w-full bg-black hover:bg-neutral-800 text-white font-semibold rounded-lg py-2 transition disabled:opacity-50 cursor-pointer"
                                >
                                    View & Book
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-slate-400 text-sm col-span-full">
                            No upcoming events available.
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}
