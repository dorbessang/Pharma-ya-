import type { SVGProps } from "react";

const paths = {
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm10 2-4.35-4.35",
  pin: "M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13v4l3 2",
  chat: "M4 4h16v12H8l-4 4V4Z",
  paperclip:
    "M17.5 6.5 9 15a3 3 0 1 0 4.24 4.24l7.02-7.02a5 5 0 1 0-7.07-7.07L5.5 12.84",
  star: "m12 3 2.6 5.9 6.4.6-4.8 4.3 1.4 6.2L12 17l-5.6 3 1.4-6.2-4.8-4.3 6.4-.6L12 3Z",
  arrowRight: "M4 12h16m-6-6 6 6-6 6",
  arrowLeft: "M20 12H4m6 6-6-6 6-6",
  check: "m5 13 4 4L19 7",
  package:
    "M21 8 12 3 3 8v8l9 5 9-5V8Zm0 0-9 5-9-5m9 5v9",
  cross: "M12 4v16m8-8H4",
  tag: "M20.6 12.6 11.4 3.4A2 2 0 0 0 10 3H4a1 1 0 0 0-1 1v6c0 .5.2 1 .6 1.4l9.2 9.2a2 2 0 0 0 2.8 0l4.9-4.9a2 2 0 0 0 .1-2.1ZM7 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z",
} as const;

export type IconName = keyof typeof paths;

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
}

export function Icon({ name, className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d={paths[name]} />
    </svg>
  );
}
