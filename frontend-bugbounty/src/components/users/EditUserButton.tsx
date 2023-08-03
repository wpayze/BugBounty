"use client";
import React, { useState } from "react";
import CreateEditUserModal from "./modals/CreateEditUserModal";
import { User } from "@/shared/types";

interface EditUserButtonProps {
  user: User;
}

const EditUserButton: React.FC<EditUserButtonProps> = ({ user }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <button type="button" className="btn btn-warning" onClick={handleClick}>
        <i className="feather-edit" />
      </button>

      <CreateEditUserModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleCloseModal={handleCloseModal}
        modalType="update"
        user={user}
      />
    </>
  );
};

export default EditUserButton;
