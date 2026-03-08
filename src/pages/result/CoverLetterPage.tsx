import { useState } from 'react';
import Header from '../../components/Header';
import UserMenu from '../../components/UserMenu.tsx';
// @ts-ignore
import SAMSUNGLogo from '../../assets/SAMSUNG.jpg';
// @ts-ignore
import MOLOCOLogo from '../../assets/MOLOCO.png';
// @ts-ignore
import LGLogo from '../../assets/LG.png';

export default function CoverLetterPage() {
  const userName = '이가인';

  const [resumes, setResumes] = useState([
    {
      id: 1,
      company: '삼성 전자 ',
      role: 'Backend 개발자',
      status: '추출 완료',
      date: '2026-01-21',
      statusColor: 'bg-green-400/50 text-green-900',
      logo: SAMSUNGLogo,
      qna: [
        {
          q_id: 1,
          title:
            '삼성전자를 지원한 이유와 입사 후 회사에서 이루고 싶은 꿈을 기술하십시오.',
          content: `삼성전자는 단순한 제조 기업을 넘어, SmartThings와 삼성 계정을 중심으로 하드웨어와 소프트웨어가 유기적으로 연결된 거대한 플랫폼 생태계를 구축하고 있습니다. 저는 웹 기술이 기기 간의 경계를 허물고 사용자에게 '심리스(Seamless)한 경험'을 제공하는 핵심 도구라는 점에 매료되어 지원하게 되었습니다. 입사 후 수억 대의 기기를 웹 환경에서 효율적으로 제어하는 고성능 백엔드 아키텍처를 설계하고 싶습니다.`,
        },
        {
          q_id: 2,
          title:
            '본인의 성장과정에 가장 큰 영향을 끼친 사건이나 인물을 포함하여 기술하십시오.',
          content: `저의 강점은 대규모 트래픽 처리에 최적화된 백엔드 설계를 수행할 수 있다는 점입니다. 대학 시절 오픈소스 커뮤니티에서 활동하며 코드 한 줄이 수만 명의 사용자에게 미치는 영향을 경험했습니다. 당시 성능 병목 현상을 해결하기 위해 캐싱 전략을 도입했던 경험은 기술적 근거를 바탕으로 문제를 해결하는 개발자로 성장하는 큰 계기가 되었습니다.`,
        },
        {
          q_id: 3,
          title:
            '최근 사회이슈 중 중요하다고 생각되는 한 가지를 선택하고 본인의 견해를 기술하십시오.',
          content: `최근 생성형 AI의 확산에 따른 데이터 보안과 신뢰성 문제가 핵심 이슈라고 생각합니다. 백엔드 개발자로서 단순히 기능을 구현하는 것을 넘어, 사용자의 소중한 데이터를 안전하게 보호하고 서비스의 가용성을 보장하는 것이 기술의 진보보다 선행되어야 한다고 믿습니다. 삼성전자의 보안 솔루션인 Knox와 연계된 안전한 소프트웨어 생태계를 만드는 데 기여하고 싶습니다.`,
        },
      ],
    },
    {
      id: 2,
      company: '모로코',
      role: '해외 영업 관리',
      status: '추출 완료',
      date: '2026-02-15',
      statusColor: 'bg-green-400/50 text-green-900',
      logo: MOLOCOLogo,
      qna: [
        {
          q_id: 1,
          title:
            '지원 직무와 관련된 본인의 강점과 현지 시장 분석 경험을 서술해주세요.',
          content: `모로코 시장의 특수성을 이해하고 현지 파트너십을 강화한 경험이 있습니다. 특히 북아프리카 지역의 비즈니스 관습과 불어권을 중심으로 한 네트워킹 방식을 익혔습니다. 이를 통해 단순한 제품 공급을 넘어, 현지 소비자의 라이프스타일에 맞춘 유통망 최적화 전략을 제안할 수 있는 역량을 갖췄습니다.`,
        },
        {
          q_id: 2,
          title: '예상치 못한 문제 발생 시 이를 해결했던 사례를 기술하십시오.',
          content: `현지 물류망 차질로 인해 납기 기한이 촉박했던 상황에서, 현지 포워딩 업체와의 직접적인 협상과 실시간 추적 시스템 도입을 통해 문제를 해결했습니다. 데이터에 기반한 의사결정과 현지 파트너와의 신뢰 관계 구축이 위기 상황에서 얼마나 중요한지를 배웠습니다.`,
        },
        {
          q_id: 3,
          title: '글로벌 협업을 위해 본인이 기울인 노력은 무엇입니까?',
          content: `다양한 문화권의 팀원들과 소통하기 위해 언어 역량뿐만 아니라 '문화적 지능'을 높이는 데 주력했습니다. 모로코 현지 연수 당시 문화적 차이에서 오는 오해를 줄이기 위해 비즈니스 매너 가이드를 제작해 팀 내 공유한 바 있으며, 이는 협업 효율을 20% 이상 개선하는 결과를 가져왔습니다.`,
        },
      ],
    },
    {
      id: 3,
      company: 'LG 전자',
      role: 'SW Engineer',
      status: '추출 중',
      date: '2026-03-08',
      statusColor: 'bg-yellow-300/50 text-orange-600',
      logo: LGLogo,
      qna: [
        {
          q_id: 1,
          title:
            'LG전자의 가전 생태계(ThinQ)에 대한 본인의 이해도와 기여 방안을 기술하십시오.',
          content: `ThinQ 플랫폼을 기반으로 한 가전 연결성에 깊은 관심을 가지고 있습니다. 단순히 원격 제어에 그치지 않고, 가전에서 수집되는 데이터를 분석하여 사용자에게 선제적으로 편의를 제공하는 '공감 지능' 구현이 핵심이라고 생각합니다. 분산 시스템 설계 역량을 바탕으로 초연결 시대의 안정적인 가전 플랫폼 구축에 기여하겠습니다.`,
        },
        {
          q_id: 2,
          title:
            '프로젝트 수행 중 기술적 한계에 부딪혔을 때 어떻게 극복했는지 설명하십시오.',
          content: `임베디드 환경에서의 메모리 제약 문제를 해결하기 위해 알고리즘 최적화와 메모리 프로파일링 도구를 적극 활용했습니다. 팀원들과의 코드 리뷰를 통해 비효율적인 로직을 찾아냈고, 최종적으로 기존 대비 리소스 점유율을 15% 절감하는 성과를 거두었습니다. 이 과정을 통해 최적의 퍼포먼스를 내기 위한 집요함을 배웠습니다.`,
        },
        {
          q_id: 3,
          title: '본인이 생각하는 좋은 소프트웨어의 기준은 무엇입니까?',
          content: `좋은 소프트웨어는 '예측 가능성'과 '확장성'을 갖추어야 한다고 믿습니다. 사용자가 예상한 대로 정확히 동작해야 하며, 기술적 변화에 유연하게 대응할 수 있도록 견고한 아키텍처가 뒷받침되어야 합니다. LG전자의 가전이 전 세계 사용자에게 일관된 만족감을 줄 수 있도록 탄탄한 기반 코드를 작성하는 개발자가 되겠습니다.`,
        },
      ],
    },
  ]);

  const [expandedId, setExpandedId] = useState<number | null>(1);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [tempQna, setTempQna] = useState<
    { q_id: number; title: string; content: string }[]
  >([]);

  const toggleContent = (id: number) => {
    if (editingId) return;
    setExpandedId(expandedId === id ? null : id);
  };

  const startEdit = (id: number, qna: any[], e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(id);
    setTempQna([...qna]);
  };

  const handleTempContentChange = (q_id: number, newContent: string) => {
    setTempQna((prev) =>
      prev.map((q) => (q.q_id === q_id ? { ...q, content: newContent } : q))
    );
  };

  const saveEdit = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setResumes(
      resumes.map((item) => (item.id === id ? { ...item, qna: tempQna } : item))
    );
    setEditingId(null);
  };

  const handleDelete = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('정말 삭제하시겠습니까?')) {
      setResumes(resumes.filter((item) => item.id !== id));
      if (expandedId === id) setExpandedId(null);
    }
  };

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-indigo-50">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <UserMenu />

        <main className="flex flex-1 flex-col items-center overflow-y-auto p-12">
          <div className="flex w-[1394px] flex-col gap-11">
            <div className="flex flex-col items-start gap-2 self-start py-2">
              <h1 className="font-['Pretendard_Variable'] text-4xl font-bold text-black">
                자소서 확인하기
              </h1>
              <p className="font-['Pretendard_Variable'] text-xl font-medium text-neutral-500">
                CARRIO의 AI로 기업 인재상에 맞춰 생성된, 나만의 맞춤 자소서를
                확인해보세요
              </p>
            </div>

            <div className="flex w-full flex-col gap-3">
              <div className="px-2 font-['Pretendard_Variable'] text-lg font-medium text-black">
                총 {resumes.length}건
              </div>

              <div className="flex flex-col gap-4 pb-20">
                {resumes.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col overflow-hidden rounded-[20px] border border-neutral-200 bg-white"
                  >
                    <div
                      className="flex cursor-pointer items-center justify-between px-8 py-6 hover:bg-gray-50/50"
                      onClick={() => toggleContent(item.id)}
                    >
                      <div className="flex items-center gap-6">
                        <div className="flex h-20 w-32 flex-shrink-0 items-center justify-center overflow-hidden rounded-[10px] border border-neutral-100 bg-neutral-50">
                          {item.logo ? (
                            <img
                              src={item.logo}
                              alt={`${item.company} logo`}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full bg-neutral-200/50" />
                          )}
                        </div>
                        <div className="inline-flex min-w-fit flex-col gap-1.5 px-0.5 py-[3px]">
                          <div className="inline-flex items-center gap-3.5 whitespace-nowrap">
                            <span className="text-2xl font-semibold text-black">
                              {item.company}
                            </span>
                            <span
                              className={`rounded-xl px-2 py-1 text-xs font-normal ${item.statusColor}`}
                            >
                              {item.status}
                            </span>
                          </div>
                          <span className="text-xl font-normal whitespace-nowrap text-neutral-500">
                            {item.role}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-8">
                        <span className="text-base text-neutral-500">
                          {item.date}
                        </span>
                        <div
                          className={`relative h-6 w-6 transition-transform duration-300 ${expandedId === item.id ? 'rotate-180' : ''}`}
                        >
                          <div
                            className="absolute top-[7.50px] left-[3.75px] h-2 w-4 bg-slate-900"
                            style={{
                              clipPath: 'polygon(100% 0, 0 0, 50% 100%)',
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {expandedId === item.id && (
                      <div className="px-5 pb-5">
                        <div className="bg-color-grey-97-30%/30 flex flex-col gap-6 rounded-xl border border-blue-100 p-8">
                          <div className="flex items-center justify-between px-1">
                            <div className="flex items-center gap-2">
                              <span className="text-s font-['Apple_SD_Gothic_Neo'] font-bold tracking-tight text-gray-500">
                                <span className="text-lg text-black">
                                  {userName}
                                </span>{' '}
                                님의 자소서
                              </span>
                            </div>

                            <div className="flex gap-2">
                              {editingId === item.id ? (
                                <button
                                  onClick={(e) => saveEdit(item.id, e)}
                                  className="flex h-9 items-center gap-2 rounded-xl bg-indigo-700 px-4 text-sm font-semibold text-white transition-all hover:bg-indigo-800"
                                >
                                  저장 완료
                                </button>
                              ) : (
                                <>
                                  <button
                                    onClick={(e) =>
                                      startEdit(item.id, item.qna, e)
                                    }
                                    className="flex h-9 items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-700 transition-all hover:bg-neutral-50"
                                  >
                                    <svg
                                      width="14"
                                      height="14"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2.5"
                                      className="mr-1"
                                    >
                                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                    </svg>
                                    수정
                                  </button>
                                  <button
                                    onClick={(e) => handleDelete(item.id, e)}
                                    className="flex h-9 items-center gap-2 rounded-xl border border-red-100 bg-white px-4 text-sm font-medium text-red-500 transition-all hover:bg-red-50"
                                  >
                                    삭제
                                  </button>
                                </>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col gap-6">
                            {(editingId === item.id ? tempQna : item.qna).map(
                              (q) => (
                                <div
                                  key={q.q_id}
                                  className="flex flex-col gap-4 rounded-lg border border-neutral-200 bg-white p-6"
                                >
                                  <h4 className="text-base font-bold tracking-tight text-gray-800">
                                    Q. {q.title}
                                  </h4>
                                  {editingId === item.id ? (
                                    <textarea
                                      className="min-h-[160px] w-full resize-none rounded-lg border border-indigo-100 bg-indigo-50/10 p-4 font-['Apple_SD_Gothic_Neo'] text-sm leading-6 text-gray-600 outline-none focus:border-indigo-400"
                                      value={q.content}
                                      onChange={(e) =>
                                        handleTempContentChange(
                                          q.q_id,
                                          e.target.value
                                        )
                                      }
                                      autoFocus={q.q_id === 1}
                                      onClick={(e) => e.stopPropagation()}
                                    />
                                  ) : (
                                    <p className="font-['Apple_SD_Gothic_Neo'] text-sm leading-6 whitespace-pre-wrap text-gray-600">
                                      {q.content}
                                    </p>
                                  )}
                                </div>
                              )
                            )}
                            {/* 🛠️ 날짜 폰트 크기 수정: text-[10px] -> text-sm */}
                            <div className="mt-2 px-1 font-['Inter'] text-sm text-indigo-300">
                              {item.date}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
