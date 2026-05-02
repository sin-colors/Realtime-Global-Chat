import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useSignup from "@/hooks/useSignup";
import { registerSchema, type RegisterType } from "@/lib/schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function Signup() {
  const form = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      gender: undefined,
    },
  });

  const { signup } = useSignup();

  return (
    <div className="flex h-full w-full items-center justify-center min-[375px]:p-4">
      <Card className="w-full max-w-md border-gray-800 bg-gray-400/5 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-semibold text-gray-100">
            ユーザーの登録
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(signup)}>
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
              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-gray-300">
                      パスワードの確認
                    </FieldLabel>
                    <Input
                      {...field}
                      type="password"
                      placeholder="パスワードを再度入力してください"
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
                name="gender"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-gray-300">性別</FieldLabel>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="male"
                          id="male"
                          className="border-gray-500 data-[state=checked]:bg-blue-600"
                        />
                        <Label
                          htmlFor="male"
                          className="font-normal text-gray-300"
                        >
                          男
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="female"
                          id="female"
                          className="border-gray-500 data-[state=checked]:bg-blue-600"
                        />
                        <Label
                          htmlFor="female"
                          className="font-normal text-gray-300"
                        >
                          女
                        </Label>
                      </div>
                    </RadioGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="company"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-gray-300">
                      カンパニー名
                    </FieldLabel>
                    <Input
                      {...field}
                      placeholder="カンパニー名を入力してください"
                      className="border-gray-700 bg-gray-900/50 text-white placeholder:text-gray-500"
                      aria-invalid={fieldState.invalid}
                    />
                    <FieldDescription className="text-info text-xs">
                      カンパニー名に記号は含めないでください
                    </FieldDescription>
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
                  "登録"
                )}
              </Button>
              <p className="text-center text-sm text-gray-300">
                アカウントを持っている方は
                <Link
                  to="/login"
                  className="mx-1 inline-block text-yellow-500 hover:text-yellow-400 hover:underline"
                >
                  ログインへ
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Signup;
