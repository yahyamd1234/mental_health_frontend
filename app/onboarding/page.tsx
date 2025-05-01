"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useUser, type MentalIssue } from "@/context/user-context"

export default function Onboarding() {
  const router = useRouter()
  const { userData, setUserData } = useUser()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: userData.name || "",
    age: userData.age || "",
    gender: userData.gender || "",
    financial_status: userData.financial_status || "",
    education: userData.education || "",
    mental_issues_reported: userData.mental_issues_reported.length > 0 ? userData.mental_issues_reported : [],
    generation: userData.generation || "",
    initial_mental_health_state: userData.initial_mental_health_state || "",
    consent: false,
  })

  const totalSteps = 3
  const progress = (step / totalSteps) * 100

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleRadioChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    if (name === "consent") {
      setFormData({
        ...formData,
        consent: checked,
      })
    } else {
      // Handle mental issues checkboxes
      const issue = name as MentalIssue
      const updatedIssues = checked
        ? [...formData.mental_issues_reported, issue]
        : formData.mental_issues_reported.filter((i) => i !== issue)

      setFormData({
        ...formData,
        mental_issues_reported: updatedIssues,
      })
    }
  }

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      // Save user data to context
      setUserData({
        name: formData.name,
        age: formData.age,
        gender: formData.gender,
        financial_status: formData.financial_status,
        education: formData.education,
        mental_issues_reported: formData.mental_issues_reported,
        generation: formData.generation,
        initial_mental_health_state: formData.initial_mental_health_state,
      })
      router.push("/profile")
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-teal-50 to-blue-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-teal-700">User Information</CardTitle>
          <CardDescription className="text-slate-600">
            Step {step} of {totalSteps}:{" "}
            {step === 1 ? "Personal Information" : step === 2 ? "Mental Health" : "Privacy & Consent"}
          </CardDescription>
          <Progress value={progress} className="h-2 mt-2" />
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 1 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="name">Name / Nickname (can be anonymous)</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="How would you like to be called?"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Select value={formData.age} onValueChange={(value) => handleSelectChange("age", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your age group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under18">Under 18</SelectItem>
                    <SelectItem value="18-24">18-24</SelectItem>
                    <SelectItem value="25-34">25-34</SelectItem>
                    <SelectItem value="35-44">35-44</SelectItem>
                    <SelectItem value="45+">45+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Gender (optional)</Label>
                <RadioGroup value={formData.gender} onValueChange={(value) => handleRadioChange("gender", value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="non-binary" id="non-binary" />
                    <Label htmlFor="non-binary">Non-binary</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="prefer-not-to-say" id="prefer-not-to-say" />
                    <Label htmlFor="prefer-not-to-say">Prefer not to say</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="financial_status">Financial Status</Label>
                <Select
                  value={formData.financial_status}
                  onValueChange={(value) => handleSelectChange("financial_status", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your financial status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="employed">Employed</SelectItem>
                    <SelectItem value="self-employed">Self-employed</SelectItem>
                    <SelectItem value="unemployed">Unemployed</SelectItem>
                    <SelectItem value="retired">Retired</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="education">Education</Label>
                <Select value={formData.education} onValueChange={(value) => handleSelectChange("education", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your education level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high-school">High School</SelectItem>
                    <SelectItem value="some-college">Some College</SelectItem>
                    <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                    <SelectItem value="master">Master's Degree</SelectItem>
                    <SelectItem value="doctorate">Doctorate</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="generation">Generation</Label>
                <Select value={formData.generation} onValueChange={(value) => handleSelectChange("generation", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your generation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gen-z">Gen Z (1997-2012)</SelectItem>
                    <SelectItem value="millennial">Millennial (1981-1996)</SelectItem>
                    <SelectItem value="gen-x">Gen X (1965-1980)</SelectItem>
                    <SelectItem value="baby-boomer">Baby Boomer (1946-1964)</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="space-y-4">
                <Label>Mental Health Issues (select all that apply)</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="depression"
                      checked={formData.mental_issues_reported.includes("depression")}
                      onCheckedChange={(checked) => handleCheckboxChange("depression", checked as boolean)}
                    />
                    <Label htmlFor="depression">Depression</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="anxiety"
                      checked={formData.mental_issues_reported.includes("anxiety")}
                      onCheckedChange={(checked) => handleCheckboxChange("anxiety", checked as boolean)}
                    />
                    <Label htmlFor="anxiety">Anxiety</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="stress"
                      checked={formData.mental_issues_reported.includes("stress")}
                      onCheckedChange={(checked) => handleCheckboxChange("stress", checked as boolean)}
                    />
                    <Label htmlFor="stress">Stress</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="adhd"
                      checked={formData.mental_issues_reported.includes("adhd")}
                      onCheckedChange={(checked) => handleCheckboxChange("adhd", checked as boolean)}
                    />
                    <Label htmlFor="adhd">ADHD</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="social_media_fomo"
                      checked={formData.mental_issues_reported.includes("social_media_fomo")}
                      onCheckedChange={(checked) => handleCheckboxChange("social_media_fomo", checked as boolean)}
                    />
                    <Label htmlFor="social_media_fomo">Social Media FOMO</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="initial_mental_health_state">Current Mental Health State</Label>
                <Select
                  value={formData.initial_mental_health_state}
                  onValueChange={(value) => handleSelectChange("initial_mental_health_state", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="How would you describe your current mental health?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                    <SelectItem value="poor">Poor</SelectItem>
                    <SelectItem value="at-risk">At Risk</SelectItem>
                    <SelectItem value="in-crisis">In Crisis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="rounded-md bg-blue-50 p-4 text-sm text-blue-700">
                <h3 className="font-medium">Privacy & Data Usage</h3>
                <p className="mt-1">
                  MindfulChat values your privacy. Your conversations are encrypted and stored securely. We use
                  anonymized data to improve our service and provide better support. You can request deletion of your
                  data at any time.
                </p>
              </div>

              <div className="flex items-start space-x-2 pt-2">
                <Checkbox
                  id="consent"
                  checked={formData.consent}
                  onCheckedChange={(checked) => handleCheckboxChange("consent", checked as boolean)}
                />
                <Label htmlFor="consent" className="text-sm">
                  I consent to the storage and processing of my data as described in the privacy policy. I understand
                  that MindfulChat is not a replacement for professional mental health services.
                </Label>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={prevStep} disabled={step === 1}>
            Back
          </Button>
          <Button
            className="bg-teal-600 hover:bg-teal-700 text-white"
            onClick={nextStep}
            disabled={(step === 2 && formData.mental_issues_reported.length === 0) || (step === 3 && !formData.consent)}
          >
            {step === totalSteps ? "Submit" : "Next"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
