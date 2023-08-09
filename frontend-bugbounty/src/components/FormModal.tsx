"use client";
import { AdminPanelContext } from "@/context/AdminPanelContext.context";
import { ModalName } from "@/shared/types";
import React, { ReactNode, useContext } from "react";

interface FormModalProps {
  title: string;
  modalName: ModalName;
  children: ReactNode;
  onSaveModal: () => void;
}

const FormModal: React.FC<FormModalProps> = ({
  title = "Bug Bounty",
  modalName,
  children,
  onSaveModal,
}) => {
  const { showModals, setShowModals } = useContext(AdminPanelContext);
  const showModal = showModals[modalName];

  const onCloseModal = () => {
    setShowModals((prevState) => ({
      ...prevState,
      [modalName]: false,
    }));
  }

  return (
    <>
      {showModal && <div className="modal-backdrop fade show"></div>}
      <div
        className={`modal fade ${showModal ? "show" : ""}`}
        style={{ display: showModal ? "block" : "none" }}
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          className={`modal-dialog modal-dialog-centered modal-xl ${
            showModal ? "fade-in" : ""
          }`}
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {title}
              </h5>
              <button
                type="button"
                className="close waves-effect waves-light"
                data-dismiss="modal"
                aria-label="Close"
                onClick={onCloseModal}
              >
                <span aria-hidden="true">
                  ×
                </span>
              </button>
            </div>
            <div className="modal-body">{children}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary waves-effect waves-light"
                data-dismiss="modal"
                onClick={onCloseModal}
              >
                Close
              </button>
              {onSaveModal && (
                <button
                  onClick={onSaveModal}
                  type="button"
                  className="btn btn-primary waves-effect waves-light"
                >
                  Save changes
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormModal;
