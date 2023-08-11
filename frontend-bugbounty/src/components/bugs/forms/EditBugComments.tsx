import { Comment } from "@/shared/types";
import React from "react";

interface Props {
  comments: Comment[];
}

const EditBugComments: React.FC<Props> = ({ comments }) => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div
          className="card shadow-0 border"
          style={{ backgroundColor: "#f0f2f5" }}
        >
          <div className="card-body p-4">
            <div className="form-outline mb-4">
              <input
                type="text"
                name="text"
                placeholder="+ Add a note"
                className="form-control addtxt"
              />
            </div>
            <div className="card mb-4">
              <div className="card-body">
                <p>Type your note, and hit enter to add it</p>
                <div className="d-flex justify-content-between">
                  <div className="d-flex flex-row align-items-center">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(4).webp"
                      alt="avatar"
                      width={25}
                      height={25}
                    />
                    <p className="small mb-0 ms-2">Martha</p>
                  </div>
                  <div className="d-flex flex-row align-items-center">
                    <p className="small text-muted mb-0">Upvote?</p>
                    <i
                      className="far fa-thumbs-up mx-2 fa-xs text-black"
                      style={{ marginTop: "-0.16rem" }}
                    />
                    <p className="small text-muted mb-0">3</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mb-4">
              <div className="card-body">
                <p>Type your note, and hit enter to add it</p>
                <div className="d-flex justify-content-between">
                  <div className="d-flex flex-row align-items-center">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp"
                      alt="avatar"
                      width={25}
                      height={25}
                    />
                    <p className="small mb-0 ms-2">Johny</p>
                  </div>
                  <div className="d-flex flex-row align-items-center">
                    <p className="small text-muted mb-0">Upvote?</p>
                    <i
                      className="far fa-thumbs-up mx-2 fa-xs text-black"
                      style={{ marginTop: "-0.16rem" }}
                    />
                    <p className="small text-muted mb-0">4</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mb-4">
              <div className="card-body">
                <p>Type your note, and hit enter to add it</p>
                <div className="d-flex justify-content-between">
                  <div className="d-flex flex-row align-items-center">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(31).webp"
                      alt="avatar"
                      width={25}
                      height={25}
                    />
                    <p className="small mb-0 ms-2">Mary Kate</p>
                  </div>
                  <div className="d-flex flex-row align-items-center text-primary">
                    <p className="small mb-0">Upvoted</p>
                    <i
                      className="fas fa-thumbs-up mx-2 fa-xs"
                      style={{ marginTop: "-0.16rem" }}
                    />
                    <p className="small mb-0">2</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <p>Type your note, and hit enter to add it</p>
                <div className="d-flex justify-content-between">
                  <div className="d-flex flex-row align-items-center">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp"
                      alt="avatar"
                      width={25}
                      height={25}
                    />
                    <p className="small mb-0 ms-2">Johny</p>
                  </div>
                  <div className="d-flex flex-row align-items-center">
                    <p className="small text-muted mb-0">Upvote?</p>
                    <i
                      className="far fa-thumbs-up ms-2 fa-xs text-black"
                      style={{ marginTop: "-0.16rem" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBugComments;
