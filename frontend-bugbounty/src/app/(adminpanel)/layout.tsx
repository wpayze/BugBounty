import SideMenu from "@/components/navbar/SideMenu";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
            <div className="dropdown d-none d-sm-inline-block">
              <button
                type="button"
                className="btn header-item waves-effect"
                id="page-header-user-dropdown"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="mdi mdi-plus" /> Create New
                <i className="mdi mdi-chevron-down d-none d-sm-inline-block" />
              </button>
            </div>
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
            <div className="dropdown d-inline-block ml-2">
              <button
                type="button"
                className="btn header-item waves-effect"
                id="page-header-user-dropdown"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img
                  className="rounded-circle header-profile-user"
                  src="assets/images/users/avatar-3.jpg"
                />
                <span className="d-none d-sm-inline-block ml-1">Jamie D.</span>
                <i className="mdi mdi-chevron-down d-none d-sm-inline-block" />
              </button>
            </div>
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
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="footer">
          <div className="container-fluid">
            <div className="row">
              {/* <div className="col-sm-6">Bug Bounty</div> */}
              <div className="col-sm-12">
                <div className="text-sm-center d-none d-sm-block">
                  Developed by{" "}
                  <a href="https://wilfredopaiz.com">Wilfredo Paiz</a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
