import Header from '../../components/Header.tsx';
import Card from './Card.tsx';
import { useEffect, useState } from 'react';
import CompanyModal from './modal/CompanyModal.tsx';
import SamsungLogo from '../../../public/SAMSUNG.jpg';
import LGLogo from '../../../public/LG.png';
import MolocoLogo from '../../../public/MOLOCO.png';

type Company = {
  id: number;
  name: string;
  industry: string;
  description: string;
  logo_url: string;
};

type CompaniesResponse = {
  total: number;
  page: number;
  limit: number;
  data: Company[];
};

export default function IdealTalentPage() {
  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('access_token');

  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setIsLoading(true);

        const res = await fetch(
          `${API_URL}/companies?sort=name&page=1&limit=20`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          }
        );
        const data: CompaniesResponse = await res.json();

        if (!res.ok) {
          console.error('기업 목록 조회 실패:', data);
          return;
        }

        setCompanies(data.data ?? []);
      } catch (error) {
        console.error('기업 목록 조회 에러:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanies();
  }, [API_URL, token]);

  const resolveCompanyImage = (company: Company) => {
    const name = company.name.toLowerCase();

    if (name.includes('삼성') || name.includes('samsung')) {
      return SamsungLogo;
    }
    if (name.includes('lg')) {
      return LGLogo;
    }
    if (name.includes('moloco') || name.includes('몰로코')) {
      return MolocoLogo;
    }

    return company.logo_url;
  };

  return (
    <>
      <div className="inline-flex min-h-screen w-full flex-col items-center justify-start bg-white">
        <Header />

        <div className="flex flex-col items-center justify-start gap-28 self-stretch px-10 py-24">
          <div className="flex flex-col items-center justify-center gap-5">
            <div className="text-3xl leading-[48px] font-bold text-black">
              그들이 그리는 방향, 당신이 닿을 수 있는 곳
            </div>
            <div className="text-xl leading-9 font-medium text-gray-600">
              기업별 인재상을 한눈에
            </div>
          </div>

          {isLoading ? (
            <div className="py-20 text-lg text-neutral-500">불러오는 중...</div>
          ) : (
            <div className="flex w-full max-w-[1100px] flex-wrap justify-start gap-11">
              {companies.map((company) => (
                <Card
                  key={company.id}
                  companyId={company.id}
                  imageFile={resolveCompanyImage(company)}
                  companyname={company.name}
                  industry={company.industry}
                  description={company.description}
                  onClick={() => setSelectedCompany(company)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedCompany && (
        <CompanyModal
          isOpen={true}
          onClose={() => setSelectedCompany(null)}
          companyId={selectedCompany.id}
          companyName={selectedCompany.name}
          companyDescription={selectedCompany.description}
          companyIndustry={selectedCompany.industry}
          companyLogoUrl={selectedCompany.logo_url}
        />
      )}
    </>
  );
}
