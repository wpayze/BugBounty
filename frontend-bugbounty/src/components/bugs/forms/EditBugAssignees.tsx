import React, { useState } from "react";
import { User } from "@/shared/types";

interface Props {
  assignees: User[];
  users: User[];
  onUpdateAssignees: (newAssignees: User[]) => void;
}

const EditBugAssignees: React.FC<Props> = ({
  assignees,
  users,
  onUpdateAssignees,
}) => {
  const [currentAssignees, setCurrentAssignees] = useState<User[]>(assignees);
  const [selectedValue, setSelectedValue] = useState<string>("default");

  const handleAddAssignee = (userId: string) => {
    if (currentAssignees.some((assignee) => assignee._id === userId)) {
      return;
    }

    const userToAdd = users.find((user) => user._id === userId);
    if (userToAdd) {
      setCurrentAssignees((prev) => [...prev, userToAdd]);
      onUpdateAssignees([...currentAssignees, userToAdd]);
    }
  };

  const handleRemoveAssignee = (userId: string) => {
    const updatedAssignees = currentAssignees.filter(
      (user) => user._id !== userId
    );
    setCurrentAssignees(updatedAssignees);
    onUpdateAssignees(updatedAssignees);
  };

  return (
    <div>
      <label>Assign New User:</label>
      <select
        className="form-control mb-4"
        onChange={(e) => {
          handleAddAssignee(e.target.value);
          setSelectedValue("default");
        }}
        defaultValue="default"
        value={selectedValue}
      >
        <option value="default" disabled>
          Whom would you like to assign?
        </option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>

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

export default EditBugAssignees;
