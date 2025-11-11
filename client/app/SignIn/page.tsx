"use client"
import axios from "axios"
import { useState } from "react"

const SignInPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage("")

        try {
            const res = await axios.post("http://localhost:3000/users/Login", {
                email,
                password,
            })

            if (res.status === 200) {
                const token = res.data?.token
                if (token) {
                    localStorage.setItem("authToken", token)
                    alert("signin Successful");
                    setMessage("Login successful! Redirecting...")
                    window.location.href = "/Dashboard"
                } else {
                    setMessage("⚠️ Login response missing token.")
                }
            } else {
                setMessage("⚠️ Invalid credentials, please try again.")
            }
        } catch (error: any) {
            console.error("Login error:", error)
            setMessage(" Failed to login. Check credentials or backend connection.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
            <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-lg border border-slate-300">
                <h1 className="text-2xl font-bold text-center text-black mb-6">Welcome Back </h1>

                <form className="space-y-4" onSubmit={handleSignIn}>
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
                        {loading ? "Signing In..." : "Sign In"}
                    </button>
                </form>

                {message && <p className="text-center mt-4 text-sm text-black">{message}</p>}

                <p className="text-center text-slate-500 text-sm mt-4">
                    Don’t have an account?{" "}
                    <a href="/SignUp" className="text-cyan-600 hover:underline">
                        Create one
                    </a>
                </p>
            </div>
        </div>
    )
}

export default SignInPage
