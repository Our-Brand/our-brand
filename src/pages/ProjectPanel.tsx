import ProjectPane from "@/components/ProjectPane";
import ProjectSidebar from "@/components/ProjectSidebar";

const ProjectPanel = () => {
  return (
    <div className="h-screen w-screen text-foreground ">
      <div className="h-full w-full grid grid-cols-[320px_1fr]">
        <ProjectSidebar />
        <ProjectPane />
      </div>
    </div>
  );
};

export default ProjectPanel;
