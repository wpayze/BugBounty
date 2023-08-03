"use client";
import React, { useRef } from "react";
import FormModal from "@/components/FormModal";
import CreateEditUserForm from "../forms/CreateEditUserForm";
import { User } from "@/shared/types";

interface Props {
  handleCloseModal: () => void;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalType: "create" | "update";
  user?: User;
}

const CreateEditUserModal: React.FC<Props> = ({
  handleCloseModal,
  showModal,
  setShowModal,
  modalType,
  user,
}) => {
  const formRef = useRef<HTMLFormElement>(null);

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
        showModal={showModal}
        onCloseModal={handleCloseModal}
        title={titles[modalType]}
        onSaveModal={submitForm}
      >
        <CreateEditUserForm
          formRef={formRef}
          setShowModal={setShowModal}
          modalType={modalType}
          user={user}
        />
      </FormModal>
    </>
  );
};

export default CreateEditUserModal;
