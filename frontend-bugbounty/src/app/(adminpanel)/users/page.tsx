import React from "react";
import PageTitle from "../PageTitle";
import userService from "@/services/userService";
import { User } from "@/shared/types";
import { cookies } from "next/headers";

const Users: React.FC = async () => {
  const roleColors: { [key: string]: string } = {
    admin: "primary",
    dev: "success",
    tester: "secondary",
    "project manager": "info",
  };

  const getRoleColorClass = (role: string) => {
    const defaultColor = "primary";
    return roleColors[role] || defaultColor;
  };

  let users: User[] = [];

  try {
    const nextCookies = cookies();
    const token = nextCookies.get("accessToken");
    const us = new userService(token?.value);
    users = await us.getAll();
  } catch (error) {
    console.error(error);
    return <p>Error fetching users.</p>;
  }

  return (
    <>
      <PageTitle title="Users" />

      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <h4 className="card-title">Users List</h4>
                  <p className="card-subtitle mb-4">
                    Here are all the users associated to your company.
                  </p>
                </div>
                <div className="col-md-6">
                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      className="btn btn-lg btn-primary waves-effect waves-light"
                    >
                      <i className="feather-plus" />
                      {" "}Create New User
                    </button>
                  </div>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table table-striped mb-0">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>...</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={user._id}>
                        <th scope="row">{index + 1}</th>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          <span
                            className={`badge badge-${getRoleColorClass(
                              user.role
                            )} badge-pill text-lg`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td>
                          <div
                            className="btn-group"
                            role="group"
                            aria-label="Button group"
                          >
                            <button type="button" className="btn btn-secondary">
                              <i className="feather-eye" />
                            </button>
                            <button type="button" className="btn btn-warning">
                              <i className="feather-edit" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
