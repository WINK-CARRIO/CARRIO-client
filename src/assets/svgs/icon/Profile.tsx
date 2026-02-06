import type { SVGProps } from 'react';
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={35}
    height={35}
    fill="none"
    {...props}
  >
    <path
      fill="#979595"
      fillRule="evenodd"
      d="M17.5 2.917A14.583 14.583 0 0 1 32.084 17.5c0 8.054-6.53 14.583-14.584 14.583-8.054 0-14.583-6.529-14.583-14.583S9.447 2.917 17.5 2.917Zm1.459 16.041h-2.917a8.752 8.752 0 0 0-8.047 5.308 11.652 11.652 0 0 0 9.505 4.9c3.921 0 7.39-1.933 9.506-4.9a8.752 8.752 0 0 0-8.047-5.308ZM17.5 7.292a4.375 4.375 0 1 0 0 8.75 4.375 4.375 0 0 0 0-8.75Z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgComponent;
