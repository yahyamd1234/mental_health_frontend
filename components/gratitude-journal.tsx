"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { X } from "lucide-react"

interface GratitudeJournalProps {
  onClose: () => void
}

export function GratitudeJournal({ onClose }: GratitudeJournalProps) {
  const [entries, setEntries] = useState(["", "", ""])
  const [reflections, setReflections] = useState("")
  const [isComplete, setIsComplete] = useState(false)

  const handleEntryChange = (index: number, value: string) => {
    const newEntries = [...entries]
    newEntries[index] = value
    setEntries(newEntries)
  }

  const handleComplete = () => {
    setIsComplete(true)
  }

  const isFormValid = entries.every((entry) => entry.trim().length > 0)

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-teal-700">Gratitude Journal</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {!isComplete ? (
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-600 mb-4">
                Write down three things you're grateful for today and why they matter to you. This practice can help
                shift your focus to positive aspects of your life.
              </p>

              {entries.map((entry, index) => (
                <div key={index} className="mb-4">
                  <label className="block text-sm font-medium mb-1">I'm grateful for...</label>
                  <Textarea
                    placeholder={`Example: ${
                      index === 0
                        ? "My supportive friend who listened to me today"
                        : index === 1
                          ? "Having access to clean water and food"
                          : "The beautiful weather that lifted my mood"
                    }`}
                    value={entry}
                    onChange={(e) => handleEntryChange(index, e.target.value)}
                    rows={3}
                    className="mb-1"
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Reflection (optional)</label>
              <Textarea
                placeholder="How did writing these gratitudes make you feel?"
                value={reflections}
                onChange={(e) => setReflections(e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button className="bg-teal-600 hover:bg-teal-700" onClick={handleComplete} disabled={!isFormValid}>
                Complete
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="p-4 bg-teal-50 rounded-md">
              <h3 className="font-medium text-teal-700 mb-3">Your Gratitude Journal</h3>

              {entries.map((entry, index) => (
                <div key={index} className="mb-3">
                  <p className="text-sm font-medium">Gratitude {index + 1}:</p>
                  <p className="text-sm ml-4">{entry}</p>
                </div>
              ))}

              {reflections && (
                <div>
                  <p className="text-sm font-medium">Reflection:</p>
                  <p className="text-sm ml-4">{reflections}</p>
                </div>
              )}
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                Great job! Regular gratitude practice has been shown to improve mood, reduce stress, and increase
                overall well-being.
              </p>
              <Button className="bg-teal-600 hover:bg-teal-700" onClick={onClose}>
                Save & Close
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
