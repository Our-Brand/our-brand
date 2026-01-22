import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useAuth } from "@/hooks/useAuth";

type Params = {
  id?: string;
};

const ProjectPane = () => {
  const { t } = useLanguage();
  const { user, logout } = useAuth();

  const { id } = useParams<Params>();
  const navigate = useNavigate();

  // keep this local for now (no props)
  const currentProjectId = id ?? "";

  const displayName = useMemo(() => {
    const name = user?.name?.trim();
    if (name) return name;
    if (user?.id) return `#${String(user.id).slice(-6)}`;
    return "";
  }, [user]);

  const handleBack = () => {
    navigate("/projects", { replace: false });
  };

  const handleLogout = async () => {
    // TODO: INSERT LOGOUT API REQUEST HERE
    // await fetch("/api/logout", { method: "POST" });

    logout();
    navigate("/home", { replace: false });
  };

  // You can wire this from your fetch later
  const [previewHtml] = useState<string>("");

  return (
    <main className="h-screen max-h-screen flex flex-col px-5 pt-4 pb-4 overflow-hidden bg-card/10 text-foreground">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleBack}
            className="cursor-pointer inline-flex items-center gap-1.5 rounded-full border border-border bg-card/10 px-3 py-1.5 text-[11px] text-foreground hover:bg-card transition"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>{t("project.pane.backToProjects")}</span>
          </button>

          {currentProjectId ? (
            <span className="text-[11px] text-muted-foreground">
              {t("project.pane.projectLabel")}{" "}
              <span className="font-mono text-foreground">
                #{currentProjectId}
              </span>
            </span>
          ) : null}
        </div>

        {/* User pill */}
        <div className="inline-flex items-center gap-3 rounded-full border border-border/80 bg-card/80 px-3 py-1.5 text-[11px]">
          <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary)_/_0.8)]" />
          <span className="text-foreground whitespace-nowrap">
            {displayName || t("project.pane.userFallback")}
          </span>

          <button
            type="button"
            onClick={handleLogout}
            className="cursor-pointer ml-1 rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground hover:bg-muted/80 hover:text-foreground transition"
          >
            {t("nav.logout")}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1">
        <div className="w-full h-full rounded-2xl border border-border  overflow-hidden flex">
          <iframe
            title="Generated page"
            className="w-full h-full border-0"
            srcDoc={previewHtml}
          />
        </div>
      </div>
    </main>
  );
};

export default ProjectPane;
