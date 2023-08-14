import React, { useState } from "react";
import { Attachment } from "@/shared/types";

interface Props {
  attachments: Attachment[];
  onUpdateAttachments: (newAssignees: Attachment[]) => void;
}

const EditBugAttachments: React.FC<Props> = ({
  attachments,
  onUpdateAttachments,
}) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  return (
    <div>
      <div className="form-group">
        <label htmlFor="attachments">Attachments:</label>
        <input
          type="file"
          className={`form-control-file ${
            errors.attachments ? "is-invalid" : ""
          }`}
          multiple
          name="attachments"
          onChange={onUpdateAttachments}
        />
        <small className="form-text text-muted">
          Limit: 3 files, each no larger than 3MB.
        </small>
        {errors.attachments && (
          <div className="invalid-feedback">{errors.attachments}</div>
        )}
      </div>

      <label>Currently Assigned Users:</label>
      <ul className="list-group">
        {currentAssignees.map((assignee) => (
          <li
            key={assignee._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {assignee.name}
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleRemoveAssignee(assignee._id)}
            >
              Unassign
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EditBugAttachments;
