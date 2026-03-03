interface Certificate {
  name: string;
  acquired_date: string;
  expiry_date?: string;
}

interface CertificateSectionProps {
  certificates: Certificate[];
}

export default function CertificateSection({
  certificates,
}: CertificateSectionProps) {
  return (
    <div className="flex flex-col items-start justify-start gap-3 self-stretch">
      {certificates.map((certificate, index) => (
        <div
          key={index}
          className="inline-flex items-center justify-between self-stretch overflow-hidden rounded-2xl bg-white px-8 py-5 outline outline-1 outline-offset-[-1px] outline-neutral-400/40"
        >
          <div className="flex items-center justify-start gap-7">
            <div className="w-32 text-xl leading-7 font-semibold text-black">
              {certificate.name}
            </div>
          </div>

          <div className="text-sm leading-5 font-medium text-neutral-500">
            {certificate.acquired_date} 취득
          </div>
        </div>
      ))}
    </div>
  );
}
