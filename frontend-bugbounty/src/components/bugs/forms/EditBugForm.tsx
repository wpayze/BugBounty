"use client";
import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { Bug, ChangeEvent as Evt, Comment } from "@/shared/types";
import { AdminPanelContext } from "@/context/AdminPanelContext.context";
import BugService from "@/services/bugService";
import { getBugByIdResponse } from "@/shared/responseTypes";
import EditBugTabs from "./EditBugTabs";

interface Props {
  formRef: React.RefObject<HTMLFormElement>;
}

const defaultBug: getBugByIdResponse = {
  _id: "",
  _v: 0,
  customId: 0,
  title: "",
  description: "",
  status: "open",
  severity: "low",
  creator: "",
  project: "",
  assignees: [],
  attachments: [],
  comments: [],
  events: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

const EditBugForm: React.FC<Props> = ({ formRef }) => {
  const { editFormData } = useContext(AdminPanelContext);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { bug, users } = editFormData;
  const bs = new BugService();

  const [formData, setFormData] = useState<Bug>(defaultBug);
  const [comments, setComments] = useState<Comment[]>();
  const [events, setEvents] = useState<Evt[]>();

  useEffect(() => {
    setIsLoading(true);
    if (bug) fetchBug(bug?._id);
  }, [bug]);

  const fetchBug = async (bugId: string) => {
    const bug: getBugByIdResponse = await bs.getById(bugId);

    setFormData(bug);
    setComments(bug.comments);
    setEvents(bug.events);

    setIsLoading(false);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {};

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status" />
        </div>
      ) : (
        <div className="row">
          <div className="col-md-12 col-lg-6">
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                className={`form-control ${errors.title ? "is-invalid" : ""}`}
                required
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
              {errors.title && (
                <div className="invalid-feedback">{errors.title}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="status">Status:</label>
              <select
                className="form-control"
                required
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="open">Open</option>
                <option value="in progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="severity">Severity:</label>
              <select
                className="form-control"
                required
                name="severity"
                value={formData.severity}
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                className={`form-control ${
                  errors.description ? "is-invalid" : ""
                }`}
                required
                name="description"
                value={formData.description}
                onChange={handleChange}
                style={{
                  height: "200px",
                  resize: "none",
                  overflowY: "scroll",
                }}
              />
              {errors.description && (
                <div className="invalid-feedback">{errors.description}</div>
              )}
            </div>
          </div>
          <div className="col-md-12 col-lg-6">
            {events && comments && bug?._id && (
              <EditBugTabs
                events={events}
                comments={comments}
                bugId={bug._id}
              />
            )}
          </div>
        </div>
      )}
    </form>
  );
};

export default EditBugForm;
