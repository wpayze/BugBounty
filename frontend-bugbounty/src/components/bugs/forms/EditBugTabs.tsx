import React, { useState } from "react";
import EditBugAttachments from "./EditBugAttachments";
import EditBugComments from "./EditBugComments";
import EditBugEvents from "./EditBugsEvents";
import { ChangeEvent, Comment } from "@/shared/types";
import CommentService from "@/services/commentService";
import { getCommentsAndEventsResponse } from "@/shared/responseTypes";
import EditBugAssignees from "./EditBugAssignees";

interface Props {
  comments: Comment[];
  events: ChangeEvent[];
  bugId: string;
}

const EditBugTabs: React.FC<Props> = ({ comments, events, bugId }) => {
  const [selectedTab, setSelectedTab] = useState("attachments");
  const cs: CommentService = new CommentService("", bugId);

  const [comms, setComms] = useState<Comment[]>(comments);
  const [evts, setEvts] = useState<ChangeEvent[]>(events);

  const addComment = async (commentText: string) => {
    const cs: CommentService = new CommentService("", bugId);
    await cs.create(commentText);
    const commentsAndEvents: getCommentsAndEventsResponse =
      await cs.getCommentsAndEvents();

    setComms(commentsAndEvents.comments);
    setEvts(commentsAndEvents.events);
  };

  const getContent = () => {
    if (!bugId) return <div>There was an issue.</div>;

    switch (selectedTab) {
      case "assignees":
        return <EditBugAssignees />;
      case "attachments":
        return <EditBugAttachments />;
      case "comments":
        return <EditBugComments comments={comms} addComment={addComment} />;
      case "events":
        return <EditBugEvents events={evts} />;
      default:
        return <div>Invalid option.</div>;
    }
  };

  return (
    <>
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <a
            href="#assignees"
            onClick={() => setSelectedTab("assignees")}
            className={`nav-link ${
              selectedTab === "assignees" ? "active" : ""
            }`}
          >
            <i className="mdi mdi-account-circle d-lg-none d-block" />
            <span className="d-none d-lg-block">Assignees</span>
          </a>
        </li>
        <li className="nav-item">
          <a
            href="#attachments"
            onClick={() => setSelectedTab("attachments")}
            className={`nav-link ${
              selectedTab === "attachments" ? "active" : ""
            }`}
          >
            <i className="mdi mdi-attachment d-lg-none d-block" />
            <span className="d-none d-lg-block">Attachments</span>
          </a>
        </li>
        <li className="nav-item">
          <a
            href="#comments"
            onClick={() => setSelectedTab("comments")}
            className={`nav-link ${selectedTab === "comments" ? "active" : ""}`}
          >
            <i className="mdi mdi-comment-account d-lg-none d-block" />
            <span className="d-none d-lg-block">Comments</span>
          </a>
        </li>
        <li className="nav-item">
          <a
            href="#events"
            onClick={() => setSelectedTab("events")}
            className={`nav-link ${selectedTab === "events" ? "active" : ""}`}
          >
            <i className="mdi mdi-exclamation d-lg-none d-block" />
            <span className="d-none d-lg-block">Events</span>
          </a>
        </li>
      </ul>
      <div className="tab-content">{getContent()}</div>
    </>
  );
};

export default EditBugTabs;
