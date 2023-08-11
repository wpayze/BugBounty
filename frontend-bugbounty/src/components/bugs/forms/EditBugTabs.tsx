import React, { useState } from "react";
import EditBugAttachments from "./EditBugAttachments";
import EditBugComments from "./EditBugComments";
import EditBugEvents from "./EditBugsEvents";
import { ChangeEvent, Comment } from "@/shared/types";

interface Props {
    comments: Comment[];
    events: ChangeEvent[];
}

const EditBugTabs:  React.FC<Props> = ({ comments, events }) => {
  const [selectedTab, setSelectedTab] = useState("attachments");

  const getContent = () => {
    switch (selectedTab) {
      case "attachments":
        return <EditBugAttachments />;
      case "comments":
        return <EditBugComments comments={comments} />;
      case "events":
        return <EditBugEvents events={events} />;
      default:
        return <div>Invalid option.</div>;
    }
  };

  return (
    <>
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <a
            href="#settings"
            onClick={() => setSelectedTab("attachments")}
            className={`nav-link ${selectedTab === "attachments" ? "active" : ""}`}
          >
            <i className="mdi mdi-settings-outline d-lg-none d-block" />
            <span className="d-none d-lg-block">Attachments</span>
          </a>
        </li>
        <li className="nav-item">
          <a
            href="#home"
            onClick={() => setSelectedTab("comments")}
            className={`nav-link ${selectedTab === "comments" ? "active" : ""}`}
          >
            <i className="mdi mdi-home-variant d-lg-none d-block" />
            <span className="d-none d-lg-block">Comments</span>
          </a>
        </li>
        <li className="nav-item">
          <a
            href="#profile"
            onClick={() => setSelectedTab("events")}
            className={`nav-link ${selectedTab === "events" ? "active" : ""}`}
          >
            <i className="mdi mdi-account-circle d-lg-none d-block" />
            <span className="d-none d-lg-block">Events</span>
          </a>
        </li>
      </ul>
      <div className="tab-content">
        {getContent()}
      </div>
    </>
  );
};

export default EditBugTabs;
