"use client";
import React, { useContext, useRef } from "react";
import FormModal from "@/components/FormModal";
import CreateEditUserForm from "../forms/CreateEditProjectForm";
import { ModalName, ModalType } from "@/shared/types";
import { AdminPanelContext } from "@/context/AdminPanelContext.context";


interface Props {
  modalType: ModalType;
}

const modalNameMap: Record<ModalType, ModalName> = {
  create: "createProjectModal",
  update: "editProjectModal",
};


const CreateEditProjectModal: React.FC<Props> = ({
  modalType,
}) => {
  const { editFormData } = useContext(AdminPanelContext);
  
  const modalName = modalNameMap[modalType];
  const formRef = useRef<HTMLFormElement>(null);
  const project = modalType == "update" ? editFormData.project : null; 

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
        modalName={modalName}
        title={titles[modalType]}
        onSaveModal={submitForm}
      >
        <CreateEditUserForm
          formRef={formRef}
          modalName={modalName}
          modalType={modalType}
          project={project}
        />
      </FormModal>
    </>
  );
};

export default CreateEditProjectModal;
