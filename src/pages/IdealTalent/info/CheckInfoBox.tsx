import CheckCircle from '../../../assets/svgs/icon/CheckCircle.tsx';

interface CheckInfoBoxProps {
  title?: string;
}

export default function CheckInfoBox({ title }: CheckInfoBoxProps) {
  return (
    <div className="hover:border-primary inline-flex items-center gap-3 self-stretch rounded-xl border border-indigo-400/30 p-5 transition-all duration-200 hover:shadow-sm">
      <CheckCircle />
      <div className="justify-start text-sm leading-5 font-normal text-neutral-600">
        {title}
      </div>
    </div>
  );
}
