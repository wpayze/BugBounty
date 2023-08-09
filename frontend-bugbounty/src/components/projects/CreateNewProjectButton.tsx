"use client";
import React, { useContext, useState } from "react";
import CreateEditProjectModal from "./modals/CreateEditProjectModal";
import { ModalName } from "@/shared/types";
import { AdminPanelContext } from "@/context/AdminPanelContext.context";

const CreateNewProjectButton: React.FC = () => {
  const { setShowModals } = useContext(AdminPanelContext);
  const modalName: ModalName = "createProjectModal";

  const handleClick = () => {
    setShowModals((prevState) => ({
      ...prevState,
      [modalName]: true,
    }));
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-lg btn-primary waves-effect waves-light"
        onClick={handleClick}
      >
        <i className="feather-plus" /> Create New Project
      </button>
    </>
  );
};

export default CreateNewProjectButton;
