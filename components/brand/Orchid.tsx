import type { ComponentProps } from "react";

// The logo motif from prototypes/orchid.svg. Inline so any text colour paints it.
export function Orchid(props: ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 210"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M100 100 C 78 76, 58 42, 82 24 C 100 14, 106 68, 100 100 Z" />
      <path d="M100 100 C 122 76, 142 42, 118 24 C 100 14, 94 68, 100 100 Z" />
      <path d="M100 100 C 70 106, 26 102, 22 72 C 20 46, 62 50, 100 100 Z" />
      <path d="M100 100 C 130 106, 174 102, 178 72 C 180 46, 138 50, 100 100 Z" />
      <path d="M100 102 C 84 122, 78 152, 100 168 C 122 152, 116 122, 100 102 Z" />
      <path d="M100 106 C 86 108, 74 126, 88 134" />
      <path d="M100 106 C 114 108, 126 126, 112 134" />
      <circle cx="100" cy="100" r="6" />
      <path d="M100 168 C 100 186, 112 196, 106 208" />
      <path d="M90 34 C 96 44, 96 60, 98 78" strokeWidth="1.5" opacity=".6" />
      <path d="M110 34 C 104 44, 104 60, 102 78" strokeWidth="1.5" opacity=".6" />
      <path d="M40 66 C 58 70, 78 84, 96 98" strokeWidth="1.5" opacity=".6" />
      <path d="M160 66 C 142 70, 122 84, 104 98" strokeWidth="1.5" opacity=".6" />
    </svg>
  );
}
