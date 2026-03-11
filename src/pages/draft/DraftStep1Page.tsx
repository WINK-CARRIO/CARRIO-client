import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StepIndicator from '../../components/StepIndicator';
import SamsungLogo from '../../../public/SAMSUNG.jpg';
import LGLogo from '../../../public/LG.png';
import MolocoLogo from '../../../public/MOLOCO.png';

type Company = {
  id: number;
  name: string;
  industry: string;
  description: string;
  logo_url: string;
};

type CompaniesResponse = {
  total: number;
  page: number;
  limit: number;
  data: Company[];
};

type JobCategory = {
  job_category_id: number;
  job_category_name: string;
  extracted_at?: string;
};

type JobCategoriesResponse = {
  company_id: number;
  company_name: string;
  job_categories: JobCategory[];
};

const resolveCompanyImage = (company: Company) => {
  const name = company.name.toLowerCase();
  if (name.includes('삼성') || name.includes('samsung')) return SamsungLogo;
  if (name.includes('lg')) return LGLogo;
  if (name.includes('moloco') || name.includes('몰로코')) return MolocoLogo;
  return company.logo_url;
};

const API_URL = import.meta.env.VITE_API_URL;

export default function DraftStep1Page() {
  const navigate = useNavigate();

  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const [jobCategories, setJobCategories] = useState<JobCategory[]>([]);
  const [selectedJobCategory, setSelectedJobCategory] =
    useState<JobCategory | null>(null);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      const token = localStorage.getItem('access_token');
      try {
        setIsLoading(true);
        const res = await fetch(
          `${API_URL}/companies?sort=name&page=1&limit=20`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          }
        );
        const data: CompaniesResponse = await res.json();

        if (!res.ok) {
          console.error('기업 목록 조회 실패:', data);
          return;
        }

        setCompanies(data.data ?? []);
      } catch (error) {
        console.error('기업 목록 조회 에러:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  useEffect(() => {
    if (!selectedCompany) {
      setJobCategories([]);
      setSelectedJobCategory(null);
      return;
    }

    const fetchJobCategories = async () => {
      const token = localStorage.getItem('access_token');
      try {
        setIsCategoriesLoading(true);
        setSelectedJobCategory(null);

        const res = await fetch(
          `${API_URL}/companies/${selectedCompany.id}/job-categories`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          }
        );

        if (!res.ok) {
          console.error('직무 카테고리 조회 실패');
          setJobCategories([]);
          return;
        }

        const data: JobCategoriesResponse = await res.json();
        setJobCategories(data.job_categories ?? []);
      } catch (error) {
        console.error('직무 카테고리 조회 에러:', error);
        setJobCategories([]);
      } finally {
        setIsCategoriesLoading(false);
      }
    };

    fetchJobCategories();
  }, [selectedCompany]);

  const handleNext = () => {
    if (!selectedCompany || !selectedJobCategory) return;

    const params = new URLSearchParams({
      companyId: String(selectedCompany.id),
      companyName: selectedCompany.name,
      jobCategoryId: String(selectedJobCategory.job_category_id),
      jobCategoryName: selectedJobCategory.job_category_name,
    });

    navigate(`/draft/step2?${params.toString()}`);
  };

  return (
    <div className="flex flex-1 flex-col px-12 py-10">
      <StepIndicator currentStep={1} />

      <h2 className="mt-8 text-2xl font-bold text-black">STEP 1. 기업 선택</h2>
      <p className="mt-2 text-sm text-neutral-500">
        자소서를 작성할 기업과 직무를 선택해 주세요
      </p>

      {isLoading ? (
        <div className="mt-10 text-neutral-500">불러오는 중...</div>
      ) : (
        <div className="mt-8 flex gap-5 overflow-x-auto pb-4">
          {companies.map((company) => {
            const isSelected = selectedCompany?.id === company.id;
            const image = resolveCompanyImage(company);

            return (
              <button
                key={company.id}
                type="button"
                onClick={() => setSelectedCompany(company)}
                className={`flex w-52 shrink-0 flex-col items-center gap-3 rounded-2xl border-2 bg-white p-5 text-center transition ${
                  isSelected
                    ? 'border-indigo-400 shadow-lg'
                    : 'border-transparent shadow hover:border-gray-200'
                }`}
              >
                {image ? (
                  <img
                    src={image}
                    alt={company.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-lg font-bold text-gray-400">
                    {company.name.charAt(0)}
                  </div>
                )}
                <div className="text-sm font-semibold text-gray-800">
                  {company.name}
                </div>
                <div className="text-xs text-neutral-400">
                  {company.industry}
                </div>
                <div className="line-clamp-2 text-xs text-neutral-500">
                  {company.description}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {selectedCompany && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800">직무 선택</h3>

          {isCategoriesLoading ? (
            <div className="mt-3 text-sm text-neutral-500">
              직무 목록을 불러오는 중...
            </div>
          ) : jobCategories.length === 0 ? (
            <div className="mt-3 text-sm text-neutral-400">
              등록된 직무가 없습니다
            </div>
          ) : (
            <div className="mt-3 flex flex-wrap gap-3">
              {jobCategories.map((category) => {
                const isSelected =
                  selectedJobCategory?.job_category_id ===
                  category.job_category_id;

                return (
                  <button
                    key={category.job_category_id}
                    type="button"
                    onClick={() => setSelectedJobCategory(category)}
                    className={`rounded-lg border px-5 py-2.5 text-sm font-medium transition ${
                      isSelected
                        ? 'border-indigo-400 bg-indigo-50 text-indigo-700'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {category.job_category_name}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      <div className="mt-12 flex justify-end">
        <button
          type="button"
          onClick={handleNext}
          disabled={!selectedCompany || !selectedJobCategory}
          className="rounded-xl bg-indigo-400 px-10 py-3 text-base font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          NEXT
        </button>
      </div>
    </div>
  );
}
