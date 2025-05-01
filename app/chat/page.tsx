"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BarChart3, BookOpen, Calendar, Home, MessageCircle, Settings, Send, User, Menu, X } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Progress } from "@/components/ui/progress"
import { useMobile } from "@/hooks/use-mobile"
import { BreathingExercise } from "@/components/breathing-exercise"
import { ThoughtReframing } from "@/components/thought-reframing"
import { PomodoroTimer } from "@/components/pomodoro-timer"
import { GratitudeJournal } from "@/components/gratitude-journal"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

type Exercise = {
  id: string
  title: string
  description: string
  type: "breathing" | "thought" | "productivity" | "journaling"
}

export default function Chat() {
  const router = useRouter()
  const isMobile = useMobile()
  const [activeTab, setActiveTab] = useState("chat")
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hi there! Based on your assessment, I notice you've been experiencing some anxiety and stress lately. Would you like to talk about what's been on your mind?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile)
  const [activeExercise, setActiveExercise] = useState<string | null>(null)

  const exercises: Exercise[] = [
    {
      id: "breathing",
      title: "4-7-8 Breathing Exercise",
      description:
        "A breathing technique that promotes relaxation. Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds.",
      type: "breathing",
    },
    {
      id: "thought",
      title: "Thought Reframing",
      description: "Identify negative thoughts and challenge them with more balanced perspectives.",
      type: "thought",
    },
    {
      id: "pomodoro",
      title: "Pomodoro Technique",
      description: "Work for 25 minutes, then take a 5-minute break. After 4 cycles, take a longer 15-30 minute break.",
      type: "productivity",
    },
    {
      id: "gratitude",
      title: "Gratitude Journaling",
      description: "Write down three things you're grateful for today and why they matter to you.",
      type: "journaling",
    },
  ]

  const moodData = [
    { day: "Mon", value: 3 },
    { day: "Tue", value: 2 },
    { day: "Wed", value: 4 },
    { day: "Thu", value: 3 },
    { day: "Fri", value: 5 },
    { day: "Sat", value: 4 },
    { day: "Sun", value: 4 },
  ]

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = () => {
    if (input.trim() === "") return

    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages([...messages, newUserMessage])
    setInput("")
    setIsTyping(true)

    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponses = [
        "I understand how challenging that can be. Have you tried any coping strategies that have helped in the past?",
        "It sounds like you're going through a lot right now. Would you like to try a quick breathing exercise to help manage those feelings?",
        "Thank you for sharing that with me. How have these feelings been affecting your daily life?",
        "I'm here to support you. Would it help to talk about what might be triggering these feelings?",
        "That's completely valid. Many people experience similar challenges. Would you like to explore some strategies that might help?",
      ]

      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]

      const newBotMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prevMessages) => [...prevMessages, newBotMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const startExercise = (exerciseId: string) => {
    setActiveExercise(exerciseId)
  }

  const closeExercise = () => {
    setActiveExercise(null)
  }

  const renderExerciseContent = () => {
    switch (activeExercise) {
      case "breathing":
        return <BreathingExercise onClose={closeExercise} />
      case "thought":
        return <ThoughtReframing onClose={closeExercise} />
      case "pomodoro":
        return <PomodoroTimer onClose={closeExercise} />
      case "gratitude":
        return <GratitudeJournal onClose={closeExercise} />
      default:
        return null
    }
  }

  const renderSidebar = () => (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-teal-700">MindfulChat</h2>
      </div>

      <div className="flex-1 overflow-auto p-2">
        <nav className="space-y-1">
          <Button variant="ghost" className="w-full justify-start" onClick={() => router.push("/chat")}>
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("chat")}>
            <MessageCircle className="mr-2 h-4 w-4" />
            Chat
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("exercises")}>
            <BookOpen className="mr-2 h-4 w-4" />
            Exercises
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("progress")}>
            <BarChart3 className="mr-2 h-4 w-4" />
            Progress
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("calendar")}>
            <Calendar className="mr-2 h-4 w-4" />
            Calendar
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("profile")}>
            <User className="mr-2 h-4 w-4" />
            Profile
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("settings")}>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </nav>
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">User</p>
            <p className="text-xs text-gray-500">Free Plan</p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar */}
      {isMobile && (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="absolute top-4 left-4 z-10">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            {renderSidebar()}
          </SheetContent>
        </Sheet>
      )}

      {/* Desktop sidebar */}
      {!isMobile && sidebarOpen && <div className="w-64 h-full">{renderSidebar()}</div>}

      {/* Main content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center">
            {!isMobile && (
              <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2">
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            )}
            <h1 className="text-xl font-bold text-teal-700">
              {activeTab === "chat"
                ? "Chat"
                : activeTab === "exercises"
                  ? "Exercises"
                  : activeTab === "progress"
                    ? "Progress"
                    : activeTab === "calendar"
                      ? "Calendar"
                      : activeTab === "profile"
                        ? "Profile"
                        : "Settings"}
            </h1>
          </div>
        </header>

        {/* Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 overflow-hidden">
          <TabsList className="hidden">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="exercises">Exercises</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent
            value="chat"
            className="flex-1 flex flex-col h-full p-4 data-[state=active]:flex data-[state=inactive]:hidden"
          >
            <div className="flex-1 overflow-y-auto mb-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.sender === "bot" && (
                      <Avatar className="h-8 w-8 mr-2 mt-1">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Bot" />
                        <AvatarFallback className="bg-teal-600 text-white">B</AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === "user" ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <p>{message.content}</p>
                      <p className={`text-xs mt-1 ${message.sender === "user" ? "text-teal-100" : "text-gray-500"}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                    {message.sender === "user" && (
                      <Avatar className="h-8 w-8 ml-2 mt-1">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <Avatar className="h-8 w-8 mr-2 mt-1">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Bot" />
                      <AvatarFallback className="bg-teal-600 text-white">B</AvatarFallback>
                    </Avatar>
                    <div className="bg-gray-100 text-gray-800 rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} className="bg-teal-600 hover:bg-teal-700">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent
            value="exercises"
            className="flex-1 overflow-y-auto p-4 data-[state=active]:block data-[state=inactive]:hidden"
          >
            {activeExercise ? (
              renderExerciseContent()
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {exercises.map((exercise) => (
                  <Card key={exercise.id} className="overflow-hidden">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-2">{exercise.title}</h3>
                      <p className="text-gray-600 mb-4">{exercise.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs px-2 py-1 bg-teal-100 text-teal-800 rounded-full">
                          {exercise.type === "breathing"
                            ? "Breathing"
                            : exercise.type === "thought"
                              ? "Cognitive"
                              : exercise.type === "productivity"
                                ? "Productivity"
                                : "Journaling"}
                        </span>
                        <Button
                          size="sm"
                          className="bg-teal-600 hover:bg-teal-700"
                          onClick={() => startExercise(exercise.id)}
                        >
                          Start
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent
            value="progress"
            className="flex-1 overflow-y-auto p-4 data-[state=active]:block data-[state=inactive]:hidden"
          >
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Mood Tracker</h3>
                <div className="h-64 flex items-end space-x-2">
                  {moodData.map((item, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div className="w-full bg-teal-500 rounded-t-md" style={{ height: `${item.value * 20}%` }}></div>
                      <span className="text-xs mt-2">{item.day}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-semibold">Progress Areas</h3>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Anxiety Management</span>
                  <span className="text-sm font-medium">65%</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Stress Reduction</span>
                  <span className="text-sm font-medium">48%</span>
                </div>
                <Progress value={48} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Mood Stability</span>
                  <span className="text-sm font-medium">72%</span>
                </div>
                <Progress value={72} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Focus Improvement</span>
                  <span className="text-sm font-medium">35%</span>
                </div>
                <Progress value={35} className="h-2" />
              </div>
            </div>
          </TabsContent>

          <TabsContent
            value="calendar"
            className="flex-1 overflow-y-auto p-4 data-[state=active]:block data-[state=inactive]:hidden"
          >
            <div className="text-center p-8">
              <h3 className="text-lg font-semibold mb-2">Calendar View</h3>
              <p className="text-gray-600">Track your sessions and set reminders for exercises.</p>
              <p className="mt-4 text-sm text-gray-500">Calendar functionality will be available in the next update.</p>
            </div>
          </TabsContent>

          <TabsContent
            value="profile"
            className="flex-1 overflow-y-auto p-4 data-[state=active]:block data-[state=inactive]:hidden"
          >
            <div className="max-w-md mx-auto">
              <div className="flex flex-col items-center mb-6">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User" />
                  <AvatarFallback className="text-2xl">U</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">User Profile</h2>
                <p className="text-gray-600">Member since April 2025</p>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Name</h3>
                  <p className="text-lg">Anonymous User</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Age Group</h3>
                  <p className="text-lg">25-34</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Areas of Focus</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="text-xs px-2 py-1 bg-teal-100 text-teal-800 rounded-full">Anxiety</span>
                    <span className="text-xs px-2 py-1 bg-teal-100 text-teal-800 rounded-full">Stress</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Interaction Style</h3>
                  <p className="text-lg">Informal</p>
                </div>

                <Button className="w-full mt-4 bg-teal-600 hover:bg-teal-700">Edit Profile</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent
            value="settings"
            className="flex-1 overflow-y-auto p-4 data-[state=active]:block data-[state=inactive]:hidden"
          >
            <div className="max-w-md mx-auto space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Notification Settings</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="daily-reminders" className="text-sm font-medium">
                      Daily Check-in Reminders
                    </label>
                    <input type="checkbox" id="daily-reminders" className="toggle" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="exercise-reminders" className="text-sm font-medium">
                      Exercise Reminders
                    </label>
                    <input type="checkbox" id="exercise-reminders" className="toggle" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="progress-updates" className="text-sm font-medium">
                      Weekly Progress Updates
                    </label>
                    <input type="checkbox" id="progress-updates" className="toggle" defaultChecked />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Privacy</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="data-collection" className="text-sm font-medium">
                      Allow Data Collection for Improvement
                    </label>
                    <input type="checkbox" id="data-collection" className="toggle" defaultChecked />
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    Delete All My Data
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Appearance</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="dark-mode" className="text-sm font-medium">
                      Dark Mode
                    </label>
                    <input type="checkbox" id="dark-mode" className="toggle" />
                  </div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="font-size" className="text-sm font-medium">
                      Font Size
                    </label>
                    <select id="font-size" className="text-sm border rounded p-1">
                      <option>Small</option>
                      <option selected>Medium</option>
                      <option>Large</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Account</h3>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full">
                    Change Password
                  </Button>
                  <Button variant="outline" size="sm" className="w-full text-red-600 hover:text-red-700">
                    Log Out
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
