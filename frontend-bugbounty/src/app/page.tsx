import React from "react";
import Link from "next/link";

import "./page.css";

const HomePage: React.FC = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <div className="col-md-12 col-sm-12 text-left">
          <h1>Bug Bounty</h1>
          <p>
            Welcome to our Bug Tracking App! This app helps you keep track of
            bugs and issues in your projects.
          </p>
          <p>
            With our app, you can create bug reports, assign them to team
            members, track their status, and more.
          </p>
          <p>Get started by signing in or creating a new account.</p>
          <div className="mt-4">
            <Link href="/login" className="btn btn-primary btn-lg mr-2">
              Sign In
            </Link>
            <Link href="/register" className="btn btn-secondary btn-lg">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
