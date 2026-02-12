import ExitIcon from '../../../assets/svgs/icon/ExitIcon.tsx';
import CheckInfoBox from '../info/CheckInfoBox.tsx';
import TalentBadge from './TalentBadge.tsx';

interface CompanyDetailSectionProps {
  onClose: () => void;
}

export default function CompanyTalentSection({
  onClose,
}: CompanyDetailSectionProps) {
  return (
    <div className="inline-flex flex-1 flex-col items-start justify-start gap-5 self-stretch px-5 py-7">
      <div className="inline-flex items-start justify-between self-stretch">
        <div className="inline-flex flex-col items-start justify-start gap-2">
          <div className="justify-start text-xl leading-7 font-semibold text-black">
            전사 인재상 조회
          </div>
          <div className="justify-start text-base leading-6 font-normal text-gray-400">
            기업이 추구하는 핵심 인재상입니다.
          </div>
        </div>
        <button onClick={onClose}>
          <ExitIcon />
        </button>
      </div>
      <div className="flex flex-col items-start justify-start gap-2.5 self-stretch rounded-xl bg-indigo-400/10 px-5 py-3 outline outline-1 outline-offset-[-1px] outline-indigo-400/30">
        <div className="justify-start text-sm leading-5 font-semibold text-neutral-600">
          빠른 실행력을 가진 도전적 인재
        </div>
        <div className="inline-flex items-center justify-start gap-3.5">
          <TalentBadge keyword={'도전적'} />
          <TalentBadge keyword={'혁신적'} />
          <TalentBadge keyword={'글로벌'} />
          <TalentBadge keyword={'창의적'} />
          <TalentBadge keyword={'윤리경영'} />
        </div>
      </div>
      <div className="flex flex-col items-start justify-start gap-2 self-stretch">
        <div className="justify-start text-sm leading-5 font-medium text-neutral-600">
          세부 인재상
        </div>
        <CheckInfoBox title="창의적 사고와 혁신을 추구하는 인재" />
        <CheckInfoBox title="끊임없이 도전하고 성장하는 인재" />
        <CheckInfoBox title="글로벌 마인드와 협업 능력을 가진 인재" />
      </div>
    </div>
  );
}
