"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";

interface FormData {
  name: string;
  email: string;
  companyName: string;
  password: string;
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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prevState) => ({ ...prevState, [name]: "" }));
  };

  const handleSubmit = (e: FormEvent) => {
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

    if (!formData.password) {
      validationErrors.password = "Please enter a password";
    }

    if (!formData.repeatPassword) {
      validationErrors.repeatPassword = "Please repeat your password";
    }

    if (formData.password !== formData.repeatPassword) {
      validationErrors.repeatPassword = "Passwords do not match";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Handle form submission
      console.log(formData);
    }
  };

  return (
    <form className="user" onSubmit={handleSubmit}>
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
          {errors.name && (
            <small className="text-danger">{errors.name}</small>
          )}
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
        Register Account
      </button>

      <div className="text-center mt-4">
        <h5 className="text-muted font-size-16">Sign up using</h5>

        <ul className="list-inline mt-3 mb-0">
          <li className="list-inline-item">
            <a
              href="javascript: void(0);"
              className="social-list-item border-primary text-primary"
            >
              <i className="mdi mdi-facebook"></i>
            </a>
          </li>
          <li className="list-inline-item">
            <a
              href="javascript: void(0);"
              className="social-list-item border-danger text-danger"
            >
              <i className="mdi mdi-google"></i>
            </a>
          </li>
          <li className="list-inline-item">
            <a
              href="javascript: void(0);"
              className="social-list-item border-info text-info"
            >
              <i className="mdi mdi-twitter"></i>
            </a>
          </li>
          <li className="list-inline-item">
            <a
              href="javascript: void(0);"
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
