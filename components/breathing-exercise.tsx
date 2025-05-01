"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { X } from "lucide-react"

type BreathingPhase = "inhale" | "hold" | "exhale" | "rest"

interface BreathingExerciseProps {
  onClose: () => void
}

export function BreathingExercise({ onClose }: BreathingExerciseProps) {
  const [isActive, setIsActive] = useState(false)
  const [phase, setPhase] = useState<BreathingPhase>("inhale")
  const [timeLeft, setTimeLeft] = useState(4)
  const [cycles, setCycles] = useState(0)
  const [progress, setProgress] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const phaseDurations = {
    inhale: 4,
    hold: 7,
    exhale: 8,
    rest: 2,
  }

  const phaseMessages = {
    inhale: "Inhale slowly through your nose",
    hold: "Hold your breath",
    exhale: "Exhale completely through your mouth",
    rest: "Prepare for next cycle",
  }

  const totalCycleDuration = phaseDurations.inhale + phaseDurations.hold + phaseDurations.exhale + phaseDurations.rest

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            // Move to next phase
            switch (phase) {
              case "inhale":
                setPhase("hold")
                return phaseDurations.hold
              case "hold":
                setPhase("exhale")
                return phaseDurations.exhale
              case "exhale":
                setPhase("rest")
                return phaseDurations.rest
              case "rest":
                setPhase("inhale")
                setCycles((prev) => prev + 1)
                return phaseDurations.inhale
            }
          }
          return prevTime - 1
        })
      }, 1000)
    } else if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isActive, phase])

  // Calculate progress for the current phase
  useEffect(() => {
    const maxTime = phaseDurations[phase]
    const progressValue = ((maxTime - timeLeft) / maxTime) * 100
    setProgress(progressValue)
  }, [timeLeft, phase])

  const handleStart = () => {
    setIsActive(true)
  }

  const handlePause = () => {
    setIsActive(false)
  }

  const handleReset = () => {
    setIsActive(false)
    setPhase("inhale")
    setTimeLeft(phaseDurations.inhale)
    setCycles(0)
    setProgress(0)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-teal-700">4-7-8 Breathing Exercise</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex flex-col items-center justify-center space-y-8 my-8">
          <div
            className={`w-48 h-48 rounded-full flex items-center justify-center border-4 transition-all duration-1000 ${
              phase === "inhale"
                ? "border-blue-500 scale-110"
                : phase === "hold"
                  ? "border-purple-500"
                  : "border-teal-500 scale-90"
            }`}
          >
            <div className="text-center">
              <div className="text-4xl font-bold">{timeLeft}</div>
              <div className="text-sm uppercase tracking-wider mt-1">
                {phase === "inhale" ? "Inhale" : phase === "hold" ? "Hold" : phase === "exhale" ? "Exhale" : "Rest"}
              </div>
            </div>
          </div>

          <div className="w-full space-y-2">
            <div className="flex justify-between text-sm">
              <span>{phaseMessages[phase]}</span>
              <span>Cycles: {cycles}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          {!isActive ? (
            <Button onClick={handleStart} className="bg-teal-600 hover:bg-teal-700">
              {cycles > 0 ? "Resume" : "Start"}
            </Button>
          ) : (
            <Button onClick={handlePause} variant="outline">
              Pause
            </Button>
          )}
          <Button onClick={handleReset} variant="outline" disabled={cycles === 0 && !isActive}>
            Reset
          </Button>
        </div>

        <div className="mt-6 text-sm text-gray-600">
          <p className="font-medium">Instructions:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Inhale quietly through your nose for 4 seconds</li>
            <li>Hold your breath for 7 seconds</li>
            <li>Exhale completely through your mouth for 8 seconds</li>
            <li>Repeat the cycle 4-8 times</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
