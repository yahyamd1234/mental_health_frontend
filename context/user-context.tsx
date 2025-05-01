"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type MentalIssue = "depression" | "anxiety" | "stress" | "adhd" | "social_media_fomo"

export interface UserData {
  name: string
  age: string
  gender: string
  financial_status: string
  education: string
  mental_issues_reported: MentalIssue[]
  generation: string
  initial_mental_health_state: string
}

interface UserContextType {
  userData: UserData
  setUserData: (data: UserData) => void
  selectedAssessment: MentalIssue | null
  setSelectedAssessment: (issue: MentalIssue | null) => void
  completedAssessments: MentalIssue[]
  addCompletedAssessment: (issue: MentalIssue) => void
}

const defaultUserData: UserData = {
  name: "",
  age: "",
  gender: "",
  financial_status: "",
  education: "",
  mental_issues_reported: [],
  generation: "",
  initial_mental_health_state: "",
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData>(defaultUserData)
  const [selectedAssessment, setSelectedAssessment] = useState<MentalIssue | null>(null)
  const [completedAssessments, setCompletedAssessments] = useState<MentalIssue[]>([])

  const addCompletedAssessment = (issue: MentalIssue) => {
    if (!completedAssessments.includes(issue)) {
      setCompletedAssessments([...completedAssessments, issue])
    }
  }

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        selectedAssessment,
        setSelectedAssessment,
        completedAssessments,
        addCompletedAssessment,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
