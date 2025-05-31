
import React, { useState,  useRef } from 'react'
import Select from "react-select";
// import Breadcrumbs from '../../../components/Breadcrumbs';
import Slider from 'rc-slider';
import "rc-slider/assets/index.css";

const AddAudienceDemoGraphics = () => {
  const [formData, setFormData] = useState({ name: "", field: "" });
  const [savedData, setSavedData] = useState([]); 
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
     
      const optionGender = [
        { label: "Male", value: "Male" },
        { label: "FeMale", value: "FeMale" },
        { label: "TransGender", value: "TransGender" },
      ];
      
      const customGender= {
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isFocused ? "#FF902F" : "#fff",
          color: state.isFocused ? "#fff" : "#000",
          "&:hover": {
            backgroundColor: "#FF902F",
          },
        }),
      };
      
      const optionEducation = [
        { label: "Male", value: "Male" },
        { label: "FeMale", value: "FeMale" },
        { label: "TransEducation", value: "TransEducation" },
      ];
      
      const customEducation= {
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isFocused ? "#FF902F" : "#fff",
          color: state.isFocused ? "#fff" : "#000",
          "&:hover": {
            backgroundColor: "#FF902F",
          },
        }),
      };
      

      const optionOccupation = [
        { label: "Male", value: "Male" },
        { label: "FeMale", value: "FeMale" },
        { label: "TransOccupation", value: "TransOccupation" },
      ];
      
      const customOccupation= {
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isFocused ? "#FF902F" : "#fff",
          color: state.isFocused ? "#fff" : "#000",
          "&:hover": {
            backgroundColor: "#FF902F",
          },
        }),
      };

      const optionProduct = [
        { label: "Product1", value: "Product1" },
        { label: "Product2", value: "Product2" },
        { label: "Product3", value: "Product3" },
      ];
      
      const customProduct= {
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isFocused ? "#FF902F" : "#fff",
          color: state.isFocused ? "#fff" : "#000",
          "&:hover": {
            backgroundColor: "#FF902F",
          },
        }),
      };
      
      const customDropList= {
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isFocused ? "#FF902F" : "#fff",
          color: state.isFocused ? "#fff" : "#000",
          "&:hover": {
            backgroundColor: "#FF902F",
          },
        }),
      };
     

      // range Age
      const [sliderValueDefault, setSliderValueDefault] = useState(0);

      const handleChangeDefault = (value) => {
          setSliderValueDefault(value);
      };
      // range Income
      const [sliderValueIncome, setSliderValueIncome] = useState([200, 800]);

      const handleChangeIncome = (value) => {
          setSliderValueIncome(value);
      };

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
                <div
                  id="demoGraphics"
                  className="pro-overview tab-pane fade show active"
                >
                  <div className="row">
                    <div className="col-md-12 mb-1" style={{marginLeft: '10px'}}>
                    
                    <form className="needs-validation" noValidate="">
                    <div className="row">
                                
                              {/* <h1 className=' mb-3'style={{textDecoration:'underline', fontSize:'35px'}}> Demographics</h1> */}
                              {/* Range Age */}
                                  <div className="col-md-6">
                                    <div className="card-header">
                                      <h5 className="card-title">Age</h5>
                                    </div>
                                    <div className="card-body">
                                      <Slider
                                      min={8}
                                      max={65}
                                      value={sliderValueDefault}
                                      defaultValue={[8, 65]}
                                      onChange={handleChangeDefault}
                                      />
                                      {sliderValueDefault}
                                    </div>
                                  </div>
                                  {/* Gender */}
                                <div className="col-md-4 mb-3 mt-3">
                                  <h5 className="card-title">Gender</h5>

                                      <Select
                                        placeholder="choose"
                                        options={optionGender}
                                        styles={customGender}
                                        isSearchable={false}
                                        
                                      />
                                      <div className="valid-feedback">Looks good!</div>
                                </div>
                                {/* Range Age */}
                                <div className="col-md-12">
                                  <div className="card-header">
                                    <h5 className="card-title">Income</h5>
                                  </div>
                                  <div className="card-body d-flex align-items-center justify-content-between">
                                    {/* Slider Section */}
                                    <div className="slider-container" style={{ flex: 1 }}>

                                    <Slider
                                                      min={0}
                                                      max={1000}
                                                      step={2}
                                                      value={sliderValueIncome}
                                                      onChange={handleChangeIncome}
                                                      range
                                                />
                                                  ₹{sliderValueIncome[0]} ₹{sliderValueIncome[1]}
                                              </div>
                                      {/* <Slider
                                        min={8}
                                        max={65}
                                        value={sliderValueIncome}
                                        defaultValue={[8, 65]}
                                        onChange={handleChangeIncome}
                                      />
                                      <div>{sliderValueIncome}</div>
                                    </div> */}

                                    {/* Dropdown Section */}
                                    <div className="currency-dropdown" style={{ marginLeft: "10px", marginTop:"-20px" }}>
                                      <select className="form-select">
                                        <option value="" disabled selected>
                                          Select Currency
                                        </option>
                                        <option value="inr">₹ Rupees</option>
                                        <option value="usd">$ Dollar</option>
                                      </select>
                                    </div>
                                    <div className="currency-dropdown" style={{ marginLeft: "10px", marginTop:"-20px" }}>
                                      <select className="form-select">
                                        <option value="" disabled selected>
                                          Select TimeLine
                                        </option>
                                        <option value="inr">Monthly</option>
                                        <option value="usd">Anually</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              
                                {/* Education */}
                                <div className="col-md-6 mb-3 mt-3 ml-5" style={{marginLeft: '21px'}}>
                                  <h5 className="card-title">Education</h5>

                                      <Select
                                        placeholder="choose"
                                        options={optionEducation}
                                        styles={customEducation}
                                        isSearchable={false}
                                        isMulti={true} 
                                      />
                                      <div className="valid-feedback">Looks good!</div>
                                </div>
                                {/* Occupation */}
                                <div className="col-md-5 mb-3 mt-3 ml-5" >
                                  <h5 className="card-title">Occupation</h5>

                                      <Select
                                        placeholder="choose"
                                        options={optionOccupation}
                                        styles={customOccupation}
                                        isSearchable={false}
                                        isMulti={true} 
                                      />
                                      <div className="valid-feedback">Looks good!</div>
                                </div>
                                

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
                                            placeholder=''
                                            style={{
                                              width: "80px",
                                              marginTop: "4px",
                                              marginRight: "10px",
                                              borderRadius: "4px",
                                            }}
                                            value={field.value}
                                            onChange={(e) => {
                                              const updatedFields = [...inputFields];
                                              updatedFields[index].value = e.target.value; 
                                              setInputFields(updatedFields);
                                            }}
                                          />
                                        ))}
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  ''
                                )}
                              </div>
                            </div>


      <hr className="mt-5" style={{marginRight:'20px'}}/>

      <div className="row align-items-center mt-3 mb-3">
        {/* Others Button */}
        <div className="col-md-2" style={{ marginLeft: "21px" }}>
          <h3>Others</h3>
        </div>
        {/* Name Field */}
        <div className="col-md-3">
          <label htmlFor="nameField" style={{ fontWeight: "bold" }}>
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="nameField"
            placeholder="Enter Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={{
              borderRadius: "4px",
            }}
          />
        </div>

        {/* Numeric Field */}
        <div className="col-md-3">
          <label htmlFor="numericField" style={{ fontWeight: "bold" }}>
            Field (Put Numeric)
          </label>
          <input
            type="number"
            className="form-control"
            id="numericField"
            placeholder="Enter Number"
            value={formData.field}
            onChange={(e) => setFormData({ ...formData, field: e.target.value })}
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

export default AddAudienceDemoGraphics;
