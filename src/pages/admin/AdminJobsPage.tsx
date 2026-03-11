import { useEffect, useState } from 'react';
import Header from '../../components/Header.tsx';
import PlusIcon from '../../assets/svgs/icon/PlusIcon.tsx';
import MagnifyIcon from '../../assets/svgs/icon/MagnifyIcon.tsx';
import JobTable from '../../components/JobTable.tsx';
import AdminMenu from '../../components/AdminMenu.tsx';
import AddJobTalentModal from '../../components/AddJobTalentModal.tsx';
import EditJobCategoryModal from '../../components/EditJobCategoryModal.tsx';

export type Job = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
};

type JobCategoryResponse = {
  id: number;
  name: string;
  description: string;
  created_at?: string;
};

type JobCategoriesResponse = {
  job_categories: JobCategoryResponse[];
};

export default function AdminJobsPage() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const getAuthHeaders = (json = false): HeadersInit => {
    const token = localStorage.getItem('access_token');
    const headers: Record<string, string> = {};
    if (token) headers.Authorization = `Bearer ${token}`;
    if (json) headers['Content-Type'] = 'application/json';
    return headers;
  };

  const parseErrorMessage = async (res: Response) => {
    try {
      const body = (await res.json()) as { detail?: unknown; message?: unknown };
      if (typeof body.detail === 'string') return body.detail;
      if (typeof body.message === 'string') return body.message;
      return '요청에 실패했습니다.';
    } catch {
      return '요청에 실패했습니다.';
    }
  };

  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_URL}/job-categories`);
      if (!res.ok) {
        alert(await parseErrorMessage(res));
        setJobs([]);
        return;
      }
      const data = (await res.json()) as JobCategoriesResponse;
      const mapped = (data.job_categories ?? []).map((job) => ({
        id: job.id,
        name: job.name,
        description: job.description,
        createdAt: job.created_at ? job.created_at.slice(0, 10) : '',
      }));
      setJobs(mapped);
    } catch (error) {
      console.error('직군 목록 조회 에러:', error);
      setJobs([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [API_URL]);

  const handleAddJob = async (newJob: {
    job_category_name: string;
    description: string;
  }) => {
    try {
      const res = await fetch(`${API_URL}/admin/job-categories`, {
        method: 'POST',
        headers: getAuthHeaders(true),
        body: JSON.stringify({
          name: newJob.job_category_name,
          description: newJob.description,
        }),
      });
      if (!res.ok) {
        alert(await parseErrorMessage(res));
        return false;
      }
      await fetchJobs();
      return true;
    } catch (error) {
      console.error('직군 추가 에러:', error);
      alert('직군 추가 중 오류가 발생했습니다.');
      return false;
    }
  };

  const handleEditJob = async (payload: { name: string; description: string }) => {
    if (!selectedJob) return false;
    try {
      const res = await fetch(
        `${API_URL}/admin/job-categories/${selectedJob.id}`,
        {
          method: 'PUT',
          headers: getAuthHeaders(true),
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) {
        alert(await parseErrorMessage(res));
        return false;
      }
      await fetchJobs();
      return true;
    } catch (error) {
      console.error('직군 수정 에러:', error);
      alert('직군 수정 중 오류가 발생했습니다.');
      return false;
    }
  };

  const handleDeleteJob = async (job: Job) => {
    if (!window.confirm('정말 삭제할까요?')) return;
    try {
      const res = await fetch(`${API_URL}/admin/job-categories/${job.id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      if (!res.ok) {
        alert(await parseErrorMessage(res));
        return;
      }
      await fetchJobs();
    } catch (error) {
      console.error('직군 삭제 에러:', error);
      alert('직군 삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <>
      <div className="flex h-screen w-full flex-col bg-white">
        <Header />

        <div className="flex w-full flex-1 overflow-hidden">
          <AdminMenu />

          <div className="flex flex-1 flex-col gap-6 overflow-hidden px-40 pt-12 pb-10">
            <div className="flex w-full shrink-0 flex-col gap-10">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-3">
                  <div className="text-3xl leading-10 font-semibold text-black">
                    직군 관리
                  </div>
                  <div className="text-base leading-7 font-medium text-neutral-500">
                    직군을 추가하고 관리합니다
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(true)}
                  className="flex items-center gap-4 rounded-xl bg-indigo-400 px-4 py-2 hover:bg-indigo-500"
                >
                  <PlusIcon color="white" />
                  <div className="text-base leading-7 font-medium text-white">
                    새 직군 추가
                  </div>
                </button>
              </div>

              {/* 검색 */}
              <div className="flex items-center justify-between rounded-[20px] bg-white p-5 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.25)]">
                <div className="flex flex-1 items-center gap-3 rounded-[20px] bg-neutral-100 px-3 py-2">
                  <MagnifyIcon className="text-neutral-500" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="직군 또는 설명으로 검색하기"
                    className="w-full bg-transparent text-base font-medium text-neutral-700 placeholder:text-neutral-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="py-10 text-sm text-neutral-500">불러오는 중...</div>
            ) : (
              <JobTable
                search={search}
                jobs={jobs}
                onEdit={(job) => {
                  setSelectedJob(job);
                  setIsEditModalOpen(true);
                }}
                onDelete={handleDeleteJob}
              />
            )}
          </div>
        </div>
      </div>

      <AddJobTalentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={(job) => {
          return handleAddJob(job);
        }}
      />

      <EditJobCategoryModal
        isOpen={isEditModalOpen}
        initialValue={{
          name: selectedJob?.name ?? '',
          description: selectedJob?.description ?? '',
        }}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditJob}
      />
    </>
  );
}
