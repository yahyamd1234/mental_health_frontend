"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useUser } from "@/context/user-context"

export default function Profile() {
  const router = useRouter()
  const { userData } = useUser()

  // Redirect to onboarding if no user data
  useEffect(() => {
    if (!userData.name && !userData.age) {
      router.push("/onboarding")
    }
  }, [userData, router])

  const getGenerationLabel = (gen: string) => {
    switch (gen) {
      case "gen-z":
        return "Gen Z (1997-2012)"
      case "millennial":
        return "Millennial (1981-1996)"
      case "gen-x":
        return "Gen X (1965-1980)"
      case "baby-boomer":
        return "Baby Boomer (1946-1964)"
      default:
        return gen
    }
  }

  const getMentalHealthStateLabel = (state: string) => {
    switch (state) {
      case "excellent":
        return "Excellent"
      case "good":
        return "Good"
      case "fair":
        return "Fair"
      case "poor":
        return "Poor"
      case "at-risk":
        return "At Risk"
      case "in-crisis":
        return "In Crisis"
      default:
        return state
    }
  }

  const getMentalIssueLabel = (issue: string) => {
    switch (issue) {
      case "depression":
        return "Depression"
      case "anxiety":
        return "Anxiety"
      case "stress":
        return "Stress"
      case "adhd":
        return "ADHD"
      case "social_media_fomo":
        return "Social Media FOMO"
      default:
        return issue
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-teal-50 to-blue-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-teal-700">Your Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Name</h3>
              <p className="text-lg">{userData.name || "Anonymous"}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Age</h3>
                <p className="text-lg">{userData.age || "Not specified"}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Gender</h3>
                <p className="text-lg">{userData.gender || "Not specified"}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Financial Status</h3>
                <p className="text-lg">{userData.financial_status || "Not specified"}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Education</h3>
                <p className="text-lg">{userData.education || "Not specified"}</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Generation</h3>
              <p className="text-lg">{getGenerationLabel(userData.generation) || "Not specified"}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Mental Health State</h3>
              <p className="text-lg">
                {getMentalHealthStateLabel(userData.initial_mental_health_state) || "Not specified"}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Mental Health Issues</h3>
              {userData.mental_issues_reported && userData.mental_issues_reported.length > 0 ? (
                <div className="flex flex-wrap gap-2 mt-1">
                  {userData.mental_issues_reported.map((issue) => (
                    <Badge key={issue} variant="secondary" className="bg-teal-100 text-teal-800 hover:bg-teal-200">
                      {getMentalIssueLabel(issue)}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-lg">None reported</p>
              )}
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={() => router.push("/onboarding")}>
              Edit Profile
            </Button>
            <Button
              className="bg-teal-600 hover:bg-teal-700 text-white"
              onClick={() => router.push("/assessment-selection")}
            >
              Continue to Assessment
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
