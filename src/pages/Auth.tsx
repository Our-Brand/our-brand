import { useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  type Transition,
  type Variants,
} from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.35, ease: EASE_OUT } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)", scale: 0.99 },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

const SWITCH: Transition = { duration: 0.28, ease: EASE_OUT };
const ROW: Transition = { duration: 0.22, ease: EASE_OUT };

type Mode = "login" | "signup";

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const isValidPassword = (value: string) => {
  if (value.length < 5) return false;
  const hasLower = /[a-z]/.test(value);
  const hasUpper = /[A-Z]/.test(value);
  const hasDigit = /\d/.test(value);
  const hasSpecial = /[^A-Za-z0-9]/.test(value);
  return hasLower && hasUpper && (hasDigit || hasSpecial);
};

const Auth = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [mode, setMode] = useState<Mode>("login");
  const isLogin = mode === "login";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>("");

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
  });

  const copy = useMemo(() => {
    return isLogin
      ? {
          title: t("auth.login.title"),
          subtitle: t("auth.login.subtitle"),
          cta: t("auth.login.cta"),
        }
      : {
          title: t("auth.signup.title"),
          subtitle: t("auth.signup.subtitle"),
          cta: t("auth.signup.cta"),
        };
  }, [isLogin, t]);

  const resetErrors = () => setError("");

  const validate = () => {
    if (!isLogin && !name.trim()) return t("auth.errors.nameRequired");
    if (!email.trim()) return t("auth.errors.emailRequired");
    if (!isValidEmail(email.trim())) return t("auth.errors.emailInvalid");
    if (!password) return t("auth.errors.passwordRequired");
    if (!isValidPassword(password)) return t("auth.errors.passwordWeak");
    return "";
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({ name: true, email: true, password: true });

    const msg = validate();
    if (msg) {
      setError(msg);
      return;
    }

    setError("");
    setSubmitting(true);

    try {
      // ============================================================
      // TODO: INSERT YOUR API REQUEST HERE
      //
      // Example expected result shape:
      // const result = await apiAuth({ mode, name, email, password });
      // const result = { user: { id: "123", name: "John" }, token: "..." };
      // ============================================================

      // Prototype fallback (remove once API is wired)
      const mockUser = {
        id: String(Date.now()),
        name: name.trim() || undefined,
        subscription: 1,
      };
      const mockToken = "prototype-token";

      login({ user: mockUser, token: mockToken });

      // No "go back where it came from" — always go here after auth:
      navigate("/projects", { replace: false });
    } catch (err) {
      console.error(err);
      setError(t("auth.errors.generic"));
    } finally {
      setSubmitting(false);
    }
  };

  const onSwitchMode = (next: Mode) => {
    if (mode === next) return;
    setMode(next);
    setError("");
    setTouched({ name: false, email: false, password: false });
    if (next === "login") setName("");
  };

  const nameError =
    !isLogin && touched.name && !name.trim()
      ? t("auth.errors.nameRequired")
      : "";
  const emailError = touched.email
    ? !email.trim()
      ? t("auth.errors.emailRequired")
      : !isValidEmail(email.trim())
        ? t("auth.errors.emailInvalid")
        : ""
    : "";
  const passwordError = touched.password
    ? !password
      ? t("auth.errors.passwordRequired")
      : !isValidPassword(password)
        ? t("auth.errors.passwordWeak")
        : ""
    : "";

  const showInlineError = nameError || emailError || passwordError;
  const bannerError = error || showInlineError;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="min-h-[100svh] px-6 py-16 flex items-center justify-center"
    >
      <motion.div
        variants={cardVariants}
        className="w-full max-w-md rounded-2xl border border-white/10 bg-card/80 p-6 md:p-7 shadow-[0_0_60px_hsl(var(--ring)/0.10)] "
      >
        {/* Header (crossfade) */}
        <div className="space-y-1 mb-5 text-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.h1
              key={`title-${mode}`}
              initial={{ opacity: 0, y: 6, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -6, filter: "blur(6px)" }}
              transition={SWITCH}
              className="text-base font-semibold text-white/95"
            >
              {copy.title}
            </motion.h1>
          </AnimatePresence>

          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={`sub-${mode}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={SWITCH}
              className="text-[11px] text-white/65"
            >
              {copy.subtitle}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-5">
          <div className="relative inline-flex w-full items-center gap-1 rounded-full bg-white/5 border border-white/10 p-1 backdrop-blur-xl">
            <motion.div
              className="absolute top-1 bottom-1 rounded-full bg-white shadow-sm"
              style={{ width: "calc(50% - 4px)" }}
              animate={{ x: isLogin ? 0 : "100%" }}
              transition={{ type: "spring", stiffness: 420, damping: 34 }}
            />

            <button
              type="button"
              onClick={() => onSwitchMode("login")}
              className={`relative z-10 w-1/2 cursor-pointer px-3 py-1.5 rounded-full text-[11px] font-medium transition text-center ${
                isLogin ? "text-black" : "text-white/70 hover:bg-white/10"
              }`}
              aria-pressed={isLogin}
              disabled={submitting}
            >
              {t("auth.tabs.login")}
            </button>

            <button
              type="button"
              onClick={() => onSwitchMode("signup")}
              className={`relative z-10 w-1/2 cursor-pointer px-3 py-1.5 rounded-full text-[11px] font-medium transition text-center ${
                !isLogin ? "text-black" : "text-white/70 hover:bg-white/10"
              }`}
              aria-pressed={!isLogin}
              disabled={submitting}
            >
              {t("auth.tabs.signup")}
            </button>
          </div>
        </div>

        {/* Form */}
        <form className="space-y-3" onSubmit={onSubmit}>
          {/* Error banner */}
          <AnimatePresence initial={false}>
            {bannerError ? (
              <motion.div
                key="auth-error"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={ROW}
                className="text-[11px] text-white/90 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2"
              >
                {bannerError}
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* Name field (animates in/out) */}
          <AnimatePresence initial={false}>
            {!isLogin && (
              <motion.div
                key="name-field"
                initial={{ opacity: 0, height: 0, y: -6 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -6 }}
                transition={ROW}
                className="space-y-1 overflow-hidden"
              >
                <label className="text-[11px] font-medium text-white/65">
                  {t("auth.fields.name.label")}
                </label>
                <input
                  type="text"
                  className="
                    w-full rounded-lg
                    border border-white/10
                    bg-black/10
                    px-3 py-2.5
                    text-xs text-white/90
                    placeholder:text-white/40
                    outline-none
                    focus:border-white/20
                    focus:ring-1 focus:ring-primary/60
                  "
                  placeholder={t("auth.fields.name.placeholder")}
                  autoComplete="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    resetErrors();
                  }}
                  onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
                  disabled={submitting}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-1">
            <label className="text-[11px] font-medium text-white/65">
              {t("auth.fields.email.label")}
            </label>
            <input
              type="email"
              className="
                w-full rounded-lg
                border border-white/10
                bg-black/10
                px-3 py-2.5
                text-xs text-white/90
                placeholder:text-white/40
                outline-none
                focus:border-white/20
                focus:ring-1 focus:ring-primary/60
              "
              placeholder={t("auth.fields.email.placeholder")}
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                resetErrors();
              }}
              onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
              disabled={submitting}
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-medium text-white/65">
              {t("auth.fields.password.label")}
            </label>
            <input
              type="password"
              className="
                w-full rounded-lg
                border border-white/10
                bg-black/10
                px-3 py-2.5
                text-xs text-white/90
                placeholder:text-white/40
                outline-none
                focus:border-white/20
                focus:ring-1 focus:ring-primary/60
              "
              placeholder={t("auth.fields.password.placeholder")}
              autoComplete={isLogin ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                resetErrors();
              }}
              onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
              disabled={submitting}
            />
          </div>

          {/* CTA (crossfade) */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.button
              key={`cta-${mode}`}
              type="submit"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={SWITCH}
              disabled={submitting}
              className="
                w-full inline-flex items-center justify-center
                h-10 px-6 rounded-full
                text-base font-semibold
                text-foreground
                bg-white/5
                border border-white/15
                backdrop-blur
                transition-all duration-200 ease-out
                hover:bg-white/10
                hover:-translate-y-[1px]
                hover:shadow-lg
                active:translate-y-0
                whitespace-nowrap
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {submitting ? t("auth.submitting") : copy.cta}
            </motion.button>
          </AnimatePresence>

          <p className="text-[10px] text-white/55 leading-relaxed text-center">
            {t("auth.disclaimer")}
          </p>

          <div className="pt-1 flex items-center justify-center gap-4">
            <a
              href="/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-white/60 hover:text-white/85 transition-colors"
            >
              {t("auth.links.privacy")}
            </a>
            <a
              href="/terms-and-conditions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-white/60 hover:text-white/85 transition-colors"
            >
              {t("auth.links.terms")}
            </a>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Auth;
