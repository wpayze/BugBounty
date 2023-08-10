"use client";
import { Bug } from "@/shared/types";
import React from "react";

interface BugsGridProps {
  bugs: Bug[];
}

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

const BugsGrid: React.FC<BugsGridProps> = ({ bugs }) => {
  return (
    <div className="row py-2">
      {bugs.map((bug, index) => (
        <div key={index} className="col-sm-6 col-md-4 col-xl-3 mb-2">
          <div
            className={`card position-relative bug-border-${bug.severity} bug-card`}
          >
            <div className="card-body">
              <div>
                <div className="bug-title">
                  <h5 className="card-title m-0">{bug.title}</h5>
                  <span
                    className={`bug-status badge badge-pill badge-${
                      bugStatus[bug.status]
                    }`}
                  >
                    {bug.status}
                  </span>
                </div>
                <p className="mt-2">
                  {bug.description.length > 150
                    ? bug.description.substring(0, 150) + "..."
                    : bug.description}
                </p>
                <p>
                  {typeof bug.assignees[0] === "string"
                    ? bug.assignees[0]
                    : bug.assignees[0]?.name}
                </p>
              </div>
              <div>
                <span
                  className={`bug-severity badge badge-soft-${
                    bugSeverity[bug.severity]
                  } mr-2`}
                >
                  {bug.severity}
                </span>
                <span className="badge badge-soft-dark">
                  Attachments: {bug.attachments.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BugsGrid;
