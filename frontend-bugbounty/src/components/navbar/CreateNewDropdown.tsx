"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";

const CreateNewDropdown: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="dropdown d-none d-sm-inline-block">
      <button
        type="button"
        className="btn header-item waves-effect"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        onClick={toggleDropdown}
      >
        <i className="mdi mdi-plus" /> Create New
        <i className="mdi mdi-chevron-down d-none d-sm-inline-block" />
      </button>
      <div className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
        <Link href="#" className="dropdown-item notify-item">
          User
        </Link>
        <Link href="#" className="dropdown-item notify-item">
          Project
        </Link>
        <Link href="#" className="dropdown-item notify-item">
          Bug
        </Link>
      </div>
    </div>
  );
};

export default CreateNewDropdown;
