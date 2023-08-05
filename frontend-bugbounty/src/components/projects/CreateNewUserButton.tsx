"use client";
import React, { useState } from "react";
import CreateEditProjectModal from "./modals/CreateEditProjectModal";

const CreateNewProjectButton: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
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

      <CreateEditProjectModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleCloseModal={handleCloseModal}
        modalType="create"
      />
    </>
  );
};

export default CreateNewProjectButton;
