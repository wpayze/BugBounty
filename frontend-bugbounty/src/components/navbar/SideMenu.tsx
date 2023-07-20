"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type MenuItem = {
  path: string;
  icon: string;
  label: string;
};

const menuItems: MenuItem[] = [
  { path: "/dashboard", icon: "feather-home", label: "Dashboard" },
  { path: "/users", icon: "feather-users", label: "Users" },
  { path: "/projects", icon: "feather-folder", label: "Projects" },
  { path: "/bugs", icon: "feather-alert-octagon", label: "Bugs" },
  { path: "/profile", icon: "feather-sliders", label: "Profile" },
  { path: "#", icon: "feather-log-out", label: "Logout" },
];

const SideMenu: React.FC = () => {
  const pathname = usePathname();

  return (
    <>
      {menuItems.map((menuItem) => (
        <li
          key={menuItem.path}
          className={`${
            pathname === menuItem.path ? "mm-active" : ""
          }`}
        >
          <Link
            href={menuItem.path}
            className={`waves-effect ${
              pathname === menuItem.path ? "active" : ""
            }`}
          >
            <i className={menuItem.icon} />
            <span>{menuItem.label}</span>
          </Link>
        </li>
      ))}
    </>
  );
};

export default SideMenu;
