import Header from '../../components/Header.tsx';
import Card from './Card.tsx';
import { useState } from 'react';
import CompanyModal from './CompanyModal.tsx';

export default function IdealTalentPage() {
  const COMPANY_LIST = [
    {
      id: 1,
      name: 'MOLOCO',
      imageFile: 'MOLOCO.png',
      description: '머신러닝 기반 애드테크 기업',
      occupation: 'FE 개발',
      idealTalent:
        '삼성의 FE(Front-End) 직무를 포함한 전반적인 인재상은 열정, 창의·혁신, 그리고 인간미와 도덕성을 핵심으로 한다. 삼성은 주어진 역할에 안주하지 않고 스스로 목표를 설정해 끝까지 파고드는 태도를 중요하게 보며, 기술 변화가 빠른 환경 속에서도 끊임없이 학습하고 도전하는 열정을 가진 인재를 선호한다. 또한 기존의 방식에 머무르기보다는 사용자 경험과 서비스 품질을 더 나은 방향으로 개선하기 위해 새로운 아이디어를 제시하고, 이를 실제 결과로 연결할 수 있는 창의성과 실행력을 중시한다. 여기에 더해 개인의 성과뿐 아니라 조직 전체의 신뢰와 지속 가능성을 고려하는 윤리 의식과 책임감, 즉 인간미와 도덕성 역시 중요한 평가 기준이다. FE 개발자 관점에서는 이러한 인재상이 곧 기술적 깊이와 문제 해결 능력, 사용자 중심의 UI/UX 고민, 그리고 디자이너·백엔드 개발자 등과의 원활한 협업 태도로 자연스럽게 드러나는 것이 이상적이라고 볼 수 있다.',
    },
    {
      id: 2,
      name: 'LG',
      imageFile: 'LG.png',
      description: '전자제품 기업',
      occupation: 'BE 개발',
      idealTalent:
        '삼성의 FE(Front-End) 직무를 포함한 전반적인 인재상은 열정, 창의·혁신, 그리고 인간미와 도덕성을 핵심으로 한다. 삼성은 주어진 역할에 안주하지 않고 스스로 목표를 설정해 끝까지 파고드는 태도를 중요하게 보며, 기술 변화가 빠른 환경 속에서도 끊임없이 학습하고 도전하는 열정을 가진 인재를 선호한다. 또한 기존의 방식에 머무르기보다는 사용자 경험과 서비스 품질을 더 나은 방향으로 개선하기 위해 새로운 아이디어를 제시하고, 이를 실제 결과로 연결할 수 있는 창의성과 실행력을 중시한다. 여기에 더해 개인의 성과뿐 아니라 조직 전체의 신뢰와 지속 가능성을 고려하는 윤리 의식과 책임감, 즉 인간미와 도덕성 역시 중요한 평가 기준이다. FE 개발자 관점에서는 이러한 인재상이 곧 기술적 깊이와 문제 해결 능력, 사용자 중심의 UI/UX 고민, 그리고 디자이너·백엔드 개발자 등과의 원활한 협업 태도로 자연스럽게 드러나는 것이 이상적이라고 볼 수 있다.',
    },
    {
      id: 3,
      name: '삼성',
      imageFile: 'SAMSUNG.jpg',
      description: '대기업',
      occupation: '클라우드 서비스 개발',
      idealTalent:
        '삼성의 FE(Front-End) 직무를 포함한 전반적인 인재상은 열정, 창의·혁신, 그리고 인간미와 도덕성을 핵심으로 한다. 삼성은 주어진 역할에 안주하지 않고 스스로 목표를 설정해 끝까지 파고드는 태도를 중요하게 보며, 기술 변화가 빠른 환경 속에서도 끊임없이 학습하고 도전하는 열정을 가진 인재를 선호한다. 또한 기존의 방식에 머무르기보다는 사용자 경험과 서비스 품질을 더 나은 방향으로 개선하기 위해 새로운 아이디어를 제시하고, 이를 실제 결과로 연결할 수 있는 창의성과 실행력을 중시한다. 여기에 더해 개인의 성과뿐 아니라 조직 전체의 신뢰와 지속 가능성을 고려하는 윤리 의식과 책임감, 즉 인간미와 도덕성 역시 중요한 평가 기준이다. FE 개발자 관점에서는 이러한 인재상이 곧 기술적 깊이와 문제 해결 능력, 사용자 중심의 UI/UX 고민, 그리고 디자이너·백엔드 개발자 등과의 원활한 협업 태도로 자연스럽게 드러나는 것이 이상적이라고 볼 수 있다.',
    },
  ];

  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(
    null
  );

  const company = COMPANY_LIST.find((c) => c.id === selectedCompanyId);

  return (
    <>
      {selectedCompanyId !== null && (
        <CompanyModal
          isOpen={selectedCompanyId !== null}
          onClose={() => setSelectedCompanyId(null)}
          title={company.name}
          imageFile={company.imageFile}
          occupation={company.occupation}
          idealTalent={company.idealTalent}
        />
      )}
      <div className="inline-flex w-full flex-col items-center justify-start bg-white">
        <Header />
        <div className="flex flex-col items-center justify-start gap-28 self-stretch px-10 py-24">
          <div className="flex flex-col items-center justify-center gap-5">
            <div className="justify-start text-3xl leading-[48px] font-bold text-black">
              그들이 그리는 방향, 당신이 닿을 수 있는 곳
            </div>
            <div className="justify-start text-xl leading-9 font-medium text-gray-600">
              기업별 인재상을 한눈에
            </div>
          </div>
          <div className="flex flex-col items-start justify-start gap-16">
            <div className="inline-flex items-center justify-start gap-11">
              {COMPANY_LIST.map((company) => (
                <Card
                  companyId={company.id}
                  imageFile={company.imageFile}
                  companyname={company.name}
                  occupation={company.occupation}
                  subscription={company.description}
                  onClick={() => setSelectedCompanyId(company.id)}
                />
              ))}
            </div>
            <div className="inline-flex items-center justify-start gap-11">
              <div className="inline-flex h-64 w-80 flex-col items-center justify-start gap-2 rounded-[20px] bg-white shadow-[0px_2px_10px_0px_rgba(0,0,0,0.25)]">
                <img
                  className="h-36 self-stretch rounded-tl-[20px] rounded-tr-[20px]"
                  src="https://placehold.co/348x148"
                />
                <div className="flex flex-col items-start justify-start gap-1 self-stretch px-5">
                  <div className="justify-start self-stretch text-xl leading-9 font-semibold text-black">
                    LG
                  </div>
                  <div className="justify-start self-stretch text-xs leading-7 font-normal text-neutral-700">
                    머신러닝 기술 기반의 글로벌 애드테크(Ad-tech) 기업
                  </div>
                </div>
              </div>
              <div className="inline-flex h-64 w-80 flex-col items-center justify-start gap-2 rounded-[20px] bg-white shadow-[0px_2px_10px_0px_rgba(0,0,0,0.25)]">
                <img
                  className="h-36 self-stretch rounded-tl-[20px] rounded-tr-[20px]"
                  src="https://placehold.co/348x148"
                />
                <div className="flex flex-col items-start justify-start gap-1 self-stretch px-5">
                  <div className="justify-start self-stretch text-3xl leading-9 font-semibold text-black">
                    삼성 (SAMSUNG)
                  </div>
                  <div className="justify-start self-stretch text-lg leading-7 font-normal text-neutral-700">
                    머신러닝 기술 기반의 글로벌 애드테크(Ad-tech) 기업
                  </div>
                </div>
              </div>
              <div className="inline-flex h-64 w-80 flex-col items-center justify-start gap-2 rounded-[20px] bg-white shadow-[0px_2px_10px_0px_rgba(0,0,0,0.25)]">
                <img
                  className="h-36 self-stretch rounded-tl-[20px] rounded-tr-[20px]"
                  src="https://placehold.co/348x148"
                />
                <div className="flex flex-col items-start justify-start gap-1 self-stretch px-5">
                  <div className="justify-start self-stretch text-3xl leading-9 font-semibold text-black">
                    몰로코 (MOLOCO)
                  </div>
                  <div className="justify-start self-stretch text-lg leading-7 font-normal text-neutral-700">
                    머신러닝 기술 기반의 글로벌 애드테크(Ad-tech) 기업
                  </div>
                </div>
              </div>
            </div>
            <div className="inline-flex items-center justify-start gap-11">
              <div className="inline-flex h-64 w-80 flex-col items-center justify-start gap-2 rounded-[20px] bg-white shadow-[0px_2px_10px_0px_rgba(0,0,0,0.25)]">
                <img
                  className="h-36 self-stretch rounded-tl-[20px] rounded-tr-[20px]"
                  src="https://placehold.co/348x148"
                />
                <div className="flex flex-col items-start justify-start gap-1 self-stretch px-5">
                  <div className="justify-start self-stretch text-3xl leading-9 font-semibold text-black">
                    LG
                  </div>
                  <div className="justify-start self-stretch text-lg leading-7 font-normal text-neutral-700">
                    머신러닝 기술 기반의 글로벌 애드테크(Ad-tech) 기업
                  </div>
                </div>
              </div>
              <div className="inline-flex h-64 w-80 flex-col items-center justify-start gap-2 rounded-[20px] bg-white shadow-[0px_2px_10px_0px_rgba(0,0,0,0.25)]">
                <img
                  className="h-36 self-stretch rounded-tl-[20px] rounded-tr-[20px]"
                  src="https://placehold.co/348x148"
                />
                <div className="flex flex-col items-start justify-start gap-1 self-stretch px-5">
                  <div className="justify-start self-stretch text-3xl leading-9 font-semibold text-black">
                    삼성 (SAMSUNG)
                  </div>
                  <div className="justify-start self-stretch text-lg leading-7 font-normal text-neutral-700">
                    머신러닝 기술 기반의 글로벌 애드테크(Ad-tech) 기업
                  </div>
                </div>
              </div>
              <div className="inline-flex h-64 w-80 flex-col items-center justify-start gap-2 rounded-[20px] bg-white shadow-[0px_2px_10px_0px_rgba(0,0,0,0.25)]">
                <img
                  className="h-36 self-stretch rounded-tl-[20px] rounded-tr-[20px]"
                  src="https://placehold.co/348x148"
                />
                <div className="flex flex-col items-start justify-start gap-1 self-stretch px-5">
                  <div className="justify-start self-stretch text-3xl leading-9 font-semibold text-black">
                    몰로코 (MOLOCO)
                  </div>
                  <div className="justify-start self-stretch text-lg leading-7 font-normal text-neutral-700">
                    머신러닝 기술 기반의 글로벌 애드테크(Ad-tech) 기업
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
