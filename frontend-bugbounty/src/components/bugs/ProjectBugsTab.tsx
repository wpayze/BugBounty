"use client";
import { Bug, Project, User } from "@/shared/types";
import React, { useState } from "react";
import CreateBugButton from "./CreateBugButton";
import BugsGrid from "./BugsGrid";
import Link from "next/link";
import { GetBugsResponse } from "@/shared/responseTypes";

interface ProjectBugsTabProps {
  project: GetBugsResponse;
  users: User[];
  bugs: Bug[];
}

const ProjectBugsTab: React.FC<ProjectBugsTabProps> = ({
  project,
  users,
  bugs,
}) => {
  const [isBugsGridVisible, setIsBugsGridVisible] = useState(false);

  const toggleBugsGridVisibility = () => {
    setIsBugsGridVisible((prev) => !prev);
  };

  return (
    <>
      <div className="card mb-0">
        <div
          className="bug-collapse card-header d-flex justify-content-between align-items-center pt-2 pb-2 text-dark"
          onClick={toggleBugsGridVisibility}
        >
          <div>
            <h5 className="m-0 font-size-15">
              <i
                className={`feather-chevrons-${
                  isBugsGridVisible ? "up" : "down"
                }`}
              />{" "}
              {project.name}{" "}
              <span className="badge badge-soft-secondary">
                {bugs.length} <i className="fas fa-bug"></i>
              </span>
            </h5>
          </div>
          <div>
            <div className="btn-group">
              <Link
                href={`/projects/${project._id}`}
                className="btn btn-secondary"
              >
                View Project
              </Link>
              <CreateBugButton project={project} users={users} />
            </div>
          </div>
        </div>
        <div
          className={`collapse ${isBugsGridVisible ? "show" : ""}`}
          style={{}}
        >
          <div className="card-body">
            <BugsGrid bugs={bugs} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectBugsTab;
