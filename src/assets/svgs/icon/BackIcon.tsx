import type { SVGProps } from 'react';
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path fill="#525252" d="M3.5 7.5h10a.5.5 0 0 1 0 1h-10a.5.5 0 1 1 0-1Z" />
    <path
      fill="#525252"
      d="m3.706 8 4.149 4.145a.502.502 0 0 1-.71.71l-4.5-4.5a.5.5 0 0 1 0-.71l4.5-4.5a.502.502 0 1 1 .71.71L3.706 8Z"
    />
  </svg>
);
export default SvgComponent;
