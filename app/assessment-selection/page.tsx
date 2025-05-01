"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useUser, type MentalIssue } from "@/context/user-context"
import { AlertCircle, Brain, Heart, Activity, Zap } from "lucide-react"

export default function AssessmentSelection() {
  const router = useRouter()
  const { userData, setSelectedAssessment, completedAssessments } = useUser()

  // Redirect to onboarding if no user data
  useEffect(() => {
    if (!userData.name && !userData.age) {
      router.push("/onboarding")
    }
  }, [userData, router])

  const handleSelectAssessment = (issue: MentalIssue) => {
    setSelectedAssessment(issue)
    router.push("/assessment")
  }

  const getIssueIcon = (issue: MentalIssue) => {
    switch (issue) {
      case "depression":
        return <Heart className="h-6 w-6 text-red-500" />
      case "anxiety":
        return <Activity className="h-6 w-6 text-yellow-500" />
      case "stress":
        return <Zap className="h-6 w-6 text-orange-500" />
      case "adhd":
        return <Brain className="h-6 w-6 text-purple-500" />
      case "social_media_fomo":
        return <AlertCircle className="h-6 w-6 text-blue-500" />
    }
  }

  const getIssueTitle = (issue: MentalIssue) => {
    switch (issue) {
      case "depression":
        return "Depression Assessment"
      case "anxiety":
        return "Anxiety Assessment"
      case "stress":
        return "Stress Assessment"
      case "adhd":
        return "ADHD Assessment"
      case "social_media_fomo":
        return "Social Media FOMO Assessment"
    }
  }

  const getIssueDescription = (issue: MentalIssue) => {
    switch (issue) {
      case "depression":
        return "Based on the PHQ-9 questionnaire to assess depression severity"
      case "anxiety":
        return "Based on the GAD-7 questionnaire to assess anxiety levels"
      case "stress":
        return "Based on the PSS (Perceived Stress Scale) to measure stress levels"
      case "adhd":
        return "Based on the ASRS to screen for attention deficit hyperactivity disorder"
      case "social_media_fomo":
        return "Assessment for social media-related fear of missing out"
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-teal-50 to-blue-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-teal-700">Assessment Selection</CardTitle>
          <CardDescription className="text-slate-600">
            Select an assessment based on your reported mental health issues
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {userData.mental_issues_reported && userData.mental_issues_reported.length > 0 ? (
            <div className="space-y-4">
              {userData.mental_issues_reported.map((issue) => (
                <Card key={issue} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="mt-1">{getIssueIcon(issue)}</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{getIssueTitle(issue)}</h3>
                        <p className="text-sm text-gray-600 mb-3">{getIssueDescription(issue)}</p>
                        <div className="flex items-center justify-between">
                          {completedAssessments.includes(issue) ? (
                            <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                              Completed
                            </span>
                          ) : (
                            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                              Not completed
                            </span>
                          )}
                          <Button
                            size="sm"
                            className="bg-teal-600 hover:bg-teal-700"
                            onClick={() => handleSelectAssessment(issue)}
                          >
                            {completedAssessments.includes(issue) ? "Retake" : "Start"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Mental Health Issues Reported</h3>
              <p className="text-gray-600 mb-4">
                You haven't reported any mental health issues. Please update your profile to access relevant
                assessments.
              </p>
              <Button className="bg-teal-600 hover:bg-teal-700" onClick={() => router.push("/onboarding")}>
                Update Profile
              </Button>
            </div>
          )}

          <div className="pt-4">
            <Button variant="outline" className="w-full" onClick={() => router.push("/profile")}>
              Back to Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
