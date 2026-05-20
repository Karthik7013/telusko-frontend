import { Check } from "lucide-react"

const STEPS = [
  { label: "Your Role", description: "Who are you?" },
  { label: "Interests", description: "What interests you?" },
  { label: "Goal", description: "Why are you learning?" },
  { label: "Level & Time", description: "Experience & commitment" },
]

interface OnboardingStepperProps {
  currentStep: number
}

export function OnboardingStepper({ currentStep }: OnboardingStepperProps) {
  return (
    <div className="w-full max-w-2xl mx-auto mb-10">
      <div className="flex items-center justify-between">
        {STEPS.map((step, index) => {
          const isCompleted = index < currentStep
          const isActive = index === currentStep

          return (
            <div key={step.label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                    isCompleted
                      ? "bg-primary border-primary text-primary-foreground"
                      : isActive
                        ? "border-primary text-primary"
                        : "border-muted-foreground/30 text-muted-foreground/50"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                <span
                  className={`mt-2 text-xs font-medium text-center transition-colors duration-300 hidden sm:block ${
                    isActive ? "text-primary" : isCompleted ? "text-muted-foreground" : "text-muted-foreground/50"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-px mx-3 mt-[-1.5rem] transition-colors duration-300 ${
                    isCompleted ? "bg-primary" : "bg-muted-foreground/20"
                  }`}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
