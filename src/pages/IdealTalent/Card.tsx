interface CardProps {
  companyId: number;
  imageFile: string;
  companyname: string;
  subscription: string;
  onClick?: () => void;
}

export default function Card({
  companyId,
  imageFile,
  companyname,
  subscription,
  onClick,
}: CardProps) {
  return (
    <div
      id={companyId}
      onClick={onClick}
      className="inline-flex h-64 w-80 flex-col items-center justify-start gap-2 rounded-[20px] bg-white shadow-[0px_2px_10px_0px_rgba(0,0,0,0.25)]"
    >
      <div className="h-36 w-full overflow-hidden rounded-tl-[20px] rounded-tr-[20px] bg-gray-100">
        <img
          src={`src/assets/${imageFile}`}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col items-start justify-start gap-1 self-stretch px-5">
        <div className="justify-start self-stretch text-xl leading-9 font-semibold text-black">
          {companyname}
        </div>
        <div className="justify-start self-stretch text-xs leading-7 font-normal text-neutral-700">
          {subscription}
        </div>
      </div>
    </div>
  );
}
