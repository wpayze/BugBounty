"use client";
import React, { useContext, useRef } from "react";
import FormModal from "@/components/FormModal";
import { ModalName } from "@/shared/types";
import EditBugForm from "../forms/EditBugForm";
import { AdminPanelContext } from "@/context/AdminPanelContext.context";

const EditBugModal: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const modalName: ModalName = "editBugModal";
  const { editFormData } = useContext(AdminPanelContext);
  const { bug } = editFormData;

  const submitForm = () => {
    formRef.current?.dispatchEvent(
      new Event("submit", { cancelable: true, bubbles: true })
    );
  };

  return (
    <>
      <FormModal
        modalName={modalName}
        title={`Bug ${bug?.customId}`}
        onSaveModal={submitForm}
      >
        <EditBugForm formRef={formRef} modalName={modalName} />
      </FormModal>
    </>
  );
};

export default EditBugModal;
