"use client";
import { useForm } from "@tanstack/react-form";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Lock, Loader2 } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
// ...existing code...
import { getCurrentSession } from "@/hooks/useCurrentSession";
import { auth } from "@/lib/auth";
import { use2faStore } from "./store";
// shadcn ui dialog
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"; // adjust path if needed

const verifyOTPSchema = z.object({
  otp: z.string().min(6).max(6),
});

type VerifyOTPSchema = z.infer<typeof verifyOTPSchema>;

function Verify2FaCode() {
  // ...existing code...
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    use2faStore.getState().setState({ verificationNeeded: false });
    setOpen(false);
  };

  const form = useForm({
    defaultValues: {
      otp: "",
    } as VerifyOTPSchema,
    validators: {
      onSubmit: verifyOTPSchema,
    },
    async onSubmit({ value }) {
      try {
        const { error } = await auth.twoFactor.verifyTotp({
          code: value.otp,
        });
        if (error) {
          toast.error(error?.message ?? "");
          return;
        }
        form.reset();
        handleClose();
        await getCurrentSession({ networkMode: "online" });
        use2faStore.getState().fireVerificationComplete();
      } catch (error: any) {
        toast.error(error?.message ?? "Something went wrong...");
      }
    },
  });

  useEffect(() => {
    const unsubscribe = use2faStore.subscribe(
      (store) => store.state.verificationNeeded,
      (verificationNeeded) => {
        setOpen(Boolean(verificationNeeded));
      }
    );
    return () => {
      unsubscribe?.();
    };
  }, []);

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) handleClose();
        else setOpen(true);
      }}
    >
      <DialogContent className="max-w-[22rem] overflow-hidden rounded-2xl">
        <DialogHeader className="items-center">
          <Lock size={50} className="mb-2 text-primary" />
          <DialogTitle className="text-xl text-center">
            Two Factor Authentication:
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(evt) => {
            evt.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-4 my-2"
        >
          <form.Field name="otp">
            {({ state, handleChange }) => (
              <div className="space-y-2">
                <span className="text-sm opacity-70">
                  Enter your 6 digit code:
                </span>
                <InputOTP
                  id="2fa-otp"
                  maxLength={6}
                  value={state.value}
                  onChange={(val) => handleChange(val)}
                  aria-invalid={state.meta.errors.length > 0}
                  autoFocus
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                {state.meta.errors.length > 0 ? (
                  <p className="text-sm text-destructive">
                    {state.meta.errors.map((e) => e?.message).join(", ")}
                  </p>
                ) : null}
              </div>
            )}
          </form.Field>
          <form.Subscribe
            selector={(state) => ({
              canSubmit: state.canSubmit,
              isSubmitting: state.isSubmitting,
              isDirty: state.isDirty,
            })}
          >
            {({ canSubmit, isSubmitting, isDirty }) => (
              <Button
                size="sm"
                type="submit"
                className="py-2 rounded-xl w-full"
                disabled={!canSubmit || !isDirty || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>Verify</>
                )}
              </Button>
            )}
          </form.Subscribe>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default Verify2FaCode;
