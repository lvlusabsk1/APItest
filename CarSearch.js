import React, { useState } from "react";
import axios from "axios";

const CarSearch = () => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [carData, setCarData] = useState(null);
  const [error, setError] = useState("");

  const fetchCarData = async () => {
    setError("");
    setCarData(null);
    try {
      const response = await axios.get("https://carapi.app/api/models", {
        headers: {
          "Authorization": `Bearer ${process.env.REACT_APP_CAR_API_KEY}`
        },
        params: { make, model }
      });

      if (response.data.data.length === 0) {
        setError("No data found for this make and model.");
      } else {
        setCarData(response.data.data[0]);
      }
    } catch (err) {
      setError("Failed to fetch data. Check your API key and network.");
    }
  };

  return (
    <div>
      <h2>Car Specification Finder</h2>
      <input type="text" placeholder="Enter Make" value={make} onChange={(e) => setMake(e.target.value)} />
      <input type="text" placeholder="Enter Model" value={model} onChange={(e) => setModel(e.target.value)} />
      <button onClick={fetchCarData}>Search</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {carData && (
        <div>
          <h3>Car Specifications</h3>
          <p><strong>Make:</strong> {carData.make}</p>
          <p><strong>Model:</strong> {carData.model}</p>
          <p><strong>Year:</strong> {carData.year}</p>
          <p><strong>Engine:</strong> {carData.engine_type}</p>
          <p><strong>Horsepower:</strong> {carData.horsepower}</p>
        </div>
      )}
    </div>
  );
};

export default CarSearch;
