"use client";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // Importamos el hook useRouter

const SideMenu: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  type MenuItem = {
    path: string;
    icon: string;
    label: string;
    type?: "link" | "button";
    functionToCall?: () => void;
  };

  const menuItems: MenuItem[] = [
    { path: "/dashboard", icon: "feather-home", label: "Dashboard" },
    { path: "/users", icon: "feather-users", label: "Users" },
    { path: "/projects", icon: "feather-folder", label: "Projects" },
    { path: "/bugs", icon: "feather-alert-octagon", label: "Bugs" },
    { path: "/profile", icon: "feather-sliders", label: "Profile" },
    {
      path: "#",
      icon: "feather-log-out",
      label: "Logout",
      type: "button",
      functionToCall: () => {
        localStorage.removeItem("token");
        router.replace("/");
      },
    },
  ];

  return (
    <>
      {menuItems.map((menuItem) => (
        <li
          key={menuItem.path}
          className={`${pathname === menuItem.path ? "mm-active" : ""}`}
        >
          {menuItem.type === "button" ? (
            <a
              href="#"
              className={`waves-effect ${
                pathname === menuItem.path ? "active" : ""
              }`}
              onClick={() => {
                menuItem.functionToCall?.();
              }}
            >
              <i className={menuItem.icon} />
              <span>{menuItem.label}</span>
            </a>
          ) : (
            <Link
              href={menuItem.path}
              className={`waves-effect ${
                pathname === menuItem.path ? "active" : ""
              }`}
            >
              <i className={menuItem.icon} />
              <span>{menuItem.label}</span>
            </Link>
          )}
        </li>
      ))}
    </>
  );
};

export default SideMenu;
