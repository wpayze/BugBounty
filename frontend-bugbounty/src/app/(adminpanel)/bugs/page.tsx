import React from "react";
import PageTitle from "../PageTitle";
import { GetBugsResponse } from "@/shared/responseTypes";
import { initBugService } from "@/helpers/initServices";
import "./bugStyles.css";

const bugStatus = {
  open: "primary",
  "in progress": "secondary",
  closed: "success",
};

const bugSeverity = {
  critical: "danger",
  high: "warning",
  medium: "info",
  low: "primary",
};

const Bugs: React.FC = async () => {
  let bugs: GetBugsResponse[] = [];

  try {
    const bs = initBugService();
    bugs = await bs.getAll();
    console.log(JSON.stringify(bugs));
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
                <>
                  <div className="row bg-light py-2" key={index}>
                    <div className="col-md-12">
                      <div className="d-flex justify-content-between align-items-center">
                      <h4 className="m-0">{item.project.name}</h4>
                        <button className="btn btn-primary">
                          Add Bug
                        </button>
                      </div>
                      
                    </div>
                  </div>

                  <div className="row py-2">
                    {item.bugs.map((bug) => (
                      <div className="col-md-3">
                        <div
                          className={`card position-relative bug-border-${bug.severity} bug-card`}
                        >
                          <div className="card-body">
                            <h5 className="card-title">{bug.title}</h5>
                            <span
                              className={`bug-status badge badge-pill badge-${
                                bugStatus[bug.status]
                              }`}
                            >
                              {bug.status}
                            </span>
                            <p>{bug.description}</p>
                            <p>{typeof bug.assignees[0] === "string" ? bug.assignees[0] : bug.assignees[0]?.name}</p>

                            <span
                              className={`bug-severity badge badge-soft-${
                                bugSeverity[bug.severity]
                              } mr-2`}
                            >
                              {bug.severity}
                            </span>
                            <span className={`badge badge-soft-dark`}>
                              Attachments: {bug.attachments.length}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <hr />
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bugs;
