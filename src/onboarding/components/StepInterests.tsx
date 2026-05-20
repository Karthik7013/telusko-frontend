import { motion } from "framer-motion"
import { CATEGORIES } from "@/data/courses-data"
import type { InterestTopic } from "../types"

const INTEREST_MAP: Record<string, InterestTopic> = {
  "Java": "java",
  "Python": "python",
  "Web Development": "web_development",
  "Cloud": "cloud",
  "Mobile": "mobile",
  "Security": "security",
  "Microservices": "microservices",
}

interface StepInterestsProps {
  value: InterestTopic[]
  onChange: (interests: InterestTopic[]) => void
}

export function StepInterests({ value, onChange }: StepInterestsProps) {
  function toggleInterest(topic: InterestTopic) {
    if (value.includes(topic)) {
      onChange(value.filter((t) => t !== topic))
    } else {
      onChange([...value, topic])
    }
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-2xl font-bold tracking-tight">What are you interested in?</h2>
        <p className="text-muted-foreground mt-1">Pick topics you'd like to learn. You can choose multiple.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.15 }}
        className="flex flex-wrap gap-3"
      >
        {CATEGORIES.map((category, index) => {
          const topic = INTEREST_MAP[category]
          if (!topic) return null
          const isSelected = value.includes(topic)

          return (
            <motion.button
              key={topic}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              onClick={() => toggleInterest(topic)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium border-2 transition-all duration-200 ${
                isSelected
                  ? "bg-primary text-primary-foreground border-primary shadow-[0_0_15px_-3px] shadow-primary/40"
                  : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {category}
            </motion.button>
          )
        })}
      </motion.div>

      {value.length > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-muted-foreground"
        >
          {value.length} selected
        </motion.p>
      )}
    </div>
  )
}
