import Header from '../../components/Header.tsx';
import StackCard from '../../components/StackCard.tsx';
import CertificateSection from './certificateSection/CertificateSection.tsx';
import { useEffect, useMemo, useState } from 'react';
import ProjectSection from './projectSection/ProjectSection.tsx';
import PlusIcon from '../../assets/svgs/icon/PlusIcon.tsx';
import EditIcon from '../../assets/svgs/icon/EditIcon.tsx';
import UserMenu from '../../components/UserMenu.tsx';
import ActivitySection from './activitySection/ActivitySection.tsx';
import SpecAddModal from './SpecAddModal';
import EducationEditModal from './EducationEditModal';
import SkillAddModal from './SkillAddModal';

type Certification = {
  name: string;
  acquired_date?: string;
  expiry_date?: string;
};

type FreeExperience = {
  type: 'PROJECT' | 'ACTIVITY' | 'INTERNSHIP' | 'HACKATHON';
  title: string;
  description: string;
  period?: string;
};

type SpecType = {
  structured_data: {
    education: {
      school: string;
      major: string;
      admission_year: number;
      grad_year: number;
      gpa: string;
    };
    skills: string[];
    certifications: Certification[];
  };
  free_experiences: FreeExperience[];
};

type SpecResponse = SpecType & {
  id?: number;
  user_id?: number;
  job_category_id?: number | null;
  created_at?: string;
  updated_at?: string;
};

const EXPERIENCE_TYPES = ['PROJECT', 'ACTIVITY', 'INTERNSHIP', 'HACKATHON'] as const;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const toNumber = (value: unknown, fallback = 0): number =>
  typeof value === 'number' ? value : fallback;

const toStringValue = (value: unknown, fallback = ''): string =>
  typeof value === 'string' ? value : fallback;

const toDisplayGpa = (value: unknown): string => {
  if (typeof value === 'string') return value;
  if (typeof value === 'number' && Number.isFinite(value)) {
    return String(value);
  }
  return '0/0';
};

const toGpaNumber = (gpa: string): number => {
  const numericPart = gpa.split('/')[0]?.trim() ?? '';
  const parsed = Number(numericPart);
  return Number.isFinite(parsed) ? parsed : 0;
};

const toCertifications = (value: unknown): Certification[] => {
  if (!Array.isArray(value)) return [];

  return value
    .filter(isRecord)
    .map((item) => ({
      name: toStringValue(item.name),
      acquired_date: toStringValue(item.acquired_date),
      expiry_date: toStringValue(item.expiry_date),
    }))
    .filter((item) => item.name.length > 0);
};

const toFreeExperiences = (value: unknown): FreeExperience[] => {
  if (!Array.isArray(value)) return [];

  return value
    .filter(isRecord)
    .map((item) => {
      const rawType = toStringValue(item.type);
      const safeType: FreeExperience['type'] = EXPERIENCE_TYPES.includes(
        rawType as FreeExperience['type']
      )
        ? (rawType as FreeExperience['type'])
        : 'PROJECT';

      return {
        type: safeType,
        title: toStringValue(item.title),
        description: toStringValue(item.description),
        period: toStringValue(item.period),
      };
    })
    .filter((item) => item.title.length > 0);
};

const normalizeSpec = (data: unknown): SpecResponse => {
  if (!isRecord(data)) return EMPTY_SPEC;

  const structuredData = isRecord(data.structured_data) ? data.structured_data : {};
  const education = isRecord(structuredData.education)
    ? structuredData.education
    : {};

  return {
    id: typeof data.id === 'number' ? data.id : undefined,
    user_id: typeof data.user_id === 'number' ? data.user_id : undefined,
    job_category_id:
      typeof data.job_category_id === 'number' || data.job_category_id === null
        ? data.job_category_id
        : null,
    created_at:
      typeof data.created_at === 'string' ? data.created_at : undefined,
    updated_at:
      typeof data.updated_at === 'string' ? data.updated_at : undefined,
    structured_data: {
      education: {
        school: toStringValue(education.school),
        major: toStringValue(education.major),
        admission_year: toNumber(education.admission_year),
        grad_year: toNumber(education.grad_year),
        gpa: toDisplayGpa(education.gpa),
      },
      skills: Array.isArray(structuredData.skills)
        ? structuredData.skills.filter(
            (item): item is string => typeof item === 'string'
          )
        : [],
      certifications: toCertifications(structuredData.certifications),
    },
    free_experiences: toFreeExperiences(data.free_experiences),
  };
};

