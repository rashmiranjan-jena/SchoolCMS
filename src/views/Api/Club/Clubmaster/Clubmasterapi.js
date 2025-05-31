import axios from "axios";
// ClubDataFetcher.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Clubnametable from "./Clubnametable"; 

export const ClubDataFetcher = () => {
  const [clubData, setClubData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE}/api/clubs`);
        if (response.status === 200) {
          setClubData(response.data); // Set the data from API to state
        } else {
          Swal.fire("Error!", "Failed to load clubs data.", "error");
        }
      } catch (error) {
        Swal.fire("Error!", "There was an error fetching the data.", "error");
      } finally {
        setLoading(false); // Stop the loading after the request is done
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once

  if (loading) {
    return <div>Loading...</div>; 
  }

  return <Clubnametable data={clubData} />; 
};
