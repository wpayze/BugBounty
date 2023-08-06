"use client";
import Link from "next/link";
import React, { useState } from "react";
import EditUserButton from "../users/EditUserButton";
import EditProjectOption from "./EditProjectOption";
import { Project } from "@/shared/types";

interface ProjectDropdownProps {
  project: Project;
}

const ProjectDropdown: React.FC<ProjectDropdownProps> = ({ project }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="dropdown">
      <button
        type="button"
        className="btn btn-light"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        onClick={toggleDropdown}
        style={{
          position: "absolute",
          top: "5px",
          right: "5px",
          zIndex: 10,
        }}
      >
        <i className="feather-menu" />
      </button>
      <div className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
        <Link href={`projects/${project._id}`} className="dropdown-item notify-item">
          View Project
        </Link>
        <EditProjectOption project={project} />
        <Link href={`bugs/${project._id}`} className="dropdown-item notify-item">
          View Bugs
        </Link>
      </div>
    </div>
  );
};

export default ProjectDropdown;
