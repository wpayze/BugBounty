"use client";
import React, { useState } from "react";
import FormModal from "../FormModal";

const CreateNewUserButton: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true); 
  };

  const handleCloseModal = () => {
    setShowModal(false);
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

      <FormModal showModal={showModal} onCloseModal={handleCloseModal} title="Create User">
        <div>
            HOLA!
        </div>
      </FormModal>
    </>
  );
};

export default CreateNewUserButton;
