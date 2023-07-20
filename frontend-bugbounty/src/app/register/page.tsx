import React from "react";
import Image from "next/image";
import Link from "next/link";
import RegistrationForm from "@/components/RegistrationForm";
import "./registerStyles.css";

const RegisterPage: React.FC = () => {
  return (
    <div id="register-bg">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="d-flex align-items-center min-vh-100">
              <div className="w-100 d-block bg-white shadow-lg rounded my-5">
                <div className="row">
                  <div className="col-lg-5 d-none d-lg-block bg-register rounded-left"></div>
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
                      <h1 className="h5 mb-1">Create an Account!</h1>
                      <p className="text-muted mb-4">
                        Ready to level up your bug tracking? Sign up for Bug
                        Bounty today and become part of a community dedicated to
                        efficient and effective bug management. Take your first
                        step towards a bug-free future now.
                      </p>

                      <RegistrationForm />

                      <div className="row mt-4">
                        <div className="col-12 text-center">
                          <p className="text-muted mb-0">
                            Already have account?{" "}
                            <Link
                              href="/login"
                              className="text-muted font-weight-medium ml-1"
                            >
                              <b>Sign In</b>
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

export default RegisterPage;
