import Header from '../../components/Header.tsx';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="inline-flex w-full flex-col items-start justify-start">
      <Header />
      <div className="flex h-full flex-col items-center justify-center gap-12 self-stretch bg-[radial-gradient(ellipse_100.00%_100.00%_at_50.01%_0.00%,_#7C86FF_46%,_#959DFF_59%,_#AEB4FF_73%,_#D6D9FF_100%)] px-96 py-70">
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
      <div className="inline-flex h-full w-full items-center justify-center gap-20 bg-[#D6D9FF] px-[537px] py-32">
        <div className="inline-flex flex-col items-end justify-start gap-12">
          <div className="text-secondary justify-start text-right text-2xl leading-7 font-medium">
            자소서 작성은 늘 <br />
            ‘혼자만의 싸움'이었다
          </div>
          <img
            className="w-96 rounded-[20px] shadow-[0px_2px_10px_0px_rgba(0,0,0,0.25)]"
            src="https://placehold.co/380x766"
          />
        </div>
        <div className="inline-flex w-96 flex-col items-center justify-start gap-10">
          <div className="inline-flex flex-1 items-center justify-center gap-2.5 self-stretch rounded-[20px] bg-[radial-gradient(ellipse_50.00%_50.00%_at_50.00%_50.00%,_#AEB4FF_47%,_#D6D9FF_100%)]">
            <img className="h-80 w-80" src="https://placehold.co/324x324" />
          </div>
          <div className="text-secondary justify-start self-stretch text-xl leading-7 font-medium">
            자소서를 쓰기 시작하면,
            <br />
            가장 어려운 건 문장이 <br />
            아니라 방향이다.
            <br />
            정보는 넘쳐나지만, <br />
            기업이 원하는 기준에 맞게 <br />
            정리된 답은 찾기 어렵다.
          </div>
        </div>
      </div>
    </div>
  );
}
