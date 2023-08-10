"use client";
import { AdminPanelContext } from "@/context/AdminPanelContext.context";
import { ModalName, Project, User } from "@/shared/types";
import React, { useContext, useEffect } from "react";

interface Props {
  project: Project;
  users: User[];
}

const CreateBugButton: React.FC<Props> = ({ project, users}) => {
  const { setShowModals, setEditFormData } = useContext(AdminPanelContext);
  const modalName: ModalName = "createBugModal";

  useEffect(() => {
    setEditFormData((prevState) => ({
      ...prevState,
      users: users,
    }));
  }, []);

  const handleClick = () => {
    setShowModals((prevState) => ({
      ...prevState,
      [modalName]: true,
    }));

    setEditFormData((prevState) => ({
      ...prevState,
      bugProject: project,
    }));
  };

  return (
    <button className="btn btn-primary" type="button" onClick={handleClick}>
      <i className="feather-plus" /> Add Bug
    </button>
  );
};

export default CreateBugButton;
