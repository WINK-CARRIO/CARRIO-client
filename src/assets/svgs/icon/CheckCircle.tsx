import type { SVGProps } from 'react';
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <g fill="#7C86FF" clipPath="url(#a)">
      <path d="M8.536 13.595 5 10.058 6.178 8.88l2.358 2.357 4.713-4.714 1.18 1.179-5.893 5.893Z" />
      <path
        fillRule="evenodd"
        d="M.833 10a9.167 9.167 0 1 1 18.334 0A9.167 9.167 0 0 1 .833 10ZM10 17.5a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
        clipRule="evenodd"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgComponent;
