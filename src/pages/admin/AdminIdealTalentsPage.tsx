import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import AdminMenu from '../../components/AdminMenu';
import Header from '../../components/Header';
import PlusIcon from '../../assets/svgs/icon/PlusIcon';
import MagnifyIcon from '../../assets/svgs/icon/MagnifyIcon';
import DownIcon from '../../assets/svgs/icon/DownIcon';
import StatusBadge from '../../components/StatusBadge';
import JobTalentCard, { type JobTalentMock } from '../../components/JobTalentCard';
import OverallTalentCard, {
  type OverallTalentMock,
} from '../../components/OverallTalentCard';
import AddCompanyModal from '../../components/AddCompanyModal';
import EditCompanyModal from '../../components/EditCompanyModal';
import EditOverallTalentModal from '../../components/EditOverallTalentModal';
import EditJobTalentModal from '../../components/EditJobTalentModal';
import ExtractJobTalentModal from '../../components/ExtractJobTalentModal';

type Company = {
  id: number;
  name: string;
  industry?: string;
  description?: string;
  website_url?: string;
  logo_url?: string;
  created_at?: string;
};

type CompanyCreatePayload = {
  name: string;
  industry: string;
  description: string;
  website_url: string;
};

type OverallTalentForm = {
  keywords: string;
  description: string;
  details: string;
};

type JobTalentForm = {
  keywords: string;
  description: string;
  details: string;
  technical_requirements: string;
};

type CompaniesResponse = {
  total?: number;
  page?: number;
  limit?: number;
  data?: Company[];
};

type OverallTalentApi = {
  keywords: string[];
  description: string;
  details: string[];
  extracted_at?: string;
};

type JobSpecificApi = {
  keywords: string[];
  description: string;
  details: string[];
  technical_requirements: string[];
  extracted_at?: string;
};

