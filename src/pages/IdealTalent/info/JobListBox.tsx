import NextIcon from '../../../assets/svgs/icon/NextIcon.tsx';

interface JobListItemProps {
  name: string;
  onClick?: () => void;
}

export default function JobListBox({ name, onClick }: JobListItemProps) {
  return (
    <div
      onClick={onClick}
      className="group hover:border-primary flex cursor-pointer items-center justify-between self-stretch rounded-xl border border-indigo-400/30 px-5 py-3 transition-all duration-200 hover:shadow-sm"
    >
      <div className="flex flex-col gap-1">
        <div className="text-base font-medium text-black">{name}</div>
        <div className="text-sm text-neutral-600">인재상 확인하기</div>
      </div>

      <NextIcon className="group-hover:text-primary text-neutral-400 transition-colors" />
    </div>
  );
}
