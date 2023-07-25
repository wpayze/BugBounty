"use client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import Image from "next/image";
import { AdminPanelContext } from "@/context/AdminPanelContext.context";
import { User } from "@/shared/types";
import { useEffect } from "react";


interface UserDropdownProps {
  user: User | null;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ user }) => {
  const { setUser } = useContext(AdminPanelContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setUser(user);
  }, [])

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="dropdown d-inline-block ml-2">
      <button
        type="button"
        className="btn header-item waves-effect"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        onClick={toggleDropdown}
      >
        <Image
          className="rounded-circle header-profile-user"
          src="/user.png"
          alt="Header Avatar"
          width={50}
          height={50}
        />
        <span className="d-none d-sm-inline-block ml-1">{user?.name}</span>
        <i className="mdi mdi-chevron-down d-none d-sm-inline-block" />
      </button>
      <div
        className={`dropdown-menu dropdown-menu-right ${
          isDropdownOpen ? "show" : ""
        }`}
      >
        <Link
          className="dropdown-item d-flex align-items-center justify-content-between"
          href="/profile"
        >
          <span>Profile</span>
          {/* <span>
            <span className="badge badge-pill badge-info">3</span>
          </span> */}
        </Link>
        <Link
          className="dropdown-item d-flex align-items-center justify-content-between"
          href="#"
        >
          <span>Log Out</span>
        </Link>
      </div>
    </div>
  );
};

export default UserDropdown;
