import { useForm } from "react-hook-form";

// 인증로직
import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "./schema/login-schema";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import InputField from "@/components/shared/inputField";
import PasswordInputField from "@/components/shared/inputPasswordField";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LockKeyhole } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import useStore from "@/store/zustandStore";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { z } from "zod";
import SupabasePool from "@/lib/supabaseClient";

export interface LoginSchemaProps {
  message?: string;
  token: string;
  Auth: boolean;
}

export default function LoginForm() {
  const ref = useRef<boolean>(false);
  const { login } = useStore((state) => ({ login: state.userAuthLogin }));
  const [lock, setLock] = useState(false);

  const { mutate } = useMutation({
    mutationFn: async (data: z.infer<typeof loginSchema>) => {
      const pool = SupabasePool.getInstance();

      const { data: loginData, error: loginError } =
        await pool.auth.signInWithPassword({
          email: data.user_id,
          password: data.user_password,
        });

      if (loginData?.session) {
        return { token: loginData.session.access_token };
      }

      throw loginError;
    },

    onSuccess: ({ token }) => {
      toast.success("로그인 되었습니다.");
      login(token); // 상태 저장 등
    },

    onError: () => {
      toast.error(`정보가 일치하지 않거나 존재하지 않는 아이디 입니다.`);
    },
  });

  const form = useForm({
    defaultValues: {
      user_id: "",
      user_password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmitHandler = async (loginData: z.infer<typeof loginSchema>) => {
    if (ref.current) return;
    setLock(true);
    ref.current = true;
    console.log(loginData);
    mutate(loginData);

    setTimeout(() => {
      ref.current = false;
      setLock(false);
    }, 2000);
  };

  return (
    <>
      <div className="mb-4 flex flex-col gap-2  py-5">
        <CardTitle className="text-4xl text-center">Sign In</CardTitle>

        <Alert className="border-indigo-300/30 mt-3 ">
          <LockKeyhole className="h-4 w-4 " />
          <AlertTitle className="text-indigo-300 font-semibold">
            Admin
          </AlertTitle>
          <AlertDescription className="break-keep">
            해당 PORTFOLIO는 권한이 인가 된 사용자만 사용가능합니다.
          </AlertDescription>
        </Alert>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitHandler)}
          className="flex flex-col gap-4"
        >
          {/* <LoginHeader /> */}
          <InputField
            name="user_id"
            placeholder="Admin Id"
            label="User"
            className="py-3  px-0 border-0 border-b  focus-visible:ring-0 transition-all"
          />

          <PasswordInputField
            name="user_password"
            placeholder="password"
            className="py-3  px-0 border-0 border-b   focus-visible:ring-0 transition-all"
          />

          <Button disabled={lock} className="w-full  p-6">
            Login
          </Button>
        </form>
      </Form>
    </>
  );
}
