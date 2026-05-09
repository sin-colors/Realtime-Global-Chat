import {
  messageInputSchema,
  type MessageInputType,
} from "@/lib/schema/massageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldGroup } from "../ui/field";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Loader2, Send } from "lucide-react";

function MessageInput() {
  const form = useForm<MessageInputType>({
    resolver: zodResolver(messageInputSchema),
    defaultValues: {
      text: "",
    },
  });
  function sendMessage(values: MessageInputType) {
    console.log(values);
  }
  return (
    <div className="bg-white/90 sm:bg-white/60">
      <form onSubmit={form.handleSubmit(sendMessage)} className="p-2">
        <div className="flex items-center gap-1.5">
          <FieldGroup>
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
          </FieldGroup>
          <Button
            type="submit"
            variant={"ghost"}
            disabled={form.formState.isSubmitting}
            className="inset-y-0 inset-e-0 flex cursor-pointer items-center px-3"
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="h-6 w-6 animate-spin text-white" />
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
