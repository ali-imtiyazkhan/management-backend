"use client"
import axios from "axios"
import { useState } from "react"

const SignupPage = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      const res = await axios.post("https://management-backend-1-efov.onrender.com/users/", {
        name,
        email,
      })

      if (res.status === 201 || res.status === 200) {
        setMessage(" Account created successfully!");
        window.location.href = "/SignIn"
      } else {
        setMessage(" Something went wrong, please try again.")
      }
    } catch (error: any) {
      console.error("Signup error:", error)
      setMessage(" Failed to sign up. Check the console or API connection.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-lg border border-slate-300">
        <h1 className="text-2xl font-bold text-center text-black mb-6">Create Your Account</h1>

        <form className="space-y-4" onSubmit={handleSignUp}>
          <div>
            <label className="block text-black text-sm mb-2">Full Name</label>
            <input
              className="w-full rounded-lg border border-slate-400 bg-zinc-100 text-black px-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-black text-sm mb-2">Email Address</label>
            <input
              className="w-full rounded-lg border border-slate-400 bg-zinc-100 text-black px-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg py-2 transition-all disabled:opacity-50"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        {message && <p className="text-center mt-4 text-sm text-black">{message}</p>}

        <p className="text-center text-slate-500 text-sm mt-4">
          Already have an account?{" "}
          <a href="/SignIn" className="text-cyan-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  )
}

export default SignupPage
