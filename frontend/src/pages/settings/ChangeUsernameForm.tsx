import PasswordInput from "@/components/PasswordInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuthContext } from "@/context/AuthContext";
import useChangeUsername from "@/hooks/useChangeUsername";
import {
  changeUsernameSchema,
  type ChangeUsernameType,
} from "@/lib/schema/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

function ChangeUsernameForm() {
  const { authUser } = useAuthContext();
  // const queryClient = useQueryClient();
  const form = useForm<ChangeUsernameType>({
    resolver: zodResolver(changeUsernameSchema),
    defaultValues: {
      currentUsername: "",
      newUsername: "",
      password: "",
    },
  });
  const { mutate: changeUsername, isPending } = useChangeUsername();
  function onSubmit(value: ChangeUsernameType) {
    changeUsername(value, {
      onSettled: () => {
        form.reset({ newUsername: "", password: "" });
      },
    });
  }
  return (
    <div className="flex min-h-screen min-w-96 items-center justify-center p-4">
      <Card className="w-full max-w-md border-gray-800 bg-gray-400/5 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-semibold text-gray-100">
            ユーザー名の変更
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-8 text-white">
            新しいユーザー名と現在のパスワードを入力してください
          </p>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col justify-center gap-4">
              <Controller
                name="currentUsername"
                control={form.control}
                render={({ field: { value, ...otherField }, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-gray-300">
                      現在のユーザー名
                    </FieldLabel>
                    <Input
                      placeholder="現在のユーザー名を入力してください"
                      value={authUser?.username}
                      className="border-gray-700 bg-gray-900/50 text-white placeholder:text-gray-500"
                      {...otherField}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="newUsername"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-gray-300">
                      新しいユーザー名
                    </FieldLabel>
                    <Input
                      placeholder="山田太郎"
                      className="border-gray-700 bg-gray-900/50 text-white placeholder:text-gray-500"
                      {...field}
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
                    <PasswordInput
                      placeholder="パスワードを入力してください"
                      className="border-gray-700 bg-gray-900/50 text-white placeholder:text-gray-500"
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Button
                type="submit"
                className="mt-2 w-full bg-blue-600 text-white hover:bg-blue-700"
              >
                {isPending ? (
                  <Loader2 className="h-6 w-6 animate-spin text-white" />
                ) : (
                  "登録"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default ChangeUsernameForm;
