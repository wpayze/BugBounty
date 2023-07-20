import React from "react";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "@/components/LoginForm";
import "./loginStyles.css";
const LoginPage: React.FC = () => {
  return (
    <div id="login-bg">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="d-flex align-items-center min-vh-100">
              <div className="w-100 d-block bg-white shadow-lg rounded my-5">
                <div className="row">
                  <div className="col-lg-5 d-none d-lg-block bg-login rounded-left"></div>
                  <div className="col-lg-7">
                    <div className="p-5">
                      <div className="text-center mb-5">
                        <Link
                          href="/"
                          className="text-dark font-size-22 font-family-secondary"
                        >
                          <Image
                            src="/logo.png"
                            width="70"
                            height="70"
                            alt="bug bounty logo"
                          />
                          <b>BUG BOUNTY</b>
                        </Link>
                      </div>
                      <h1 className="h5 mb-1">Welcome Back!</h1>
                      <p className="text-muted mb-4">
                        Ready to squash some bugs? Log in to your account now to
                        continue tracking and managing bugs like a pro. Don't
                        miss out on making your projects the best they can be.
                      </p>

                      <LoginForm />

                      <div className="row mt-4">
                        <div className="col-12 text-center">
                          <p className="text-muted mb-2">
                            <Link
                              href="/"
                              className="text-muted font-weight-medium ml-1"
                            >
                              Forgot your password?
                            </Link>
                          </p>
                          <p className="text-muted mb-0">
                            Don't have an account?{" "}
                            <Link
                              href="/register"
                              className="text-muted font-weight-medium ml-1"
                            >
                              <b>Sign Up</b>
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
