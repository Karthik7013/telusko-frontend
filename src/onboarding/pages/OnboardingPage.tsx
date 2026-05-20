import { useReducer, useCallback, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { OnboardingStepper } from "../components/OnboardingStepper"
import { StepRole } from "../components/StepRole"
import { StepInterests } from "../components/StepInterests"
import { StepGoals } from "../components/StepGoals"
import { StepLevelTime } from "../components/StepLevelTime"
import { useSavePreferencesMutation } from "@/features/preferences/preferencesApi"
import type { OnboardingData, UserRole, InterestTopic, Goal, ExperienceLevel, TimeCommitment } from "../types"

const TOTAL_STEPS = 4
const STORAGE_KEY = "telusko-onboarding"

type Action = { type: "SET_ROLE"; payload: UserRole }
  | { type: "SET_INTERESTS"; payload: InterestTopic[] }
  | { type: "SET_GOAL"; payload: Goal }
  | { type: "SET_EXPERIENCE_LEVEL"; payload: ExperienceLevel }
  | { type: "SET_TIME_COMMITMENT"; payload: TimeCommitment }
  | { type: "SET_STEP"; payload: number }
  | { type: "RESET" }

const initialData: OnboardingData = {
  role: null,
  interests: [],
  goal: null,
  experienceLevel: null,
  timeCommitment: null,
}

function reducer(state: OnboardingData, action: Action): OnboardingData {
  switch (action.type) {
    case "SET_ROLE":
      return { ...state, role: action.payload }
    case "SET_INTERESTS":
      return { ...state, interests: action.payload }
    case "SET_GOAL":
      return { ...state, goal: action.payload }
    case "SET_EXPERIENCE_LEVEL":
      return { ...state, experienceLevel: action.payload }
    case "SET_TIME_COMMITMENT":
      return { ...state, timeCommitment: action.payload }
    case "RESET":
      return initialData
    default:
      return state
  }
}

function loadFromStorage(): { step: number; data: OnboardingData } | null {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch { }
  return null
}

function saveToStorage(step: number, data: OnboardingData) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ step, data }))
  } catch { }
}

function clearStorage() {
  try {
    sessionStorage.removeItem(STORAGE_KEY)
  } catch { }
}

export default function OnboardingPage() {
  const navigate = useNavigate()
  const [savePreferences, { isLoading: isSaving }] = useSavePreferencesMutation()

  const saved = loadFromStorage()
  const [step, setStep] = useStateSafe(saved?.step ?? 0)
  const [formData, dispatch] = useReducer(reducer, saved?.data ?? initialData)

  useEffect(() => {
    saveToStorage(step, formData)
  }, [step, formData])

  const canProceed = useCallback(() => {
    switch (step) {
      case 0: return formData.role !== null
      case 1: return true
      case 2: return formData.goal !== null
      case 3: return formData.experienceLevel !== null && formData.timeCommitment !== null
      default: return false
    }
  }, [step, formData])

  async function handleNext() {
    if (step < TOTAL_STEPS - 1) {
      setStep(step + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  function handleBack() {
    if (step > 0) {
      setStep(step - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  async function handleFinish() {
    try {
      await savePreferences({
        role: formData.role!,
        interests: formData.interests,
        goal: formData.goal!,
        experienceLevel: formData.experienceLevel!,
        timeCommitment: formData.timeCommitment!,
      }).unwrap()

      clearStorage()
      toast.success("Preferences saved!", {
        description: "We've personalized your recommendations.",
      })
      navigate("/dashboard")
    } catch (error: any) {
      toast.error("Something went wrong", {
        description: error.data?.message || "Could not save preferences. Please try again.",
      })
    }
  }

  const progress = ((step + 1) / TOTAL_STEPS) * 100

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-background/80 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold tracking-tight"
          >
            Let's set you up
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground mt-1"
          >
            Tell us about yourself so we can recommend the right courses.
          </motion.p>
        </div>

        <OnboardingStepper currentStep={step} />

        <div className="relative h-1 bg-muted rounded-full mb-8 overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              {step === 0 && (
                <StepRole
                  value={formData.role}
                  onChange={(role) => dispatch({ type: "SET_ROLE", payload: role })}
                />
              )}
              {step === 1 && (
                <StepInterests
                  value={formData.interests}
                  onChange={(interests) => dispatch({ type: "SET_INTERESTS", payload: interests })}
                />
              )}
              {step === 2 && (
                <StepGoals
                  value={formData.goal}
                  onChange={(goal) => dispatch({ type: "SET_GOAL", payload: goal })}
                />
              )}
              {step === 3 && (
                <StepLevelTime
                  experienceLevel={formData.experienceLevel}
                  timeCommitment={formData.timeCommitment}
                  onExperienceChange={(level) => dispatch({ type: "SET_EXPERIENCE_LEVEL", payload: level })}
                  onTimeChange={(commitment) => dispatch({ type: "SET_TIME_COMMITMENT", payload: commitment })}
                />
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={step === 0}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>

            {step < TOTAL_STEPS - 1 ? (
              <Button onClick={handleNext} disabled={!canProceed()} className="gap-2">
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleFinish} disabled={!canProceed() || isSaving} className="gap-2">
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Finish Setup"
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function useStateSafe<T>(initial: T): [T, (value: T) => void] {
  const [state, setState] = useReducer((_: T, next: T) => next, initial)
  return [state, setState]
}
