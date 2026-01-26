import Header from '../../components/Header.tsx';
import Card from './Card.tsx';
import { useState } from 'react';

export default function IdealTalentPage() {
  const COMPANY_MAP = {
    1: {
      name: 'MOLOCO',
      description: '머신러닝 기반 애드테크 기업',
    },
    2: {
      name: 'LG',
      description: '전자제품 기업',
    },
  };

  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(
    null
  );

  const company = COMPANY_MAP[selectedCompanyId];

  return (
    <>
      {selectedCompanyId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="rounded-xl bg-white p-10">
            <div>{company.name}</div>
            <div>{company.description}</div>

            <button onClick={() => setSelectedCompanyId(null)}>닫기</button>
          </div>
        </div>
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
              <Card
                companyId={1}
                imageFile={'MOLOCO.png'}
                companyname={'MOLOCO'}
                subscription={
                  '머신러닝 기술 기반의 글로벌 애드테크(Ad-tech) 기업'
                }
                onClick={() => setSelectedCompanyId(1)}
              />
              <Card
                companyId={2}
                imageFile={'LG.png'}
                companyname={'LG'}
                subscription={'전자제품 기업'}
              />
              <Card
                companyId={3}
                imageFile={'SAMSUNG.jpg'}
                companyname={'삼성'}
                subscription={'대기업'}
              />
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
