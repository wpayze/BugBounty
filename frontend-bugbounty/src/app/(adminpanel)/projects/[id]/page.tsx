import { initProjectService } from "@/helpers/initServices";
import { Project } from "@/shared/types";
import Image from "next/image";
import React from "react";

interface PageProps {
  params: { id: string };
}

const Page: React.FC<PageProps> = async ({ params }) => {
  const { id } = params;
  let project: Project | null = null;
  const api_url = `${process.env.API_URL}/public`;

  try {
    const ps = initProjectService();
    project = await ps.getById(id);
  } catch (error) {
    console.error(error);
    return <h1>Error fetching this project.</h1>;
  }

  return (
    <div className="row">
      <div className="col-md-4">
        <div className="card">
          <Image
            src={`${
              project.coverImage
                ? `${api_url}/${project.coverImage}`
                : "/login.png"
            }`}
            width={1}
            height={1}
            layout="responsive"
            alt={"project cover image"}
          />
          <div className="card-body">
            <h5 className="card-title">{project.name}</h5>
            <p className="card-text">{project.description}</p>
            <p className="card-text">
              <small className="text-muted">
                Created by{" "}
                {typeof project.creator === "string"
                  ? project.creator
                  : project.creator.name}
              </small>
            </p>
          </div>
        </div>
      </div>
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2>Bugs</h2>
            <ul className="list-group">
              <li className="list-group-item">Cras justo odio</li>
              <li className="list-group-item">Dapibus ac facilisis in</li>
              <li className="list-group-item">Morbi leo risus</li>
              <li className="list-group-item">Porta ac consectetur ac</li>
              <li className="list-group-item">Vestibulum at eros</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
