interface StackCardProps {
  title: string;
}

export default function StackCard({ title }: StackCardProps) {
  return (
    <div className="flex inline-flex shrink-0 items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-white p-1 outline outline-2 outline-offset-[-2px] outline-indigo-400">
      <div className="justify-start text-center text-xs leading-6 font-medium text-indigo-400">
        {title}
      </div>
    </div>
  );
}
