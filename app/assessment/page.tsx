"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useUser } from "@/context/user-context"
import { AlertCircle } from "lucide-react"

// Define assessment questions for each mental health issue
const assessmentQuestions = {
  depression: [
    {
      id: "depression1",
      question: "Little interest or pleasure in doing things",
      options: [
        { value: "0", label: "Not at all" },
        { value: "1", label: "Several days" },
        { value: "2", label: "More than half the days" },
        { value: "3", label: "Nearly every day" },
      ],
    },
    {
      id: "depression2",
      question: "Feeling down, depressed, or hopeless",
      options: [
        { value: "0", label: "Not at all" },
        { value: "1", label: "Several days" },
        { value: "2", label: "More than half the days" },
        { value: "3", label: "Nearly every day" },
      ],
    },
    {
      id: "depression3",
      question: "Trouble falling or staying asleep, or sleeping too much",
      options: [
        { value: "0", label: "Not at all" },
        { value: "1", label: "Several days" },
        { value: "2", label: "More than half the days" },
        { value: "3", label: "Nearly every day" },
      ],
    },
    {
      id: "depression4",
      question: "Feeling tired or having little energy",
      options: [
        { value: "0", label: "Not at all" },
        { value: "1", label: "Several days" },
        { value: "2", label: "More than half the days" },
        { value: "3", label: "Nearly every day" },
      ],
    },
    {
      id: "depression5",
      question: "Poor appetite or overeating",
      options: [
        { value: "0", label: "Not at all" },
        { value: "1", label: "Several days" },
        { value: "2", label: "More than half the days" },
        { value: "3", label: "Nearly every day" },
      ],
    },
  ],
  anxiety: [
    {
      id: "anxiety1",
      question: "Feeling nervous, anxious, or on edge",
      options: [
        { value: "0", label: "Not at all" },
        { value: "1", label: "Several days" },
        { value: "2", label: "More than half the days" },
        { value: "3", label: "Nearly every day" },
      ],
    },
    {
      id: "anxiety2",
      question: "Not being able to stop or control worrying",
      options: [
        { value: "0", label: "Not at all" },
        { value: "1", label: "Several days" },
        { value: "2", label: "More than half the days" },
        { value: "3", label: "Nearly every day" },
      ],
    },
    {
      id: "anxiety3",
      question: "Worrying too much about different things",
      options: [
        { value: "0", label: "Not at all" },
        { value: "1", label: "Several days" },
        { value: "2", label: "More than half the days" },
        { value: "3", label: "Nearly every day" },
      ],
    },
    {
      id: "anxiety4",
      question: "Trouble relaxing",
      options: [
        { value: "0", label: "Not at all" },
        { value: "1", label: "Several days" },
        { value: "2", label: "More than half the days" },
        { value: "3", label: "Nearly every day" },
      ],
    },
    {
      id: "anxiety5",
      question: "Being so restless that it's hard to sit still",
      options: [
        { value: "0", label: "Not at all" },
        { value: "1", label: "Several days" },
        { value: "2", label: "More than half the days" },
        { value: "3", label: "Nearly every day" },
      ],
    },
  ],
  stress: [
    {
      id: "stress1",
      question: "Been upset because of something that happened unexpectedly?",
      options: [
        { value: "0", label: "Never" },
        { value: "1", label: "Almost never" },
        { value: "2", label: "Sometimes" },
        { value: "3", label: "Fairly often" },
        { value: "4", label: "Very often" },
      ],
    },
    {
      id: "stress2",
      question: "Felt that you were unable to control the important things in your life?",
      options: [
        { value: "0", label: "Never" },
        { value: "1", label: "Almost never" },
        { value: "2", label: "Sometimes" },
        { value: "3", label: "Fairly often" },
        { value: "4", label: "Very often" },
      ],
    },
    {
      id: "stress3",
      question: "Felt nervous and stressed?",
      options: [
        { value: "0", label: "Never" },
        { value: "1", label: "Almost never" },
        { value: "2", label: "Sometimes" },
        { value: "3", label: "Fairly often" },
        { value: "4", label: "Very often" },
      ],
    },
    {
      id: "stress4",
      question: "Felt confident about your ability to handle your personal problems?",
      options: [
        { value: "4", label: "Never" },
        { value: "3", label: "Almost never" },
        { value: "2", label: "Sometimes" },
        { value: "1", label: "Fairly often" },
        { value: "0", label: "Very often" },
      ],
    },
    {
      id: "stress5",
      question: "Felt that things were going your way?",
      options: [
        { value: "4", label: "Never" },
        { value: "3", label: "Almost never" },
        { value: "2", label: "Sometimes" },
        { value: "1", label: "Fairly often" },
        { value: "0", label: "Very often" },
      ],
    },
  ],
  adhd: [
    {
      id: "adhd1",
      question:
        "How often do you have difficulty getting things in order when you have to do a task that requires organization?",
      options: [
        { value: "0", label: "Never" },
        { value: "1", label: "Rarely" },
        { value: "2", label: "Sometimes" },
        { value: "3", label: "Often" },
        { value: "4", label: "Very often" },
      ],
    },
    {
      id: "adhd2",
      question:
        "How often do you have difficulty concentrating on what people say to you, even when they are speaking to you directly?",
      options: [
        { value: "0", label: "Never" },
        { value: "1", label: "Rarely" },
        { value: "2", label: "Sometimes" },
        { value: "3", label: "Often" },
        { value: "4", label: "Very often" },
      ],
    },
    {
      id: "adhd3",
      question:
        "How often do you have trouble wrapping up the final details of a project, once the challenging parts have been done?",
      options: [
        { value: "0", label: "Never" },
        { value: "1", label: "Rarely" },
        { value: "2", label: "Sometimes" },
        { value: "3", label: "Often" },
        { value: "4", label: "Very often" },
      ],
    },
    {
      id: "adhd4",
      question:
        "How often do you have difficulty getting things done in order when you have to do a task that requires organization?",
      options: [
        { value: "0", label: "Never" },
        { value: "1", label: "Rarely" },
        { value: "2", label: "Sometimes" },
        { value: "3", label: "Often" },
        { value: "4", label: "Very often" },
      ],
    },
    {
      id: "adhd5",
      question: "How often do you have problems remembering appointments or obligations?",
      options: [
        { value: "0", label: "Never" },
        { value: "1", label: "Rarely" },
        { value: "2", label: "Sometimes" },
        { value: "3", label: "Often" },
        { value: "4", label: "Very often" },
      ],
    },
  ],
  social_media_fomo: [
    {
      id: "fomo1",
      question: "I fear others have more rewarding experiences than me",
      options: [
        { value: "0", label: "Not at all true" },
        { value: "1", label: "Slightly true" },
        { value: "2", label: "Moderately true" },
        { value: "3", label: "Very true" },
        { value: "4", label: "Extremely true" },
      ],
    },
    {
      id: "fomo2",
      question: "I fear my friends have more rewarding experiences than me",
      options: [
        { value: "0", label: "Not at all true" },
        { value: "1", label: "Slightly true" },
        { value: "2", label: "Moderately true" },
        { value: "3", label: "Very true" },
        { value: "4", label: "Extremely true" },
      ],
    },
    {
      id: "fomo3",
      question: "I get anxious when I don't know what my friends are up to",
      options: [
        { value: "0", label: "Not at all true" },
        { value: "1", label: "Slightly true" },
        { value: "2", label: "Moderately true" },
        { value: "3", label: "Very true" },
        { value: "4", label: "Extremely true" },
      ],
    },
    {
      id: "fomo4",
      question: "It's important that I understand my friends' inside jokes",
      options: [
        { value: "0", label: "Not at all true" },
        { value: "1", label: "Slightly true" },
        { value: "2", label: "Moderately true" },
        { value: "3", label: "Very true" },
        { value: "4", label: "Extremely true" },
      ],
    },
    {
      id: "fomo5",
      question: "Sometimes, I wonder if I spend too much time keeping up with what is going on",
      options: [
        { value: "0", label: "Not at all true" },
        { value: "1", label: "Slightly true" },
        { value: "2", label: "Moderately true" },
        { value: "3", label: "Very true" },
        { value: "4", label: "Extremely true" },
      ],
    },
  ],
}

