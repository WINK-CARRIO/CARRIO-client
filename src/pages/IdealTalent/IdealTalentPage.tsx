import Header from '../../components/Header.tsx';
import Card from './Card.tsx';
import { useState } from 'react';
import CompanyModal from './modal/CompanyModal.tsx';

type Company = {
  id: number;
  name: string;
  imageFile: string;
  description: string;
  industry: string;
  ideal_url: string;
};

export default function IdealTalentPage() {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const COMPANY_LIST = [
    {
      id: 1,
      name: 'MOLOCO',
      imageFile: 'MOLOCO.png',
      description: '머신러닝 기반 애드테크 기업',
      industry: '반도체/전자',
      ideal_url: 'https://www.samsung.com/sec/',
    },
    {
      id: 2,
      name: 'LG',
      imageFile: 'LG.png',
      description: '전자제품 기업',
      industry: '전자/마케팅',
      ideal_url: 'https://www.samsung.com/sec/',
    },
    {
      id: 3,
      name: '삼성',
      imageFile: 'SAMSUNG.jpg',
      description: '글로벌 반도체 및 전자제품 선도 기업',
      industry: '반도체/전자',
      ideal_url: 'https://www.samsung.com/sec/',
    },
  ];

  return (
    <>
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
                  industry={company.industry}
                  description={company.description}
                  onClick={() => {
                    setSelectedCompany(company);
                  }}
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
      {selectedCompany && (
        <CompanyModal
          title={selectedCompany.name}
          description={selectedCompany.description}
          imageUrl={selectedCompany.ideal_url}
          isOpen={true}
          onClose={() => setSelectedCompany(null)}
        />
      )}
    </>
  );
}
