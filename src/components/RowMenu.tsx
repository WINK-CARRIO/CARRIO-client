import MenuIcon from '../assets/svgs/icon/MenuIcon.tsx';

type Props = {
  open: boolean;
  onToggle: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function RowMenu({ open, onToggle, onEdit, onDelete }: Props) {
  return (
    <div className="relative">
      <button type="button" onClick={onToggle}>
        <MenuIcon />
      </button>

      {open && (
        <div className="absolute right-4 bottom-2 z-50 w-24 rounded-lg border border-neutral-200 bg-white shadow-lg">
          <button
            type="button"
            className="w-full px-3 py-2 text-left text-xs hover:bg-neutral-100"
            onClick={onEdit}
          >
            수정
          </button>

          <button
            type="button"
            className="w-full px-3 py-2 text-left text-xs text-red-500 hover:bg-neutral-100"
            onClick={onDelete}
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
}
