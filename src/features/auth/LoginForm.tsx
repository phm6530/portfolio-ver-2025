import { Button } from "@/component/ui/Button";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import { RiLockPasswordFill } from "react-icons/ri";
import { IoPersonCircleSharp } from "react-icons/io5";
// 인증로직
import { useRef } from "react";
import LoginHeader from "./LoginHeader";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  LoginInputStyle,
  LoginStyle,
  LabelStyle,
  LabelWrap,
  ErrorMessage,
} from "@features/auth/LoginFormStyle";
import useLogin from "./hooks/useLogin";
import { LoginRequestProps } from "@/type/AuthTypes";
import { loginSchema } from "./schema/login-schema";

export default function LoginForm() {
  const ref = useRef<boolean>(false);
  const { mutate } = useLogin();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const onSubmitHandler = async (loginData: LoginRequestProps) => {
    if (ref.current) return;
    ref.current = true;
    mutate(loginData);

    setTimeout(() => {
      ref.current = false;
    }, 1000);
  };

  return (
    <>
      <LoginStyle onSubmit={handleSubmit(onSubmitHandler)}>
        <LoginHeader />

        <LabelStyle>
          <LabelWrap $error={!!errors.user_id}>
            <IoPersonCircleSharp size={22} />
            <LoginInputStyle {...register("user_id")} placeholder="Admin Id" />
          </LabelWrap>
          {errors.user_id && (
            <ErrorMessage>{errors.user_id.message}</ErrorMessage>
          )}
        </LabelStyle>

        <LabelStyle>
          <LabelWrap $error={!!errors.user_password}>
            <RiLockPasswordFill size={22} />
            <LoginInputStyle
              {...register("user_password")}
              placeholder="password"
              type="password"
            />
          </LabelWrap>
          {errors.user_password && (
            <ErrorMessage>{errors.user_password.message}</ErrorMessage>
          )}
        </LabelStyle>
        <Button.Submit>Login</Button.Submit>
      </LoginStyle>
    </>
  );
}
