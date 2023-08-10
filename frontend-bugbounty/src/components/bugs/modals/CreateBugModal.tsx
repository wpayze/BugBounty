"use client";
import React, { useRef } from "react";
import FormModal from "@/components/FormModal";
import { ModalName } from "@/shared/types";
import CreateBugForm from "../forms/CreateBugForm";

const CreateBugModal: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const modalName: ModalName = "createBugModal";

  const submitForm = () => {
    formRef.current?.dispatchEvent(
      new Event("submit", { cancelable: true, bubbles: true })
    );
  };

  return (
    <>
      <FormModal
        modalName={modalName}
        title="Create New Bug"
        onSaveModal={submitForm}
      >
        <CreateBugForm formRef={formRef} modalName={modalName} />
      </FormModal>
    </>
  );
};

export default CreateBugModal;
