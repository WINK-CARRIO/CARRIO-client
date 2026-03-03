import ActivityCard from './ActivityCard.tsx';

interface Project {
  title: string;
  description: string;
  period: string;
  role: string;
  achievements: string;
}

interface ProjectSectionProps {
  projects: Project[];
}
export default function ActivitySection({ projects }: ProjectSectionProps) {
  return (
    <div className="inline-flex w-full flex-col items-start justify-start">
      {projects.map((project, index) => (
        <ActivityCard
          key={index}
          title={project.title}
          description={project.description}
          period={project.period}
          role={project.role}
          achievements={project.achievements}
        />
      ))}
    </div>
  );
}
