"use client"
import axios from "axios"
import { useState } from "react"

export default function CreateEventForm() {
    const [title, setTitle] = useState("")
    const [date_time, setDateTime] = useState("")
    const [location, setLocation] = useState("")
    const [capacity, setCapacity] = useState("")
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")

    // --------- HANDLE FILE SELECT ---------
    const handleFileChange = (e: any) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setImageFile(file)
            setImagePreview(URL.createObjectURL(file))
        }
    }

    const handleCreateEvent = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage("")

        try {
            const token = localStorage.getItem("authToken")
            if (!token) {
                setMessage("You must be logged in to create an event.")
                setLoading(false)
                return
            }

            let uploadedImageUrl = ""

            // --------- STEP 1: UPLOAD IMAGE TO CLOUDINARY ---------
            if (imageFile) {
                const formData = new FormData()
                formData.append("image", imageFile)

                const uploadRes = await axios.post(
                    "https://management-backend-1-efov.onrender.com/api/upload",
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } }
                )

                uploadedImageUrl = uploadRes.data.url
            }

            // --------- STEP 2: CREATE EVENT ---------
            const res = await axios.post(
                "https://management-backend-1-efov.onrender.com/events",
                {
                    title,
                    date_time,
                    location,
                    capacity: Number(capacity),
                    imageUrl: uploadedImageUrl, // 👈 IMPORTANT
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            )

            if (res.status === 201) {
                setMessage("Event created successfully!")
                setTitle("")
                setDateTime("")
                setLocation("")
                setCapacity("")
                setImagePreview("")
                setImageFile(null)
                window.location.href = "/BookEvents"
            } else {
                setMessage("Something went wrong while creating the event.")
            }
        } catch (error: any) {
            console.error(error)
            setMessage(error.response?.data?.error || "Server error occurred.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
            <div className="w-full max-w-lg bg-white rounded-2xl p-8 shadow-2xl border border-slate-300">
                <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">
                    Create New Event
                </h2>

                <form onSubmit={handleCreateEvent} className="space-y-5">

                    {/* IMAGE UPLOAD */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-600 mb-2">
                            Event Image
                        </label>

                        <input type="file" accept="image/*"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-slate-600" />

                        {imagePreview && (
                            <img
                                src={imagePreview}
                                className="mt-3 w-full h-48 object-cover rounded-lg shadow"
                                alt="Preview"
                            />
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-600 mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border border-slate-300 rounded-lg px-4 py-2"
                            placeholder="Enter event title"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-600 mb-2">
                            Date & Time
                        </label>
                        <input
                            type="datetime-local"
                            value={date_time}
                            onChange={(e) => setDateTime(e.target.value)}
                            className="w-full border border-slate-300 rounded-lg px-4 py-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-600 mb-2">
                            Location
                        </label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full border border-slate-300 rounded-lg px-4 py-2"
                            placeholder="Event location"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-600 mb-2">
                            Capacity
                        </label>
                        <input
                            type="number"
                            min="1"
                            max="1000"
                            value={capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                            className="w-full border border-slate-300 rounded-lg px-4 py-2"
                            placeholder="Enter capacity (1–1000)"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white rounded-lg py-2.5 shadow-md hover:bg-neutral-800 disabled:opacity-50"
                    >
                        {loading ? "Creating..." : "Create Event"}
                    </button>
                </form>

                {message && (
                    <p className="text-center mt-5 text-sm font-medium text-slate-700">
                        {message}
                    </p>
                )}
            </div>
        </div>
    )
}
