import React, { useState } from "react";
import EditBugAttachments from "./EditBugAttachments";
import EditBugComments from "./EditBugComments";
import EditBugEvents from "./EditBugsEvents";
import { Attachment, Bug, ChangeEvent, Comment, User } from "@/shared/types";
import CommentService from "@/services/commentService";
import { getCommentsAndEventsResponse } from "@/shared/responseTypes";
import EditBugAssignees from "./EditBugAssignees";

interface Props {
  comments: Comment[];
  events: ChangeEvent[];
  bug: Bug;
  users: User[];
  setFormData: React.Dispatch<React.SetStateAction<Bug>>;
}

const EditBugTabs: React.FC<Props> = ({ comments, events, bug, users, setFormData }) => {
  const cs: CommentService = new CommentService("", bug._id);
  const [selectedTab, setSelectedTab] = useState("attachments");
  const [comms, setComms] = useState<Comment[]>(comments);
  const [evts, setEvts] = useState<ChangeEvent[]>(events);

  const addComment = async (commentText: string) => {
    await cs.create(commentText);
    updateCommentsAndEvents();
  };

  const updateAssignees = async (assignees: User[]) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      assignees,
    }));
  };

  const updateAttachments = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files,
    }));
  };

  const updateCommentsAndEvents = async () => {
    const commentsAndEvents: getCommentsAndEventsResponse =
      await cs.getCommentsAndEvents();

    setComms(commentsAndEvents.comments);
    setEvts(commentsAndEvents.events);
  };

  const getContent = () => {
    if (!bug._id) return <div>There was an issue.</div>;

    switch (selectedTab) {
      case "assignees":
        return <EditBugAssignees assignees={bug.assignees as User[]} users={users} onUpdateAssignees={updateAssignees}/>;
      case "attachments":
        return <EditBugAttachments attachments={bug.attachments as Attachment[]} onUpdateAttachments={updateAttachments}/>;
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
