"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { RegisterRequest } from "@/shared/requestTypes";
import authService from "@/services/authService";

interface FormData extends RegisterRequest {
  repeatPassword: string;
}

const RegisterComponent: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    companyName: "",
    password: "",
    repeatPassword: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prevState) => ({ ...prevState, [name]: "" }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const validationErrors: Partial<FormData> = {};

    if (!formData.name) {
      validationErrors.name = "Please enter your full name";
    }

    if (!formData.email) {
      validationErrors.email = "Please enter your email address";
    }

    if (!formData.companyName) {
      validationErrors.companyName = "Please enter the name of your company";
    }

    const minPasswordLength = 6;
    if (formData.password.length < minPasswordLength) {
      validationErrors.password = `Password must be at least ${minPasswordLength} characters long`;
    }

    if (!formData.password) {
      validationErrors.password = "Please enter a password";
    }

    if (!formData.repeatPassword) {
      validationErrors.repeatPassword = "Please repeat your password";
    }

    if (formData.password !== formData.repeatPassword) {
      validationErrors.repeatPassword = "Passwords do not match";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      validationErrors.email = "Invalid email format";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setIsLoading(true);

      try {
        const registerRequest: RegisterRequest = formData;
        await authService.register(registerRequest);
      } catch (error) {
        setIsLoading(false);
        setFormError(true);
        console.error(error);
      }
    }
  };

  return (
    <form className="user" onSubmit={handleSubmit}>
      {formError && (
        <div className="alert alert-danger" role="alert">
          We apologize, but we encountered an error while creating your account.
          Please try again later or contact our support team for further
          assistance. Thank you for your understanding.
        </div>
      )}

      <div className="form-group row">
        <div className="col-sm-6 mb-3 mb-sm-0">
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`form-control form-control-user ${
              errors.name ? "is-invalid" : ""
            }`}
          />
          {errors.name && <small className="text-danger">{errors.name}</small>}
        </div>
        <div className="col-sm-6">
          <input
            type="email"
            className={`form-control form-control-user ${
              errors.email ? "is-invalid" : ""
            }`}
            placeholder="Email Address"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && (
            <small className="text-danger">{errors.email}</small>
          )}
        </div>
      </div>
      <div className="form-group">
        <input
          type="text"
          className={`form-control form-control-user ${
            errors.companyName ? "is-invalid" : ""
          }`}
          placeholder="Name of your Company"
          name="companyName"
          value={formData.companyName}
          onChange={handleInputChange}
        />
        {errors.companyName && (
          <small className="text-danger">{errors.companyName}</small>
        )}
      </div>
      <div className="form-group row">
        <div className="col-sm-6 mb-3 mb-sm-0">
          <input
            type="password"
            className={`form-control form-control-user ${
              errors.password ? "is-invalid" : ""
            }`}
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          {errors.password && (
            <small className="text-danger">{errors.password}</small>
          )}
        </div>
        <div className="col-sm-6">
          <input
            type="password"
            className={`form-control form-control-user ${
              errors.repeatPassword ? "is-invalid" : ""
            }`}
            placeholder="Repeat Password"
            name="repeatPassword"
            value={formData.repeatPassword}
            onChange={handleInputChange}
          />
          {errors.repeatPassword && (
            <small className="text-danger">{errors.repeatPassword}</small>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-success btn-block waves-effect waves-light"
      >
        {isLoading ? (
          <div className="spinner-border text-light m-2" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          "Register Account"
        )}
      </button>

      <div className="text-center mt-4">
        <h5 className="text-muted font-size-16">Sign up using</h5>

        <ul className="list-inline mt-3 mb-0">
          <li className="list-inline-item">
            <a
              href="#"
              className="social-list-item border-primary text-primary"
            >
              <i className="mdi mdi-facebook"></i>
            </a>
          </li>
          <li className="list-inline-item">
            <a href="#" className="social-list-item border-danger text-danger">
              <i className="mdi mdi-google"></i>
            </a>
          </li>
          <li className="list-inline-item">
            <a href="#" className="social-list-item border-info text-info">
              <i className="mdi mdi-twitter"></i>
            </a>
          </li>
          <li className="list-inline-item">
            <a
              href="#"
              className="social-list-item border-secondary text-secondary"
            >
              <i className="mdi mdi-github-circle"></i>
            </a>
          </li>
        </ul>
      </div>
    </form>
  );
};

export default RegisterComponent;
