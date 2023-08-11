"use client";
import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { Bug, ModalName } from "@/shared/types";
import { AdminPanelContext } from "@/context/AdminPanelContext.context";
import BugService from "@/services/bugService";

interface Props {
  formRef: React.RefObject<HTMLFormElement>;
  modalName: ModalName;
}

const EditBugForm: React.FC<Props> = ({ formRef, modalName }) => {
  const { setShowModals, editFormData } = useContext(AdminPanelContext);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { bug, users } = editFormData;

  const defaultBug: Bug = {
    _id: "",
    _v: 0,
    customId: 0,
    title: "",
    description: "",
    status: "open",
    severity: "low",
    creator: "",
    project: "",
    assignees: [],
    attachments: [],
  };

  useEffect(() => {
    if (bug) setFormData(bug);
  }, [bug]);

  const [formData, setFormData] = useState<Bug>(bug || defaultBug);

  if (!bug) return;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {};

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              className={`form-control ${errors.title ? "is-invalid" : ""}`}
              required
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            {errors.title && (
              <div className="invalid-feedback">{errors.title}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              className={`form-control ${
                errors.description ? "is-invalid" : ""
              }`}
              required
              name="description"
              value={formData.description}
              onChange={handleChange}
              style={{
                height: "200px",
                resize: "none",
                overflowY: "scroll",
              }}
            />
            {errors.description && (
              <div className="invalid-feedback">{errors.description}</div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditBugForm;
