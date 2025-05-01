"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-teal-50 to-blue-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-teal-700">MindfulChat</CardTitle>
          <CardDescription className="text-slate-600">A safe space to talk about your mental health</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-slate-700">
            MindfulChat is here to provide support, resources, and a listening ear when you need it.
          </p>
          <div className="flex justify-center">
            <Button className="bg-teal-600 hover:bg-teal-700 text-white" onClick={() => router.push("/onboarding")}>
              Get Started
            </Button>
          </div>
          <p className="text-xs text-center text-slate-500 mt-6">
            Note: This is a mockup. MindfulChat is not a replacement for professional mental health services. If you're
            experiencing a crisis, please contact emergency services or a mental health professional.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
