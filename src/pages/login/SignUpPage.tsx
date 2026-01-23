import Header from '../../components/Header.tsx';
import KakaoLogo from '../../assets/svgs/KakaoLogo.tsx';
import { useNavigate } from 'react-router-dom';

export default function SignUpPage() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen w-full flex-col bg-indigo-400">
      {/* HEADER */}
      <Header />

      <div className="flex flex-1 items-center justify-between px-80">
        <div className="inline-flex flex-col items-start gap-10">
          <div className="flex flex-col gap-4">
            <div>
              <span className="text-7xl font-bold text-indigo-800">CAR</span>
              <span className="text-7xl font-bold text-white/80">EER,</span>
            </div>
            <div>
              <span className="text-7xl font-bold text-indigo-800">R</span>
              <span className="text-7xl font-bold text-white/80">EADY </span>
              <span className="text-7xl font-bold text-indigo-800">I</span>
              <span className="text-7xl font-bold text-white/80">N ONE</span>
            </div>
            <div>
              <span className="text-7xl font-bold text-indigo-800">O</span>
              <span className="text-7xl font-bold text-white/80">UTLINE</span>
            </div>
          </div>

          <div>
            <span className="text-xl font-semibold text-white">
              당신의 커리어, 이야기로 완성되다.{' '}
            </span>
            <span className="text-xl font-semibold text-indigo-800">
              CARRIO
            </span>
          </div>
        </div>

        <div className="inline-flex w-96 flex-col justify-between gap-8 rounded-2xl bg-white/10 p-8 backdrop-blur">
          <div className="flex h-64 flex-col justify-between">
            <div className="flex flex-col gap-8">
              <input
                placeholder="이메일 입력"
                className="border-b border-white pb-1 text-sm text-white focus:outline-none"
                type="email"
              />
              <input
                placeholder="비밀번호 입력"
                className="border-b border-white pb-1 text-sm text-white focus:outline-none"
                type="password"
              />
              <input
                placeholder="비밀번호 확인"
                className="border-b border-white pb-1 text-sm text-white focus:outline-none"
                type="password"
              />

              <button className="h-12 rounded-[20px] border border-white/80 font-semibold text-white">
                회원가입
              </button>
            </div>

            <div className="flex justify-between text-xs text-white">
              <span>계정이 있으신가요?</span>
              <span
                onClick={() => navigate('/login')}
                className="cursor-pointer hover:underline"
              >
                로그인 →
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="h-px flex-1 bg-white" />
              <span className="text-sm text-white">SNS 계정으로 로그인</span>
              <div className="h-px flex-1 bg-white" />
            </div>

            <button className="flex items-center justify-center gap-2 rounded-[20px] bg-yellow-400 py-3 font-semibold text-black">
              <KakaoLogo />
              카카오로 계속하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
