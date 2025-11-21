import { useLanguage } from "@/hooks/use-language";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-muted/20 border-t border-border py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground">
            &copy; {new Date().getUTCFullYear()} Our Brand. {t("footer.rights")}
          </p>
          <div className="flex gap-6">
            <a
              href="/privacy-policy"
              className="text-muted-foreground hover:text-primary transition-colors"
              target="_blank"
            >
              {t("footer.privacy")}
            </a>
            <a
              href="/terms-and-conditions"
              className="text-muted-foreground hover:text-primary transition-colors"
              target="_blank"
            >
              {t("footer.terms")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
