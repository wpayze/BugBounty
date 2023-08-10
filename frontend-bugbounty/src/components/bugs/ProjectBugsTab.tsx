"use client";
import { Bug, Project, User } from "@/shared/types";
import React, { useState } from "react";
import CreateBugButton from "./CreateBugButton";
import BugsGrid from "./BugsGrid";

interface ProjectBugsTabProps {
  project: Project;
  users: User[];
  bugs: Bug[];
}

const ProjectBugsTab: React.FC<ProjectBugsTabProps> = ({
  project,
  users,
  bugs,
}) => {
  const [isBugsGridVisible, setIsBugsGridVisible] = useState(true);

  const toggleBugsGridVisibility = () => {
    setIsBugsGridVisible(!isBugsGridVisible);
  };

  return (
    <>
      <div
        className={`row bg-light py-2 project-tab ${
          isBugsGridVisible ? "active" : ""
        }`}
        onClick={toggleBugsGridVisibility}
      >
        <div className="col-md-12">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="m-0">
              <i
                className={`feather-chevrons-${
                  isBugsGridVisible ? "up" : "down"
                }`}
              />{" "}
              {project.name}
            </h4>
            <CreateBugButton project={project} users={users} />
          </div>
        </div>
      </div>
      {isBugsGridVisible && <BugsGrid bugs={bugs} />}
    </>
  );
};

export default ProjectBugsTab;
