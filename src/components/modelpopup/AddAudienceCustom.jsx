import React, { useState, useRef } from "react";
import Select from "react-select";
// import Breadcrumbs from '../../../components/Breadcrumbs';
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const AddAudienceCustom = () => {
  const [formData, setFormData] = useState({ name: "", field: "" });
  const [inputFields, setInputFields] = useState([]);

  // const optionsOther = [
  //     { label: "Other", value: "Other" },
  //     // { label: "Brand", value: "Brand" },
  //     // { label: "Lead generation", value: "Lead generation" },
  //   ];
  //   const customStyles = {
  //     option: (provided, state) => ({
  //       ...provided,
  //       backgroundColor: state.isFocused ? "#FF902F" : "#fff",
  //       color: state.isFocused ? "#fff" : "#000",
  //       "&:hover": {
  //         backgroundColor: "#FF902F",
  //       },
  //     }),
  //   };

  // Handle Save Button Click
  const handleSave = (event) => {
    event.preventDefault();
    const numericValue = parseInt(formData.field, 10);
    if (!isNaN(numericValue) && numericValue > 0) {
      if (!formData.name.trim()) {
        alert("Please enter a valid name.");
        return;
      }

      const fieldsArray = Array.from({ length: numericValue }, () => ({
        value: "", // Placeholder for each field's input value
      }));

      setInputFields(fieldsArray);
    } else {
      alert("Please enter a valid numeric value greater than 0.");
    }
  };

  return (
    <>
      <div className="tab-content">
        <div id="Custom" className="pro-overview tab-pane fade show active">
          <div className="row">
            <div className="col-md-12 mb-1" style={{ marginLeft: "10px" }}>
              <form className="needs-validation" noValidate="">
                <div className="row">
                  {/* <h1 className=' mb-3'style={{textDecoration:'underline', fontSize:'35px'}}> Demographics</h1> */}
                  {/* Range Age */}

                  <div className="container mt-4">
                    {/* Saved Data Section */}
                    <div className="container mt-4">
                      {/* Saved Data Section */}
                      <div className="row align-items-center">
                        {inputFields.length > 0 ? (
                          <>
                            {/* Name Label */}
                            <div className="col-auto">
                              <label
                                style={{
                                  fontWeight: "bold",
                                  display: "block",
                                  fontSize: "16px",
                                  marginRight: "10px",
                                  marginLeft: "10px",
                                }}
                              >
                                {formData.name}
                              </label>
                            </div>

                            {/* Dynamically Generated Input Fields */}
                            <div className="col">
                              <div className="d-flex flex-wrap">
                                {inputFields.map((field, index) => (
                                  <input
                                    key={index}
                                    type="text"
                                    className="form-control"
                                    placeholder=""
                                    style={{
                                      width: "80px",
                                      marginTop: "4px",
                                      marginRight: "10px",
                                      borderRadius: "4px",
                                    }}
                                    value={field.value}
                                    onChange={(e) => {
                                      const updatedFields = [...inputFields];
                                      updatedFields[index].value =
                                        e.target.value;
                                      setInputFields(updatedFields);
                                    }}
                                  />
                                ))}
                              </div>
                            </div>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>

                    <hr className="mt-5" style={{ marginRight: "20px" }} />

                    <div className="row align-items-center mt-3 mb-3">
                      {/* Others Button */}
                      <div className="col-md-2" style={{ marginLeft: "21px" }}>
                        <h3>Custom</h3>
                      </div>
                      {/* Name Field */}
                      <div className="col-md-3">
                        <label
                          htmlFor="nameField"
                          style={{ fontWeight: "bold" }}
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="nameField"
                          placeholder="Enter Name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          style={{
                            borderRadius: "4px",
                          }}
                        />
                      </div>

                      {/* Numeric Field */}
                      <div className="col-md-3">
                        <label
                          htmlFor="numericField"
                          style={{ fontWeight: "bold" }}
                        >
                          Field (Put Numeric)
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="numericField"
                          placeholder="Enter Number"
                          value={formData.field}
                          onChange={(e) =>
                            setFormData({ ...formData, field: e.target.value })
                          }
                          style={{
                            borderRadius: "4px",
                          }}
                        />
                      </div>

                      {/* Save Button */}
                      <div className="col-md-2">
                        <button
                          className="btn btn-primary"
                          style={{ marginTop: "32px" }}
                          onClick={handleSave}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAudienceCustom;
