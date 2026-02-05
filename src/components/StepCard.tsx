// components/StepCard.tsx
import { motion } from 'framer-motion';

interface StepCardProps {
  icon: string;
  title: string;
  description: React.ReactNode;
}

export default function StepCard({ icon, title, description }: StepCardProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: -120 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="inline-flex w-80 flex-col items-center justify-start gap-14 rounded-[20px] bg-indigo-100/60 px-4 py-12 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.25)]"
    >
      <div className="text-center text-7xl leading-[96px] font-black text-white">
        {icon}
      </div>

      <div className="flex flex-col items-center gap-10 self-stretch">
        <div className="text-center text-3xl leading-10 font-semibold text-indigo-800">
          {title}
        </div>

        <div className="text-center text-base leading-7 font-normal text-zinc-700">
          {description}
        </div>
      </div>
    </motion.div>
  );
}
