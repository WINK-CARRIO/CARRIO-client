import CheckCircle from '../assets/svgs/icon/CheckCircle';

type Props = {
  currentStep: 1 | 2 | 3;
  labels?: [string, string, string];
};

export default function StepIndicator({
  currentStep,
  labels = ['기업 선택', '스펙 불러오기', '초안 작성'],
}: Props) {
  return (
    <div className="flex items-center gap-3">
      {labels.map((label, idx) => {
        const step = (idx + 1) as 1 | 2 | 3;
        const isCompleted = step < currentStep;
        const isActive = step === currentStep;

        return (
          <div key={label} className="flex items-center gap-3">
            {idx > 0 && (
              <div
                className={`h-px w-10 ${isCompleted || isActive ? 'bg-indigo-400' : 'bg-gray-300'}`}
              />
            )}

            <div className="flex items-center gap-2">
              {isCompleted ? (
                <CheckCircle />
              ) : (
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold ${
                    isActive
                      ? 'bg-indigo-400 text-white'
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  {step}
                </div>
              )}
              <span
                className={`text-sm font-medium ${
                  isActive
                    ? 'text-indigo-800'
                    : isCompleted
                      ? 'text-indigo-400'
                      : 'text-gray-400'
                }`}
              >
                {label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
