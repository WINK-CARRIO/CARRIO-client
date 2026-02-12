import Header from '../../components/Header.tsx';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import KakaoLogo from '../../assets/svgs/KakaoLogo.tsx';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const fanAnimation: HTMLMotionProps<'span'> = {
    initial: { rotateY: -90, opacity: 0 },
    animate: { rotateY: 0, opacity: 1 },
    transition: {
      duration: 1.5,
      ease: 'easeOut',
    },
    style: {
      transformOrigin: 'left center',
      transformStyle: 'preserve-3d',
    },
  };
  return (
    <div className="flex min-h-screen w-full flex-col bg-indigo-400">
      {/* HEADER */}
      <Header />

      <div className="flex flex-1 items-center justify-between px-80">
        <div
          style={{ perspective: 800 }}
          className="inline-flex flex-col items-start gap-10"
        >
          <div className="flex flex-col gap-4">
            <div>
              <span className="text-logotext text-7xl font-bold">CAR</span>
              <motion.span
                className="text-logotext-bg inline-block text-7xl font-bold"
                {...fanAnimation}
              >
                EER,
              </motion.span>
            </div>

            <div>
              <span className="text-logotext text-7xl font-bold">R</span>

              <motion.span
                className="text-logotext-bg inline-block text-7xl font-bold"
                {...fanAnimation}
              >
                EADY
              </motion.span>

              <span className="text-logotext text-7xl font-bold"> I</span>

              <motion.span
                className="text-logotext-bg inline-block text-7xl font-bold"
                {...fanAnimation}
              >
                N ONE
              </motion.span>
            </div>

            <div>
              <span className="text-logotext text-7xl font-bold">O</span>
              <motion.span
                className="text-logotext-bg inline-block text-7xl font-bold"
                {...fanAnimation}
              >
                UTLINE
              </motion.span>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 1.6,
              ease: 'easeOut',
            }}
          >
            <span className="text-xl font-semibold text-white">
              당신의 커리어, 이야기로 완성되다.
            </span>
            <span className="text-logotext text-xl font-semibold">CARRIO</span>
          </motion.div>
        </div>

        <div className="inline-flex w-96 flex-col justify-between gap-8 rounded-2xl bg-white/10 p-8 backdrop-blur">
          <div className="flex h-64 flex-col justify-center gap-4">
            <div className="flex flex-col gap-10">
              <input
                placeholder="이메일 입력"
                className="border-b border-white pb-1 text-sm text-white focus:outline-none"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                placeholder="비밀번호 입력"
                className="border-b border-white pb-1 text-sm text-white focus:outline-none"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                className="border-logotext-bg h-12 rounded-[20px] border font-semibold text-white"
                onClick={() => alert(`email: ${email}\npassword: ${password}`)}
              >
                로그인
              </button>
            </div>

            <div className="flex justify-between text-xs text-white">
              <span>계정이 없으신가요?</span>
              <span
                onClick={() => navigate('/signup')}
                className="cursor-pointer hover:underline"
              >
                회원가입 →
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="h-px flex-1 bg-white" />
              <span className="text-sm text-white">SNS 계정으로 로그인</span>
              <div className="h-px flex-1 bg-white" />
            </div>

            <button className="bg-kakao flex items-center justify-center gap-2 rounded-[20px] py-3 font-semibold text-black">
              <KakaoLogo />
              카카오로 계속하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
