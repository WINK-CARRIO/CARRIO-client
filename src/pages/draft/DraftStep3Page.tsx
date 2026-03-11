import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import StepIndicator from '../../components/StepIndicator';

type DraftData = {
  company_id: number;
  job_category_id: number;
  questions: Array<{
    content: string;
    min_length: number;
    max_length: number;
  }>;
};

type CoverLetterItem = {
  question: {
    content: string;
    min_length: number;
    max_length: number;
  };
  answer: {
    content: string;
    length: number;
    guide_comments: string[];
  };
};

type CoverLetterResponse = {
  id: number;
  user_id: number;
  company_id: number;
  company_name: string;
  job_category_id?: number;
  job_category_name?: string;
  status: string;
  items: CoverLetterItem[];
  created_at: string;
};

type ViewState =
  | { kind: 'loading' }
  | { kind: 'error'; message: string }
  | { kind: 'result'; data: CoverLetterResponse };

const API_URL = import.meta.env.VITE_API_URL;

export default function DraftStep3Page() {
  const navigate = useNavigate();

  const [viewState, setViewState] = useState<ViewState>({ kind: 'loading' });
  const [editedAnswers, setEditedAnswers] = useState<string[]>([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  const generateDraft = useCallback(async () => {
    const raw = sessionStorage.getItem('draft_data');
    if (!raw) {
      navigate('/draft', { replace: true });
      return;
    }

    let draftData: DraftData;
    try {
      draftData = JSON.parse(raw);
    } catch {
      navigate('/draft', { replace: true });
      return;
    }

    setViewState({ kind: 'loading' });

    try {
      const token = localStorage.getItem('access_token');
      const res = await fetch(`${API_URL}/cover-letters`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(draftData),
        signal: AbortSignal.timeout(120_000),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        const message =
          typeof body.detail === 'string'
            ? body.detail
            : (body.message ?? '초안 생성에 실패했습니다');
        setViewState({ kind: 'error', message });
        return;
      }

      const data: CoverLetterResponse = await res.json();
      setViewState({ kind: 'result', data });
      setEditedAnswers(data.items.map((item) => item.answer.content));
      setSelectedIdx(0);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : '알 수 없는 오류가 발생했습니다';
      setViewState({ kind: 'error', message });
    }
  }, [navigate]);

  useEffect(() => {
    generateDraft();
  }, [generateDraft]);

  const handleSave = async () => {
    if (viewState.kind !== 'result') return;

    try {
      setIsSaving(true);
      const payload = {
        items: viewState.data.items.map((item, i) => ({
          question: {
            content: item.question.content,
            min_length: item.question.min_length,
            max_length: item.question.max_length,
          },
          answer: {
            content: editedAnswers[i],
            length: editedAnswers[i].length,
            guide_comments: item.answer.guide_comments,
          },
        })),
      };

      const token = localStorage.getItem('access_token');
      const res = await fetch(`${API_URL}/cover-letters/${viewState.data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        alert(body.detail ?? body.message ?? '저장에 실패했습니다');
        return;
      }

      sessionStorage.removeItem('draft_data');
      alert('자소서가 저장되었습니다');
      navigate('/result');
    } catch (error) {
      console.error('저장 에러:', error);
      alert('서버 오류가 발생했습니다');
    } finally {
      setIsSaving(false);
    }
  };

  if (viewState.kind === 'loading') {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-12 py-10">
        <StepIndicator currentStep={3} />

        <div className="mt-20 flex flex-col items-center gap-6">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-400" />
          <p className="text-lg font-medium text-gray-700">
            CARRIO AI가 자소서 초안을 생성하고 있어요
          </p>
          <p className="text-sm text-neutral-400">
            최대 2분 정도 소요될 수 있습니다
          </p>
        </div>
      </div>
    );
  }

  if (viewState.kind === 'error') {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-12 py-10">
        <StepIndicator currentStep={3} />

        <div className="mt-20 flex flex-col items-center gap-4">
          <p className="text-lg font-medium text-red-500">
            초안 생성 중 오류가 발생했습니다
          </p>
          <p className="text-sm text-neutral-500">{viewState.message}</p>
          <button
            type="button"
            onClick={generateDraft}
            className="mt-4 rounded-xl bg-indigo-400 px-8 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  const { data } = viewState;
  const currentItem = data.items[selectedIdx];
  const charCount = editedAnswers[selectedIdx]?.length ?? 0;

  return (
    <div className="flex flex-1 flex-col px-12 py-10">
      <StepIndicator currentStep={3} />

      <h2 className="mt-8 text-2xl font-bold text-black">STEP 3. 초안 작성</h2>

      <div className="mt-8 flex flex-1 gap-6">
        {/* 왼쪽 패널 */}
        <div className="flex w-72 shrink-0 flex-col gap-6">
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <div className="text-lg font-semibold text-gray-800">
              {data.company_name}
            </div>
            {data.job_category_name && (
              <div className="mt-1 text-sm text-neutral-500">
                {data.job_category_name}
              </div>
            )}
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <div className="mb-3 text-sm font-semibold text-gray-700">
              문항 목록
            </div>
            <div className="flex flex-col gap-2">
              {data.items.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedIdx(idx)}
                  className={`rounded-lg px-3 py-2 text-left text-sm transition ${
                    selectedIdx === idx
                      ? 'bg-indigo-50 font-medium text-indigo-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-xs font-medium">
                    {idx + 1}
                  </span>
                  <span className="line-clamp-1">
                    {item.question.content}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 오른쪽 패널 */}
        <div className="flex flex-1 flex-col rounded-xl bg-white p-6 shadow-sm">
          <div className="text-sm font-semibold text-gray-500">
            문항 {selectedIdx + 1}
          </div>
          <p className="mt-2 text-base font-medium text-gray-800">
            {currentItem?.question.content}
          </p>

          {currentItem?.answer.guide_comments &&
            currentItem.answer.guide_comments.length > 0 && (
              <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
                <div className="mb-2 text-xs font-semibold text-amber-700">
                  AI 가이드라인
                </div>
                <ul className="flex flex-col gap-1.5">
                  {currentItem.answer.guide_comments.map((comment, idx) => (
                    <li
                      key={idx}
                      className="text-sm leading-relaxed text-amber-900"
                    >
                      {comment}
                    </li>
                  ))}
                </ul>
              </div>
            )}

          <textarea
            value={editedAnswers[selectedIdx] ?? ''}
            onChange={(e) => {
              const value = e.target.value;
              setEditedAnswers((prev) =>
                prev.map((a, i) => (i === selectedIdx ? value : a))
              );
            }}
            rows={16}
            className="mt-4 flex-1 resize-none rounded-lg border border-gray-200 px-4 py-3 text-sm leading-relaxed transition outline-none focus:border-indigo-300"
          />

          <div className="mt-2 flex items-center justify-between text-xs text-neutral-400">
            <span>
              권장 글자수: {currentItem?.question.min_length}~
              {currentItem?.question.max_length}자
            </span>
            <span
              className={
                charCount < (currentItem?.question.min_length ?? 0) ||
                charCount > (currentItem?.question.max_length ?? Infinity)
                  ? 'text-red-400'
                  : 'text-green-500'
              }
            >
              {charCount}자
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end gap-4">
        <button
          type="button"
          onClick={() => navigate('/result')}
          className="rounded-xl border border-gray-300 px-8 py-3 text-base font-semibold text-gray-600 transition hover:bg-gray-50"
        >
          HOME
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="rounded-xl bg-indigo-400 px-10 py-3 text-base font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-50"
        >
          {isSaving ? '저장 중...' : 'SAVE'}
        </button>
      </div>
    </div>
  );
}
