import type { SVGProps } from 'react';
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={20}
    fill="currentColor"
    {...props}
  >
    <path d="M14.39 0h-10c-1.11 0-2 .89-2 2v5.82a6.4 6.4 0 0 1 2-1.32V2h7v5.82c.03.03.07.05.1.08.34.34.63.71.87 1.1h6.03v7h-6.03c-.24.39-.53.76-.87 1.1-.36.35-.75.64-1.16.9h8.06c1.11 0 2-.89 2-2V6l-6-6Zm-1 7V1.5l5.5 5.5h-5.5Zm-6.5 1c-2.5 0-4.5 2-4.5 4.5 0 .88.25 1.71.69 2.4L0 18l1.39 1.39 3.12-3.07c.69.43 1.51.68 2.38.68 2.5 0 4.5-2 4.5-4.5S9.39 8 6.89 8Zm0 7a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z" />
  </svg>
);
export default SvgComponent;
