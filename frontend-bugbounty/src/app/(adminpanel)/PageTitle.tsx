import React from "react";

type PageTitleProps = {
  title: string; 
};

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return (
    <div className="row">
      <div className="col-12">
        <div className="page-title-box d-flex align-items-center justify-content-between">
          <h4 className="mb-0 font-size-18">{title}</h4>
          <div className="page-title-right">
            <ol className="breadcrumb m-0">
              <li className="breadcrumb-item">
                <a href="#">Bug Bounty</a>
              </li>
              <li className="breadcrumb-item active">{title}</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageTitle;
