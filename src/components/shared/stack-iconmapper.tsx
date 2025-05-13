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
import { cn } from "@/lib/utils";

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
  className,
}: StackIconMapperProps) {
  const normalizedName = stackName.toLowerCase() as StackName;

  if (normalizedName in STACK_ICONS) {
    const IconComponent = STACK_ICONS[normalizedName];
    return (
      <IconComponent
        className={cn("size-5 [&>*]:fill-indigo-200", className)}
      />
    );
  }

  return <svg className={cn("size-5 [&>*]:fill-indigo-200", className)}></svg>;
}
