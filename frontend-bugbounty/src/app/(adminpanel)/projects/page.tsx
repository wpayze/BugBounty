import React from "react";
import PageTitle from "../PageTitle";
import { Project } from "@/shared/types";
import { initProjectService } from "@/helpers/initServices";
import Image from "next/image";
import "./projectStyles.css";
import CreateNewProjectButton from "@/components/projects/CreateNewProjectButton";
import ProjectDropdown from "@/components/projects/ProjectDropdown";

const Projects: React.FC = async () => {
  let projects: Project[] = [];
  const api_url = `${process.env.API_URL}/public`;

  try {
    const ps = initProjectService();
    projects = await ps.getAll();
  } catch (error) {
    console.error(error);
    return <p>Error fetching projects.</p>;
  }

  return (
    <>
      <PageTitle title="Projects" />

      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <h4 className="card-title">Projects Dashboard</h4>
              <p className="card-subtitle mb-4">
                Explore and manage all your ongoing projects at a glance. Click
                on any project to view more details or make edits. This is your
                one-stop hub for all project-related information.
              </p>
            </div>
            <div className="col-md-6">
              <div className="d-flex justify-content-end">
                <CreateNewProjectButton />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {projects.map((project) => (
          <div key={project._id} className="col-md-6 col-xl-3">
            <div className="card">
              <div
                style={{
                  backgroundImage: `url(${
                    project.coverImage
                      ? `${api_url}/${project.coverImage}`
                      : "/login.png"
                  })`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "100%",
                  height: "150px",
                  position: "relative",
                }}
              >
                <ProjectDropdown project={project} />
              </div>
              <div className="card-body">
                <h5 className="card-title">{project.name}</h5>
                <p className="card-text">{project.description}</p>
                <p className="card-text">
                  <small className="text-muted">
                    Created by{" "}
                    {typeof project.creator === "string"
                      ? project.creator
                      : project.creator.name}
                  </small>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Projects;
