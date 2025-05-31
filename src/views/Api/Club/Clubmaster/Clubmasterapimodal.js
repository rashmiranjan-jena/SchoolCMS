import axios from "axios";

export const Clubmasterapimodal = async (formData) => {
  try {
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    const response = await axios.post(
      `${process.env.REACT_APP_BASE}/api/club_member_master/`,
      formDataToSend,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return response; 
  } catch (error) {
    throw error; 
  }
};


export const Clubmasterapi = async () => {
  try {
    const [clubResponse, designationResponse, yearResponse] = await Promise.all([
      axios.get(`${process.env.REACT_APP_BASE}/api/club_master/`),
      axios.get(`${process.env.REACT_APP_BASE}/api/designation/`),
      axios.get(`${process.env.REACT_APP_BASE}/api/calender-year/`),
    ]);

    return {
      clubNames: clubResponse.data,
      designations: designationResponse.data,
      academicYears: yearResponse.data,
    };
  } catch (error) {
    console.error("Failed to fetch dropdown data:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};
