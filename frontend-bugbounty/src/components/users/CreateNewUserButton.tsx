"use client";
import React, { useRef, useState } from "react";
import FormModal from "../FormModal";
import CreateUserForm from "./forms/CreateUserForm";

const CreateNewUserButton: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const submitForm = () => {
    formRef.current?.dispatchEvent(
      new Event("submit", { cancelable: true, bubbles: true })
    );
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

      <FormModal
        showModal={showModal}
        onCloseModal={handleCloseModal}
        title="Create User"
        onSaveModal={submitForm}
      >
        <CreateUserForm formRef={formRef} setShowModal={setShowModal} />
      </FormModal>
    </>
  );
};

export default CreateNewUserButton;
