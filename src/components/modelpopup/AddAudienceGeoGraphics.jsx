import React, { useState } from "react";
import Select from "react-select";
import "rc-slider/assets/index.css";

const AddAudienceGeoGraphics = () => {
  const [mapUrl, setMapUrl] = useState(
    "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d29923.748267460505!2d85.83030991756925!3d20.363562908395775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1731758598276!5m2!1sen!2sin"
  );
  const [selectedLocations, setSelectedLocations] = useState([]);

  // List of cities or countries for dropdown search
  const locationOptions = [
    { label: "Bhubaneswar, India", value: "Bhubaneswar,India" },
    { label: "New York, USA", value: "New York,USA" },
    { label: "Tokyo, Japan", value: "Tokyo,Japan" },
    { label: "Paris, France", value: "Paris,France" },
    { label: "London, UK", value: "London,UK" },
    { label: "Sydney, Australia", value: "Sydney,Australia" },
  ];

  // Handle change in dropdown
  const handleLocationChange = (selectedOptions) => {
    setSelectedLocations(selectedOptions || []); // Update state with selected options
    if (selectedOptions.length > 0) {
      const latestLocation = selectedOptions[selectedOptions.length - 1].value;
      const newMapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(
        latestLocation
      )}`;
      setMapUrl(newMapUrl);
    }
  };

  return (
    <>
      <div className="tab-content">
        <div id="geographics" className="pro-overview tab-pane fade show active">
          <div className="row">
            <div className="col-md-12 mb-1" style={{ marginLeft: "10px" }}>
              <form className="needs-validation" noValidate>
                <div className="row">
                  <div className="mb-3">
                    <Select
                      options={locationOptions}
                      isMulti
                      onChange={handleLocationChange}
                      placeholder="Search for a city or country"
                      styles={{
                        container: (provided) => ({
                          ...provided,
                          width: "400px",
                        }),
                      }}
                    />
                  </div>

                  {/* Embedded Google Map */}
                  <iframe
                    src={mapUrl}
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAudienceGeoGraphics;
