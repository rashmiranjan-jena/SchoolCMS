import React, { useState } from "react";
import styled from "styled-components";

// Styled component defined outside the component
// const ImportantModal = styled.div`
//   max-width: 862px !important;
//   max-height: 500vh !important;
// `;

const AddPageManager = () => {
  // State for sections
  const [sections, setSections] = useState([{ content: "", images: "", links: "" }]);

  // Add new section
  const handleAddSection = () => {
    setSections((prevSections) => [
      ...prevSections,
      { content: "", images: "", links: "" },
    ]);
  };

  const [formFields, setFormFields] = useState([
    { socialName: "", socialIcon: null, url: "" },
  ]);

  // Handle input changes
  const handleSectionChange = (index, field, value) => {
    setSections((prevSections) =>
      prevSections.map((section, idx) =>
        idx === index ? { ...section, [field]: value } : section
      )
    );
  };

  const handleAddMore = () => {
    setFormFields((prevFields) => [
      ...prevFields,
      { socialName: "", socialIcon: null, url: "" },
    ]);
  };

  return (
    <div id="add_PageManager" className="modal custom-modal fade" role="dialog">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <span className="text-muted fw-light">Page Maker /</span> Page Manager
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="PageName" className="form-label">Page Name</label>
                <select id="PageName" className="form-control">
                  <option value="Page 1">Page 1</option>
                  <option value="Page 2">Page 2</option>
                  <option value="Page 3">Page 3</option>
                </select>
              </div>

              <h6 className="mt-4">Manage Sections</h6>
              {sections.map((section, index) => (
                <div key={index} className="border p-3 mb-3 rounded">
                  <div className="mb-3">
                    <label htmlFor={`content-${index}`} className="form-label">Content</label>
                    <input
                      type="text"
                      id={`content-${index}`}
                      className="form-control"
                      value={section.content}
                      onChange={(e) =>
                        handleSectionChange(index, "content", e.target.value)
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor={`images-${index}`} className="form-label">Images</label>
                    <input
                      type="text"
                      id={`images-${index}`}
                      className="form-control"
                      value={section.images}
                      onChange={(e) =>
                        handleSectionChange(index, "images", e.target.value)
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor={`links-${index}`} className="form-label">Links</label>
                    <input
                      type="text"
                      id={`links-${index}`}
                      className="form-control"
                      value={section.links}
                      onChange={(e) =>
                        handleSectionChange(index, "links", e.target.value)
                      }
                    />
                  </div>
                </div>
              ))}

              {/* <button
                type="button"
                className="btn btn-link mb-3"
                onClick={handleAddSection}
              >
                + Add More Sections
              </button> */}
            </form>

            <div className="d-flex justify-content-end mt-3">
              <button
                type="button"
                className="btn btn-success me-2"
                onClick={handleAddSection}
              >
                Add More
              </button>
              <button type="button" className="btn btn-primary me-2">
                Save
              </button>
              <button type="button" className="btn btn-secondary">
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPageManager;
