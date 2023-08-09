"use client";
import React, { useContext, useRef } from "react";
import FormModal from "@/components/FormModal";
import CreateEditUserForm from "../forms/CreateEditUserForm";
import { ModalName, ModalType } from "@/shared/types";
import { AdminPanelContext } from "@/context/AdminPanelContext.context";

interface Props {
  modalType: ModalType
}

const modalNameMap: Record<ModalType, ModalName> = {
  create: "createUserModal",
  update: "editUserModal",
};

const CreateEditUserModal: React.FC<Props> = ({
  modalType,
}) => {
  const { editFormData } = useContext(AdminPanelContext);

  const modalName = modalNameMap[modalType];
  const formRef = useRef<HTMLFormElement>(null);
  const user = modalType == "update" ? editFormData.user : null; 

  const submitForm = () => {
    formRef.current?.dispatchEvent(
      new Event("submit", { cancelable: true, bubbles: true })
    );
  };

  const titles = {
    create: "Create User",
    update: `Update User ${user?.name}`
  }

  return (
    <>
      <FormModal
        title={titles[modalType]}
        onSaveModal={submitForm}
        modalName={modalName}
      >
        <CreateEditUserForm
          formRef={formRef}
          modalType={modalType}
          user={user}
          modalName={modalName}
        />
      </FormModal>
    </>
  );
};

export default CreateEditUserModal;
