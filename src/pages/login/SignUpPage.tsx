import Header from '../../components/Header.tsx';
import { useNavigate } from 'react-router-dom';
import { type HTMLMotionProps, motion } from 'framer-motion';
import { useCallback, useState } from 'react';
import KakaoLogo from '../../assets/svgs/KakaoLogo.tsx';
import { useAuthStore } from '../../store/authStore';

export default function SignUpPage() {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const setAuth = useAuthStore((state) => state.setAuth);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validatePasswordMatch = useCallback(() => {
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return false;
    }

    if (password.length < 8) {
      alert('비밀번호는 8자 이상이어야 합니다.');
      return false;
    }

    return true;
  }, [password, confirmPassword]);

  const handleRegister = useCallback(async () => {
    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      alert('이름, 이메일, 비밀번호를 모두 입력해주세요.');
      return;
    }

    if (!validatePasswordMatch()) return;

    try {
      setIsLoading(true);

      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        const errorMessage =
          typeof data.detail === 'string'
            ? data.detail
            : Array.isArray(data.detail)
              ? data.detail.map((item: { msg?: string }) => item.msg).join('\n')
              : data.message || '회원가입에 실패했습니다.';

        alert(errorMessage);
        return;
      }

      setAuth({
        accessToken: data.access_token,
        user: data.user,
      });

      alert('회원가입에 성공했습니다.');
      navigate('/');
    } catch (error) {
      console.error('register error:', error);
      alert('서버 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [
    API_URL,
    name,
    email,
    password,
    confirmPassword,
    validatePasswordMatch,
    navigate,
    setAuth,
  ]);

  const onConfirmPasswordKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== 'Enter') return;
      handleRegister();
    },
    [handleRegister]
  );

  const handleKakaoLogin = useCallback(async () => {
    try {
      setIsLoading(true);

      const res = await fetch(`${API_URL}/auth/kakao/login`, {
        method: 'GET',
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.detail || data.message || '카카오 로그인에 실패했습니다.');
        return;
      }

      window.location.href = data.url;
    } catch (error) {
      console.error('kakao login error:', error);
      alert('카카오 로그인 요청 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [API_URL]);

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
            <span className="text-logotext text-xl font-semibold"> CARRIO</span>
          </motion.div>
        </div>

        <div className="inline-flex w-96 flex-col justify-between gap-8 rounded-2xl bg-white/10 p-8 backdrop-blur">
          <div className="flex min-h-72 flex-col justify-between">
            <div className="flex flex-col gap-8">
              <input
                placeholder="이름 입력"
                className="border-b border-white bg-transparent pb-1 text-sm text-white placeholder:text-white/70 focus:outline-none"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                placeholder="이메일 입력"
                className="border-b border-white bg-transparent pb-1 text-sm text-white placeholder:text-white/70 focus:outline-none"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                placeholder="비밀번호 입력"
                className="border-b border-white bg-transparent pb-1 text-sm text-white placeholder:text-white/70 focus:outline-none"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <input
                placeholder="비밀번호 확인"
                className="border-b border-white bg-transparent pb-1 text-sm text-white placeholder:text-white/70 focus:outline-none"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyDown={onConfirmPasswordKeyDown}
              />

              <button
                className="border-logotext-bg h-12 rounded-[20px] border font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                onClick={handleRegister}
                disabled={isLoading}
              >
                {isLoading ? '회원가입 중...' : '회원가입'}
              </button>
            </div>

            <div className="mt-4 flex justify-between text-xs text-white">
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

            <button
              onClick={handleKakaoLogin}
              disabled={isLoading}
              className="bg-kakao flex items-center justify-center gap-2 rounded-[20px] py-3 font-semibold text-black disabled:cursor-not-allowed disabled:opacity-60"
            >
              <KakaoLogo />
              카카오로 계속하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
