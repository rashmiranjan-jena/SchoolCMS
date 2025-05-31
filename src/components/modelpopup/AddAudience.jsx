import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddAudienceTab from "./AddAudienceTab";
import AddAudienceDemoGraphics from "./AddAudienceDemoGraphics";
import AddAudienceGeoGraphics from "./AddAudienceGeoGraphics";
import AddAudienceProducts from "./AddAudienceProducts";
import AddAudienceCustom from "./AddAudienceCustom";

const AddAudience = () => {
  const [activeTab, setActiveTab] = useState("segment");

  const tabs = ["segment", "demoGraphics", "geographics", "product", "Custom"];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleNextClick = () => {
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]); // Go to the next tab
    } else {
      // Handle form submission or any action for the last tab
      alert("Form submitted");
    }
  };

  return (
    <div id="add_audience" className="modal custom-modal fade" role="dialog">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <span className="text-muted fw-light">Audience Segment /</span> Add Audience
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="card tab-box">
                <div className="row user-tabs">
                  <div className="col-lg-12 col-md-12 col-sm-12 line-tabs">
                    <ul className="nav nav-tabs nav-tabs-bottom">
                      {tabs.map((tab) => (
                        <li className="nav-item" key={tab}>
                          <Link
                            to={`#${tab}`}
                            onClick={() => handleTabClick(tab)}
                            className={`nav-link ${activeTab === tab ? "active" : ""}`}
                          >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="tab-content">
                  {activeTab === "segment" && <AddAudienceTab />}
                  {activeTab === "demoGraphics" && <AddAudienceDemoGraphics />}
                  {activeTab === "geographics" && <AddAudienceGeoGraphics />}
                  {activeTab === "product" && <AddAudienceProducts />}
                  {activeTab === "Custom" && <AddAudienceCustom />}
                </div>
              </div>
              <div
                className="next-section"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "10px",
                  marginBottom: "10px",
                }}
              >
                <button
                  className="btn btn-primary next-btn"
                  onClick={handleNextClick}
                  type="button"
                >
                  {activeTab === tabs[tabs.length - 1] ? "Submit" : "Next"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAudience;