const stringifyDetail = (detail: unknown): string => {
  if (typeof detail === 'string') return detail;

  if (Array.isArray(detail)) {
    const messages = detail
      .map((item) => {
        if (typeof item === 'string') return item;
        if (!isRecord(item)) return '';

        const path = Array.isArray(item.loc)
          ? item.loc.map((loc) => String(loc)).join('.')
          : '';
        const msg = typeof item.msg === 'string' ? item.msg : '';

        if (path && msg) return `${path}: ${msg}`;
        return msg || JSON.stringify(item);
      })
      .filter(Boolean);

    if (messages.length > 0) return messages.join('\n');
  }

  if (isRecord(detail)) {
    if (typeof detail.message === 'string') return detail.message;
    return JSON.stringify(detail);
  }

  return '요청에 실패했습니다.';
};

const parseErrorMessage = async (res: Response) => {
  try {
    const data = (await res.json()) as {
      detail?: unknown;
      message?: unknown;
      error?: unknown;
    };

    if (data.detail !== undefined) return stringifyDetail(data.detail);
    if (data.message !== undefined) return stringifyDetail(data.message);
    if (data.error !== undefined) return stringifyDetail(data.error);
    return '요청에 실패했습니다.';
  } catch {
    return '요청에 실패했습니다.';
  }
};

const EMPTY_SPEC: SpecResponse = {
  structured_data: {
    education: {
      school: '',
      major: '',
      admission_year: 0,
      grad_year: 0,
      gpa: '0/0',
    },
    skills: [],
    certifications: [],
  },
  free_experiences: [],
};

