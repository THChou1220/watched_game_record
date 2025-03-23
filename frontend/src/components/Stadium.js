import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Stadium.css";

const API_URL = "http://127.0.0.1:5000";

function Stadium() {
  const [stadiums, setStadiums] = useState([]);
  const [newStadium, setNewStadium] = useState({
    number: "",
    name: "",
    country: "",
    city: "",
    capacity: "",
  });
  const [editStadium, setEditStadium] = useState({
    number: "",
    name: "",
    country: "",
    city: "",
    capacity: "",
  });
  const [deleteNumber, setDeleteNumber] = useState("");
  const [showForm, setShowForm] = useState({
    add: false,
    edit: false,
    delete: false,
  });

  useEffect(() => {
    fetchStadiums();
  }, []);

  const fetchStadiums = async () => {
    try {
      const response = await axios.get(`${API_URL}/stadium`);
      setStadiums(response.data);
    } catch (error) {
      console.error("There was an error fetching the stadiums!", error);
    }
  };

  const addStadium = async () => {
    try {
      await axios.post(`${API_URL}/stadium`, newStadium);
      fetchStadiums();
      resetNewStadiumForm();
      setShowForm({ ...showForm, add: false });
    } catch (error) {
      console.error("There was an error creating the stadium!", error);
    }
  };

  const updateStadium = async () => {
    try {
      await axios.patch(`${API_URL}/stadium/${editStadium.number}`, editStadium);
      fetchStadiums();
      resetEditStadiumForm();
      setShowForm({ ...showForm, edit: false });
    } catch (error) {
      console.error("There was an error updating the stadium!", error);
    }
  };

  const deleteStadium = async (number) => {
    try {
      await axios.delete(`${API_URL}/stadium/${number}`);
      fetchStadiums();
      setDeleteNumber("");
      setShowForm({ ...showForm, delete: false });
    } catch (error) {
      console.error("There was an error deleting the stadium!", error);
    }
  };

  const resetNewStadiumForm = () => {
    setNewStadium({
      number: "",
      name: "",
      country: "",
      city: "",
      capacity: "",
    });
  };

  const resetEditStadiumForm = () => {
    setEditStadium({
      name: "",
      country: "",
      city: "",
      capacity: "",
    });
  };

  const resetDeleteNumber = () => {
    setDeleteNumber("");
  };

  const handleNewStadiumChange = (e, field) => {
    setNewStadium({ ...newStadium, [field]: e.target.value });
  };

  const handleEditStadiumChange = (e, field) => {
    setEditStadium({ ...editStadium, [field]: e.target.value });
  };

  const handleDeleteNumberChange = (e) => {
    setDeleteNumber(e.target.value);
  };

  return (
    <div className="stadiums-container">
      <div className="stadiums-list-container">
        <h2 className="stadiums-header">Stadiums</h2>
        <table className="stadiums-table">
          <thead>
            <tr>
              <th>Number</th>
              <th>Name</th>
              <th>Country</th>
              <th>City</th>
              <th>Capacity</th>
            </tr>
          </thead>
          <tbody>
            {stadiums.map((stadium, index) => (
              <tr key={index}>
                <td>{stadium.number}</td>
                <td>{stadium.name}</td>
                <td>{stadium.country}</td>
                <td>{stadium.city}</td>
                <td>{stadium.capacity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="action-header">
        Action
        <button
          className="action-button"
          onClick={() => {
            resetEditStadiumForm();
            resetDeleteNumber();
            setShowForm({ add: !showForm.add, edit: false, delete: false });
          }}
        >
          Add
        </button>
        <button
          className="action-button"
          onClick={() => {
            resetNewStadiumForm();
            resetDeleteNumber();
            setShowForm({ add: false, edit: !showForm.edit, delete: false });
          }}
        >
          Edit
        </button>
        <button
          className="action-button"
          onClick={() => {
            resetNewStadiumForm();
            resetEditStadiumForm();
            setShowForm({ add: false, edit: false, delete: !showForm.delete });
          }}
        >
          Delete
        </button>
      </h3>

      {showForm.add && (
        <div className="form-container">
          <table className="action-table">
            <thead>
              <tr>
                <th colSpan="2">Add Stadium</th>
              </tr>
            </thead>
            <tbody>
            <tr>
                <td>Number</td>
                <td>
                  <input
                    className="action-form"
                    type="text"
                    value={newStadium.number}
                    onChange={(e) => handleNewStadiumChange(e, "number")}
                  />
                </td>
              </tr>
              <tr>
                <td>Name</td>
                <td>
                  <input
                    className="action-form"
                    type="text"
                    value={newStadium.name}
                    onChange={(e) => handleNewStadiumChange(e, "name")}
                  />
                </td>
              </tr>
              <tr>
                <td>Country</td>
                <td>
                  <input
                    className="action-form"
                    type="text"
                    value={newStadium.country}
                    onChange={(e) => handleNewStadiumChange(e, "country")}
                  />
                </td>
              </tr>
              <tr>
                <td>City</td>
                <td>
                  <input
                    className="action-form"
                    type="text"
                    value={newStadium.city}
                    onChange={(e) => handleNewStadiumChange(e, "city")}
                  />
                </td>
              </tr>
              <tr>
                <td>Capacity</td>
                <td>
                  <input
                    className="action-form"
                    type="text"
                    value={newStadium.capacity}
                    onChange={(e) => handleNewStadiumChange(e, "capacity")}
                  />
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <button className="action-button" onClick={addStadium}>
                    Confirm
                  </button>
                  <button
                    className="action-button"
                    onClick={() => {
                      resetNewStadiumForm();
                      setShowForm({ add: false, edit: false, delete: false });
                    }}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {showForm.edit && (
        <div className="form-container">
          <table className="action-table">
            <thead>
              <tr>
                <th>Edit Stadium</th>
                <th>
                  <input
                    style={{ border: "1px dashed black" }}
                    className="action-form"
                    type="text"
                    placeholder="Number"
                    value={editStadium.number}
                    onChange={(e) => handleEditStadiumChange(e, "number")}
                  />
                </th>
              </tr>
            </thead>
            <tbody>
            <tr>
                <td>Name</td>
                <td>
                  <input
                    className="action-form"
                    type="text"
                    value={editStadium.name}
                    onChange={(e) => handleEditStadiumChange(e, "name")}
                  />
                </td>
              </tr>
              <tr>
                <td>Country</td>
                <td>
                  <input
                    className="action-form"
                    type="text"
                    value={editStadium.country}
                    onChange={(e) => handleEditStadiumChange(e, "country")}
                  />
                </td>
              </tr>
              <tr>
                <td>City</td>
                <td>
                  <input
                    className="action-form"
                    type="text"
                    value={editStadium.city}
                    onChange={(e) => handleEditStadiumChange(e, "city")}
                  />
                </td>
              </tr>
              <tr>
                <td>Capacity</td>
                <td>
                  <input
                    className="action-form"
                    type="text"
                    value={editStadium.capacity}
                    onChange={(e) => handleEditStadiumChange(e, "capacity")}
                  />
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <button className="action-button" onClick={updateStadium}>
                    Confirm
                  </button>
                  <button
                    className="action-button"
                    onClick={() => {
                      resetEditStadiumForm();
                      setShowForm({ add: false, edit: false, delete: false });
                    }}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {showForm.delete && (
        <div className="form-container">
          <table className="action-table">
            <thead>
              <tr>
                <th colSpan="2">Delete Stadium</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    className="action-form"
                    type="text"
                    placeholder="Number"
                    value={deleteNumber}
                    onChange={handleDeleteNumberChange}
                  />
                </td>
                <td>
                  <button
                    className="action-button"
                    onClick={() => deleteStadium(deleteNumber)}
                  >
                    Confirm
                  </button>
                  <button
                    className="action-button"
                    onClick={() => {
                      resetDeleteNumber();
                      setShowForm({ add: false, edit: false, delete: false });
                    }}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Stadium;
