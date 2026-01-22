import { useMemo, useState } from "react";
import { Copy, Check } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

type HistoryItem = {
  id: string;
  prompt: string;
  created_at?: string | number | Date;
};

const ProjectSidebar = () => {
  const { t } = useLanguage();

  const [prompt, setPrompt] = useState<string>("");
  const [loading] = useState<boolean>(false);
  const [error] = useState<string>("");
  const [promptHistory] = useState<HistoryItem[]>([]);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const items = useMemo(() => {
    return promptHistory.length > 0 ? promptHistory : [];
  }, [promptHistory]);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      window.setTimeout(() => setCopiedText(null), 1200);
    } catch (error) {
      console.error("error", error);
    }
  };

  const onGenerate = async () => {
    if (!prompt.trim()) return;

    // TODO: INSERT YOUR GENERATE API REQUEST HERE
    // Example:
    // setLoading(true)
    // const res = await fetch(...)
    // setPromptHistory(...)
    // setLoading(false)
  };

  return (
    <aside
      className="relative h-screen max-h-screen w-full border-r border-border overflow-hidden"
      style={{ background: "var(--gradient-brand-subtle)" }}
    >
      <div className="flex flex-col h-full px-4 pt-3 pb-0 bg-card/10">
        {/* History */}
        <div className="mt-3 flex-1 min-h-0 overflow-hidden">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              {t("builder.sidebar.history.title")}
            </span>
          </div>

          <div className="h-full overflow-y-auto pr-1 pb-40">
            <ul className="space-y-2.5">
              {items.map((item) => (
                <li key={item.id}>
                  <div className="flex justify-end">
                    <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-primary text-primary-foreground text-[11px] px-3 py-2 shadow-lg whitespace-pre-wrap break-words text-left">
                      {item.prompt}
                    </div>
                  </div>

                  {item.created_at ? (
                    <div className="mt-1 flex justify-end pr-1">
                      <span
                        className="
                          group inline-flex items-center gap-1
                          text-[9px] text-muted-foreground
                          hover:text-foreground/80
                          cursor-default
                        "
                      >
                        {new Date(item.created_at).toLocaleString()}

                        <button
                          type="button"
                          onClick={() => handleCopy(item.prompt)}
                          className="
                            opacity-0 group-hover:opacity-100
                            transition-opacity
                            cursor-pointer
                            text-muted-foreground hover:text-foreground
                          "
                          aria-label={t("builder.sidebar.history.copy")}
                          title={t("builder.sidebar.history.copy")}
                        >
                          {copiedText === item.prompt ? (
                            <Check size={12} />
                          ) : (
                            <Copy size={12} />
                          )}
                        </button>
                      </span>
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom composer */}
      <div className="absolute inset-x-0 bottom-0 border-t border-border bg-card/95 backdrop-blur-xl px-4 py-3 space-y-2">
        <div className="rounded-2xl border border-border bg-card/80 shadow-inner">
          <textarea
            className="w-full max-h-24 min-h-[56px] resize-none bg-transparent p-3 text-xs outline-none"
            placeholder={t("builder.sidebar.composer.placeholder")}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>

        {error ? (
          <div className="text-[11px] text-destructive-foreground bg-card/10 border border-card/40 rounded-lg px-3 py-1.5">
            {error}
          </div>
        ) : null}

        <button
          type="button"
          onClick={onGenerate}
          disabled={loading || !prompt.trim()}
          className="cursor-pointer w-full inline-flex items-center justify-center rounded-xl bg-primary hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg transition-transform duration-150 hover:-translate-y-[1px] active:translate-y-[0px]"
          style={{ boxShadow: "var(--shadow-glow)" }}
        >
          {loading
            ? t("builder.sidebar.cta.loading")
            : t("builder.sidebar.cta.generate")}
        </button>
      </div>
    </aside>
  );
};

export default ProjectSidebar;
