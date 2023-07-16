import React from "react";
import Link from "next/link";

import "./page.css";

const HomePage: React.FC = () => {
  return (
    <div id="hero">
      <div className="container mt-5">
        <h1 className="mb-4">Bug Bounty</h1>
        <p>
          Welcome to our Bug Tracking App! This app helps you keep track of bugs
          and issues in your projects.
        </p>
        <p>
          With our app, you can create bug reports, assign them to team members,
          track their status, and more.
        </p>
        <p>Get started by signing in or creating a new account.</p>
        <div className="mt-4">
          <Link href="/login" className="btn btn-primary">
            Sign In
          </Link>
          <Link href="/register" className="btn btn-secondary">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
