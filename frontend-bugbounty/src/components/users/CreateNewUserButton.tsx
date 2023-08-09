"use client";
import React, { useContext } from "react";
import { AdminPanelContext } from "@/context/AdminPanelContext.context";
import { ModalName } from "@/shared/types";

const CreateNewUserButton: React.FC = () => {
  const { setShowModals } = useContext(AdminPanelContext);
  const modalName: ModalName = "createUserModal";

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
        <i className="feather-plus" /> Create New User
      </button>
    </>
  );
};

export default CreateNewUserButton;
