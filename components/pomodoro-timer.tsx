"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { X, Play, Pause, RotateCcw } from "lucide-react"

interface PomodoroTimerProps {
  onClose: () => void
}

export function PomodoroTimer({ onClose }: PomodoroTimerProps) {
  const [isActive, setIsActive] = useState(false)
  const [mode, setMode] = useState<"work" | "break" | "longBreak">("work")
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [cycles, setCycles] = useState(0)
  const [progress, setProgress] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const durations = {
    work: 25 * 60, // 25 minutes
    break: 5 * 60, // 5 minutes
    longBreak: 15 * 60, // 15 minutes
  }

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            // Timer completed
            const newCycles = mode === "work" ? cycles + 1 : cycles
            setCycles(newCycles)

            // Determine next mode
            let nextMode: "work" | "break" | "longBreak"
            if (mode === "work") {
              nextMode = newCycles % 4 === 0 ? "longBreak" : "break"
            } else {
              nextMode = "work"
            }

            setMode(nextMode)
            return durations[nextMode]
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
  }, [isActive, mode, cycles])

  // Calculate progress
  useEffect(() => {
    const maxTime = durations[mode]
    const progressValue = ((maxTime - timeLeft) / maxTime) * 100
    setProgress(progressValue)
  }, [timeLeft, mode])

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleStart = () => {
    setIsActive(true)
  }

  const handlePause = () => {
    setIsActive(false)
  }

  const handleReset = () => {
    setIsActive(false)
    setMode("work")
    setTimeLeft(durations.work)
    setCycles(0)
    setProgress(0)
  }

  const handleModeChange = (newMode: "work" | "break" | "longBreak") => {
    setIsActive(false)
    setMode(newMode)
    setTimeLeft(durations[newMode])
    setProgress(0)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-teal-700">Pomodoro Technique</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex flex-col items-center justify-center space-y-8 my-8">
          <div
            className={`w-48 h-48 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${
              mode === "work" ? "border-red-500" : mode === "break" ? "border-green-500" : "border-blue-500"
            }`}
          >
            <div className="text-center">
              <div className="text-4xl font-bold">{formatTime(timeLeft)}</div>
              <div className="text-sm uppercase tracking-wider mt-1">
                {mode === "work" ? "Work" : mode === "break" ? "Short Break" : "Long Break"}
              </div>
            </div>
          </div>

          <div className="w-full space-y-2">
            <div className="flex justify-between text-sm">
              <span>{mode === "work" ? "Focus on your task" : "Take a break and relax"}</span>
              <span>Cycles: {cycles}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        <div className="flex justify-center space-x-2 mb-6">
          <Button
            variant={mode === "work" ? "default" : "outline"}
            className={mode === "work" ? "bg-red-500 hover:bg-red-600" : ""}
            onClick={() => handleModeChange("work")}
          >
            Work
          </Button>
          <Button
            variant={mode === "break" ? "default" : "outline"}
            className={mode === "break" ? "bg-green-500 hover:bg-green-600" : ""}
            onClick={() => handleModeChange("break")}
          >
            Break
          </Button>
          <Button
            variant={mode === "longBreak" ? "default" : "outline"}
            className={mode === "longBreak" ? "bg-blue-500 hover:bg-blue-600" : ""}
            onClick={() => handleModeChange("longBreak")}
          >
            Long Break
          </Button>
        </div>

        <div className="flex justify-center space-x-4">
          {!isActive ? (
            <Button onClick={handleStart} className="bg-teal-600 hover:bg-teal-700">
              <Play className="h-4 w-4 mr-2" />
              Start
            </Button>
          ) : (
            <Button onClick={handlePause} variant="outline">
              <Pause className="h-4 w-4 mr-2" />
              Pause
            </Button>
          )}
          <Button onClick={handleReset} variant="outline">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>

        <div className="mt-6 text-sm text-gray-600">
          <p className="font-medium">Instructions:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Work for 25 minutes, focusing intensely on a single task</li>
            <li>Take a 5-minute break</li>
            <li>After 4 work cycles, take a longer 15-30 minute break</li>
            <li>Repeat as needed</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
