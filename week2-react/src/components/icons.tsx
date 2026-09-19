/**
 * public/icons/*.svg 원본을 그대로 인라인으로 옮긴 아이콘 모음이에요.
 * 원본은 fill="black" 고정값이라, currentColor로 바꿔서 CSS color로 색을
 * 조절할 수 있게 했어요. viewBox 좌표는 원본 그대로 두어도 24x24 박스 안에서
 * 정상적으로 보여요 (SVG viewBox는 원점이 달라도 문제 없어요).
 */
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function SearchIcon(props: IconProps) {
  return (
    <svg viewBox="80 80 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M95.5 94H94.71L94.43 93.73C95.41 92.59 96 91.11 96 89.5C96 85.91 93.09 83 89.5 83C85.91 83 83 85.91 83 89.5C83 93.09 85.91 96 89.5 96C91.11 96 92.59 95.41 93.73 94.43L94 94.71V95.5L99 100.49L100.49 99L95.5 94ZM89.5 94C87.01 94 85 91.99 85 89.5C85 87.01 87.01 85 89.5 85C91.99 85 94 87.01 94 89.5C94 91.99 91.99 94 89.5 94Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg viewBox="128 80 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M148 84H132C130.9 84 130.01 84.9 130.01 86L130 98C130 99.1 130.9 100 132 100H148C149.1 100 150 99.1 150 98V86C150 84.9 149.1 84 148 84ZM148 98H132V88L140 93L148 88V98ZM140 91L132 86H148L140 91Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function LockIcon(props: IconProps) {
  return (
    <svg viewBox="32 80 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M44 97C45.1 97 46 96.1 46 95C46 93.9 45.1 93 44 93C42.9 93 42 93.9 42 95C42 96.1 42.9 97 44 97ZM50 88H49V86C49 83.24 46.76 81 44 81C41.24 81 39 83.24 39 86V88H38C36.9 88 36 88.9 36 90V100C36 101.1 36.9 102 38 102H50C51.1 102 52 101.1 52 100V90C52 88.9 51.1 88 50 88ZM40.9 86C40.9 84.29 42.29 82.9 44 82.9C45.71 82.9 47.1 84.29 47.1 86V88H40.9V86ZM50 100H38V90H50V100Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function BookmarkIcon(props: IconProps) {
  return (
    <svg viewBox="80 32 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M97 35H87C85.9 35 85.01 35.9 85.01 37L85 53L92 50L99 53V37C99 35.9 98.1 35 97 35Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function BookmarkOutlineIcon(props: IconProps) {
  return (
    <svg viewBox="32 32 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M49 35H39C37.9 35 37.01 35.9 37.01 37L37 53L44 50L51 53V37C51 35.9 50.1 35 49 35ZM49 50L44 47.82L39 50V37H49V50Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <svg viewBox="176 32 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M188 49.27L194.18 53L192.54 45.97L198 41.24L190.81 40.63L188 34L185.19 40.63L178 41.24L183.46 45.97L181.82 53L188 49.27Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function StarOutlineIcon(props: IconProps) {
  return (
    <svg viewBox="128 32 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M150 41.24L142.81 40.62L140 34L137.19 40.63L130 41.24L135.46 45.97L133.82 53L140 49.27L146.18 53L144.55 45.97L150 41.24ZM140 47.4L136.24 49.67L137.24 45.39L133.92 42.51L138.3 42.13L140 38.1L141.71 42.14L146.09 42.52L142.77 45.4L143.77 49.68L140 47.4Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <svg viewBox="32 128 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M47.41 144.59L42.83 140L47.41 135.41L46 134L40 140L46 146L47.41 144.59Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <svg viewBox="80 128 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M88.59 144.59L93.17 140L88.59 135.41L90 134L96 140L90 146L88.59 144.59Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg viewBox="176 128 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M195 134.41L193.59 133L188 138.59L182.41 133L181 134.41L186.59 140L181 145.59L182.41 147L188 141.41L193.59 147L195 145.59L189.41 140L195 134.41Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function EditIcon(props: IconProps) {
  return (
    <svg viewBox="80 176 24 24" fill="none" aria-hidden="true" {...props}>
      <rect
        x="81"
        y="177"
        width="22"
        height="22"
        rx="11"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M86 191.5V194H88.5L95.8733 186.627L93.3733 184.127L86 191.5ZM97.8067 184.693C98.0667 184.433 98.0667 184.013 97.8067 183.753L96.2467 182.193C95.9867 181.933 95.5667 181.933 95.3067 182.193L94.0867 183.413L96.5867 185.913L97.8067 184.693Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg viewBox="176 80 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M189.3 97.275C189.1 97.075 189.004 96.8334 189.012 96.55C189.021 96.2667 189.125 96.025 189.325 95.825L192.15 93H181C180.717 93 180.479 92.904 180.287 92.712C180.096 92.5207 180 92.2834 180 92C180 91.7167 180.096 91.479 180.287 91.287C180.479 91.0957 180.717 91 181 91H192.15L189.3 88.15C189.1 87.95 189 87.7124 189 87.437C189 87.1624 189.1 86.925 189.3 86.725C189.5 86.525 189.738 86.425 190.013 86.425C190.288 86.425 190.525 86.525 190.725 86.725L195.3 91.3C195.4 91.4 195.471 91.5084 195.513 91.625C195.554 91.7417 195.575 91.8667 195.575 92C195.575 92.1334 195.554 92.2584 195.513 92.375C195.471 92.4917 195.4 92.6 195.3 92.7L190.7 97.3C190.517 97.4834 190.288 97.575 190.013 97.575C189.738 97.575 189.5 97.475 189.3 97.275Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function PersonIcon(props: IconProps) {
  return (
    <svg viewBox="32 176 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M44 188C46.21 188 48 186.21 48 184C48 181.79 46.21 180 44 180C41.79 180 40 181.79 40 184C40 186.21 41.79 188 44 188ZM44 190C41.33 190 36 191.34 36 194V196H52V194C52 191.34 46.67 190 44 190Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function MovieIcon(props: IconProps) {
  return (
    <svg viewBox="128 128 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M146 132L148 136H145L143 132H141L143 136H140L138 132H136L138 136H135L133 132H132C130.9 132 130.01 132.9 130.01 134L130 146C130 147.1 130.9 148 132 148H148C149.1 148 150 147.1 150 146V132H146Z"
        fill="currentColor"
      />
    </svg>
  );
}
