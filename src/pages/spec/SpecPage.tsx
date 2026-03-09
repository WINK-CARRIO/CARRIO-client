import Header from '../../components/Header.tsx';
import StackCard from '../../components/StackCard.tsx';
import CertificateSection from './certificateSection/CertificateSection.tsx';
import { useEffect, useMemo, useState } from 'react';
import ProjectSection from './projectSection/ProjectSection.tsx';
import PlusIcon from '../../assets/svgs/icon/PlusIcon.tsx';
import EditIcon from '../../assets/svgs/icon/EditIcon.tsx';
import UserMenu from '../../components/UserMenu.tsx';
import ActivitySection from './activitySection/ActivitySection.tsx';

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
    certifications: {
      name: string;
      acquired_date?: string;
      expiry_date?: string;
    }[];
  };
  free_experiences: {
    type: 'PROJECT' | 'ACTIVITY' | 'INTERNSHIP' | 'HACKATHON';
    title: string;
    description: string;
    period?: string;
  }[];
};

const EMPTY_SPEC: SpecType = {
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

  const [spec, setSpec] = useState<SpecType>(EMPTY_SPEC);
  const [isLoading, setIsLoading] = useState(true);
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

        if (!res.ok) {
          setSpec(EMPTY_SPEC);
          return;
        }

        const data = await res.json();

        // 응답이 비어있거나 null이어도 기본값 유지
        setSpec({
          structured_data: {
            education: {
              school: data?.structured_data?.education?.school ?? '',
              major: data?.structured_data?.education?.major ?? '',
              admission_year:
                data?.structured_data?.education?.admission_year ?? 0,
              grad_year: data?.structured_data?.education?.grad_year ?? 0,
              gpa: data?.structured_data?.education?.gpa ?? '0/0',
            },
            skills: data?.structured_data?.skills ?? [],
            certifications: data?.structured_data?.certifications ?? [],
          },
          free_experiences: data?.free_experiences ?? [],
        });
      } catch (err) {
        console.error(err);
        setSpec(EMPTY_SPEC);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpec();
  }, [API_URL]);

  const education = spec.structured_data.education;
  const skills = spec.structured_data.skills || [];
  const certifications = spec.structured_data.certifications || [];
  const experiences = spec.free_experiences || [];

  const [gpaValue, gpaMax] = (education.gpa ?? '0/0').split('/');

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

  return (
    <div className="inline-flex min-h-screen w-full flex-col bg-indigo-50">
      <Header />

      <div className="inline-flex flex-1">
        <UserMenu />

        <div className="inline-flex flex-1 flex-col px-12 py-10">
          {/* 상단 */}
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
                <div className="rounded-[20px] bg-white px-5 py-7">
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

                      <span className="text-neutral-400">/ {gpaMax || 0}</span>
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

                  <EditIcon />
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
                          isActive ? 'border-indigo-400' : 'border-transparent'
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

                  <PlusIcon />
                </div>

                <div className="mt-6 h-[420px] overflow-auto">
                  {activeTab === '자격증' &&
                    (certifications.length > 0 ? (
                      <CertificateSection certificates={certifications} />
                    ) : (
                      <div className="text-sm text-neutral-400">
                        아직 추가된 자격증이 없습니다
                      </div>
                    ))}

                  {activeTab === '프로젝트' &&
                    (filteredExperiences.length > 0 ? (
                      <ProjectSection projects={filteredExperiences} />
                    ) : (
                      <div className="text-sm text-neutral-400">
                        아직 추가된 프로젝트가 없습니다
                      </div>
                    ))}

                  {activeTab === '대외활동' &&
                    (filteredExperiences.length > 0 ? (
                      <ActivitySection projects={filteredExperiences} />
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
  );
}
