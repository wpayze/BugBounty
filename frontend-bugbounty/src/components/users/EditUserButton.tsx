"use client";
import React, { useContext } from "react";
import { ModalName, User } from "@/shared/types";
import { AdminPanelContext } from "@/context/AdminPanelContext.context";

interface EditUserButtonProps {
  user: User;
}

const EditUserButton: React.FC<EditUserButtonProps> = ({ user }) => {
  const { setShowModals, setEditFormData } = useContext(AdminPanelContext);
  const modalName: ModalName = "editUserModal";

  const handleClick = () => {
    setEditFormData((prevState) => ({
      ...prevState,
      user: user,
    }));

    setShowModals((prevState) => ({
      ...prevState,
      [modalName]: true,
    }));
  };

  return (
    <>
      <button type="button" className="btn btn-warning" onClick={handleClick}>
        <i className="feather-edit" />
      </button>
    </>
  );
};

export default EditUserButton;
