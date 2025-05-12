import { FC, SVGProps } from "react";
import NextSvg from "@/asset/stack/next.svg?react";
import NestSvg from "@/asset/stack/nestjs.svg?react";
import JsSvg from "@/asset/stack/javascript.svg?react";
import TsSvg from "@/asset/stack/typescript.svg?react";
import ScssSvg from "@/asset/stack/sass.svg?react";
import GitSvg from "@/asset/stack/git.svg?react";
import PhpSvg from "@/asset/stack/php.svg?react";
import ReactSvg from "@/asset/stack/react.svg?react";
import TailwindSvg from "@/asset/stack/tailwindcss.svg?react";
import jquerySvg from "@/asset/stack/jquery.svg?react";

// SVG 컴포넌트의 타입 정의
type SVGComponent = FC<SVGProps<SVGSVGElement>>;

// 스택 이름에 대한 유니온 타입 정의
type StackName =
  | "next.js"
  | "nest.js"
  | "javascript"
  | "typescript"
  | "sass"
  | "git"
  | "php"
  | "react"
  | "tailwindcss"
  | "jquery";

// 스택 매핑 객체 생성 - 타입 명시
const STACK_ICONS: Record<StackName, SVGComponent> = {
  "next.js": NextSvg,
  "nest.js": NestSvg,
  javascript: JsSvg,
  typescript: TsSvg,
  sass: ScssSvg,
  git: GitSvg,
  php: PhpSvg,
  react: ReactSvg,
  tailwindcss: TailwindSvg,
  jquery: jquerySvg,
};

interface StackIconMapperProps {
  stackName: string;
  className?: string;
}

export default function StackIconMapper({
  stackName,
  className = "size-5 [&>*]:fill-indigo-200",
}: StackIconMapperProps) {
  const normalizedName = stackName.toLowerCase() as StackName;

  if (normalizedName in STACK_ICONS) {
    const IconComponent = STACK_ICONS[normalizedName];
    return <IconComponent className={className} />;
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M15 4H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V8l-6-4z"></path>
      <path d="M15 4v4h4"></path>
      <path d="M10 12v4"></path>
      <path d="M14 12v4"></path>
    </svg>
  );
}
