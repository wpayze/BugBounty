"use client";
import React, { useContext } from "react";
import { ModalName, Project } from "@/shared/types";
import CreateEditProjectModal from "./modals/CreateEditProjectModal";
import { AdminPanelContext } from "@/context/AdminPanelContext.context";

interface Props {
  project: Project;
}

const EditProjectOption: React.FC<Props> = ({ project }) => {
  const { setShowModals, setEditFormData } = useContext(AdminPanelContext);
  const modalName: ModalName = "editProjectModal";

  const handleClick = () => {
    setEditFormData((prevState) => ({
      ...prevState,
      project: project,
    }));

    setShowModals((prevState) => ({
      ...prevState,
      [modalName]: true,
    }));
  };

  return (
    <>
      <a href="#" className="dropdown-item notify-item" onClick={handleClick}>
        Edit Project
      </a>
    </>
  );
};

export default EditProjectOption;
