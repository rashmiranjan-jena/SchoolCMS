import React, { useRef, useState } from "react";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify"; 
import { create } from "../../utils/intercepter";

const AddSocialMaster = () => {
  const initialData = { socialName: "", socialIcon: null, url: "" }
  const [formFields, setFormFields] = useState([
    initialData,
  ]);
  const formRef = useRef(null);

  const handleAddMore = () => {
    setFormFields((prevFields) => [
      ...prevFields,
      { socialName: "", socialIcon: null, url: "" },
    ]);
  };

  const handleInputChange = (index, field, value) => {
    setFormFields((prevFields) =>
      prevFields.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const handleRemove = (indexToRemove) => {
    if (formFields.length > 1) {
      setFormFields((prevFields) => 
        prevFields.filter((_, index) => index !== indexToRemove)
      );
    }
  };

  const validateForm = () => {
    let isValid = true;

   
    formFields.forEach((field, index) => {
     
      if (!field.socialName.trim()) {
        toast.error(`Social Name is required for entry ${index + 1}`);
        isValid = false;
      }

     
      if (!field.url.trim()) {
        toast.error(`URL is required for entry ${index + 1}`);
        isValid = false;
      } else {
       
        const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        if (!urlPattern.test(field.url)) {
          toast.error(`Invalid URL format for entry ${index + 1}`);
          isValid = false;
        }
      }

     
      if (!field.socialIcon) {
        toast.error(`Social Icon is required for entry ${index + 1}`);
        isValid = false;
      } else {
        const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/svg+xml"];
        if (!(field.socialIcon instanceof File)) {
          toast.error(`Social Icon must be a file for entry ${index + 1}`);
          isValid = false;
        } else if (!allowedTypes.includes(field.socialIcon.type)) {
          toast.error(`Invalid image type for Social Icon in entry ${index + 1}. Allowed types: JPEG, PNG, GIF, SVG`);
          isValid = false;
        }
      }
    });

    return isValid;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
   
    if (!validateForm()) return;
  
    const formData = new FormData();
  
   
    formFields.forEach((field, index) => {
      formData.append(`social_name[${index}]`, field.socialName);
      formData.append(`url[${index}]`, field.url);
      formData.append(`social_icon[${index}]`, field.socialIcon);
    });
  
    try {
      const response = await create("social-master/", formData);
      toast.success("Form submitted successfully!");
      resetForm();
    } catch (error) {
      toast.error("Error submitting form. Please try again.");
    }
  };
  
  const resetForm = () => {
    setFormFields([initialData]);
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  return (
    <div id="add_Social" className="modal custom-modal fade" role="dialog">
      <ToastContainer />
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <span className="text-muted fw-light">System /</span> Social Master
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form ref={formRef}>
              {formFields.map((field, index) => (
                <div className="row mb-3" key={index}>
                  <div className="col-4">
                    <label htmlFor={`socialName-${index}`} className="form-label">
                      Social Name
                    </label>
                    <input
                      type="text"
                      id={`socialName-${index}`}
                      className="form-control"
                      value={field.socialName}
                      onChange={(e) =>
                        handleInputChange(index, "socialName", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-4">
                    <label htmlFor={`socialIcon-${index}`} className="form-label">
                      Social Icon
                    </label>
                    <input
                      type="file"
                      id={`socialIcon-${index}`}
                      className="form-control"
                      onChange={(e) =>
                        handleInputChange(index, "socialIcon", e.target.files[0])
                      }
                    />
                  </div>
                  <div className="col-4">
                    <label htmlFor={`url-${index}`} className="form-label">
                      URL
                    </label>
                    <input
                      type="text"
                      id={`url-${index}`}
                      className="form-control"
                      value={field.url}
                      onChange={(e) =>
                        handleInputChange(index, "url", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-3 d-flex align-items-end">
                    {formFields.length > 1 && (
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleRemove(index)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </form>
            <div className="d-flex justify-content-end mt-3">
              <button
                type="button"
                className="btn btn-success me-2"
                onClick={handleAddMore}
              >
                Add More
              </button>
              <button 
                type="button" 
                className="btn btn-primary me-2"
                onClick={handleSubmit}
              >
                Save
              </button>
              <button 
                type="button" 
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSocialMaster;