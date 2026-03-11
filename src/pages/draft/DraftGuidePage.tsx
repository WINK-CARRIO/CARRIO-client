import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

const STEPS = [
  {
    icon: 'mdi:office-building-outline',
    title: '기업 선택',
    description: '자소서를 작성할 기업을 선택하세요',
  },
  {
    icon: 'mdi:file-document-outline',
    title: '스펙 불러오기',
    description: '등록된 스펙과 문항을 확인하세요',
  },
  {
    icon: 'mdi:pencil-outline',
    title: '자소서 초안 작성/수정/저장',
    description: 'AI가 생성한 초안을 수정하고 저장하세요',
  },
];

export default function DraftGuidePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-10 py-20">
      <h1 className="text-3xl font-bold text-black">
        CARRIO 자소서 초안 작성이 처음이신가요?
      </h1>

      <p className="mt-4 text-lg text-neutral-500">
        아래 3단계를 따라 나만의 자소서 초안을 완성해 보세요
      </p>

      <div className="mt-16 flex items-start gap-6">
        {STEPS.map((step, idx) => (
          <div key={step.title} className="flex items-start gap-6">
            <div className="flex w-52 flex-col items-center gap-4 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100">
                <Icon icon={step.icon} className="text-4xl text-indigo-400" />
              </div>
              <div className="text-lg font-semibold text-gray-800">
                STEP {idx + 1}
              </div>
              <div className="text-sm font-medium text-gray-700">
                {step.title}
              </div>
              <div className="text-xs text-neutral-400">{step.description}</div>
            </div>

            {idx < STEPS.length - 1 && (
              <div className="mt-9 flex items-center">
                <Icon
                  icon="mdi:arrow-right"
                  className="text-2xl text-gray-300"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => navigate('/draft/step1')}
        className="mt-16 rounded-xl bg-indigo-400 px-14 py-3 text-lg font-semibold text-white transition hover:bg-indigo-500"
      >
        START
      </button>
    </div>
  );
}
