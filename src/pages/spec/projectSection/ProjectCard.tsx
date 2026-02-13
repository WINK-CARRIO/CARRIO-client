interface ProjectProps {
  title: string;
  description: string;
  period: string;
  role: string;
  achievements: string;
}

export default function ProjectCard({
  title,
  description,
  period,
  role,
  achievements,
}: ProjectProps) {
  return (
    <div className="flex w-full flex-col items-start justify-center gap-2.5 border-b border-neutral-400/40 px-12 py-5">
      <div className="inline-flex items-start justify-start gap-10">
        <div className="inline-flex flex-col items-start justify-center gap-3 self-stretch">
          <div className="justify-start text-lg leading-7 font-semibold text-black">
            {title}
          </div>
          <div className="flex flex-col items-start justify-start gap-2">
            <div className="text-secondary flex flex-col justify-start text-sm leading-5 font-medium">
              {description}
            </div>
            <div className="text-secondary flex flex-col justify-start text-xs leading-5 font-medium">
              성과 : {achievements}
            </div>
            <div className="text-secondary justify-start text-center text-xs leading-5 font-medium">
              역할 : {role}
            </div>
            <div className="text-secondary justify-start text-xs leading-5 font-medium">
              {period}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
