interface CardProps {
  companyId: number;
  imageFile: string;
  companyname: string;
  industry: string;
  description: string;
  onClick?: () => void;
}

export default function Card({
  companyId,
  imageFile,
  companyname,
  industry,
  description,
  onClick,
}: CardProps) {
  return (
    <div
      id={String(companyId)}
      onClick={onClick}
      className="inline-flex h-64 w-80 cursor-pointer flex-col items-center justify-start gap-2 rounded-[20px] bg-white shadow-[0px_2px_10px_0px_rgba(0,0,0,0.25)] hover:shadow-[0px_2px_10px_0px_rgba(0,0,0,0.40)]"
    >
      <div className="h-36 w-full overflow-hidden rounded-tl-[20px] rounded-tr-[20px] bg-gray-100">
        <img
          src={imageFile || 'https://placehold.co/348x148'}
          alt={companyname}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-col items-start justify-start gap-1 self-stretch px-5">
        <div className="flex items-center justify-start gap-2">
          <div className="text-xl leading-9 font-semibold text-black">
            {companyname}
          </div>
          <div className="text-xs text-neutral-500">{industry}</div>
        </div>

        <div className="self-stretch text-xs leading-7 font-normal text-neutral-700">
          {description}
        </div>
      </div>
    </div>
  );
}
