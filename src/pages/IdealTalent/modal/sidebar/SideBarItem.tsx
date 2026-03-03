interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export default function SidebarItem({
  icon,
  label,
  active = false,
  onClick,
}: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex cursor-pointer items-center gap-2 self-stretch rounded-xl px-4 py-3 transition-all duration-200 ${
        active
          ? 'bg-indigo-400/20 text-indigo-800'
          : 'hover:bg-primary/10 text-zinc-700'
      }`}
    >
      {icon}
      <div className="text-sm leading-5 font-medium">{label}</div>
    </button>
  );
}
