import type { SVGProps } from 'react';
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={13}
    height={13}
    fill="none"
    {...props}
  >
    <path
      stroke="#717182"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.039}
      d="m3.073 4.74 3.073 3.161 3.074-3.16"
    />
  </svg>
);
export default SvgComponent;
