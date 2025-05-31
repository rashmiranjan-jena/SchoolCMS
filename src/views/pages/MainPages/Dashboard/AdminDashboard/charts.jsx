import React, { useEffect, useState } from "react"; 
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import axios from "axios";

const Charts = () => {
  const [barChartData, setBarChartData] = useState([]);
  const [feeCollectionData, setFeeCollectionData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const feeHeadApi = `${process.env.REACT_APP_BASE}/api/fee-heads/`;
        const feeCollectionApi = `${process.env.REACT_APP_BASE}/api/fee-collections/`;
  
        const feeHeadResponse = await axios.get(feeHeadApi);
        console.log("Fee Head API Response: ", feeHeadResponse.data);
  
        // Aggregate total_amount for the same course
        if (Array.isArray(feeHeadResponse.data)) {
          const aggregatedFeeHeadData = feeHeadResponse.data.reduce((acc, item) => {
            const existingCourse = acc.find((entry) => entry.course === item.course);
            if (existingCourse) {
              existingCourse.total_amount += item.total_amount; // Sum total_amount for the same course
            } else {
              acc.push({
                course: item.course,
                total_amount: item.total_amount || 0,
              });
            }
            return acc;
          }, []);
  
          console.log("Aggregated Fee Head Data: ", aggregatedFeeHeadData); // Check the result
  
          setBarChartData(aggregatedFeeHeadData);
        }
  
        const feeCollectionResponse = await axios.get(feeCollectionApi);
        console.log("Fee Collection API Response: ", feeCollectionResponse.data);
  
        if (Array.isArray(feeCollectionResponse.data)) {
          const formattedFeeCollectionData = feeCollectionResponse.data.map((item) => ({
            course: item.course,
            total_collection: item.total_collection || 0,
          }));
          setFeeCollectionData(formattedFeeCollectionData);
        }
  
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  if (loading) {
    return <div>Loading...</div>;
  }

  // Debugging to ensure the data is correctly passed to the chart
  console.log("BarChart Data: ", barChartData);
  console.log("Fee Collection Data: ", feeCollectionData);

  return (
    <div className="row">
      <div className="col-md-12 d-flex justify-content-between">
        {/* Fee Heads Overview */}
        <div className="card mb-4" style={{ width: "48%" }}>
          <div className="card-body text-center">
            <h3 className="card-title">Fee Heads Overview</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={barChartData}
                margin={{
                  top: 20,
                  right: 20,
                  left: 20,
                  bottom: 40,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="course">
                  <LabelList dataKey="course" position="bottom" offset={0} />
                </XAxis>
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total_amount" fill="#8884d8" name="Total Amount">
                  <LabelList dataKey="total_amount" position="top" fill="#000" fontSize={14} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fee Collection Overview */}
        <div className="card" style={{ width: "48%" }}>
          <div className="card-body text-center">
            <h3 className="card-title">Fee Collection Overview</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={feeCollectionData}
                margin={{
                  top: 20,
                  right: 20,
                  left: 20,
                  bottom: 40,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="course">
                  <LabelList dataKey="course" position="bottom" offset={0} />
                </XAxis>
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total_collection" fill="#82ca9d" name="Total Collection">
                  <LabelList dataKey="total_collection" position="top" fill="#000" fontSize={14} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
