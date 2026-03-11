import { useState } from 'react';

type Props = {
  initialValue: {
    school: string;
    major: string;
    admission_year: number;
    grad_year: number;
    gpa: string;
  };
  onClose: () => void;
  onSave: (value: {
    school: string;
    major: string;
    admission_year: number;
    grad_year: number;
    gpa: string;
  }) => void;
};

export default function EducationEditModal({
  initialValue,
  onClose,
  onSave,
}: Props) {
  const initialGpaValue = (initialValue.gpa ?? '').split('/')[0] ?? '';

  const [school, setSchool] = useState(initialValue.school ?? '');
  const [major, setMajor] = useState(initialValue.major ?? '');
  const [admissionYear, setAdmissionYear] = useState(
    initialValue.admission_year ? String(initialValue.admission_year) : ''
  );
  const [gradYear, setGradYear] = useState(
    initialValue.grad_year ? String(initialValue.grad_year) : ''
  );
  const [gpa, setGpa] = useState(initialGpaValue);

  const handleSave = () => {
    const gpaValueOnly = (gpa ?? '').split('/')[0].trim();

    onSave({
      school: school.trim(),
      major: major.trim(),
      admission_year: Number(admissionYear) || 0,
      grad_year: Number(gradYear) || 0,
      gpa: gpaValueOnly ? `${gpaValueOnly}/4.5` : '0/4.5',
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[460px] rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-6 text-xl font-semibold">학력 정보 수정</div>

        <div className="flex flex-col gap-4">
          <input
            className="rounded-lg border px-4 py-3"
            placeholder="학교명"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
          />

          <input
            className="rounded-lg border px-4 py-3"
            placeholder="전공명"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
          />

          <div className="flex gap-3">
            <input
              className="w-full rounded-lg border px-4 py-3"
              placeholder="입학 연도"
              value={admissionYear}
              onChange={(e) => setAdmissionYear(e.target.value)}
            />

            <input
              className="w-full rounded-lg border px-4 py-3"
              placeholder="졸업 연도"
              value={gradYear}
              onChange={(e) => setGradYear(e.target.value)}
            />
          </div>

          <input
            className="rounded-lg border px-4 py-3"
            placeholder="학점 (예: 3.8)"
            value={gpa}
            onChange={(e) => setGpa(e.target.value)}
          />
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border px-4 py-2 text-sm"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="rounded-lg bg-indigo-500 px-4 py-2 text-sm text-white"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
