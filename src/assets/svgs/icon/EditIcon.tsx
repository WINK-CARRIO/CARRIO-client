import type { SVGProps } from 'react';
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      fill="#787E8B"
      d="M10.812 1.313 5.61 6.515a20.197 20.197 0 0 0-4.819 7.751.777.777 0 0 0 .188.804l.002.002a.776.776 0 0 0 .804.188 20.197 20.197 0 0 0 7.751-4.82l5.202-5.201a2.776 2.776 0 1 0-3.926-3.926Zm-1.983 8.42a19.202 19.202 0 0 1-6.941 4.43 19.2 19.2 0 0 1 4.43-6.94l3.098-3.1 2.512 2.512-3.1 3.099Zm5.202-5.201-1.396 1.396-2.512-2.512 1.396-1.396a1.775 1.775 0 1 1 2.512 2.512Z"
    />
  </svg>
);
export default SvgComponent;
