"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { X } from "lucide-react"

interface ThoughtReframingProps {
  onClose: () => void
}

export function ThoughtReframing({ onClose }: ThoughtReframingProps) {
  const [step, setStep] = useState(1)
  const [negativeThought, setNegativeThought] = useState("")
  const [evidence, setEvidence] = useState("")
  const [alternativeThought, setAlternativeThought] = useState("")

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleReset = () => {
    setStep(1)
    setNegativeThought("")
    setEvidence("")
    setAlternativeThought("")
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-teal-700">Thought Reframing Exercise</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-medium">Step 1: Identify the Negative Thought</h3>
              <p className="text-sm text-gray-600">
                Write down a negative thought you've been experiencing. Be specific about what you're thinking and
                feeling.
              </p>
              <Textarea
                placeholder="Example: I'm going to fail this presentation and everyone will think I'm incompetent."
                value={negativeThought}
                onChange={(e) => setNegativeThought(e.target.value)}
                rows={4}
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-medium">Step 2: Examine the Evidence</h3>
              <p className="text-sm text-gray-600">
                What evidence do you have that contradicts this negative thought? Think about past successes or positive
                feedback.
              </p>
              <Textarea
                placeholder="Example: I've successfully given presentations before. My colleagues have complimented my work."
                value={evidence}
                onChange={(e) => setEvidence(e.target.value)}
                rows={4}
              />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-medium">Step 3: Create a Balanced Alternative</h3>
              <p className="text-sm text-gray-600">
                Based on the evidence, write a more balanced and realistic thought.
              </p>
              <Textarea
                placeholder="Example: While I'm nervous about the presentation, I've prepared well and have succeeded in similar situations before."
                value={alternativeThought}
                onChange={(e) => setAlternativeThought(e.target.value)}
                rows={4}
              />

              {negativeThought && evidence && alternativeThought && (
                <div className="mt-6 p-4 bg-teal-50 rounded-md">
                  <h4 className="font-medium text-teal-700 mb-2">Your Thought Reframing</h4>
                  <p className="text-sm mb-2">
                    <span className="font-medium">Negative Thought:</span> {negativeThought}
                  </p>
                  <p className="text-sm mb-2">
                    <span className="font-medium">Evidence:</span> {evidence}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Balanced Thought:</span> {alternativeThought}
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-between pt-4">
            {step > 1 ? (
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
            ) : (
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            )}

            <div className="space-x-2">
              {step === 3 && (
                <Button variant="outline" onClick={handleReset}>
                  Start Over
                </Button>
              )}
              {step < 3 ? (
                <Button
                  className="bg-teal-600 hover:bg-teal-700"
                  onClick={handleNext}
                  disabled={(step === 1 && !negativeThought) || (step === 2 && !evidence)}
                >
                  Next
                </Button>
              ) : (
                <Button className="bg-teal-600 hover:bg-teal-700" onClick={onClose}>
                  Complete
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
