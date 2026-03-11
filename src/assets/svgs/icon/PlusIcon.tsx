import type { SVGProps } from 'react';

interface IconProps extends SVGProps<SVGSVGElement> {
  color?: string;
}

const SvgComponent = ({ color = '#3F3F47', ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 4.167v11.666M4.167 10h11.667"
    />
  </svg>
);

export default SvgComponent;
