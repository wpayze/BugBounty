import React from "react";
import PageTitle from "../PageTitle";

const Dashboard: React.FC = () => {
  return (
    <>
      <PageTitle title="Dashboard" />

      <div className="row">
        <div className="col-md-6 col-xl-3">
          <div className="card bg-primary border-primary">
            <div className="card-body">
              <div className="mb-4">
                <span className="badge badge-soft-light float-right">
                  This Month
                </span>
                <h5 className="card-title mb-0 text-white">New Bugs</h5>
              </div>
              <div className="row d-flex align-items-center mb-4">
                <div className="col-8">
                  <h2 className="d-flex align-items-center mb-0 text-white">
                    5
                  </h2>
                </div>
                <div className="col-4 text-right">
                  <span className="text-white-50">
                    12.5% <i className="mdi mdi-arrow-up" />
                  </span>
                </div>
              </div>
              <div
                className="progress badge-soft-light shadow-sm"
                style={{ height: 5 }}
              >
                <div
                  className="progress-bar bg-light"
                  role="progressbar"
                  style={{ width: "38%" }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-3">
          <div className="card bg-success border-success">
            <div className="card-body">
              <div className="mb-4">
                <span className="badge badge-soft-light float-right">
                  This Month
                </span>
                <h5 className="card-title mb-0 text-white">Solved Bugs</h5>
              </div>
              <div className="row d-flex align-items-center mb-4">
                <div className="col-8">
                  <h2 className="d-flex align-items-center text-white mb-0">
                    10
                  </h2>
                </div>
                <div className="col-4 text-right">
                  <span className="text-white-50">
                    18.71% <i className="mdi mdi-arrow-down" />
                  </span>
                </div>
              </div>
              <div
                className="progress badge-soft-light shadow-sm"
                style={{ height: 7 }}
              >
                <div
                  className="progress-bar bg-light"
                  role="progressbar"
                  style={{ width: "38%" }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-3">
          <div className="card bg-warning border-warning">
            <div className="card-body">
              <div className="mb-4">
                <span className="badge badge-soft-light float-right">
                  All Time
                </span>
                <h5 className="card-title mb-0 text-white">Open Bugs</h5>
              </div>
              <div className="row d-flex align-items-center mb-4">
                <div className="col-8">
                  <h2 className="d-flex align-items-center text-white mb-0">
                    150
                  </h2>
                </div>
                <div className="col-4 text-right">
                  <span className="text-white-50">
                    57% <i className="mdi mdi-arrow-up" />
                  </span>
                </div>
              </div>
              <div
                className="progress badge-soft-light shadow-sm"
                style={{ height: 7 }}
              >
                <div
                  className="progress-bar bg-light"
                  role="progressbar"
                  style={{ width: "68%" }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-3">
          <div className="card bg-info border-info">
            <div className="card-body">
              <div className="mb-4">
                <span className="badge badge-soft-light float-right">
                  All Time
                </span>
                <h5 className="card-title mb-0 text-white">Total Bugs</h5>
              </div>
              <div className="row d-flex align-items-center mb-4">
                <div className="col-8">
                  <h2 className="d-flex align-items-center text-white mb-0">
                    400
                  </h2>
                </div>
                <div className="col-4 text-right">
                  <span className="text-white-50">
                    17.8% <i className="mdi mdi-arrow-down" />
                  </span>
                </div>
              </div>
              <div
                className="progress badge-soft-light shadow-sm"
                style={{ height: 7 }}
              >
                <div
                  className="progress-bar bg-light"
                  role="progressbar"
                  style={{ width: "57%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Recent Buyers</h4>
              <p className="card-subtitle mb-4 font-size-13">
                Transaction period from 21 July to 25 Aug
              </p>
              <div className="table-responsive">
                <table
                  className="table table-centered table-hover table-xl mb-0"
                  id="recent-orders"
                >
                  <thead>
                    <tr>
                      <th className="border-top-0">Product</th>
                      <th className="border-top-0">Customers</th>
                      <th className="border-top-0">Categories</th>
                      <th className="border-top-0">Popularity</th>
                      <th className="border-top-0">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-truncate">iPone X</td>
                      <td className="text-truncate">Tiffany W. Yang</td>
                      <td>
                        <span className="badge badge-soft-secondary p-2">
                          Mobile
                        </span>
                      </td>
                      <td>
                        <div className="progress" style={{ height: 6 }}>
                          <div
                            className="progress-bar progress-bar-striped bg-secondary"
                            role="progressbar"
                            aria-valuenow={85}
                            aria-valuemin={20}
                            aria-valuemax={100}
                            style={{ width: "85%" }}
                          />
                        </div>
                      </td>
                      <td className="text-truncate">$ 1200.00</td>
                    </tr>
                    <tr>
                      <td className="text-truncate">iPad</td>
                      <td className="text-truncate">Dale P. Warman</td>
                      <td>
                        <span className="badge badge-soft-secondary p-2">
                          Tablet
                        </span>
                      </td>
                      <td>
                        <div className="progress" style={{ height: 6 }}>
                          <div
                            className="progress-bar progress-bar-striped bg-secondary"
                            role="progressbar"
                            aria-valuenow={72}
                            aria-valuemin={20}
                            aria-valuemax={100}
                            style={{ width: "72%" }}
                          />
                        </div>
                      </td>
                      <td className="text-truncate">$ 1190.00</td>
                    </tr>
                    <tr>
                      <td className="text-truncate">OnePlus</td>
                      <td className="text-truncate">Garth J. Terry</td>
                      <td>
                        <span className="badge badge-soft-secondary p-2">
                          Electronics
                        </span>
                      </td>
                      <td>
                        <div className="progress" style={{ height: 6 }}>
                          <div
                            className="progress-bar progress-bar-striped bg-secondary"
                            role="progressbar"
                            aria-valuenow={43}
                            aria-valuemin={20}
                            aria-valuemax={100}
                            style={{ width: "43%" }}
                          />
                        </div>
                      </td>
                      <td className="text-truncate">$ 999.00</td>
                    </tr>
                    <tr>
                      <td className="text-truncate">ZenPad</td>
                      <td className="text-truncate">Marilyn D. Bailey</td>
                      <td>
                        <span className="badge badge-soft-secondary p-2">
                          Cosmetics
                        </span>
                      </td>
                      <td>
                        <div className="progress" style={{ height: 6 }}>
                          <div
                            className="progress-bar progress-bar-striped bg-secondary"
                            role="progressbar"
                            aria-valuenow={37}
                            aria-valuemin={20}
                            aria-valuemax={100}
                            style={{ width: "37%" }}
                          />
                        </div>
                      </td>
                      <td className="text-truncate">$ 1150.00</td>
                    </tr>
                    <tr>
                      <td className="text-truncate">Pixel 2</td>
                      <td className="text-truncate">Denise R. Vaughan</td>
                      <td>
                        <span className="badge badge-soft-secondary p-2">
                          Appliences
                        </span>
                      </td>
                      <td>
                        <div className="progress" style={{ height: 6 }}>
                          <div
                            className="progress-bar progress-bar-striped bg-secondary"
                            role="progressbar"
                            aria-valuenow={82}
                            aria-valuemin={20}
                            aria-valuemax={100}
                            style={{ width: "82%" }}
                          />
                        </div>
                      </td>
                      <td className="text-truncate">$ 1180.00</td>
                    </tr>
                    <tr>
                      <td className="text-truncate">Pixel 2</td>
                      <td className="text-truncate">Jeffery R. Wilson</td>
                      <td>
                        <span className="badge badge-soft-secondary p-2">
                          Mobile
                        </span>
                      </td>
                      <td>
                        <div className="progress" style={{ height: 6 }}>
                          <div
                            className="progress-bar progress-bar-striped bg-secondary"
                            role="progressbar"
                            aria-valuenow={36}
                            aria-valuemin={20}
                            aria-valuemax={100}
                            style={{ width: "36%" }}
                          />
                        </div>
                      </td>
                      <td className="text-truncate">$ 1180.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
