import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import StatusBadge from '../../components/StatusBadge';
import DownIcon from '../../assets/svgs/icon/DownIcon';
import SamsungLogo from '../../../public/SAMSUNG.jpg';
import LGLogo from '../../../public/LG.png';
import MolocoLogo from '../../../public/MOLOCO.png';

type CoverLetterItem = {
  id: number;
  company_name: string;
  job_category_name?: string;
  overall_score?: number;
  status: string;
  created_at: string;
};

type CoverLetterListResponse = {
  total: number;
  page: number;
  limit: number;
  data: CoverLetterItem[];
};

type CoverLetterItemData = {
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

type CoverLetterDetail = {
  id: number;
  user_id: number;
  company_id: number;
  company_name: string;
  job_category_id?: number;
  job_category_name?: string;
  status: string;
  items: CoverLetterItemData[];
  created_at: string;
};

// GET /cover-letters/{id} 응답은 { cover_letter, matching_analysis } 래퍼
type CoverLetterDetailResponse = {
  cover_letter: CoverLetterDetail;
  matching_analysis?: Record<string, unknown> | null;
};

const ITEMS_PER_PAGE = 10;

const resolveCompanyImage = (name: string, logoUrl?: string) => {
  const lower = name.toLowerCase();
  if (lower.includes('삼성') || lower.includes('samsung')) return SamsungLogo;
  if (lower.includes('lg')) return LGLogo;
  if (lower.includes('moloco') || lower.includes('몰로코')) return MolocoLogo;
  return logoUrl || '';
};

const toStatusBadge = (status: string): 'DONE' | 'RUNNING' | 'NONE' => {
  if (status === 'DONE' || status === 'completed') return 'DONE';
  if (status === 'RUNNING' || status === 'processing') return 'RUNNING';
  return 'NONE';
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
};

const API_URL = import.meta.env.VITE_API_URL;

export default function ResultPage() {

  const [items, setItems] = useState<CoverLetterItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [detailCache, setDetailCache] = useState<
    Record<number, CoverLetterDetail>
  >({});
  const [loadingDetailId, setLoadingDetailId] = useState<number | null>(null);

  const fetchList = async (targetPage: number, append = false) => {
    const token = localStorage.getItem('access_token');
    try {
      setIsLoading(true);
      const res = await fetch(
        `${API_URL}/cover-letters?page=${targetPage}&limit=${ITEMS_PER_PAGE}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        }
      );

      if (!res.ok) {
        console.error('자소서 목록 조회 실패');
        return;
      }

      const data: CoverLetterListResponse = await res.json();
      setTotal(data.total);
      setItems((prev) => (append ? [...prev, ...data.data] : data.data));
    } catch (error) {
      console.error('자소서 목록 조회 에러:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchList(1);
  }, []);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchList(nextPage, true);
  };

  const handleToggle = async (id: number) => {
    if (expandedId === id) {
      setExpandedId(null);
      return;
    }

    setExpandedId(id);

    if (detailCache[id]) return;

    try {
      const token = localStorage.getItem('access_token');
      setLoadingDetailId(id);
      const res = await fetch(`${API_URL}/cover-letters/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });

      if (!res.ok) {
        console.error('자소서 상세 조회 실패');
        return;
      }

      const data: CoverLetterDetailResponse = await res.json();
      setDetailCache((prev) => ({
        ...prev,
        [id]: data.cover_letter,
      }));
    } catch (error) {
      console.error('자소서 상세 조회 에러:', error);
    } finally {
      setLoadingDetailId(null);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    try {
      const token = localStorage.getItem('access_token');
      const res = await fetch(`${API_URL}/cover-letters/${id}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });

      if (!res.ok) {
        toast.error('삭제에 실패했습니다.');
        return;
      }

      setExpandedId(null);
      setDetailCache((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
      setPage(1);
      fetchList(1);
    } catch (error) {
      console.error('자소서 삭제 에러:', error);
      toast.error('서버 오류가 발생했습니다.');
    }
  };

  const hasMore = items.length < total;

  return (
    <div className="flex flex-col gap-8 px-12 py-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-semibold text-indigo-800">
          자소서 확인하기
        </h1>
        <p className="text-neutral-500">
          CARRIO의 AI로 기업 인재상에 맞춰 생성된, 나만의 맞춤 자소서를
          확인해보세요
        </p>
      </div>

      <div className="text-sm text-neutral-500">총 {total}건</div>

      {isLoading && items.length === 0 ? (
        <div className="py-20 text-center text-neutral-500">불러오는 중...</div>
      ) : items.length === 0 ? (
        <div className="py-20 text-center text-neutral-400">
          아직 생성된 자소서가 없습니다
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {items.map((item) => {
            const isExpanded = expandedId === item.id;
            const detail = detailCache[item.id];
            const isDetailLoading = loadingDetailId === item.id;
            const companyImage = resolveCompanyImage(item.company_name);

            return (
              <div
                key={item.id}
                className="rounded-2xl border border-gray-200 bg-white"
              >
                <button
                  type="button"
                  onClick={() => handleToggle(item.id)}
                  className="flex w-full items-center gap-4 px-6 py-4"
                >
                  {companyImage && (
                    <img
                      src={companyImage}
                      alt={item.company_name}
                      className="h-10 w-10 rounded-lg object-contain"
                    />
                  )}

                  <span className="text-base font-medium text-gray-900">
                    {item.company_name}
                  </span>

                  <StatusBadge status={toStatusBadge(item.status)} />

                  {item.job_category_name && (
                    <span className="text-sm text-neutral-500">
                      {item.job_category_name}
                    </span>
                  )}

                  <span className="ml-auto text-sm text-neutral-400">
                    {formatDate(item.created_at)}
                  </span>

                  <DownIcon
                    className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                  />
                </button>

                {isExpanded && (
                  <div className="border-t border-gray-100 px-6 py-5">
                    {isDetailLoading ? (
                      <div className="py-6 text-center text-neutral-400">
                        불러오는 중...
                      </div>
                    ) : detail ? (
                      <div className="flex flex-col gap-5">
                        <div className="text-base font-semibold text-indigo-700">
                          나의 자소서
                        </div>

                        {detail.items.map((qaItem, idx) => (
                          <div key={idx} className="flex flex-col gap-2">
                            <div className="text-sm font-medium text-gray-800">
                              Q{idx + 1}. {qaItem.question.content}
                            </div>
                            <div className="rounded-xl bg-indigo-50 p-4 text-sm leading-relaxed whitespace-pre-wrap text-gray-700">
                              {qaItem.answer.content}
                            </div>
                            <div className="text-xs text-neutral-400">
                              {qaItem.answer.content.length}자 (최소{' '}
                              {qaItem.question.min_length}자 / 최대{' '}
                              {qaItem.question.max_length}자)
                            </div>
                            {qaItem.answer.guide_comments &&
                              qaItem.answer.guide_comments.length > 0 && (
                                <div className="mt-1 rounded-lg border border-amber-200 bg-amber-50 p-3">
                                  <div className="mb-1.5 text-xs font-semibold text-amber-700">
                                    AI 가이드라인
                                  </div>
                                  <ul className="flex flex-col gap-1">
                                    {qaItem.answer.guide_comments.map(
                                      (comment, cIdx) => (
                                        <li
                                          key={cIdx}
                                          className="text-xs leading-relaxed text-amber-900"
                                        >
                                          {comment}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              )}
                          </div>
                        ))}

                        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                          <span className="text-xs text-neutral-400">
                            생성일: {formatDate(detail.created_at)}
                          </span>

                          <button
                            type="button"
                            onClick={() => handleDelete(item.id)}
                            className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-500"
                          >
                            삭제
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="py-6 text-center text-neutral-400">
                        상세 정보를 불러올 수 없습니다
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {hasMore && (
            <button
              type="button"
              onClick={handleLoadMore}
              disabled={isLoading}
              className="mx-auto mt-4 rounded-lg border border-indigo-300 px-6 py-2 text-sm font-medium text-indigo-600 disabled:opacity-50"
            >
              {isLoading ? '불러오는 중...' : '더보기'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
