import { ChangeEvent } from "@/shared/types";
import React from "react";

interface Props {
  events: ChangeEvent[];
}

function formatDateString(dateString: string | Date): string {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

const colors = {
  creation: "success",
  modification: "warning",
  comment: "info",
  assignment: "secondary",
};

const EditBugEvents: React.FC<Props> = ({ events }) => {
  return (
    <ul className="list-group">
      {events.map((evt, idx) => (
        <li className={`list-group-item list-group-item-${colors[evt.type]}`} key={idx}>
          {evt.details} at {formatDateString(evt.timestamp)}
        </li>
      ))}
    </ul>
  );
};

export default EditBugEvents;
