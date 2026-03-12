import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuthStore } from '../../store/authStore';

export default function KakaoCallbackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const setAuth = useAuthStore((state) => state.setAuth);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      toast.error('카카오 로그인에 실패했습니다.');
      navigate('/login');
      return;
    }

    const handleKakaoCallback = async () => {
      try {
        const res = await fetch(`${API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          toast.error(
            data.detail || data.message || '사용자 정보를 불러오지 못했습니다.'
          );
          navigate('/login');
          return;
        }

        setAuth({
          accessToken: token,
          user: data,
        });

        navigate('/home');
      } catch (error) {
        console.error('kakao callback error:', error);
        navigate('/login');
      }
    };

    handleKakaoCallback();
  }, [API_URL, navigate, searchParams, setAuth]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="text-lg font-medium">카카오 로그인 처리 중...</div>
    </div>
  );
}
