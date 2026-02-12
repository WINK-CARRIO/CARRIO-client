import type { SVGProps } from 'react';
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <g stroke="currentcolor" strokeWidth={1.5} clipPath="url(#a)">
      <path
        strokeLinecap="round"
        d="M9.172 17.5H8.004c-2.987 0-4.48 0-5.409-.946-.928-.946-.928-2.467-.928-5.512 0-3.045 0-4.567.928-5.513.928-.946 2.422-.946 5.41-.946h3.168c2.988 0 4.482 0 5.41.946.715.728.879 1.797.917 3.638"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m16.68 16.686 1.653 1.647m-.789-3.728a2.94 2.94 0 1 0-5.878-.099 2.94 2.94 0 0 0 5.878.099Z"
      />
      <path d="m13.333 4.583-.083-.258c-.413-1.283-.618-1.925-1.11-2.292-.49-.366-1.143-.366-2.448-.366h-.22c-1.304 0-1.956 0-2.447.366-.492.367-.698 1.009-1.11 2.292l-.082.258" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgComponent;
