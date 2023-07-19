"use client";
import React, { useState } from "react";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const validationErrors: { [key: string]: string } = {};

    if (!email) {
      validationErrors.email = "Email is required";
    }

    if (!password) {
      validationErrors.password = "Password is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      validationErrors.email = "Invalid email format";
    }

    const minPasswordLength = 6;
    if (password.length < minPasswordLength) {
      validationErrors.password = `Password must be at least ${minPasswordLength} characters long`;
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log("Login successful!");
  };

  return (
    <form className="user" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          className={`form-control form-control-user ${
            errors.email ? "is-invalid" : ""
          }`}
          id="exampleInputEmail"
          placeholder="Email Address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
      </div>
      <div className="form-group">
        <input
          type="password"
          className={`form-control form-control-user ${
            errors.password ? "is-invalid" : ""
          }`}
          id="exampleInputPassword"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {errors.password && (
          <div className="invalid-feedback">{errors.password}</div>
        )}
      </div>
      <button
        type="submit"
        className="btn btn-success btn-block waves-effect waves-light"
      >
        Log In
      </button>

      <div className="text-center mt-4">
        <h5 className="text-muted font-size-16">Sign in using</h5>

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
            <a
              href="#"
              className="social-list-item border-danger text-danger"
            >
              <i className="mdi mdi-google"></i>
            </a>
          </li>
          <li className="list-inline-item">
            <a
              href="#"
              className="social-list-item border-info text-info"
            >
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

export default LoginForm;