type OverallTalentResponse = {
  id?: number;
  company_id: number;
  talent_values?: {
    overall?: OverallTalentApi;
  };
  extracted_at?: string;
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

type JobTalentResponse = {
  id?: number;
  company_id: number;
  company_name?: string;
  job_category_id: number;
  job_category_name: string;
  talent_values?: {
    overall?: OverallTalentApi;
    job_specific?: JobSpecificApi;
  };
  extracted_at?: string;
};

type ExpandedCompanyData = {
  overall: OverallTalentMock | null;
  jobs: (JobTalentMock & { job_category_id: number })[];
  isLoading: boolean;
  loaded: boolean;
};

const getToken = () => localStorage.getItem('access_token');

const getAuthHeaders = (json = false): HeadersInit => {
  const token = getToken();
  const headers: Record<string, string> = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  if (json) {
    headers['Content-Type'] = 'application/json';
  }

  return headers;
};

const safeString = (value: unknown, fallback = '') =>
  typeof value === 'string' ? value : fallback;

const safeStringArray = (value: unknown) =>
  Array.isArray(value)
    ? value.filter((item): item is string => typeof item === 'string')
    : [];

const parseErrorMessage = async (res: Response) => {
  try {
    const body = (await res.json()) as {
      detail?: unknown;
      message?: unknown;
    };
    if (typeof body.detail === 'string') return body.detail;
    if (typeof body.message === 'string') return body.message;
    if (Array.isArray(body.detail)) {
      return body.detail
        .map((item) => {
          if (typeof item === 'string') return item;
          if (
            typeof item === 'object' &&
            item !== null &&
            'msg' in item &&
            typeof item.msg === 'string'
          ) {
            return item.msg;
          }
          return JSON.stringify(item);
        })
        .join('\n');
    }
    return '요청에 실패했습니다.';
  } catch {
    return '요청에 실패했습니다.';
  }
};

const toOverallCard = (data: OverallTalentResponse): OverallTalentMock | null => {
  const overall = data.talent_values?.overall;
  if (!overall) return null;

  return {
    id: data.id,
    company_id: data.company_id,
    status: 'DONE',
    keywords: safeStringArray(overall.keywords),
    description: safeString(overall.description),
    details: safeStringArray(overall.details),
    extracted_at:
      safeString(overall.extracted_at) ||
      safeString(data.extracted_at) ||
      new Date().toISOString(),
  };
};

const toJobCard = (data: JobTalentResponse): (JobTalentMock & { job_category_id: number }) | null => {
  const jobSpecific = data.talent_values?.job_specific;
  if (!jobSpecific) return null;

  return {
    id: data.id ?? data.job_category_id,
    job_category_id: data.job_category_id,
    job_category_name: safeString(data.job_category_name),
    status: 'DONE',
    keywords: safeStringArray(jobSpecific.keywords),
    description: safeString(jobSpecific.description),
    details: safeStringArray(jobSpecific.details),
    technical_requirements: safeStringArray(jobSpecific.technical_requirements),
    extracted_at:
      safeString(jobSpecific.extracted_at) ||
      safeString(data.extracted_at) ||
      new Date().toISOString(),
  };
};

export default function AdminIdealTalentsPage() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<'ALL' | 'ACTIVE' | 'INACTIVE'>('ALL');
  const [openId, setOpenId] = useState<number | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isAddCompanyModalOpen, setIsAddCompanyModalOpen] = useState(false);
  const [isEditCompanyModalOpen, setIsEditCompanyModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isEditOverallModalOpen, setIsEditOverallModalOpen] = useState(false);
  const [overallEditTarget, setOverallEditTarget] = useState<number | null>(
    null
  );
  const [overallEditInitial, setOverallEditInitial] = useState<OverallTalentForm>({
    keywords: '',
    description: '',
    details: '',
  });
  const [isEditJobModalOpen, setIsEditJobModalOpen] = useState(false);
  const [jobEditTarget, setJobEditTarget] = useState<{
    companyId: number;
    jobCategoryId: number;
    jobTitle: string;
  } | null>(null);
  const [jobEditInitial, setJobEditInitial] = useState<JobTalentForm>({
    keywords: '',
    description: '',
    details: '',
    technical_requirements: '',
  });
  const [isExtractJobModalOpen, setIsExtractJobModalOpen] = useState(false);
  const [extractJobTarget, setExtractJobTarget] = useState<Company | null>(null);
  const [extractJobOptions, setExtractJobOptions] = useState<JobCategory[]>([]);
  const [isExtractJobOptionsLoading, setIsExtractJobOptionsLoading] =
    useState(false);
  const [detailMap, setDetailMap] = useState<Record<number, ExpandedCompanyData>>(
    {}
  );
  const [isCompaniesLoading, setIsCompaniesLoading] = useState(true);
  const [companyStatusMap, setCompanyStatusMap] = useState<
    Record<number, 'DONE' | 'NONE'>
  >({});
  const [extractingOverallIds, setExtractingOverallIds] = useState<Set<number>>(
    new Set()
  );
  const [extractingJobIds, setExtractingJobIds] = useState<Set<string>>(
    new Set()
  );

  const fetchCompanyStatus = async (companyId: number) => {
    try {
      const [overallRes, categoriesRes] = await Promise.all([
        fetch(`${API_URL}/companies/${companyId}/talent-values`, {
          headers: getAuthHeaders(),
        }),
        fetch(`${API_URL}/companies/${companyId}/job-categories`, {
          headers: getAuthHeaders(),
        }),
      ]);

      let hasOverall = false;
      if (overallRes.ok) {
        const data = (await overallRes.json()) as OverallTalentResponse;
        hasOverall = !!data.talent_values?.overall;
      }

      let jobCount = 0;
      if (categoriesRes.ok) {
        const data = (await categoriesRes.json()) as JobCategoriesResponse;
        jobCount = data.job_categories?.length ?? 0;
      }

      return hasOverall || jobCount > 0 ? 'DONE' : 'NONE';
    } catch {
      return 'NONE';
    }
  };

  const fetchCompanies = async () => {
    try {
      setIsCompaniesLoading(true);

      const res = await fetch(`${API_URL}/companies?sort=name&page=1&limit=100`, {
        headers: getAuthHeaders(),
      });

      if (!res.ok) {
        toast.error(await parseErrorMessage(res));
        return;
      }

      const data = (await res.json()) as CompaniesResponse;
      const list = data.data ?? [];
      setCompanies(list);

      const statusEntries = await Promise.all(
        list.map(async (company) => {
          const statusValue = await fetchCompanyStatus(company.id);
          return [company.id, statusValue] as const;
        })
      );

      setCompanyStatusMap((prev) => {
        const next = { ...prev };
        statusEntries.forEach(([id, statusValue]) => {
          next[id] = statusValue;
        });
        return next;
      });
    } catch (error) {
      console.error('기업 목록 조회 에러:', error);
      toast.error('기업 목록 조회 중 오류가 발생했습니다.');
    } finally {
      setIsCompaniesLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, [API_URL]);

  const loadCompanyDetails = async (companyId: number) => {
    const current = detailMap[companyId];
    if (current?.loaded || current?.isLoading) return;

    setDetailMap((prev) => ({
      ...prev,
      [companyId]: {
        overall: prev[companyId]?.overall ?? null,
        jobs: prev[companyId]?.jobs ?? [],
        loaded: false,
        isLoading: true,
      },
    }));

    try {
      const [overallRes, categoriesRes] = await Promise.all([
        fetch(`${API_URL}/companies/${companyId}/talent-values`, {
          headers: getAuthHeaders(),
        }),
        fetch(`${API_URL}/companies/${companyId}/job-categories`, {
          headers: getAuthHeaders(),
        }),
      ]);

      let overall: OverallTalentMock | null = null;
      if (overallRes.ok) {
        const overallData = (await overallRes.json()) as OverallTalentResponse;
        overall = toOverallCard(overallData);
      }

      let categories: JobCategory[] = [];
      if (categoriesRes.ok) {
        const categoriesData = (await categoriesRes.json()) as JobCategoriesResponse;
        categories = categoriesData.job_categories ?? [];
      }

      const jobResponses = await Promise.all(
        categories.map(async (category) => {
          const res = await fetch(
            `${API_URL}/companies/${companyId}/job-categories/${category.job_category_id}/talent-values`,
            { headers: getAuthHeaders() }
          );
          if (!res.ok) return null;
          const data = (await res.json()) as JobTalentResponse;
          return toJobCard(data);
        })
      );

      const jobs = jobResponses.filter(
        (item): item is JobTalentMock & { job_category_id: number } =>
          item !== null
      );

      setDetailMap((prev) => ({
        ...prev,
        [companyId]: {
          overall,
          jobs,
          loaded: true,
          isLoading: false,
        },
      }));
      setCompanyStatusMap((prev) => ({
        ...prev,
        [companyId]: overall || jobs.length > 0 ? 'DONE' : 'NONE',
      }));
    } catch (error) {
      console.error('기업 인재상 상세 조회 에러:', error);
      setDetailMap((prev) => ({
        ...prev,
        [companyId]: {
          overall: null,
          jobs: [],
          loaded: true,
          isLoading: false,
        },
      }));
      setCompanyStatusMap((prev) => ({
        ...prev,
        [companyId]: 'NONE',
      }));
    }
  };

  const reloadCompanyDetails = async (companyId: number) => {
    setDetailMap((prev) => {
      const clone = { ...prev };
      delete clone[companyId];
      return clone;
    });
    await loadCompanyDetails(companyId);
  };

  const createCompany = async (payload: CompanyCreatePayload) => {
    try {
      const res = await fetch(`${API_URL}/admin/companies`, {
        method: 'POST',
        headers: getAuthHeaders(true),
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        toast.error(await parseErrorMessage(res));
        return false;
      }

      await fetchCompanies();
      toast.success('기업이 추가되었습니다.');
      return true;
    } catch (error) {
      console.error('기업 추가 에러:', error);
      toast.error('기업 추가 중 오류가 발생했습니다.');
      return false;
    }
  };

  const editCompany = async (payload: CompanyCreatePayload) => {
    if (!selectedCompany) return false;

    try {
      const res = await fetch(
        `${API_URL}/admin/companies/${selectedCompany.id}`,
        {
        method: 'PUT',
        headers: getAuthHeaders(true),
        body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        toast.error(await parseErrorMessage(res));
        return false;
      }

      await fetchCompanies();
      toast.success('기업 정보가 수정되었습니다.');
      return true;
    } catch (error) {
      console.error('기업 수정 에러:', error);
      toast.error('기업 수정 중 오류가 발생했습니다.');
      return false;
    }
  };

  const deleteCompany = async (companyId: number) => {
    if (!window.confirm('정말 기업을 삭제할까요?')) return;

    try {
      const res = await fetch(`${API_URL}/admin/companies/${companyId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (!res.ok) {
        toast.error(await parseErrorMessage(res));
        return;
      }

      setDetailMap((prev) => {
        const clone = { ...prev };
        delete clone[companyId];
        return clone;
      });
      await fetchCompanies();
      toast.success('기업이 삭제되었습니다.');
    } catch (error) {
      console.error('기업 삭제 에러:', error);
      toast.error('기업 삭제 중 오류가 발생했습니다.');
    }
  };

  const extractOverallTalent = async (companyId: number) => {
    try {
      setExtractingOverallIds((prev) => new Set(prev).add(companyId));
      const res = await fetch(
        `${API_URL}/admin/companies/${companyId}/extract-talent-values`,
        {
          method: 'POST',
          headers: getAuthHeaders(),
        }
      );

      if (!res.ok) {
        toast.error(await parseErrorMessage(res));
        return;
      }

      await reloadCompanyDetails(companyId);
      toast.success('전사 인재상 추출이 완료되었습니다.');
    } catch (error) {
      console.error('전사 인재상 추출 에러:', error);
      toast.error('전사 인재상 추출 중 오류가 발생했습니다.');
    } finally {
      setExtractingOverallIds((prev) => {
        const next = new Set(prev);
        next.delete(companyId);
        return next;
      });
    }
  };

  const updateOverallTalent = async (
    companyId: number,
    form: OverallTalentForm
  ) => {
    const keywords = form.keywords
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
    const details = form.details
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean);

    try {
      const res = await fetch(
        `${API_URL}/admin/companies/${companyId}/talent-values`,
        {
        method: 'PUT',
        headers: getAuthHeaders(true),
        body: JSON.stringify({
          keywords,
          description: form.description.trim(),
          details,
        }),
        }
      );

      if (!res.ok) {
        toast.error(await parseErrorMessage(res));
        return false;
      }

      await reloadCompanyDetails(companyId);
      toast.success('전사 인재상이 수정되었습니다.');
      return true;
    } catch (error) {
      console.error('전사 인재상 수정 에러:', error);
      toast.error('전사 인재상 수정 중 오류가 발생했습니다.');
      return false;
    }
  };

  const deleteOverallTalent = async (companyId: number) => {
    if (!window.confirm('전사 인재상을 삭제할까요?')) return;

    try {
      const res = await fetch(`${API_URL}/admin/companies/${companyId}/talent-values`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (!res.ok) {
        toast.error(await parseErrorMessage(res));
        return;
      }

      await reloadCompanyDetails(companyId);
      toast.success('전사 인재상이 삭제되었습니다.');
    } catch (error) {
      console.error('전사 인재상 삭제 에러:', error);
      toast.error('전사 인재상 삭제 중 오류가 발생했습니다.');
    }
  };

  const openExtractJobModal = async (company: Company) => {
    setExtractJobTarget(company);
    setIsExtractJobModalOpen(true);
    setIsExtractJobOptionsLoading(true);

    try {
      const res = await fetch(
        `${API_URL}/companies/${company.id}/job-categories`,
        { headers: getAuthHeaders() }
      );
      if (!res.ok) {
        setExtractJobOptions([]);
        return;
      }
      const data = (await res.json()) as JobCategoriesResponse;
      setExtractJobOptions(data.job_categories ?? []);
    } catch {
      setExtractJobOptions([]);
    } finally {
      setIsExtractJobOptionsLoading(false);
    }
  };

  const extractJobTalentByCategory = async (
    companyId: number,
    jobCategoryId: number
  ) => {
    try {
      setExtractingJobIds((prev) => new Set(prev).add(`${companyId}:${jobCategoryId}`));
      const res = await fetch(
        `${API_URL}/admin/companies/${companyId}/job-categories/${jobCategoryId}/extract-talent-values`,
        {
          method: 'POST',
          headers: getAuthHeaders(),
        }
      );

      if (!res.ok) {
        toast.error(await parseErrorMessage(res));
        return false;
      }

      await reloadCompanyDetails(companyId);
      toast.success('직무별 인재상 재추출이 완료되었습니다.');
      return true;
    } catch (error) {
      console.error('직무별 인재상 재추출 에러:', error);
      toast.error('직무별 인재상 재추출 중 오류가 발생했습니다.');
      return false;
    } finally {
      setExtractingJobIds((prev) => {
        const next = new Set(prev);
        next.delete(`${companyId}:${jobCategoryId}`);
        return next;
      });
    }
  };

  const updateJobTalent = async (
    companyId: number,
    jobCategoryId: number,
    form: JobTalentForm
  ) => {
    const keywords = form.keywords
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
    const details = form.details
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean);
    const technical_requirements = form.technical_requirements
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean);

    try {
      const res = await fetch(
        `${API_URL}/admin/companies/${companyId}/job-categories/${jobCategoryId}/talent-values`,
        {
          method: 'PUT',
          headers: getAuthHeaders(true),
          body: JSON.stringify({
            job_specific: {
              keywords,
              description: form.description.trim(),
              details,
              technical_requirements,
            },
          }),
        }
      );

      if (!res.ok) {
        toast.error(await parseErrorMessage(res));
        return false;
      }

      await reloadCompanyDetails(companyId);
      toast.success('직무별 인재상이 수정되었습니다.');
      return true;
    } catch (error) {
      console.error('직무별 인재상 수정 에러:', error);
      toast.error('직무별 인재상 수정 중 오류가 발생했습니다.');
      return false;
    }
  };

  const deleteJobTalent = async (companyId: number, jobCategoryId: number) => {
    if (!window.confirm('직무별 인재상을 삭제할까요?')) return;

    try {
      const res = await fetch(
        `${API_URL}/admin/companies/${companyId}/job-categories/${jobCategoryId}/talent-values`,
        {
          method: 'DELETE',
          headers: getAuthHeaders(),
        }
      );

      if (!res.ok) {
        toast.error(await parseErrorMessage(res));
        return;
      }

      await reloadCompanyDetails(companyId);
      toast.success('직무별 인재상이 삭제되었습니다.');
    } catch (error) {
      console.error('직무별 인재상 삭제 에러:', error);
      toast.error('직무별 인재상 삭제 중 오류가 발생했습니다.');
    }
  };

  const filtered = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return companies.filter((company) => {
      const isExtracting =
        extractingOverallIds.has(company.id) ||
        Array.from(extractingJobIds).some((key) =>
          key.startsWith(`${company.id}:`)
        );
      const baseStatus = companyStatusMap[company.id] ?? 'NONE';
      const statusValue = isExtracting ? 'RUNNING' : baseStatus;

      const bySearch =
        !searchText ||
        `${company.name} ${company.industry ?? ''} ${company.description ?? ''}`
          .toLowerCase()
          .includes(searchText);

      const byStatus =
        status === 'ALL'
          ? true
          : status === 'ACTIVE'
            ? statusValue === 'DONE'
            : statusValue !== 'DONE';

      return bySearch && byStatus;
    });
  }, [
    companies,
    companyStatusMap,
    detailMap,
    extractingJobIds,
    extractingOverallIds,
    search,
    status,
  ]);

  return (
    <div className="flex h-screen w-full flex-col bg-white">
      <Header />

      <div className="flex w-full flex-1 overflow-hidden">
        <AdminMenu />

        <div className="flex flex-1 flex-col gap-6 overflow-hidden px-40 pt-12 pb-10">
          <div className="flex w-full shrink-0 flex-col gap-10">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-3">
                <div className="text-3xl leading-10 font-semibold text-black">
                  기업 인재상 관리
                </div>
                <div className="text-base leading-7 font-medium text-neutral-500">
                  기업 등록/수정/삭제 및 전사·직무 인재상 추출/수정/삭제
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsAddCompanyModalOpen(true)}
                className="flex items-center gap-4 rounded-xl bg-indigo-400 px-4 py-2 hover:bg-indigo-500"
              >
                <PlusIcon color="white" />
                <div className="text-base leading-7 font-medium text-white">
                  새 기업 추가
                </div>
              </button>
            </div>

            <div className="flex items-center justify-between gap-4 self-stretch rounded-[20px] bg-white p-5 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.25)]">
              <div className="flex w-full items-center gap-3 rounded-[20px] bg-neutral-100 px-3 py-2">
                <MagnifyIcon />
                <input
                  type="text"
                  placeholder="기업명 검색"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-transparent text-base font-medium text-neutral-700 placeholder:text-neutral-500 focus:outline-none"
                />
              </div>

              <div className="flex w-full items-center gap-3 rounded-[20px] bg-neutral-100 px-3 py-2">
                <select
                  className="w-full bg-transparent text-base font-medium text-neutral-700 focus:outline-none"
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value as 'ALL' | 'ACTIVE' | 'INACTIVE')
                  }
                >
                  <option value="ALL">전체 상태</option>
                  <option value="ACTIVE">추출 완료</option>
                  <option value="INACTIVE">미추출</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col gap-3 overflow-y-auto pb-2">
            {isCompaniesLoading ? (
              <div className="py-10 text-sm text-neutral-500">불러오는 중...</div>
            ) : filtered.length === 0 ? (
              <div className="py-10 text-sm text-neutral-500">
                조회된 기업이 없습니다.
              </div>
            ) : (
              filtered.map((company) => {
                const open = openId === company.id;
                const detail = detailMap[company.id];
                const isExtracting =
                  extractingOverallIds.has(company.id) ||
                  Array.from(extractingJobIds).some((key) =>
                    key.startsWith(`${company.id}:`)
                  );
                const baseStatus = companyStatusMap[company.id] ?? 'NONE';
                const companyStatus = isExtracting ? 'RUNNING' : baseStatus;

                return (
                  <div key={company.id} className="w-full">
                    <button
                      type="button"
                      onClick={() => {
                        setOpenId((prev) => (prev === company.id ? null : company.id));
                        if (!open) {
                          loadCompanyDetails(company.id);
                        }
                      }}
                      className="flex w-full items-center justify-between rounded-lg border border-neutral-200 bg-white px-8 py-5 shadow-[0px_4px_12px_rgba(0,0,0,0.08)] transition hover:bg-neutral-50"
                    >
                      <div className="flex flex-col gap-1 text-left">
                        <div className="text-sm font-semibold text-neutral-900">
                          {company.name}
                        </div>
                        <div className="text-xs font-medium text-neutral-500">
                          {company.industry || '-'}
                        </div>
                      </div>

                      <div className="flex items-center gap-5">
                        <StatusBadge status={companyStatus} />
                        <div
                          className={[
                            'transition-transform',
                            open ? 'rotate-180' : 'rotate-0',
                          ].join(' ')}
                        >
                          <DownIcon />
                        </div>
                      </div>
                    </button>

                    {open && (
                      <div className="mt-2 w-full rounded-lg border border-neutral-200 bg-white p-6 shadow-[0px_4px_12px_rgba(0,0,0,0.08)]">
                        <div className="mb-5 flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedCompany(company);
                              setIsEditCompanyModalOpen(true);
                            }}
                            className="rounded-md border border-neutral-200 px-3 py-1 text-xs"
                          >
                            기업 수정
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteCompany(company.id)}
                            className="rounded-md border border-red-200 px-3 py-1 text-xs text-red-500"
                          >
                            기업 삭제
                          </button>
                          <button
                            type="button"
                            onClick={() => reloadCompanyDetails(company.id)}
                            className="rounded-md border border-neutral-200 px-3 py-1 text-xs"
                          >
                            새로고침
                          </button>
                        </div>

                        {detail?.isLoading ? (
                          <div className="py-6 text-sm text-neutral-500">
                            인재상 데이터를 불러오는 중...
                          </div>
                        ) : (
                          <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-3">
                              <div className="text-sm font-semibold text-neutral-900">
                                전사 공통 인재상
                              </div>
                              {detail?.overall ? (
                                <OverallTalentCard
                                  overall={{
                                    ...detail.overall,
                                    status: extractingOverallIds.has(company.id)
                                      ? 'RUNNING'
                                      : detail.overall.status,
                                  }}
                                  onEdit={() => {
                                    const overall = detail?.overall;
                                    if (!overall) return;
                                    setOverallEditTarget(company.id);
                                    setOverallEditInitial({
                                      keywords: overall.keywords?.join(', ') ?? '',
                                      description: overall.description ?? '',
                                      details: overall.details?.join('\n') ?? '',
                                    });
                                    setIsEditOverallModalOpen(true);
                                  }}
                                  onRetry={() => extractOverallTalent(company.id)}
                                />
                              ) : (
                                <div className="text-sm text-neutral-500">
                                  전사 인재상이 없습니다.
                                </div>
                              )}
                              <div className="flex flex-wrap gap-2">
                                <button
                                  type="button"
                                  onClick={() => extractOverallTalent(company.id)}
                                  className="rounded-md bg-indigo-600 px-3 py-1 text-xs text-white"
                                >
                                  전사 인재상 추출
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const overall = detail?.overall;
                                    setOverallEditTarget(company.id);
                                    setOverallEditInitial({
                                      keywords: overall?.keywords?.join(', ') ?? '',
                                      description: overall?.description ?? '',
                                      details: overall?.details?.join('\n') ?? '',
                                    });
                                    setIsEditOverallModalOpen(true);
                                  }}
                                  className="rounded-md border border-neutral-200 px-3 py-1 text-xs"
                                >
                                  전사 인재상 수정
                                </button>
                                <button
                                  type="button"
                                  onClick={() => deleteOverallTalent(company.id)}
                                  className="rounded-md border border-red-200 px-3 py-1 text-xs text-red-500"
                                >
                                  전사 인재상 삭제
                                </button>
                              </div>
                            </div>

                            <div className="flex flex-col gap-3">
                              <div className="flex items-center justify-between">
                                <div className="text-sm font-semibold text-neutral-900">
                                  직무별 인재상
                                </div>
                                <div className="text-xs text-neutral-500">
                                  {detail?.jobs.length ?? 0}개
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                <button
                                  type="button"
                                  onClick={() => openExtractJobModal(company)}
                                  className="rounded-md bg-indigo-600 px-3 py-1 text-xs text-white"
                                >
                                  직무 인재상 추출
                                </button>
                              </div>
                              {detail && detail.jobs.length > 0 ? (
                                <div className="flex flex-col gap-3">
                                  {detail.jobs.map((job) => (
                                    <div
                                      key={`${company.id}-${job.job_category_id}`}
                                      className="space-y-2"
                                    >
                                      <JobTalentCard
                                        job={{
                                          ...job,
                                          status: extractingJobIds.has(
                                            `${company.id}:${job.job_category_id}`
                                          )
                                            ? 'RUNNING'
                                            : job.status,
                                        }}
                                        onEdit={() => {
                                          setJobEditTarget({
                                            companyId: company.id,
                                            jobCategoryId: job.job_category_id,
                                            jobTitle: job.job_category_name,
                                          });
                                          setJobEditInitial({
                                            keywords: job.keywords?.join(', ') ?? '',
                                            description: job.description ?? '',
                                            details: job.details?.join('\n') ?? '',
                                            technical_requirements:
                                              job.technical_requirements?.join('\n') ??
                                              '',
                                          });
                                          setIsEditJobModalOpen(true);
                                        }}
                                        onRetry={() =>
                                          extractJobTalentByCategory(
                                            company.id,
                                            job.job_category_id
                                          )
                                        }
                                      />
                                      <div className="flex items-center justify-end gap-2">
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setJobEditTarget({
                                              companyId: company.id,
                                              jobCategoryId: job.job_category_id,
                                              jobTitle: job.job_category_name,
                                            });
                                            setJobEditInitial({
                                              keywords: job.keywords?.join(', ') ?? '',
                                              description: job.description ?? '',
                                              details: job.details?.join('\n') ?? '',
                                              technical_requirements:
                                                job.technical_requirements?.join('\n') ??
                                                '',
                                            });
                                            setIsEditJobModalOpen(true);
                                          }}
                                          className="rounded-md border border-neutral-200 px-3 py-1 text-xs"
                                        >
                                          직무 인재상 수정
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() =>
                                            deleteJobTalent(
                                              company.id,
                                              job.job_category_id
                                            )
                                          }
                                          className="rounded-md border border-red-200 px-3 py-1 text-xs text-red-500"
                                        >
                                          직무 인재상 삭제
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="text-sm text-neutral-500">
                                  직무별 인재상이 없습니다.
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      <AddCompanyModal
        isOpen={isAddCompanyModalOpen}
        onClose={() => setIsAddCompanyModalOpen(false)}
        onSubmit={createCompany}
      />

      <EditCompanyModal
        isOpen={isEditCompanyModalOpen}
        initialValue={{
          name: selectedCompany?.name ?? '',
          industry: selectedCompany?.industry ?? '',
          description: selectedCompany?.description ?? '',
          website_url: selectedCompany?.website_url ?? '',
        }}
        onClose={() => setIsEditCompanyModalOpen(false)}
        onSubmit={editCompany}
      />

      <EditOverallTalentModal
        isOpen={isEditOverallModalOpen}
        initialValue={overallEditInitial}
        onClose={() => setIsEditOverallModalOpen(false)}
        onSubmit={async (payload) => {
          if (!overallEditTarget) return false;
          return updateOverallTalent(overallEditTarget, payload);
        }}
      />

      <EditJobTalentModal
        isOpen={isEditJobModalOpen}
        jobTitle={jobEditTarget?.jobTitle ?? ''}
        initialValue={jobEditInitial}
        onClose={() => setIsEditJobModalOpen(false)}
        onSubmit={async (payload) => {
          if (!jobEditTarget) return false;
          return updateJobTalent(
            jobEditTarget.companyId,
            jobEditTarget.jobCategoryId,
            payload
          );
        }}
      />

      <ExtractJobTalentModal
        isOpen={isExtractJobModalOpen}
        companyName={extractJobTarget?.name ?? ''}
        jobCategories={extractJobOptions}
        isLoading={isExtractJobOptionsLoading}
        onClose={() => setIsExtractJobModalOpen(false)}
        onSubmit={async (jobCategoryId) => {
          if (!extractJobTarget) return false;
          return extractJobTalentByCategory(
            extractJobTarget.id,
            jobCategoryId
          );
        }}
      />
    </div>
  );
}
