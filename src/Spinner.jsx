import { motion } from 'framer-motion'

export default function Spinner({ size = 40, color = 'currentColor' }) {
  return (
    <div className="flex justify-center items-center py-12">
      <motion.div
        style={{
          width: size,
          height: size,
          border: `3px solid ${color}20`,
          borderTop: `3px solid ${color}`,
          borderRadius: '50%',
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  )
}