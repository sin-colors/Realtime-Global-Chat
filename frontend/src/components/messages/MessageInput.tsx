import {
  messageInputSchema,
  type MessageInputType,
} from "@/lib/schema/massageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldLabel } from "../ui/field";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { BookImage, Loader2, Send } from "lucide-react";
import useSendMessage from "@/hooks/useSendMessage";
import { Input } from "../ui/input";
import { useEffect, useRef, useState } from "react";
import fileToBase64 from "@/utils/fileToBase64";
import type { SendMessageProps } from "@/lib/types";
import FilePreview from "./FilePreview";

function MessageInput() {
  const form = useForm<MessageInputType>({
    resolver: zodResolver(messageInputSchema),
    defaultValues: {
      text: "",
      images: null,
    },
  });
  const { mutate } = useSendMessage();
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  // input要素のvalueを操作（空文字にリセット）するためにinput要素の参照を保持
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const urlsRef = useRef<string[]>([]);
  const files = form.watch("images");
  useEffect(() => {
    return () => {
      urlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      // imageUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);
  async function sendMessage(values: MessageInputType) {
    if (!values.text.trim() && !values.images) return;
    let base64Images: string[] = [];
    if (values.images && values.images.length > 0) {
      base64Images = await Promise.all(
        Array.from(values.images).map((file) => fileToBase64(file)),
      );
    }
    const payload: SendMessageProps = {
      text: values.text,
      images: base64Images,
    };
    mutate(payload, {
      onSuccess: () => {
        form.reset(); // 送信失敗時にはメッセージをリセットしない。再入力がめんどくさいので。
      },
      onSettled: () => {
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        imageUrls.forEach((url) => URL.revokeObjectURL(url));
        setImageUrls([]);
      },
    });
  }
  function handleFilePreviewRemove(index: number) {
    // 削除対象となるURLを先に取得しておく
    const urlToRevoke = imageUrls[index];
    // Stateの更新
    setImageUrls((prevImageUrls) =>
      prevImageUrls.filter((_, idx) => idx !== index),
    );
    // React Hook Formの値を更新
    if (files) {
      const updateImageUrls = files.filter((_, idx) => idx !== index);
      // フォームのフィールドの更新
      form.setValue("images", updateImageUrls);
    }
    // inputの値をリセット（同じファイルを再度選択できるようにするため）
    if (fileInputRef.current) {
      // <input />のvalueを空（空文字）にする
      fileInputRef.current.value = "";
    }
    // メモリ解放（対象のURLだけを無効化する）
    if (urlToRevoke) {
      URL.revokeObjectURL(urlToRevoke);
      urlsRef.current = urlsRef.current.filter((u) => u !== urlToRevoke);
    }
  }

  return (
    <div className="bg-white/90 sm:bg-white/60">
      {imageUrls.length > 0 && (
        <FilePreview
          imageUrls={imageUrls}
          onRemove={handleFilePreviewRemove}
          disabled={form.formState.isSubmitting}
        />
      )}
      <form onSubmit={form.handleSubmit(sendMessage)} className="p-2">
        <div className="flex items-end gap-1.5">
          <div>
            <Controller
              name="images"
              control={form.control}
              render={({
                field: { onChange, onBlur, name, ref, disabled },
                fieldState,
              }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="file-input"
                    className="inset-y-0 inset-e-0 flex items-center rounded p-1.5"
                  >
                    <BookImage className="cursor-pointer" />
                  </FieldLabel>
                  <Input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        const newFiles = Array.from(e.target.files);
                        const newImageUrls = newFiles.map((file) =>
                          URL.createObjectURL(file),
                        );
                        setImageUrls((prevImageUrls) => [
                          ...prevImageUrls,
                          ...newImageUrls,
                        ]);
                        urlsRef.current = [...urlsRef.current, ...newImageUrls];
                        const currentFiles = form.getValues("images") || [];
                        onChange([...currentFiles, ...newFiles]);
                      } else {
                        setImageUrls([]);
                        onChange(null);
                      }
                    }}
                    ref={(instance) => {
                      ref(instance);
                      fileInputRef.current = instance;
                    }}
                    name={name}
                    onBlur={onBlur}
                    disabled={form.formState.isSubmitting || disabled}
                  />
                </Field>
              )}
            />
          </div>
          <div className="flex-1">
            <Controller
              name="text"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Textarea
                    {...field}
                    rows={1}
                    placeholder="メッセージを入力してください"
                    className="block h-auto max-h-20 min-h-0 w-full overflow-y-scroll rounded-lg border border-slate-400 bg-slate-100 text-sm text-slate-900"
                  />
                </Field>
              )}
            />
          </div>
          <Button
            type="submit"
            variant={"ghost"}
            disabled={form.formState.isSubmitting}
            className="inset-y-0 inset-e-0 flex cursor-pointer items-center px-3"
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="h-6 w-6 animate-spin text-slate-800" />
            ) : (
              <Send />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default MessageInput;
