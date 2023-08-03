"use client";
import React, { useState } from "react";
import CreateEditUserModal from "./modals/CreateEditUserModal";

const CreateNewUserButton: React.FC = () => {
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
        <i className="feather-plus" /> Create New User
      </button>

      <CreateEditUserModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleCloseModal={handleCloseModal}
        modalType="create"
      />
    </>
  );
};

export default CreateNewUserButton;
