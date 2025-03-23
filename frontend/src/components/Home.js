import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Home.css";

const API_URL = "http://127.0.0.1:5000"

function Home() {
  const [home, setHome] = useState([]);

  useEffect(() => {
    fetchHome();
  }, []);

  const fetchHome = async () => {
    try {
      const response = await axios.get(`${API_URL}`);
      setHome(response.data);
    } catch (error) {
      console.error("There was an error fetching the status!", error);
    }
  };

  return (
    <div className="home-container">
      <div className="home-list-container">
        <table className="home-table">
          <thead>
            <tr>
              <th>Visited Stadium</th>
              <th>Watched Games</th>
              <th>Watched Homeruns</th>
            </tr>
          </thead>
          <tbody>
            {home.map((h, index) => (
              <tr key={index}>
                <td><strong>{h.stadium}</strong></td>
                <td><strong>{h.game}</strong></td>
                <td><strong>{h.HR}</strong></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
