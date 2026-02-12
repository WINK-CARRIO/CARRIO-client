import type { SVGProps } from 'react';
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="currentColor"
    {...props}
  >
    <path d="M7.917 2.5a5.417 5.417 0 0 1 5.416 5.417 5.43 5.43 0 0 1-1.3 3.525l.225.225h.659l4.166 4.166-1.25 1.25-4.166-4.166v-.659l-.225-.225a5.433 5.433 0 0 1-3.525 1.3 5.416 5.416 0 1 1 0-10.833Zm0 1.667a3.734 3.734 0 0 0-3.75 3.75 3.734 3.734 0 0 0 3.75 3.75 3.734 3.734 0 0 0 3.75-3.75 3.734 3.734 0 0 0-3.75-3.75Z" />
  </svg>
);
export default SvgComponent;
