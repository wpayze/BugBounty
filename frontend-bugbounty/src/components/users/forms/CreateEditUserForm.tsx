import UserService from "@/services/userService";
import { AddUserRequest } from "@/shared/requestTypes";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { User } from "@/shared/types";

interface Props {
  formRef: React.RefObject<HTMLFormElement>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalType: "create" | "update";
  user?: User;
}

const CreateEditUserForm: React.FC<Props> = ({
  formRef,
  setShowModal,
  modalType,
  user,
}) => {
  const [createError, setCreateError] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState<AddUserRequest>({
    name: "",
    email: "",
    password: "",
    role: "admin",
  });

  useEffect(() => {
    if (user) setFormData(user);
  }, [user]);

  const router = useRouter();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (modalType === "create") {
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
      ) {
        newErrors.email = "Invalid email address";
      }

      if (!formData.password.trim()) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters long";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setCreateError("");
    e.preventDefault();
    if (!validateForm()) return;
    const us = new UserService();

    try {
      if (modalType == "create") await us.add(formData);
      if (modalType == "update") {
        if (!user?._id) throw new Error("The User ID is invalid.");

        await us.update(user._id, formData);
      }

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "admin",
      });
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
      {modalType == "create" && (
        <>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              required
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              required
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>
        </>
      )}

      <div className="form-group">
        <label htmlFor="role">Role:</label>
        <select
          className="form-control"
          id="role"
          name="role"
          required
          value={formData.role}
          onChange={handleChange}
        >
          <option value="admin">Admin</option>
          <option value="tester">Tester</option>
          <option value="dev">Developer</option>
          <option value="project manager">Project Manager</option>
        </select>
      </div>
    </form>
  );
};

export default CreateEditUserForm;
