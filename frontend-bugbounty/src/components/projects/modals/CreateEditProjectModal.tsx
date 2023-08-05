"use client";
import React, { useRef } from "react";
import FormModal from "@/components/FormModal";
import CreateEditUserForm from "../forms/CreateEditProjectForm";
import { Project } from "@/shared/types";

interface Props {
  handleCloseModal: () => void;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalType: "create" | "update";
  project?: Project;
}

const CreateEditProjectModal: React.FC<Props> = ({
  handleCloseModal,
  showModal,
  setShowModal,
  modalType,
  project,
}) => {
  const formRef = useRef<HTMLFormElement>(null);

  const submitForm = () => {
    formRef.current?.dispatchEvent(
      new Event("submit", { cancelable: true, bubbles: true })
    );
  };

  const titles = {
    create: "Create Project",
    update: `Update Project ${project?.name}`
  }

  return (
    <>
      <FormModal
        showModal={showModal}
        onCloseModal={handleCloseModal}
        title={titles[modalType]}
        onSaveModal={submitForm}
      >
        <CreateEditUserForm
          formRef={formRef}
          setShowModal={setShowModal}
          modalType={modalType}
          project={project}
        />
      </FormModal>
    </>
  );
};

export default CreateEditProjectModal;
