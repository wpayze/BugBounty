"use client";
import authService from "@/services/authService";
import { LoginRequest } from "@/shared/requestTypes";
import { LoginResponse } from "@/shared/responseTypes";
import { useRouter } from "next/navigation";
import React, { useState, useContext } from "react";
import { AdminPanelContext } from "@/context/AdminPanelContext.context";

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formError, setFormError] = useState<boolean>(false);
  const { setUser } = useContext(AdminPanelContext);

  const handleSubmit = (event: React.FormEvent): void => {
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

    performLogin();
  };

  const performLogin = async () => {
    const loginRequest: LoginRequest = {
      email: email,
      password: password,
    };

    try {
      const data: LoginResponse = await authService.login(loginRequest);
      setUser(data.user);
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      setFormError(true);
    }
  };

  return (
    <form className="user" onSubmit={handleSubmit}>
      {formError && (
        <div className="alert alert-danger" role="alert">
          Login failed. Please check your email and password and try again.
        </div>
      )}
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

export default LoginForm;
