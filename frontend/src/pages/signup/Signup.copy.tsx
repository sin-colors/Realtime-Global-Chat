import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form"; // Controllerを追加
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label"; // Labelを直接利用
import {
  Field,
  FieldControl,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"; // 新しいFieldコンポーネント
import PasswordInput from "@/components/PasswordInput";
import { registerSchema, type RegisterType } from "@/lib/schema/authSchema";
import useSignup from "@/hooks/useSignup";
import { Loader2 } from "lucide-react";

function Signup() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      userName: "",
      password: "",
      confirmPassword: "",
      gender: undefined,
    },
  });

  const { signup } = useSignup();

  return (
    <div className="flex min-h-screen min-w-96 items-center justify-center p-4">
      <Card className="w-full max-w-md border-gray-800 bg-gray-400/5 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-semibold text-gray-100">
            ユーザー作成
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Formコンポーネントでラップせず、標準のformを使用 */}
          <form onSubmit={handleSubmit(signup)} className="space-y-4">
            {/* 1. ユーザー名 (Input) */}
            <Field>
              <FieldLabel className="text-gray-300">ユーザー名</FieldLabel>
              <FieldControl>
                <Input
                  placeholder="ユーザー名を入力してください"
                  className="border-gray-700 bg-gray-900/50 text-white placeholder:text-gray-500"
                  {...register("userName")} // registerを直接使う
                />
              </FieldControl>
              <FieldError>{errors.userName?.message}</FieldError>
            </Field>

            {/* 2. パスワード (PasswordInput) */}
            <Field>
              <FieldLabel className="text-gray-300">パスワード</FieldLabel>
              <FieldControl>
                <PasswordInput
                  placeholder="パスワードを入力してください"
                  className="border-gray-700 bg-gray-900/50 text-white placeholder:text-gray-500"
                  {...register("password")}
                />
              </FieldControl>
              <FieldError>{errors.password?.message}</FieldError>
            </Field>

            {/* 3. パスワード確認 */}
            <Field>
              <FieldLabel className="text-gray-300">
                パスワードの確認
              </FieldLabel>
              <FieldControl>
                <PasswordInput
                  placeholder="パスワードを再度入力してください"
                  className="border-gray-700 bg-gray-900/50 text-white placeholder:text-gray-500"
                  {...register("confirmPassword")}
                />
              </FieldControl>
              <FieldError>{errors.confirmPassword?.message}</FieldError>
            </Field>

            {/* 4. 性別 (RadioGroup) - 外部ライブラリコンポーネントはControllerを使用 */}
            <Field>
              <Controller
                control={control}
                name="gender"
                render={({ field }) => (
                  <FieldControl>
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
                  </FieldControl>
                )}
              />
              <FieldError>{errors.gender?.message}</FieldError>
            </Field>

            <p className="text-sm text-gray-300">
              アカウントを持っている方は
              <Link
                to="/login"
                className="mx-1 inline-block text-yellow-500 hover:text-yellow-400 hover:underline"
              >
                ログインへ
              </Link>
              へ
            </p>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white hover:bg-blue-700"
            >
              {isSubmitting ? (
                <Loader2 className="h-6 w-6 animate-spin text-white" />
              ) : (
                "登録"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Signup;
