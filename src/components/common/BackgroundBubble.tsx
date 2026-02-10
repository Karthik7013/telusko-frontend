"use client"

import { motion, type SpringOptions, useMotionValue, useSpring } from "framer-motion"
import { useCallback, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

export interface BubbleBackgroundProps {
    className?: string
    children?: React.ReactNode
    interactive?: boolean
    transition?: SpringOptions
    colors?: {
        first: string
        second: string
        third: string
        fourth: string
        fifth: string
        sixth: string
    }
}

export const BubbleBackground = ({
    className,
    children,
    interactive = false,
    transition = { stiffness: 100, damping: 20 },
    colors = {
        first: "100, 150, 255",
        second: "200, 150, 255",
        third: "150, 255, 255",
        fourth: "255, 150, 150",
        fifth: "255, 255, 150",
        sixth: "180, 160, 255",
    },
    ...props
}: BubbleBackgroundProps) => {
    const containerRef = useRef<HTMLDivElement>(null)

    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const springX = useSpring(mouseX, transition)
    const springY = useSpring(mouseY, transition)

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (!containerRef.current) return
            const rect = containerRef.current.getBoundingClientRect()
            const centerX = rect.left + rect.width / 2
            const centerY = rect.top + rect.height / 2
            mouseX.set(e.clientX - centerX)
            mouseY.set(e.clientY - centerY)
        },
        [mouseX, mouseY],
    )

    useEffect(() => {
        if (!interactive) return
        const container = containerRef.current
        if (!container) return

        container.addEventListener("mousemove", handleMouseMove)
        return () => container.removeEventListener("mousemove", handleMouseMove)
    }, [interactive, handleMouseMove])

    const makeGradient = (color: string) =>
        `radial-gradient(circle at center, rgba(${color}, 0.5) 0%, rgba(${color}, 0) 50%)`

    return (
        <div
            ref={containerRef}
            className={cn(
                "relative flex flex-col items-center justify-center overflow-hidden bg-zinc-50 text-slate-950 dark:bg-zinc-900",
                className,
            )}
            {...(props as any)}
        >
            <svg className="hidden" aria-hidden="true">
                <defs>
                    <filter id="bubble-goo">
                        <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            result="goo"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                        />
                        <feBlend in="SourceGraphic" in2="goo" />
                    </filter>
                </defs>
            </svg>

            <div
                className="absolute inset-0"
                style={{
                    filter: "url(#bubble-goo) blur(40px)",
                    maskImage: "radial-gradient(circle at center, transparent 30%, black 80%)",
                    WebkitMaskImage: "radial-gradient(circle at center, transparent 30%, black 80%)"
                }}
            >
                <motion.div
                    className="absolute rounded-full mix-blend-hard-light"
                    style={{
                        width: "60%",
                        height: "60%",
                        top: "-5%",
                        left: "-5%",
                        background: makeGradient(colors.first),
                    }}
                    animate={{ x: [0, 50, 0], y: [0, 100, 0] }}
                    transition={{ duration: 15, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY }}
                />

                <motion.div
                    className="absolute rounded-full mix-blend-hard-light"
                    style={{
                        width: "60%",
                        height: "60%",
                        bottom: "-5%",
                        right: "-5%",
                        background: makeGradient(colors.second),
                    }}
                    animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
                    transition={{ duration: 12, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY }}
                />

                <motion.div
                    className="absolute rounded-full mix-blend-hard-light"
                    style={{
                        width: "50%",
                        height: "50%",
                        top: "-5%",
                        right: "-5%",
                        background: makeGradient(colors.third),
                    }}
                    animate={{ x: [-50, 50, -50], y: [0, 100, 0] }}
                    transition={{ duration: 18, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY }}
                />

                <motion.div
                    className="absolute rounded-full mix-blend-hard-light opacity-70"
                    style={{
                        width: "50%",
                        height: "50%",
                        bottom: "-5%",
                        left: "-5%",
                        background: makeGradient(colors.fourth),
                    }}
                    animate={{ x: [50, -50, 50], y: [0, -100, 0] }}
                    transition={{ duration: 20, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY }}
                />

                <motion.div
                    className="absolute inset-0 flex justify-center items-center opacity-30"
                    style={{ transformOrigin: "center" }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
                >
                    <div
                        className="rounded-full mix-blend-hard-light"
                        style={{
                            width: "120%",
                            height: "120%",
                            background: makeGradient(colors.fifth),
                        }}
                    />
                </motion.div>

                {interactive && (
                    <motion.div
                        className="absolute rounded-full mix-blend-hard-light opacity-70"
                        style={{
                            width: "80%",
                            height: "80%",
                            background: makeGradient(colors.sixth),
                            x: springX,
                            y: springY,
                        }}
                    />
                )}
            </div>

            {children}
        </div>
    )
}

export default function BubbleBackgroundDemo() {
    return <BubbleBackground interactive />
}
