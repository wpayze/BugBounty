"use client";
import React, { useState } from "react";
import { Project } from "@/shared/types";
import CreateEditProjectModal from "./modals/CreateEditProjectModal";

interface Props {
  project: Project;
}

const EditProjectOption: React.FC<Props> = ({ project }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <a href="#" className="dropdown-item notify-item" onClick={handleClick}>
        Edit Project
      </a>

      <CreateEditProjectModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleCloseModal={handleCloseModal}
        modalType="update"
        project={project}
      />
    </>
  );
};

export default EditProjectOption;
