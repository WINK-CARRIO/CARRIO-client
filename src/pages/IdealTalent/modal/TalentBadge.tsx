interface TalentBadgeProps {
  keyword: string;
}

export default function TalentBadge({ keyword }: TalentBadgeProps) {
  return (
    <div className="flex items-center justify-center gap-2.5 rounded-[20px] bg-indigo-400/30 px-2.5 py-[5px]">
      <div className="justify-start text-xs leading-4 font-normal text-indigo-800">
        {keyword}
      </div>
    </div>
  );
}
