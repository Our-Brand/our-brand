import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/state/LanguageProvider";

const ContactForm = () =>  {
  const { t } = useLanguage();
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

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

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">

      <div>
        <Label htmlFor="name">{t("contact.form.nameLabel")}</Label>
        <Input
          id="name"
          name="name"
          required
          placeholder={t("contact.form.namePlaceholder")}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="email">{t("contact.form.emailLabel")}</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          placeholder={t("contact.form.emailPlaceholder")}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="message">{t("contact.form.messageLabel")}</Label>
        <Textarea
          id="message"
          name="message"
          required
          placeholder={t("contact.form.messagePlaceholder")}
          className="mt-1 min-h-[120px]"
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-brand text-primary-foreground hover:opacity-90"
      >
        {loading ? t("contact.form.sending") : t("contact.form.submit")}
      </Button>

      {status === "success" && (
        <p className="text-green-600 text-sm">
          {t("contact.form.successMessage")}
        </p>
      )}

      {status === "error" && (
        <p className="text-red-600 text-sm">
          {t("contact.form.errorMessage")}
        </p>
      )}
    </form>
  );
}

export default ContactForm;