export default function SpecPage() {
  const API_URL = import.meta.env.VITE_API_URL;

  const userRaw = localStorage.getItem('user');
  const user =
    userRaw && userRaw !== 'undefined' && userRaw !== 'null'
      ? JSON.parse(userRaw)
      : {};

  const [spec, setSpec] = useState<SpecResponse>(EMPTY_SPEC);
  const [isLoading, setIsLoading] = useState(true);
  const [hasExistingSpec, setHasExistingSpec] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [isSpecModalOpen, setIsSpecModalOpen] = useState(false);
  const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);

  const [activeTab, setActiveTab] = useState<
    '자격증' | '프로젝트' | '대외활동'
  >('자격증');

  useEffect(() => {
    const fetchSpec = async () => {
      try {
        const token = localStorage.getItem('access_token');

        if (!token) {
          setIsLoading(false);
          return;
        }

        const res = await fetch(`${API_URL}/users/me/spec`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 404) {
          setSpec(EMPTY_SPEC);
          setHasExistingSpec(false);
          return;
        }

        if (!res.ok) {
          const message = await parseErrorMessage(res);
          throw new Error(message);
        }

        const data = await res.json();
        setSpec(normalizeSpec(data));

        setHasExistingSpec(true);
      } catch (err) {
        console.error('spec fetch error:', err);
        setSpec(EMPTY_SPEC);
        setHasExistingSpec(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpec();
  }, [API_URL]);

  const handleSaveToServer = async () => {
    try {
      setIsSaving(true);

      const token = localStorage.getItem('access_token');

      if (!token) {
        alert('로그인이 필요합니다.');
        return;
      }

      const hasEducation =
        spec.structured_data.education.school.trim().length > 0 &&
        spec.structured_data.education.major.trim().length > 0 &&
        spec.structured_data.education.admission_year > 0 &&
        spec.structured_data.education.grad_year > 0;

      if (!hasEducation) {
        alert('학력 정보(학교, 전공, 입학/졸업 연도)를 먼저 입력해주세요.');
        return;
      }

      const invalidCertification = spec.structured_data.certifications.find(
        (item) => item.name.trim().length === 0 || !item.acquired_date?.trim()
      );

      if (invalidCertification) {
        alert('자격증은 이름과 취득일을 모두 입력해야 저장됩니다.');
        return;
      }

      const invalidExperience = spec.free_experiences.find(
        (item) =>
          item.title.trim().length === 0 || item.description.trim().length === 0
      );

      if (invalidExperience) {
        alert('프로젝트/대외활동은 제목과 설명을 모두 입력해야 저장됩니다.');
        return;
      }

      const payload = {
        structured_data: {
          ...spec.structured_data,
          education: {
            ...spec.structured_data.education,
            gpa: toGpaNumber(spec.structured_data.education.gpa),
          },
          certifications: spec.structured_data.certifications.map((item) => ({
            name: item.name.trim(),
            acquired_date: item.acquired_date?.trim(),
            expiry_date: item.expiry_date?.trim() || undefined,
          })),
        },
        free_experiences: spec.free_experiences.map((item) => ({
          ...item,
          title: item.title.trim(),
          description: item.description.trim(),
          period: item.period?.trim() || undefined,
        })),
      };

      const res = await fetch(`${API_URL}/users/me/spec`, {
        method: hasExistingSpec ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const message = await parseErrorMessage(res);
        alert(message);
        return;
      }

      const data = await res.json();
      setSpec(normalizeSpec(data));

      setHasExistingSpec(true);
      alert('스펙이 저장되었습니다.');
    } catch (error) {
      console.error('spec save error:', error);
      alert('서버 오류가 발생했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteFromServer = async () => {
    try {
      const token = localStorage.getItem('access_token');

      if (!token) {
        alert('로그인이 필요합니다.');
        return;
      }

      const confirmed = window.confirm('저장된 스펙을 삭제할까요?');
      if (!confirmed) return;

      const res = await fetch(`${API_URL}/users/me/spec`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const message = await parseErrorMessage(res);
        alert(message);
        return;
      }

      setSpec(EMPTY_SPEC);
      setHasExistingSpec(false);
      alert('스펙이 삭제되었습니다.');
    } catch (error) {
      console.error('spec delete error:', error);
      alert('서버 오류가 발생했습니다.');
    }
  };

  const handleSaveSpec = (data: {
    title: string;
    description: string;
    period: string;
  }) => {
    if (activeTab === '자격증') {
      setSpec((prev) => ({
        ...prev,
        structured_data: {
          ...prev.structured_data,
          certifications: [
            ...prev.structured_data.certifications,
            {
              name: data.title,
              acquired_date: data.period || '',
            },
          ],
        },
      }));
      return;
    }

    if (activeTab === '프로젝트') {
      setSpec((prev) => ({
        ...prev,
        free_experiences: [
          ...prev.free_experiences,
          {
            type: 'PROJECT',
            title: data.title,
            description: data.description,
            period: data.period,
          },
        ],
      }));
      return;
    }

    if (activeTab === '대외활동') {
      setSpec((prev) => ({
        ...prev,
        free_experiences: [
          ...prev.free_experiences,
          {
            type: 'ACTIVITY',
            title: data.title,
            description: data.description,
            period: data.period,
          },
        ],
      }));
    }
  };

  const handleSaveEducation = (educationValue: {
    school: string;
    major: string;
    admission_year: number;
    grad_year: number;
    gpa: string;
  }) => {
    setSpec((prev) => ({
      ...prev,
      structured_data: {
        ...prev.structured_data,
        education: educationValue,
      },
    }));
  };

  const handleAddSkill = (skill: string) => {
    setSpec((prev) => {
      const exists = prev.structured_data.skills.some(
        (item) => item.toLowerCase() === skill.toLowerCase()
      );

      if (exists) {
        alert('이미 추가된 기술 스택입니다.');
        return prev;
      }

      return {
        ...prev,
        structured_data: {
          ...prev.structured_data,
          skills: [...prev.structured_data.skills, skill],
        },
      };
    });
  };

  const education = spec.structured_data.education;
  const skills = spec.structured_data.skills || [];
  const certifications = spec.structured_data.certifications || [];
  const experiences = spec.free_experiences || [];

  const gpaValue = (education.gpa ?? '0').split('/')[0] || '0';
  const gpaMax = '4.5';

  const filteredExperiences = useMemo(() => {
    if (activeTab === '프로젝트') {
      return experiences.filter((e) => e.type === 'PROJECT');
    }

    if (activeTab === '대외활동') {
      return experiences.filter(
        (e) => e.type === 'ACTIVITY' || e.type === 'INTERNSHIP'
      );
    }

    return [];
  }, [activeTab, experiences]);

  const certificateItems = useMemo(
    () =>
      certifications.map((item) => ({
        name: item.name,
        acquired_date: item.acquired_date ?? '',
        expiry_date: item.expiry_date,
      })),
    [certifications]
  );

  const experienceItems = useMemo(
    () =>
      filteredExperiences.map((item) => ({
        title: item.title,
        description: item.description,
        period: item.period ?? '',
        role: '',
        achievements: '',
      })),
    [filteredExperiences]
  );

  return (
    <>
      <div className="inline-flex min-h-screen w-full flex-col bg-indigo-50">
        <Header />

        <div className="inline-flex flex-1">
          <UserMenu />

          <div className="inline-flex flex-1 flex-col px-12 py-10">
            <div className="flex flex-col gap-1">
              <div className="text-3xl font-semibold">
                {user.name ?? '사용자'}님의 스펙
              </div>

              <div className="text-neutral-500">
                {user.email ?? '이메일 정보 없음'}
              </div>
            </div>

            {isLoading ? (
              <div className="mt-10 text-neutral-500">불러오는 중...</div>
            ) : (
              <div className="mt-10 flex gap-6">
                {/* 왼쪽 */}
                <div className="flex w-64 flex-col gap-7">
                  <div className="relative rounded-[20px] bg-white px-5 py-7">
                    <button
                      type="button"
                      onClick={() => setIsEducationModalOpen(true)}
                      className="absolute top-5 right-5"
                    >
                      <EditIcon />
                    </button>

                    <div className="text-xl font-bold">
                      {education.school || '학교 정보 없음'}
                    </div>

                    <div className="text-base">
                      {education.major || '전공 정보 없음'}
                    </div>

                    <div className="mt-5 rounded-xl bg-indigo-50 p-3">
                      <div>입학 연도 : {education.admission_year || 0}</div>
                      <div>졸업 예정 : {education.grad_year || 0}</div>
                    </div>

                    <div className="mt-5">
                      <div className="text-xs text-neutral-500">평균 학점</div>

                      <div className="rounded-xl bg-indigo-50 p-6">
                        <span className="text-3xl font-semibold">
                          {gpaValue || 0}
                        </span>

                        <span className="text-neutral-400">
                          / {gpaMax || 0}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 스킬 */}
                  <div className="flex justify-between rounded-[20px] bg-white px-5 py-7">
                    <div className="flex flex-col gap-2 overflow-auto">
                      {skills.length > 0 ? (
                        skills.map((skill: string, i: number) => (
                          <StackCard key={i} title={skill} />
                        ))
                      ) : (
                        <div className="text-sm text-neutral-400">
                          아직 추가된 기술이 없습니다
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsSkillModalOpen(true)}
                    >
                      <EditIcon />
                    </button>
                  </div>
                </div>

                {/* 오른쪽 */}
                <div className="flex-1 rounded-[20px] bg-white px-12 py-7">
                  <div className="flex gap-10">
                    {['자격증', '프로젝트', '대외활동'].map((tab) => {
                      const isActive = activeTab === tab;

                      return (
                        <button
                          key={tab}
                          onClick={() =>
                            setActiveTab(
                              tab as '자격증' | '프로젝트' | '대외활동'
                            )
                          }
                          className={`border-b-[3px] ${
                            isActive
                              ? 'border-indigo-400'
                              : 'border-transparent'
                          }`}
                        >
                          {tab}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-6 flex justify-between">
                    <div>
                      총{' '}
                      {activeTab === '자격증'
                        ? certifications.length
                        : filteredExperiences.length}
                      건
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={handleSaveToServer}
                        className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
                        disabled={isSaving}
                      >
                        {isSaving ? '저장 중...' : '저장'}
                      </button>

                      <button
                        type="button"
                        onClick={handleDeleteFromServer}
                        className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-500 disabled:opacity-60"
                        disabled={!hasExistingSpec || isSaving}
                      >
                        삭제
                      </button>

                      <button
                        type="button"
                        onClick={() => setIsSpecModalOpen(true)}
                      >
                        <PlusIcon />
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 h-[420px] overflow-auto">
                    {activeTab === '자격증' &&
                      (certificateItems.length > 0 ? (
                        <CertificateSection certificates={certificateItems} />
                      ) : (
                        <div className="text-sm text-neutral-400">
                          아직 추가된 자격증이 없습니다
                        </div>
                      ))}

                    {activeTab === '프로젝트' &&
                      (experienceItems.length > 0 ? (
                        <ProjectSection projects={experienceItems} />
                      ) : (
                        <div className="text-sm text-neutral-400">
                          아직 추가된 프로젝트가 없습니다
                        </div>
                      ))}

                    {activeTab === '대외활동' &&
                      (experienceItems.length > 0 ? (
                        <ActivitySection projects={experienceItems} />
                      ) : (
                        <div className="text-sm text-neutral-400">
                          아직 추가된 대외활동이 없습니다
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {isSpecModalOpen && (
        <SpecAddModal
          type={activeTab}
          onClose={() => setIsSpecModalOpen(false)}
          onSave={handleSaveSpec}
        />
      )}

      {isEducationModalOpen && (
        <EducationEditModal
          initialValue={education}
          onClose={() => setIsEducationModalOpen(false)}
          onSave={handleSaveEducation}
        />
      )}

      {isSkillModalOpen && (
        <SkillAddModal
          onClose={() => setIsSkillModalOpen(false)}
          onSave={handleAddSkill}
        />
      )}
    </>
  );
}
