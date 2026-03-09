import type { JobTalentMock } from '../../components/JobTalentCard';
import type { OverallTalentMock } from '../../components/OverallTalentCard';

export type CompanyMock = {
  id: number;
  name: string;
  sub: string;
  status: 'DONE' | 'RUNNING' | 'NONE';
  overall: OverallTalentMock | null;
  jobs: JobTalentMock[];
};

/**
 * API 대응용 모크 메모
 *
 * 전사 인재상 추출:
 * POST /admin/companies/{company_id}/extract-talent-values
 *
 * 전사 인재상 조회:
 * GET /companies/{company_id}/talent-values
 *
 * 직무 목록:
 * GET /companies/{company_id}/job-categories
 *
 * 직무별 인재상 조회:
 * GET /companies/{company_id}/job-categories/{job_category_id}/talent-values
 */

const SAMSUNG_OVERALL: OverallTalentMock = {
  id: 1,
  company_id: 1,
  status: 'DONE',
  keywords: ['도전적', '혁신적', '글로벌', '창의적', '윤리경영'],
  description: '빠른 실행력을 가진 도전적 인재',
  details: [
    '창의적 사고와 혁신을 추구하는 인재',
    '끊임없이 도전하고 성장하는 인재',
    '글로벌 마인드와 협업 능력을 갖춘 인재',
  ],
  extracted_at: '2024-01-15T10:30:00Z',
};

const SAMSUNG_JOBS: JobTalentMock[] = [
  {
    id: 1,
    status: 'DONE',
    job_category_name: '소프트웨어 개발',
    keywords: ['기술 전문성', '문제 해결', '빠른 학습', '협업'],
    description: '최신 기술 트렌드를 빠르게 습득하고 실무에 적용하는 개발자',
    details: [
      '알고리즘과 자료구조에 대한 깊은 이해',
      '새로운 기술 스택 학습에 적극적',
      '코드 리뷰와 협업을 통한 성장 지향',
    ],
    technical_requirements: [
      'Python, Java, JavaScript 중 1개 이상 능숙',
      'RESTful API 설계 및 구현 경험',
      'Git을 활용한 협업 경험',
    ],
    extracted_at: '2024-01-15T10:30:00Z',
  },
  {
    id: 2,
    status: 'RUNNING',
    job_category_name: '디자인',
    keywords: ['사용자 중심', '문제 정의', '협업'],
    description: '사용자 문제를 구조화하는 디자이너',
    details: ['사용자 리서치 기반 문제 정의', '프로토타입 테스트 및 개선'],
    technical_requirements: ['Figma 활용 능력', '디자인 시스템 이해'],
    extracted_at: '2024-01-15T10:30:00Z',
  },
];

const NAVER_OVERALL: OverallTalentMock = {
  id: 2,
  company_id: 2,
  status: 'DONE',
  keywords: ['도전', '몰입', '협업', '성장'],
  description: '스스로 문제를 발견하고 끝까지 해결하는 인재',
  details: [
    '문제 해결을 즐기고 깊이 몰입하는 인재',
    '변화 속에서도 빠르게 적응하고 배우는 인재',
    '동료와의 협업을 통해 더 큰 가치를 만드는 인재',
  ],
  extracted_at: '2024-02-10T09:00:00Z',
};

const NAVER_JOBS: JobTalentMock[] = [
  {
    id: 3,
    status: 'DONE',
    job_category_name: '백엔드 개발',
    keywords: ['확장성', '안정성', '문제 해결'],
    description: '대규모 트래픽 환경에서 안정적인 서비스를 만드는 개발자',
    details: [
      '분산 시스템과 대용량 처리에 대한 이해',
      '장애 대응과 성능 개선 경험',
      '협업 기반의 서버 개발 경험',
    ],
    technical_requirements: [
      'Java/Kotlin 또는 Python 숙련',
      'RDB/NoSQL 사용 경험',
      'API 설계 및 운영 경험',
    ],
    extracted_at: '2024-02-10T09:00:00Z',
  },
];

export const INITIAL_COMPANIES: CompanyMock[] = [
  {
    id: 1,
    name: '삼성전자',
    sub: '전사 ✓ · 직무별 2개',
    status: 'DONE',
    overall: SAMSUNG_OVERALL,
    jobs: SAMSUNG_JOBS,
  },
  {
    id: 2,
    name: '네이버',
    sub: '전사 ✓ · 직무별 1개',
    status: 'DONE',
    overall: NAVER_OVERALL,
    jobs: NAVER_JOBS,
  },
  {
    id: 3,
    name: '카카오',
    sub: '전사 ✗ · 직무별 0개',
    status: 'NONE',
    overall: null,
    jobs: [],
  },
];
