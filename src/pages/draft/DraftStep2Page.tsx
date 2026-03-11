import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import StepIndicator from '../../components/StepIndicator';

type Question = {
  content: string;
  min_length: number;
  max_length: number;
};

const createEmptyQuestion = (): Question => ({
  content: '',
  min_length: 500,
  max_length: 700,
});

const API_URL = import.meta.env.VITE_API_URL;

export default function DraftStep2Page() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const companyId = searchParams.get('companyId');
  const companyName = searchParams.get('companyName');
  const jobCategoryId = searchParams.get('jobCategoryId');
  const jobCategoryName = searchParams.get('jobCategoryName');

  const [specLoading, setSpecLoading] = useState(true);
  const [specFound, setSpecFound] = useState(false);
  const [specSummary, setSpecSummary] = useState('');
  const [questions, setQuestions] = useState<Question[]>([
    createEmptyQuestion(),
  ]);

  useEffect(() => {
    const fetchSpec = async () => {
      const token = localStorage.getItem('access_token');
      try {
        setSpecLoading(true);
        const res = await fetch(`${API_URL}/users/me/spec`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 404) {
          setSpecFound(false);
          return;
        }

        if (!res.ok) {
          setSpecFound(false);
          return;
        }

        const data = await res.json();
        setSpecFound(true);

        const edu = data.structured_data?.education;
        const skills: string[] = data.structured_data?.skills ?? [];
        const parts: string[] = [];

        if (edu?.school) parts.push(`${edu.school} ${edu.major ?? ''}`);
        if (skills.length > 0)
          parts.push(`보유 기술: ${skills.slice(0, 5).join(', ')}`);

        setSpecSummary(parts.join(' | ') || '스펙이 등록되어 있습니다');
      } catch (error) {
        console.error('스펙 조회 에러:', error);
        setSpecFound(false);
      } finally {
        setSpecLoading(false);
      }
    };

    const token = localStorage.getItem('access_token');
    if (token) fetchSpec();
    else setSpecLoading(false);
  }, []);

  const updateQuestion = (idx: number, patch: Partial<Question>) => {
    setQuestions((prev) =>
      prev.map((q, i) => (i === idx ? { ...q, ...patch } : q))
    );
  };

  const addQuestion = () => {
    setQuestions((prev) => [...prev, createEmptyQuestion()]);
  };

  const removeQuestion = (idx: number) => {
    if (questions.length <= 1) return;
    setQuestions((prev) => prev.filter((_, i) => i !== idx));
  };

  const canProceed =
    specFound &&
    questions.every((q) => q.content.trim().length > 0) &&
    companyId &&
    jobCategoryId;

  const handleNext = () => {
    if (!canProceed) return;

    sessionStorage.setItem(
      'draft_data',
      JSON.stringify({
        company_id: Number(companyId),
        job_category_id: Number(jobCategoryId),
        questions: questions.map((q) => ({
          content: q.content.trim(),
          min_length: q.min_length,
          max_length: q.max_length,
        })),
      })
    );

    navigate('/draft/step3');
  };

  return (
    <div className="flex flex-1 flex-col px-12 py-10">
      <StepIndicator currentStep={2} />

      <h2 className="mt-8 text-2xl font-bold text-black">
        STEP 2. 스펙 불러오기
      </h2>

      <div className="mt-2 flex gap-3 text-sm text-neutral-500">
        <span className="rounded bg-indigo-50 px-2 py-0.5 font-medium text-indigo-700">
          {companyName}
        </span>
        <span className="rounded bg-gray-100 px-2 py-0.5 text-gray-600">
          {jobCategoryName}
        </span>
      </div>

      {/* 스펙 상태 */}
      <div className="mt-8 rounded-xl border bg-white p-6">
        <h3 className="text-lg font-semibold text-gray-800">내 스펙</h3>

        {specLoading ? (
          <div className="mt-3 text-sm text-neutral-500">
            스펙을 불러오는 중...
          </div>
        ) : specFound ? (
          <div className="mt-3 flex items-center gap-3">
            <Icon icon="mdi:check-circle" className="text-xl text-green-500" />
            <span className="text-sm text-gray-700">{specSummary}</span>
          </div>
        ) : (
          <div className="mt-3 flex items-center gap-3">
            <Icon
              icon="mdi:alert-circle-outline"
              className="text-xl text-amber-500"
            />
            <span className="text-sm text-gray-700">
              스펙이 등록되지 않았습니다.{' '}
              <Link
                to="/spec"
                className="font-medium text-indigo-500 underline"
              >
                스펙 등록하러 가기
              </Link>
            </span>
          </div>
        )}
      </div>

      {/* 문항 입력 */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">문항 입력</h3>
          <button
            type="button"
            onClick={addQuestion}
            className="flex items-center gap-1 rounded-lg border border-indigo-200 px-3 py-1.5 text-sm font-medium text-indigo-600 transition hover:bg-indigo-50"
          >
            <Icon icon="mdi:plus" className="text-base" />
            문항 추가
          </button>
        </div>

        <div className="mt-4 flex flex-col gap-5">
          {questions.map((question, idx) => (
            <div key={idx} className="rounded-xl border bg-white p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700">
                  문항 {idx + 1}
                </span>
                {questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeQuestion(idx)}
                    className="text-sm text-red-400 transition hover:text-red-600"
                  >
                    삭제
                  </button>
                )}
              </div>

              <textarea
                value={question.content}
                onChange={(e) =>
                  updateQuestion(idx, { content: e.target.value })
                }
                placeholder="자소서 문항을 입력하세요 (예: 지원 동기를 작성해 주세요)"
                rows={3}
                className="mt-3 w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-sm transition outline-none focus:border-indigo-300"
              />

              <div className="mt-3 flex items-center gap-6">
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  최소 글자수
                  <input
                    type="number"
                    value={question.min_length}
                    onChange={(e) =>
                      updateQuestion(idx, {
                        min_length: Number(e.target.value) || 0,
                      })
                    }
                    className="w-24 rounded-lg border border-gray-200 px-3 py-1.5 text-center text-sm outline-none focus:border-indigo-300"
                  />
                </label>

                <label className="flex items-center gap-2 text-sm text-gray-600">
                  최대 글자수
                  <input
                    type="number"
                    value={question.max_length}
                    onChange={(e) =>
                      updateQuestion(idx, {
                        max_length: Number(e.target.value) || 0,
                      })
                    }
                    className="w-24 rounded-lg border border-gray-200 px-3 py-1.5 text-center text-sm outline-none focus:border-indigo-300"
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 flex justify-between">
        <button
          type="button"
          onClick={() => navigate('/draft/step1')}
          className="rounded-xl border border-gray-300 px-10 py-3 text-base font-semibold text-gray-600 transition hover:bg-gray-50"
        >
          PREV
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={!canProceed}
          className="rounded-xl bg-indigo-400 px-10 py-3 text-base font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          NEXT
        </button>
      </div>
    </div>
  );
}
