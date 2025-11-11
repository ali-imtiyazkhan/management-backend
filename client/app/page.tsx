"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import DashboardHome from "@/components/dashboard"

export default function Home() {
  const [token, setToken] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    console.log("token is : ", storedToken);
    if (storedToken) {
      setToken(storedToken)
    } else {

      router.push("/SignIn")
    }
  }, [router])

  if (token === null) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-600">
        Checking authentication...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <DashboardHome/>
    </div>
  )
}
