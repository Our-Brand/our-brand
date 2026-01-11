import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

type FormStatus = "idle" | "success" | "error";

const ContactForm = () => {
  const { t } = useLanguage();

  const formRef = useRef<HTMLFormElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    setLoading(true);
    setStatus("idle");

    try {
      await emailjs.sendForm(
        "service_qr4h4zg", // service id
        "template_rqvi939", // template id
        formRef.current,
        "OvWoAO2xoLsj_3rp6" // public api key
      );

      setStatus("success");
      formRef.current.reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const showMessage = status === "success" || status === "error";

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-5"
      aria-busy={loading}
    >
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium">
          {t("contact.form.nameLabel")}
        </Label>
        <Input
          id="name"
          name="name"
          required
          autoComplete="name"
          placeholder={t("contact.form.namePlaceholder")}
          className="bg-background/40 border-border/60 focus-visible:ring-ring"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">
          {t("contact.form.emailLabel")}
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={t("contact.form.emailPlaceholder")}
          className="bg-background/40 border-border/60 focus-visible:ring-ring"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-sm font-medium">
          {t("contact.form.messageLabel")}
        </Label>
        <Textarea
          id="message"
          name="message"
          required
          placeholder={t("contact.form.messagePlaceholder")}
          className="min-h-[140px] bg-background/40 border-border/60 focus-visible:ring-ring"
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full text-white bg-background hover:bg-background/40"
      >
        {loading ? t("contact.form.sending") : t("contact.form.submit")}
      </Button>

      {showMessage && (
        <p
          role="status"
          aria-live="polite"
          className={[
            "text-sm leading-relaxed",
            status === "success" ? "text-primary" : "text-destructive",
          ].join(" ")}
        >
          {status === "success"
            ? t("contact.form.successMessage")
            : t("contact.form.errorMessage")}
        </p>
      )}
    </form>
  );
};

export default ContactForm;
