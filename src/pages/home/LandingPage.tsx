import Header from '../../components/Header.tsx';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../../assets/svgs/Logo.tsx';

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="inline-flex w-full flex-col items-start justify-start bg-[radial-gradient(ellipse_100.00%_100.00%_at_50.01%_0.00%,_#7C86FF_46%,_#959DFF_59%,_#AEB4FF_73%,_#D6D9FF_100%)]">
      <Header />
      <div className="flex h-full flex-col items-center justify-center gap-12 self-stretch px-96 py-70">
        <div className="flex flex-col items-center justify-center gap-5 self-stretch">
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 1,
              ease: 'easeOut',
            }}
          >
            <span className="text-xl font-semibold text-white">
              당신의 커리어, 이야기로 완성되다.
            </span>
            <span className="text-logotext text-xl font-semibold"> CARRIO</span>
          </motion.div>
          <div className="justify-start text-center text-6xl leading-[72px] font-bold text-white">
            당신의 경험을, 기업이 원하는 언어로
          </div>
          <div className="justify-start text-center text-xl leading-8 font-normal text-white">
            지원 기업의 인재상에 맞춰 당신의 경험을 구조화하고 설득력 있는
            자소서로 완성합니다.
          </div>
        </div>
        <div className="inline-flex items-center justify-center gap-2.5">
          <div
            className="cursor-pointer justify-start text-lg leading-8 font-medium text-indigo-800"
            onClick={() => {
              navigate('/login');
            }}
          >
            자소서 작성하기 →
          </div>
        </div>
      </div>
      <div className="inline-flex h-full flex-col items-center justify-start gap-14 self-stretch bg-gradient-to-b from-violet-300/0 to-white/60 px-32 py-44">
        {/* 타이틀 영역 */}
        <div className="flex flex-col items-center justify-start gap-5">
          <div className="flex flex-col items-center justify-start gap-2">
            <Logo />
            <div className="text-3xl leading-10 font-bold text-white">
              Pain point
            </div>
          </div>
          <div className="text-2xl leading-9 font-medium text-white">
            자소서를 쓰는 순간마다 반복되는 가장 큰 고민들
          </div>
        </div>

        {/* 말풍선 영역 */}
        <div className="relative mt-16 h-90 w-full">
          {/* 말풍선 1 */}
          <motion.div
            initial={{ opacity: 0, x: -120 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
            viewport={{ once: true }}
            className="absolute top-0 left-44 z-10 flex flex-col rounded-tl-[100px] rounded-tr-[100px] rounded-bl-[100px] bg-indigo-100/90 px-20 py-4 shadow-[0px_2px_20px_rgba(0,0,0,0.25)]"
          >
            <div className="text-xl leading-10 font-semibold text-indigo-800">
              # 기준이 안 보이는 자소서
            </div>
            <div className="text-base leading-8 font-normal text-neutral-600">
              열심히 썼는데도 이 자소서가 해당 기업과 직무에 맞는지 판단할
              <br />
              기준이 없어 결국 감에 의존해 제출하게 됩니다.
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 120 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 2 }}
            viewport={{ once: true }}
            className="absolute top-24 right-50 z-20 flex flex-col rounded-tl-[100px] rounded-tr-[100px] rounded-br-[100px] bg-indigo-100/90 px-20 py-4 shadow-[0px_2px_20px_rgba(0,0,0,0.25)]"
          >
            {' '}
            <div className="text-xl leading-10 font-semibold text-indigo-800">
              # 무엇을 써야 할지 모르는 경험들
            </div>
            <div className="text-base leading-8 font-normal text-neutral-600">
              경험은 충분히 있지만, 어떤 경험이 이 회사에서 가치 있게 보일지
              알기 어려워
              <br />
              같은 이야기만 반복하거나 방향을 잡지 못한 채 자소서를 시작하게
              됩니다.
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -120 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 3 }}
            viewport={{ once: true }}
            className="absolute top-56 left-60 z-20 flex flex-col rounded-tl-[100px] rounded-tr-[100px] rounded-bl-[100px] bg-indigo-100/90 px-20 py-4 shadow-[0px_2px_20px_rgba(0,0,0,0.25)]"
          >
            <div className="text-xl leading-10 font-semibold text-indigo-800">
              # 시간은 부족한데 회사는 많다
            </div>
            <div className="text-base leading-8 font-normal text-neutral-600">
              지원해야 할 기업은 많은데, 각 회사에 맞춰 자소서를 새로 쓰기엔
              시간이 부족해
              <br />
              완성도가 낮은 자소서를 급하게 제출하게 됩니다.
            </div>
          </motion.div>
        </div>
      </div>
      <div className="inline-flex w-full flex-col items-center justify-center gap-20 bg-gradient-to-b from-[#DCDEFF] from-40% to-indigo-400 px-56 py-20">
        <div className="flex flex-col items-center justify-start gap-5">
          <div className="flex flex-col items-center justify-start gap-2">
            <img src="src/assets/svgs/LOGO_COLOR.svg" alt={'LOGO'} />
            <div className="justify-start text-3xl leading-10 font-bold text-indigo-800">
              Why Us ?
            </div>
          </div>
          <div className="justify-start text-2xl leading-9 font-medium text-indigo-800">
            우리가 다르게 만드는 이유
          </div>
        </div>
        <div className="inline-flex items-center justify-start gap-14">
          <motion.div
            initial={{ opacity: 0, y: -120 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 1 }}
            viewport={{ once: true }}
            className="inline-flex w-80 flex-col items-center justify-start gap-14 rounded-[20px] bg-indigo-100/60 px-4 py-12 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.25)]"
          >
            <div className="justify-start text-center text-7xl leading-[96px] font-black text-white">
              🚩
            </div>
            <div className="flex flex-col items-center justify-start gap-10 self-stretch">
              <div className="justify-start text-center text-3xl leading-10 font-semibold text-indigo-800">
                기준
              </div>
              <div className="justify-start text-center text-base leading-7 font-normal text-zinc-700">
                기업·직무별 인재상과 <br />
                평가 요소를 데이터로 정리해 <br />내 자소서가 어디를 향하고{' '}
                <br />
                있는지 명확히 보여줍니다.
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -120 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 2 }}
            viewport={{ once: true }}
            className="inline-flex w-80 flex-col items-center justify-start gap-14 rounded-[20px] bg-indigo-100/60 px-4 py-12 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.25)]"
          >
            <div className="justify-start text-center text-7xl leading-[96px] font-black text-white">
              🚩
            </div>
            <div className="flex flex-col items-center justify-start gap-10 self-stretch">
              <div className="justify-start text-center text-3xl leading-10 font-semibold text-indigo-800">
                선별
              </div>
              <div className="justify-start text-center text-base leading-7 font-normal text-zinc-700">
                수많은 경험 중에서 해당 기업이 <br />
                중요하게 보는 경험만 골라
                <br />
                써야 할 이야기의 우선순위를 <br />
                잡아줍니다.
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -120 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 3 }}
            viewport={{ once: true }}
            className="inline-flex w-80 flex-col items-center justify-start gap-14 rounded-[20px] bg-indigo-100/60 px-4 py-12 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.25)]"
          >
            <div className="justify-start text-center text-7xl leading-[96px] font-black text-white">
              🚩
            </div>
            <div className="flex flex-col items-center justify-start gap-10 self-stretch">
              <div className="justify-start text-center text-3xl leading-10 font-semibold text-indigo-800">
                효율
              </div>
              <div className="justify-start text-center text-base leading-7 font-normal text-zinc-700">
                하나의 경험으로 여러 기업에 <br />
                대응할 수 있도록
                <br />
                회사별 맞춤 자소서 <br />
                작성 시간을 크게 줄여줍니다.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
