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
import CssinjsSvg from "@/asset/stack/styledcomponents.svg?react";
import FigmaSvg from "@/asset/stack/figma.svg?react";
import ZodSvg from "@/asset/stack/zod.svg?react";
import RnSvg from "@/asset/stack/reactquery.svg?react";
import tsOrmSvg from "@/asset/stack/typeorm.svg?react";
import DrizzleSvg from "@/asset/stack/drizzle.svg?react";
import SupabaseSvg from "@/asset/stack/supabase.svg?react";
import ReactHookFormSvg from "@/asset/stack/reacthookform.svg?react";
import jquerySvg from "@/asset/stack/jquery.svg?react";
import PostgreSqlSvg from "@/asset/stack/postgresql.svg?react";
import AxiosSvg from "@/asset/stack/axios.svg?react";

import { cn } from "@/lib/utils";

// SVG 컴포넌트의 타입 정의
type SVGComponent = FC<SVGProps<SVGSVGElement>>;

// 스택 이름에 대한 유니온 타입 정의
type StackName =
  | "next.js"
  | "nest.js"
  | "javascript"
  | "typescript"
  | "scss"
  | "git"
  | "php"
  | "react"
  | "tailwind"
  | "jquery"
  | "styled-component"
  | "figma"
  | "zod"
  | "react-query"
  | "typeorm"
  | "drizzleorm"
  | "supabase"
  | "react-hook-form"
  | "postgresql"
  | "axios";

// 각 스택의 브랜드 색상 정의
const STACK_COLORS: Record<StackName, string> = {
  "next.js": "fill-gray-800 fill-white",
  "nest.js": "fill-[#E0234E]",
  javascript: "fill-[#F7DF1E] bg-white",
  typescript: "fill-[#3178C6] bg-white",
  scss: "fill-[#CC6699]",
  git: "fill-[#F05032]",
  php: "fill-[#777BB4]",
  react: "fill-[#61DAFB]",
  tailwind: "fill-[#06B6D4]",
  jquery: "fill-[#0769AD]",
  "styled-component": "fill-[#DB7093]",
  figma: "fill-[#F24E1E]",
  zod: "fill-[#3068B7]",
  "react-query": "fill-[#FF4154]",
  typeorm: "fill-[#FE0902]",
  drizzleorm: "fill-[#C5F74F]",
  supabase: "fill-[#3ECF8E]",
  "react-hook-form": "fill-[#EC5990]",
  postgresql: "fill-[#4169E1]",
  axios: "fill-[#5A29E4]",
};

// 스택 매핑 객체 생성 - 타입 명시
export const STACK_ICONS: Record<StackName, SVGComponent> = {
  "next.js": NextSvg,
  "nest.js": NestSvg,
  javascript: JsSvg,
  typescript: TsSvg,
  scss: ScssSvg,
  git: GitSvg,
  php: PhpSvg,
  react: ReactSvg,
  tailwind: TailwindSvg,
  jquery: jquerySvg,
  "styled-component": CssinjsSvg,
  figma: FigmaSvg,
  zod: ZodSvg,
  "react-query": RnSvg,
  typeorm: tsOrmSvg,
  drizzleorm: DrizzleSvg,
  supabase: SupabaseSvg,
  "react-hook-form": ReactHookFormSvg,
  postgresql: PostgreSqlSvg,
  axios: AxiosSvg,
};

interface StackIconMapperProps {
  stackName: string;
  className?: string;
}

export default function StackIconMapper({
  stackName,
  className,
}: StackIconMapperProps) {
  // 입력 스택 이름을 정규화하여 매핑을 쉽게 함
  const normalizedName = stackName.toLowerCase();
  let noSpaces = normalizedName.replace(/\s+/g, "");

  if (noSpaces === "styled-components" || noSpaces === "styledcomponents") {
    noSpaces = "styled-component";
  } else if (noSpaces === "react-query" || noSpaces === "tanstack@query") {
    noSpaces = "react-query";
  } else if (noSpaces === "react-hook-form" || noSpaces === "reacthookform") {
    noSpaces = "react-hook-form";
  } else if (noSpaces === "typeorm") {
    noSpaces = "typeorm";
  }

  if (noSpaces in STACK_ICONS) {
    const IconComponent = STACK_ICONS[noSpaces as StackName];
    const colorClass = STACK_COLORS[noSpaces as StackName];

    return <IconComponent className={cn("size-3", colorClass, className)} />;
  }

  // 매핑이 없을 경우 기본 React 아이콘 반환
  const IconComponent = STACK_ICONS["react"];
  const colorClass = STACK_COLORS["react"];

  return <IconComponent className={cn("size-3", colorClass, className)} />;
}
