import { motion } from "framer-motion"


interface ScrollRevealProps {
    children: React.ReactNode
    width?: "fit-content" | "100%"
}

export const ScrollReveal = ({ children, width = "100%" }: ScrollRevealProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }} // Start 50px lower and invisible
            whileInView={{ opacity: 1, y: 0 }} // Animate to original position
            viewport={{ once: true, margin: "-100px" }} // Trigger once when 100px into view
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ width }}
        >
            {children}
        </motion.div>
    )
}