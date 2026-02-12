import JobListBox from '../info/JobListBox.tsx';
import ExitIcon from '../../../assets/svgs/icon/ExitIcon.tsx';
import { useEffect, useState } from 'react';
import BackIcon from '../../../assets/svgs/icon/BackIcon.tsx';
import CheckInfoBox from '../info/CheckInfoBox.tsx';
import TalentBadge from './TalentBadge.tsx';
import { motion } from 'framer-motion';

interface JobListSectionProps {
  onClose: () => void;
}

export default function JobListSection({ onClose }: JobListSectionProps) {
  const [categoryId, setCategoryId] = useState<number | null>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const mockJobList = [
    {
      job_category_id: 1,
      job_category_name: '프론트엔드',
      summary: '사용자 경험을 설계하고 구현하는 개발자',
      keywords: ['UI / UX', '문제 해결', '협업'],
      coreCompetencies: [
        'React, Vue 등 SPA 프레임워크 이해',
        '브라우저 렌더링 구조 이해',
        '웹 접근성 및 성능 최적화 경험',
      ],
      requirements: [
        'HTML, CSS, JavaScript 숙련',
        'TypeScript 사용 경험',
        'Git 기반 협업 경험',
      ],
    },
    {
      job_category_id: 2,
      job_category_name: '백엔드',
      summary: '안정적인 서버와 API를 설계하는 개발자',
      keywords: ['아키텍처', '데이터 처리', '성능'],
      coreCompetencies: [
        'Spring 또는 Node.js 이해',
        'DB 설계 및 최적화 경험',
        'REST API 설계 능력',
      ],
      requirements: [
        'Java 또는 Python 숙련',
        'JPA 또는 ORM 사용 경험',
        'Linux 서버 운영 경험',
      ],
    },
  ];
  const selectedCategory = mockJobList.find(
    (job) => job.job_category_id === categoryId
  );

  if (categoryId === null) {
    return (
      <div className="inline-flex flex-1 flex-col items-start justify-start gap-5 self-stretch px-5 py-7">
        <div className="inline-flex items-start justify-between self-stretch">
          <div className="inline-flex flex-col items-start justify-start gap-3">
            <div className="justify-start text-xl leading-7 font-semibold text-black">
              인재상 보유 직군 목록
            </div>
            <div className="justify-start text-base leading-6 font-normal text-gray-400">
              직군을 선택하면 해당 직무별 인재상을 확인할 수 있습니다.
            </div>
          </div>
          <button onClick={onClose} className="cursor-pointer">
            <ExitIcon />
          </button>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="flex flex-col gap-3 self-stretch"
        >
          {mockJobList.map((job) => (
            <JobListBox
              key={job.job_category_id}
              name={job.job_category_name}
              onClick={() => {
                setCategoryId(job.job_category_id);
              }}
            />
          ))}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col items-start justify-start gap-5 self-stretch overflow-auto px-5 py-7">
      <div className="inline-flex w-full items-start justify-between">
        <div className="flex items-center justify-start gap-2">
          <button
            onClick={() => setCategoryId(null)}
            className="cursor-pointer"
          >
            <BackIcon />
          </button>

          <div className="justify-start text-base leading-6 font-normal text-neutral-600">
            직군 목록으로 돌아가기
          </div>
        </div>
        <button onClick={onClose} className="cursor-pointer">
          <ExitIcon />
        </button>
      </div>
      <div className="flex flex-col items-start justify-start gap-1">
        <div className="justify-start text-xl leading-7 font-semibold text-black">
          {selectedCategory?.job_category_name}
        </div>
        <div className="justify-start text-sm leading-5 font-normal text-gray-400">
          직무별 인재상 조회
        </div>
      </div>
      <div className="flex flex-col items-start justify-start gap-2.5 self-stretch rounded-xl bg-indigo-400/10 px-5 py-3 outline outline-1 outline-offset-[-1px] outline-indigo-400/30">
        <div className="justify-start text-sm leading-5 font-semibold text-neutral-600">
          {selectedCategory?.summary}
        </div>
        <div className="inline-flex items-center justify-start gap-3.5">
          {selectedCategory?.keywords.map((keyword) => (
            <TalentBadge keyword={keyword} />
          ))}
        </div>
      </div>
      <div className="flex flex-col items-start justify-start gap-2 self-stretch">
        <div className="justify-start text-sm leading-5 font-medium text-neutral-600">
          직무 핵심 역량
        </div>
        {selectedCategory?.coreCompetencies.map((competencie) => (
          <CheckInfoBox title={competencie} />
        ))}
      </div>
      <div className="flex flex-col items-start justify-start gap-2 self-stretch">
        <div className="justify-start text-sm leading-5 font-medium text-neutral-600">
          기술 요구사항
        </div>
        {selectedCategory?.requirements.map((requirement) => (
          <CheckInfoBox title={requirement} />
        ))}
      </div>
    </div>
  );
}
