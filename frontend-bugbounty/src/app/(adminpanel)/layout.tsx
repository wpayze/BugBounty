import SideMenu from "@/components/navbar/SideMenu";
import Link from "next/link";
import UserDropdown from "@/components/navbar/UserDropdown";
import CreateNewDropdown from "@/components/navbar/CreateNewDropdown";
import { redirect } from "next/navigation";
import { User } from "@/shared/types";
import { initAuthService } from "@/helpers/initServices";
import CreateEditUserModal from "@/components/users/modals/CreateEditUserModal";
import CreateEditProjectModal from "@/components/projects/modals/CreateEditProjectModal";
import CreateBugModal from "@/components/bugs/modals/CreateBugModal";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const as = initAuthService();
  let user: User | null = null;

  try {
    user = await as.verifyToken();
  } catch (error) {
    redirect("/login");
  }

  return (
    <div id="layout-wrapper">
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex align-items-left">
            <button
              type="button"
              className="btn btn-sm mr-2 d-lg-none px-3 font-size-16 header-item waves-effect"
              id="vertical-menu-btn"
            >
              <i className="fa fa-fw fa-bars" />
            </button>
            <CreateNewDropdown />
          </div>
          <div className="d-flex align-items-center">
            <div className="dropdown d-inline-block">
              <button
                type="button"
                className="btn header-item noti-icon waves-effect"
                id="page-header-notifications-dropdown"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="mdi mdi-bell" />
                {/* <span className="badge badge-danger badge-pill">3</span> */}
              </button>
            </div>
            <UserDropdown user={user} />
          </div>
        </div>
      </header>
      <div className="vertical-menu">
        <div data-simplebar="" className="h-100">
          <div className="navbar-brand-box">
            <Link href="dashboard" className="logo">
              <span>Bug Bounty</span>
            </Link>
          </div>
          <div id="sidebar-menu">
            <ul className="metismenu list-unstyled" id="side-menu">
              <li className="menu-title">Menu</li>
              <SideMenu />
            </ul>
          </div>
        </div>
      </div>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">{children}</div>
        </div>
        <footer className="footer">
          <div className="container-fluid">
            <div className="row">
              {/* <div className="col-sm-6">Bug Bounty</div> */}
              <div className="col-sm-12">
                <div className="text-sm-center d-none d-sm-block">
                   Made with ❤ by {""}
                  <a href="https://wilfredopaiz.com">Wilfredo Paiz</a>
                </div>
              </div>
            </div>
          </div>
        </footer>
        {/* Modals */}
        <CreateEditUserModal modalType="create" />
        <CreateEditUserModal modalType="update" />
        <CreateEditProjectModal modalType="create" />
        <CreateEditProjectModal modalType="update" />
        <CreateBugModal />
      </div>
    </div>
  );
}
