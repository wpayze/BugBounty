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

const CreateBugForm: React.FC<Props> = ({ formRef, modalName }) => {
  const { setShowModals, editFormData } = useContext(AdminPanelContext);
  const { bugProject, users } = editFormData;
  const initialFormData: Partial<Bug & { assignees: string[] }> = {
    title: "",
    description: "",
    severity: "low",
    project: bugProject?._id,
    assignees: [] as string[],
    attachments: [],
  };

  useEffect(() => {
    setFormData(initialFormData);
  }, [bugProject]);

  const [createError, setCreateError] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] =
    useState<Partial<Bug & { assignees: string[] }>>(initialFormData);
  const router = useRouter();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title?.trim()) {
      newErrors.title = "Title is required";
    }

    if (formData.title && formData.title.trim().length > 32) {
      newErrors.title = "Title must not exceed 32 characters";
    }

    if (!formData.description?.trim()) {
      newErrors.description = "Description is required";
    }

    if (formData.attachments) {
      if (formData.attachments.length > 3) {
        newErrors.attachments = "You can only upload a maximum of 3 files";
      } else {
        for (let file of formData.attachments) {
          if (file instanceof File && file.size > 3 * 1024 * 1024) {
            newErrors.attachments = "Each file must be less than 3MB";
            break;
          }
        }
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleMultipleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, options } = e.target;
    const selectedValues = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: selectedValues,
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setCreateError("");
    e.preventDefault();
    if (!validateForm()) return;
    const bs = new BugService();

    try {
      await bs.create(formData);
      setFormData(initialFormData);
      setShowModals((prevState) => ({
        ...prevState,
        [modalName]: false,
      }));
      router.refresh();
    } catch (error) {
      setCreateError((error as Error).message);
    }
  };

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      {createError && (
        <div className="alert alert-danger" role="alert">
          {createError}
        </div>
      )}

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
        {errors.title && <div className="invalid-feedback">{errors.title}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          className={`form-control ${errors.description ? "is-invalid" : ""}`}
          required
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        {errors.description && (
          <div className="invalid-feedback">{errors.description}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="severity">Project:</label>
        <select className={`form-control`} disabled>
          <option value={bugProject?._id}>{bugProject?.name}</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="severity">Severity:</label>
        <select
          className={`form-control ${errors.severity ? "is-invalid" : ""}`}
          required
          name="severity"
          value={formData.severity}
          onChange={handleChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>
        {errors.severity && (
          <div className="invalid-feedback">{errors.severity}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="assignees">
          Assignees: (Ctrl + Click for multiple)
        </label>
        <select
          className={`form-control ${errors.assignees ? "is-invalid" : ""}`}
          required
          name="assignees"
          multiple
          value={formData.assignees}
          onChange={handleMultipleSelectChange}
        >
          {users?.map((user, index) => (
            <option key={index} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>
        {errors.assignees && (
          <div className="invalid-feedback">{errors.assignees}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="attachments">Attachments:</label>
        <input
          type="file"
          className={`form-control-file ${
            errors.attachments ? "is-invalid" : ""
          }`}
          multiple
          name="attachments"
          onChange={handleFileChange}
        />
        <small className="form-text text-muted">
          Limit: 3 files, each no larger than 3MB.
        </small>
        {errors.attachments && (
          <div className="invalid-feedback">{errors.attachments}</div>
        )}
      </div>
    </form>
  );
};

export default CreateBugForm;
