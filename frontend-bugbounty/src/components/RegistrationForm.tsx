"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
  companyName: string;
}

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
    companyName: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Do something with formData, e.g., send it to the server
    console.log(formData);
  };

  return (
    <form className="user" onSubmit={handleSubmit}>
      <div className="form-group row">
        <div className="col-sm-6 mb-3 mb-sm-0">
          <input
            type="text"
            className="form-control form-control-user"
            placeholder="Full Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-sm-6">
          <input
            type="email"
            className="form-control form-control-user"
            id="exampleInputEmail"
            placeholder="Email Address"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="form-group">
        <input
          type="text"
          className="form-control form-control-user"
          placeholder="Name of your Company"
          name="companyName"
          value={formData.companyName}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group row">
        <div className="col-sm-6 mb-3 mb-sm-0">
          <input
            type="password"
            className="form-control form-control-user"
            id="exampleInputPassword"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-sm-6">
          <input
            type="password"
            className="form-control form-control-user"
            id="exampleRepeatPassword"
            placeholder="Repeat Password"
            name="repeatPassword"
            value={formData.repeatPassword}
            onChange={handleInputChange}
          />
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

export default RegisterForm;
