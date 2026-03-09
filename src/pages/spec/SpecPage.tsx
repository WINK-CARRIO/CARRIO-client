import Header from '../../components/Header.tsx';
import StackCard from '../../components/StackCard.tsx';
import CertificateSection from './certificateSection/CertificateSection.tsx';
import { useEffect, useMemo, useState } from 'react';
import ProjectSection from './projectSection/ProjectSection.tsx';
import PlusIcon from '../../assets/svgs/icon/PlusIcon.tsx';
import EditIcon from '../../assets/svgs/icon/EditIcon.tsx';
import UserMenu from '../../components/UserMenu.tsx';
import ActivitySection from './activitySection/ActivitySection.tsx';

export default function SpecPage() {
  const API_URL = import.meta.env.VITE_API_URL;

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const [spec, setSpec] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<
    '자격증' | '프로젝트' | '대외활동'
  >('자격증');

  useEffect(() => {
    const fetchSpec = async () => {
      try {
        const token = localStorage.getItem('access_token');

        const res = await fetch(`${API_URL}/users/me/spec`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setSpec(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSpec();
  }, [API_URL]);

  if (!spec) return <div>Loading...</div>;

  const education = spec.structured_data.education;
  const skills = spec.structured_data.skills || [];
  const certifications = spec.structured_data.certifications || [];
  const experiences = spec.free_experiences || [];

  const [gpaValue, gpaMax] = (education.gpa ?? '').split('/');

  const filteredExperiences = useMemo(() => {
    if (activeTab === '프로젝트')
      return experiences.filter((e: any) => e.type === 'PROJECT');

    if (activeTab === '대외활동')
      return experiences.filter(
        (e: any) => e.type === 'ACTIVITY' || e.type === 'INTERNSHIP'
      );

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
            <div className="text-3xl font-semibold">{user.name}님의 스펙</div>

            <div className="text-neutral-500">{user.email}</div>
          </div>

          <div className="mt-10 flex gap-6">
            {/* 왼쪽 */}
            <div className="flex w-64 flex-col gap-7">
              <div className="rounded-[20px] bg-white px-5 py-7">
                <div className="text-xl font-bold">{education.school}</div>

                <div className="text-base">{education.major}</div>

                <div className="mt-5 rounded-xl bg-indigo-50 p-3">
                  <div>입학 연도 : {education.admission_year}</div>

                  <div>졸업 예정 : {education.grad_year}</div>
                </div>

                <div className="mt-5">
                  <div className="text-xs text-neutral-500">평균 학점</div>

                  <div className="rounded-xl bg-indigo-50 p-6">
                    <span className="text-3xl font-semibold">{gpaValue}</span>

                    <span className="text-neutral-400">/ {gpaMax}</span>
                  </div>
                </div>
              </div>

              {/* 스킬 */}
              <div className="flex justify-between rounded-[20px] bg-white px-5 py-7">
                <div className="flex flex-col gap-2 overflow-auto">
                  {skills.map((skill: string, i: number) => (
                    <StackCard key={i} title={skill} />
                  ))}
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
                      onClick={() => setActiveTab(tab as any)}
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
                {activeTab === '자격증' && (
                  <CertificateSection certificates={certifications} />
                )}

                {activeTab === '프로젝트' && (
                  <ProjectSection projects={filteredExperiences} />
                )}

                {activeTab === '대외활동' && (
                  <ActivitySection projects={filteredExperiences} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
