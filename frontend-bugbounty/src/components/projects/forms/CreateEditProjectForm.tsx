import UserService from "@/services/userService";
import { AddProjectRequest, AddUserRequest } from "@/shared/requestTypes";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Project } from "@/shared/types";
import ProjectService from "@/services/projectService";

interface Props {
  formRef: React.RefObject<HTMLFormElement>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalType: "create" | "update";
  project?: Project;
}

const CreateEditProjectForm: React.FC<Props> = ({
  formRef,
  setShowModal,
  modalType,
  project,
}) => {
  const initialFormData = {
    name: "",
    description: "",
    coverImage: null,
  };
  const [createError, setCreateError] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState<AddProjectRequest>(initialFormData);

  useEffect(() => {
    if (project) {
      const { name, description, coverImage } = project;
      setFormData({ name, description, coverImage: null });
    }
  }, [project]);

  const router = useRouter();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (formData.coverImage) {
      const maxFileSizeInBytes = 3 * 1024 * 1024;
      if (formData.coverImage.size > maxFileSizeInBytes) {
        newErrors.coverImage = "Image size should be less than 3 MB";
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setFormData({
      ...formData,
      coverImage: file,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setCreateError("");
    e.preventDefault();
    if (!validateForm()) return;
    const ps = new ProjectService();

    try {
      console.log(formData);
      if (modalType == "create") await ps.create(formData);
      if (modalType == "update") {
        if (!project?._id) throw new Error("The Project ID is invalid.");

        await ps.update(project._id, formData);
      }

      setFormData(initialFormData);
      setShowModal(false);
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
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          className={`form-control ${errors.name ? "is-invalid" : ""}`}
          required
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
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
        <label htmlFor="coverImage">Cover Image:</label>
        <input
          type="file"
          className={`form-control-file ${
            errors.coverImage ? "is-invalid" : ""
          }`}
          accept="image/*"
          multiple={false}
          name="coverImage"
          onChange={handleFileChange}
        />
        {errors.coverImage && (
          <div className="invalid-feedback">{errors.coverImage}</div>
        )}
      </div>
    </form>
  );
};

export default CreateEditProjectForm;