export default function Assessment() {
  const router = useRouter()
  const { selectedAssessment, setSelectedAssessment, addCompletedAssessment } = useUser()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [responses, setResponses] = useState<Record<string, string>>({})
  const [score, setScore] = useState<number | null>(null)
  const [showResults, setShowResults] = useState(false)

  // Redirect if no assessment is selected
  useEffect(() => {
    if (!selectedAssessment) {
      router.push("/assessment-selection")
    }
  }, [selectedAssessment, router])

  if (!selectedAssessment) {
    return null
  }

  const questions = assessmentQuestions[selectedAssessment]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  const handleResponse = (questionId: string, value: string) => {
    setResponses({
      ...responses,
      [questionId]: value,
    })
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Calculate score
      const totalScore = Object.values(responses).reduce((sum, value) => sum + Number.parseInt(value), 0)
      setScore(totalScore)
      setShowResults(true)
      addCompletedAssessment(selectedAssessment)
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const getAssessmentTitle = () => {
    switch (selectedAssessment) {
      case "depression":
        return "Depression Assessment (PHQ-9)"
      case "anxiety":
        return "Anxiety Assessment (GAD-7)"
      case "stress":
        return "Stress Assessment (PSS)"
      case "adhd":
        return "ADHD Assessment (ASRS)"
      case "social_media_fomo":
        return "Social Media FOMO Assessment"
    }
  }

  const getAssessmentDescription = () => {
    switch (selectedAssessment) {
      case "depression":
        return "Over the past 2 weeks, how often have you been bothered by the following problems?"
      case "anxiety":
        return "Over the past 2 weeks, how often have you been bothered by the following problems?"
      case "stress":
        return "In the last month, how often have you..."
      case "adhd":
        return "How often do you experience the following?"
      case "social_media_fomo":
        return "Please rate how true each statement is for you"
    }
  }

  const getResultFeedback = () => {
    if (score === null) return ""

    switch (selectedAssessment) {
      case "depression":
        if (score <= 4) return "Minimal depression"
        if (score <= 9) return "Mild depression"
        if (score <= 14) return "Moderate depression"
        if (score <= 19) return "Moderately severe depression"
        return "Severe depression"
      case "anxiety":
        if (score <= 4) return "Minimal anxiety"
        if (score <= 9) return "Mild anxiety"
        if (score <= 14) return "Moderate anxiety"
        return "Severe anxiety"
      case "stress":
        if (score <= 13) return "Low stress"
        if (score <= 26) return "Moderate stress"
        return "High stress"
      case "adhd":
        if (score <= 16) return "Symptoms consistent with ADHD are unlikely"
        return "Symptoms may be consistent with ADHD"
      case "social_media_fomo":
        if (score <= 7) return "Low social media FOMO"
        if (score <= 14) return "Moderate social media FOMO"
        return "High social media FOMO"
    }
  }

  const getResultColor = () => {
    if (score === null) return "bg-gray-100"

    switch (selectedAssessment) {
      case "depression":
      case "anxiety":
      case "stress":
      case "adhd":
      case "social_media_fomo":
        if (score <= 7) return "bg-green-100 text-green-800"
        if (score <= 14) return "bg-yellow-100 text-yellow-800"
        return "bg-red-100 text-red-800"
    }
  }

  const getNextSteps = () => {
    if (score === null) return []

    const highScoreThreshold = selectedAssessment === "social_media_fomo" ? 15 : 14

    const commonSteps = [
      "Continue using MindfulChat for support and resources",
      "Try the exercises in the Exercises tab",
      "Track your progress over time",
    ]

    const highScoreSteps = [
      "Consider speaking with a mental health professional",
      "Explore therapy or counseling options",
      "Discuss your assessment results with your doctor",
    ]

    return score > highScoreThreshold ? [...commonSteps, ...highScoreSteps] : commonSteps
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-teal-50 to-blue-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-teal-700">{getAssessmentTitle()}</CardTitle>
          {!showResults && (
            <>
              <CardDescription className="text-slate-600">{getAssessmentDescription()}</CardDescription>
              <Progress value={progress} className="h-2 mt-2" />
            </>
          )}
        </CardHeader>
        <CardContent>
          {!showResults ? (
            <div className="space-y-4">
              <div className="space-y-3">
                <p className="font-medium text-slate-700">{questions[currentQuestion].question}</p>
                <RadioGroup
                  value={responses[questions[currentQuestion].id] || ""}
                  onValueChange={(value) => handleResponse(questions[currentQuestion].id, value)}
                >
                  {questions[currentQuestion].options.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={`${questions[currentQuestion].id}-${option.value}`} />
                      <Label htmlFor={`${questions[currentQuestion].id}-${option.value}`}>{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className={`p-4 rounded-md ${getResultColor()}`}>
                <h3 className="font-medium text-lg mb-2">Your Assessment Result</h3>
                <div className="flex justify-between items-center">
                  <span>
                    Score: {score} /{" "}
                    {questions.length *
                      (selectedAssessment === "stress" ? 4 : selectedAssessment === "social_media_fomo" ? 4 : 3)}
                  </span>
                  <span className="font-medium">{getResultFeedback()}</span>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-lg mb-2">What This Means</h3>
                <p className="text-gray-700">
                  {score !== null && score > 14 ? (
                    <>
                      Your responses indicate a higher level of {selectedAssessment.replace("_", " ")}. While this is
                      not a clinical diagnosis, it may be beneficial to discuss these results with a healthcare
                      professional.
                    </>
                  ) : (
                    <>
                      Your responses indicate a lower to moderate level of {selectedAssessment.replace("_", " ")}.
                      Continue to monitor your symptoms and use the resources available in MindfulChat.
                    </>
                  )}
                </p>
              </div>

              <div>
                <h3 className="font-medium text-lg mb-2">Recommended Next Steps</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {getNextSteps().map((step, index) => (
                    <li key={index} className="text-gray-700">
                      {step}
                    </li>
                  ))}
                </ul>
              </div>

              {score !== null && score > 14 && (
                <div className="p-4 bg-yellow-50 rounded-md flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800">Important Note</h4>
                    <p className="text-sm text-yellow-700">
                      This assessment is not a diagnostic tool. If you're experiencing severe symptoms or having
                      thoughts of harming yourself, please contact a mental health professional or emergency services
                      immediately.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {!showResults ? (
            <>
              <Button variant="outline" onClick={prevQuestion} disabled={currentQuestion === 0}>
                Back
              </Button>
              <Button
                className="bg-teal-600 hover:bg-teal-700 text-white"
                onClick={nextQuestion}
                disabled={!responses[questions[currentQuestion].id]}
              >
                {currentQuestion === questions.length - 1 ? "Submit" : "Next"}
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => router.push("/assessment-selection")}>
                Back to Assessments
              </Button>
              <Button className="bg-teal-600 hover:bg-teal-700 text-white" onClick={() => router.push("/chat")}>
                Continue to Chat
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
