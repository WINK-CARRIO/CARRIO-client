import Header from '../../components/Header.tsx';

export default function IdealTalentPage() {
  return (
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
            <div className="inline-flex h-64 w-80 flex-col items-center justify-start gap-2 rounded-[20px] bg-white shadow-[0px_2px_10px_0px_rgba(0,0,0,0.25)]">
              <div className="h-36 w-full overflow-hidden rounded-tl-[20px] rounded-tr-[20px] bg-gray-100">
                <img
                  src="src/assets/MOLOCO.png"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col items-start justify-start gap-1 self-stretch px-5">
                <div className="justify-start self-stretch text-xl leading-9 font-semibold text-black">
                  MOLOCO
                </div>
                <div className="justify-start self-stretch text-xs leading-7 font-normal text-neutral-700">
                  머신러닝 기술 기반의 글로벌 애드테크(Ad-tech) 기업
                </div>
              </div>
            </div>
            <div className="inline-flex h-64 w-80 flex-col items-center justify-start gap-2 rounded-[20px] bg-white shadow-[0px_2px_10px_0px_rgba(0,0,0,0.25)]">
              {/* 이미지 영역 */}
              <div className="h-36 w-full overflow-hidden rounded-tl-[20px] rounded-tr-[20px] bg-gray-100">
                <img
                  src="src/assets/LG.png"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>

              {/* 텍스트 영역 */}
              <div className="flex flex-col items-start justify-start gap-1 self-stretch px-5">
                <div className="self-stretch text-xl leading-9 font-semibold text-black">
                  LG
                </div>
                <div className="self-stretch text-xs leading-7 font-normal text-neutral-700">
                  머신러닝 기술 기반의 글로벌 애드테크(Ad-tech) 기업
                </div>
              </div>
            </div>
            <div className="inline-flex h-64 w-80 flex-col items-center justify-start gap-2 rounded-[20px] bg-white shadow-[0px_2px_10px_0px_rgba(0,0,0,0.25)]">
              {/* 이미지 영역 */}
              <div className="h-36 w-full overflow-hidden rounded-tl-[20px] rounded-tr-[20px] bg-gray-100">
                <img
                  src="src/assets/SAMSUNG.jpg"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>

              {/* 텍스트 영역 */}
              <div className="flex flex-col items-start justify-start gap-1 self-stretch px-5">
                <div className="self-stretch text-xl leading-9 font-semibold text-black">
                  삼성 (SAMSUNG)
                </div>
                <div className="self-stretch text-xs leading-7 font-normal text-neutral-700">
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
  );
}
