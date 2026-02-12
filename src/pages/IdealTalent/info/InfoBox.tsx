interface InfoBoxProps {
  label: string;
  children: React.ReactNode;
}

export default function InfoBox({ label, children }: InfoBoxProps) {
  return (
    <div className="hover:border-primary flex flex-col gap-3 self-stretch rounded-xl border border-indigo-400/30 px-5 py-3 transition-all hover:shadow-sm">
      <div className="text-sm font-semibold text-neutral-600">{label}</div>
      <div className="text-base text-black">{children}</div>
    </div>
  );
}
