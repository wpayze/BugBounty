"use client";
import { AdminPanelContext } from "@/context/AdminPanelContext.context";
import { Bug, ModalName } from "@/shared/types";
import React, { useContext } from "react";

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
  const { setShowModals, setEditFormData } = useContext(AdminPanelContext);
  const modalName: ModalName = "editBugModal";

  const handleClick = (bug: Bug) => {
    setEditFormData((prevState) => ({
      ...prevState,
      bug,
    }));

    setShowModals((prevState) => ({
      ...prevState,
      [modalName]: true,
    }));
  };

  return (
    <div className="row py-2">
      {bugs.length === 0 && (
        <div className="col-sm-12">
          <p>No bugs to show.</p>
        </div>
      )}
      {bugs.map((bug, index) => (
        <div key={index} className="col-sm-6 col-md-4 col-xl-3 mb-2">
          <div
            className={`card position-relative bug-border-${bug.severity} bug-card`}
            onClick={() => handleClick(bug)}
          >
            <div className="card-body">
              <div>
                <div className="bug-title">
                  <p className="card-title m-0">
                  <i className="fas fa-bug"></i> <strong>{bug.customId}</strong> {bug.title}
                  </p>
                  <span
                    className={`bug-status badge badge-pill badge-${
                      bugStatus[bug.status]
                    }`}
                  >
                    {bug.status}
                  </span>
                </div>
                <br />
                <p>
                  {bug.assignees.length > 0 &&
                  typeof bug.assignees[0] !== "string"
                    ? bug.assignees[0].name
                    : "Unassigned"}
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
                  Attachments: {typeof bug.attachments === 'number' && bug.attachments}
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
