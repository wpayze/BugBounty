import React from "react";
import PageTitle from "../PageTitle";
import { GetBugsResponse } from "@/shared/responseTypes";
import { initBugService, initUserService } from "@/helpers/initServices";
import { User } from "@/shared/types";
import ProjectBugsTab from "@/components/bugs/ProjectBugsTab";

import "./bugStyles.css";

const Bugs: React.FC = async () => {
  let bugs: GetBugsResponse[] = [];
  let users: User[] = [];

  try {
    const bs = initBugService();
    const us = initUserService();
    bugs = await bs.getAll();
    users = await us.getAll();
  } catch (error) {
    console.error(error);
    return <h1>Error fetching bugs.</h1>;
  }

  return (
    <>
      <PageTitle title="Bugs" />

      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <h4 className="card-title">Bug Board</h4>
                  <p className="card-subtitle mb-4">
                    Here is a comprehensive list of the bugs across all projects
                    within your company.
                  </p>
                </div>
              </div>
              <hr />
              {bugs.map((item, index) => (
                <ProjectBugsTab
                  key={index}
                  project={item.project}
                  bugs={item.bugs}
                  users={users}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bugs;
