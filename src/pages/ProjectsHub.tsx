import { useMemo, useState } from "react";
import { Trash2 } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useNavigate } from "react-router-dom";

type Project = { id: string; name: string };

const ProjectsHub = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Local state (no props)
  const [userName] = useState<string>(""); // optionally set after auth
  const [userId] = useState<string>("");

  const [projects, setProjects] = useState<Project[]>([]);
  const [hubPrompt, setHubPrompt] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const hasReachedLimitProjects = useMemo(
    () => projects.length >= 5,
    [projects],
  );

  const onLogout = () => {
    // plug your logic here
    setError("");
    setHubPrompt("");
    setProjects([]);
  };

  const onStartProject = async () => {
    setError("");

    if (!hubPrompt.trim()) return;
    if (hasReachedLimitProjects) {
      setError(t("hub.start.limitReached"));
      return;
    }

    setLoading(true);
    try {
      // plug your real API call here
      const id = String(Date.now());
      const name =
        hubPrompt.trim().slice(0, 42) +
        (hubPrompt.trim().length > 42 ? "…" : "");

      setProjects((prev) => [{ id, name }, ...prev]);
      setHubPrompt("");
    } catch {
      setError(t("hub.start.genericError"));
    } finally {
      setLoading(false);
    }
  };

  const onOpenProject = (projectId: string) => {
    // plug your navigation logic here
    navigate(`/project/${projectId}`, { replace: false });
  };

  const onDeleteProject = (projectId: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
  };

  return (
    <div className="min-h-[100svh] w-full text-foreground flex flex-col">
      {/* Main content */}
      <main className="flex-1 flex flex-col items-center px-6 pb-10 overflow-hidden pt-[140px]">
        <div className="w-full max-w-5xl">
          {/* Start a project */}
          <section className="rounded-3xl border border-white/10 bg-card/80 px-6 py-5 space-y-3 shadow-[0_0_60px_hsl(var(--ring)/0.10)] ">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h1 className="text-sm font-semibold text-white/95">
                  {t("hub.start.title")}
                </h1>
                <p className="text-[11px] text-white/65">
                  {t("hub.start.subtitle")}
                </p>
              </div>

              <span className="text-[10px] text-white/55 hidden sm:inline-flex">
                {t("hub.start.limitHint")}
              </span>
            </div>

            <div className="mt-1 flex flex-col sm:flex-row gap-3">
              <div className="flex-1 rounded-2xl border border-white/10 bg-black/10 shadow-inner">
                <textarea
                  className="w-full max-h-24 min-h-[52px] resize-none overflow-y-auto bg-transparent px-3 py-2.5 text-xs text-white/90 outline-none placeholder:text-white/40"
                  placeholder={t("hub.start.placeholder")}
                  value={hubPrompt}
                  onChange={(e) => setHubPrompt(e.target.value)}
                />
              </div>

              <button
                onClick={onStartProject}
                disabled={
                  loading || !hubPrompt.trim() || hasReachedLimitProjects
                }
                className="cursor-pointer w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-primary hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg transition-transform duration-150 hover:-translate-y-[1px] active:translate-y-[0px]"
              >
                {loading && hubPrompt.trim()
                  ? t("hub.start.creating")
                  : t("hub.start.cta")}
              </button>
            </div>

            {error && (
              <div className="text-[11px] text-white/90 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-1.5">
                {error}
              </div>
            )}
          </section>
        </div>

        {/* Projects grid */}
        <section className="mt-10 w-full max-w-5xl flex-1 flex flex-col min-h-0">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="space-y-1">
              <h2 className="text-xs font-semibold text-white/90 tracking-[0.16em] uppercase">
                {t("hub.projects.title")}
              </h2>
              <p className="text-[11px] text-white/65">
                {t("hub.projects.subtitle")}
              </p>
            </div>
          </div>

          <div className="flex-1 min-h-0 rounded-3xl border border-white/10 bg-card/80 px-4 py-4 overflow-y-auto shadow-[0_0_60px_hsl(var(--ring)/0.10)] max-h-[46vh] md:max-h-[52vh]">
            {projects.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => onOpenProject(project.id)}
                    className="cursor-pointer group text-left rounded-2xl border border-white/10 bg-black/10 px-4 py-3 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-150 flex flex-col gap-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[13px] font-semibold text-white/95 line-clamp-2">
                          {project.name}
                        </h3>
                        <span className="text-[10px] text-white/55 font-mono">
                          #{project.id}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteProject(project.id);
                        }}
                        className="flex items-center gap-1 cursor-pointer text-[10px] px-2 py-0.5 rounded-full text-white/55 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                        aria-label={t("hub.projects.delete")}
                        title={t("hub.projects.delete")}
                      >
                        <Trash2 size={16} strokeWidth={1.5} />
                      </button>
                    </div>

                    <p className="text-[11px] text-white/65 line-clamp-3">
                      {t("hub.projects.cardHint")}
                    </p>

                    <span className="mt-1 inline-flex items-center text-[11px] text-accent group-hover:text-accent-foreground/90">
                      {t("hub.projects.open")}
                      <span className="ml-1 h-[1px] w-4 bg-accent/80 group-hover:w-6 transition-all duration-150" />
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full w-full flex items-center justify-center text-center px-4 pt-6">
                <p className="text-[11px] text-white/65 h-full w-full">
                  {t("hub.projects.empty")}
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProjectsHub;
