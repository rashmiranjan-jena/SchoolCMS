
import React, { useState,  useRef } from 'react'
import Select from "react-select";
// import Breadcrumbs from '../../../components/Breadcrumbs';
import Slider from 'rc-slider';
import "rc-slider/assets/index.css";

const AddAudienceProducts = () => {
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
      

  return (
    <>
    <div className="tab-content">
        <div
            id="product"
            className="pro-overview tab-pane fade show active"
        >
            <div className="row">
                <div className="col-md-12 mb-1" style={{marginLeft: '10px'}}>
                    
                    <form className="needs-validation" noValidate="">
                        <div className="row">
                            <div className="col-md-6 mb-3 mt-0 " >
                                {/* <h5 className="card-title">Product</h5> */}

                                <Select
                                    placeholder="choose"
                                    options={optionProduct}
                                    styles={customProduct}
                                    isSearchable={false}
                                    isMulti={true} 
                                />
                                <div className="valid-feedback">Looks good!</div>
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

export default AddAudienceProducts;
