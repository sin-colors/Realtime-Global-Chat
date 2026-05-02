import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import useLogin from "@/hooks/useLogin";
import { loginSchema, type LoginType } from "@/lib/schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function Login() {
  const form = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  // function login(value: LoginType) {
  //   console.log(value);
  // }
  const { login } = useLogin();
  return (
    <div className="flex h-full w-full items-center justify-center min-[375px]:p-4">
      <Card className="w-full max-w-md border-gray-800 bg-gray-400/5 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-semibold text-gray-100">
            ログイン
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(login)}>
            <FieldGroup>
              <Controller
                name="username"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-gray-300">
                      ユーザー名
                    </FieldLabel>
                    <Input
                      {...field}
                      placeholder="ユーザー名を入力してください"
                      className="border-gray-700 bg-gray-900/50 text-white placeholder:text-gray-500"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-gray-300">
                      パスワード
                    </FieldLabel>
                    <Input
                      {...field}
                      type="password"
                      placeholder="パスワードを入力してください"
                      className="border-gray-700 bg-gray-900/50 text-white placeholder:text-gray-500"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <div className="mt-6 space-y-4">
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
              >
                {form.formState.isSubmitting ? (
                  <Loader2 className="h-6 w-6 animate-spin text-white" />
                ) : (
                  "ログイン"
                )}
              </Button>
              <p className="text-center text-sm text-gray-300">
                アカウントを持っていない方は
                <Link
                  to="/signup"
                  className="mx-1 inline-block text-yellow-500 hover:text-yellow-400 hover:underline"
                >
                  ユーザー登録へ
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
