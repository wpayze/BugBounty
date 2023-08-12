import { Comment } from "@/shared/types";
import React, { useState } from "react";

interface Props {
  comments: Comment[];
  addComment: (commentText: string) => Promise<void>;
}

const EditBugComments: React.FC<Props> = ({ comments, addComment }) => {
  const [commentText, setCommentText] = useState("");

  const createComment = async () => {
    if (commentText.trim() === "") {
      return;
    }
    addComment(commentText);
    setCommentText("");
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <div
          className="card shadow-0 border"
          style={{ backgroundColor: "#f0f2f5" }}
        >
          <div className="card-body p-4">
            <div className="form-outline mb-4 d-flex">
              <input
                type="text"
                name="text"
                placeholder="+ Add a comment"
                className="form-control addtxt"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => createComment()}
              >
                Post
              </button>
            </div>
            {comments.map((comment, idx) => (
              <div className="card mb-4" key={idx}>
                <div className="card-body">
                  <p>{comment.content}</p>
                  <div className="d-flex justify-content-between">
                    <div className="d-flex flex-row align-items-center">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp"
                        alt="avatar"
                        width={25}
                        height={25}
                      />
                      <p className="small mb-0 ms-2">
                        {typeof comment.creator !== "string"
                          ? comment.creator.name
                          : ""}
                      </p>
                    </div>
                    <div className="d-flex flex-row align-items-center">
                      <p className="small text-muted mb-0">5 minutes ago</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBugComments;
