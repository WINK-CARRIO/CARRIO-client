type Status = 'DONE' | 'RUNNING' | 'NONE';

type Props = {
  status: Status;
};

const STATUS_STYLE = {
  DONE: {
    label: '추출 완료',
    bg: 'bg-green-400/50',
    text: 'text-green-900',
  },
  RUNNING: {
    label: '추출 중',
    bg: 'bg-yellow-300/50',
    text: 'text-red-600',
  },
  NONE: {
    label: '미추출',
    bg: 'bg-red-400/50',
    text: 'text-orange-600',
  },
};

export default function StatusBadge({ status }: Props) {
  const style = STATUS_STYLE[status];

  return (
    <div
      className={`flex h-6 w-fit items-center justify-center rounded-xl px-2 py-1 ${style.bg}`}
    >
      <span className={`text-xs leading-5 font-normal ${style.text}`}>
        {style.label}
      </span>
    </div>
  );
}
