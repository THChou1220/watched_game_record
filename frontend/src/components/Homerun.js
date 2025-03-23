import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Homerun.css";

const API_URL = "http://127.0.0.1:5000";

function Homerun() {
  const [homeruns, setHomeruns] = useState([]);
  const [newHomerun, setNewHomerun] = useState({
    number: "",
    game_number: "",
    player_team: "",
    player_name: "",
    RBI: "",
  });
  const [editHomerun, setEditHomerun] = useState({
    number: "",
    game_number: "",
    player_team: "",
    player_name: "",
    RBI: "",
  });
  const [deleteNumber, setDeleteNumber] = useState("");
  const [showForm, setShowForm] = useState({
    add: false,
    edit: false,
    delete: false,
  });

  useEffect(() => {
    fetchHomeruns();
  }, []);

  const fetchHomeruns = async () => {
    try {
      const response = await axios.get(`${API_URL}/homerun`);
      setHomeruns(response.data);
    } catch (error) {
      console.error("There was an error fetching the homeruns!", error);
    }
  };

  const addHomerun = async () => {
    try {
      await axios.post(`${API_URL}/homerun`, newHomerun);
      fetchHomeruns();
      resetNewHomerunForm();
      setShowForm({ ...showForm, add: false });
    } catch (error) {
      console.error("There was an error creating the homerun!", error);
    }
  };

  const updateHomerun = async () => {
    try {
      await axios.patch(
        `${API_URL}/homerun/${editHomerun.number}`,
        editHomerun
      );
      fetchHomeruns();
      resetEditHomerunForm();
      setShowForm({ ...showForm, edit: false });
    } catch (error) {
      console.error("There was an error updating the homerun!", error);
    }
  };

  const deleteHomerun = async (number) => {
    try {
      await axios.delete(`${API_URL}/homerun/${number}`);
      fetchHomeruns();
      setDeleteNumber("");
      setShowForm({ ...showForm, delete: false });
    } catch (error) {
      console.error("There was an error deleting the homerun!", error);
    }
  };

  const resetNewHomerunForm = () => {
    setNewHomerun({
      number: "",
      game_number: "",
      player_team: "",
      player_name: "",
      RBI: "",
    });
  };

  const resetEditHomerunForm = () => {
    setEditHomerun({
      game_number: "",
      player_team: "",
      player_name: "",
      RBI: "",
    });
  };

  const resetDeleteNumber = () => {
    setDeleteNumber("");
  };

  const handleNewHomerunChange = (e, field) => {
    setNewHomerun({ ...newHomerun, [field]: e.target.value });
  };

  const handleEditHomerunChange = (e, field) => {
    setEditHomerun({ ...editHomerun, [field]: e.target.value });
  };

  const handleDeleteNumberChange = (e) => {
    setDeleteNumber(e.target.value);
  };

  return (
    <div className="homeruns-container">
      <div className="homeruns-list-container">
        <h2 className="homeruns-header">Homeruns</h2>
        <table className="homeruns-table">
          <thead>
            <tr>
              <th>Number</th>
              <th>Game Number</th>
              <th>Stadium</th>
              <th>Team</th>
              <th>Player</th>
              <th>RBI</th>
            </tr>
          </thead>
          <tbody>
            {homeruns.map((homerun, index) => (
              <tr key={index}>
                <td>{homerun.number}</td>
                <td>{homerun.game}</td>
                <td>{homerun.stadium}</td>
                <td>{homerun.team}</td>
                <td>{homerun.player}</td>
                <td>{homerun.RBI}</td>
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
            resetEditHomerunForm();
            resetDeleteNumber();
            setShowForm({ add: !showForm.add, edit: false, delete: false });
          }}
        >
          Add
        </button>
        <button
          className="action-button"
          onClick={() => {
            resetNewHomerunForm();
            resetDeleteNumber();
            setShowForm({ add: false, edit: !showForm.edit, delete: false });
          }}
        >
          Edit
        </button>
        <button
          className="action-button"
          onClick={() => {
            resetNewHomerunForm();
            resetEditHomerunForm();
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
                <th colSpan="2">Add Homerun</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Number</td>
                <td>
                  <input
                    className="action-form"
                    type="text"
                    value={newHomerun.number}
                    onChange={(e) => handleNewHomerunChange(e, "number")}
                  />
                </td>
              </tr>
              <tr>
                <td>Game Number</td>
                <td>
                  <input
                    className="action-form"
                    type="text"
                    value={newHomerun.game_number}
                    onChange={(e) => handleNewHomerunChange(e, "game_number")}
                  />
                </td>
              </tr>
              <tr>
                <td>Player Team</td>
                <td>
                  <input
                    className="action-form"
                    type="text"
                    value={newHomerun.player_team}
                    onChange={(e) => handleNewHomerunChange(e, "player_team")}
                  />
                </td>
              </tr>
              <tr>
                <td>Player Name</td>
                <td>
                  <input
                    className="action-form"
                    type="text"
                    value={newHomerun.player_name}
                    onChange={(e) => handleNewHomerunChange(e, "player_name")}
                  />
                </td>
              </tr>
              <tr>
                <td>RBI</td>
                <td>
                  <select
                    className="action-form"
                    value={newHomerun.RBI}
                    onChange={(e) => handleNewHomerunChange(e, "RBI")}
                  >
                    <option value=""></option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <button className="action-button" onClick={addHomerun}>
                    Confirm
                  </button>
                  <button
                    className="action-button"
                    onClick={() => {
                      resetNewHomerunForm();
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
                <th>Edit Homerun</th>
                <th>
                  <input
                    style={{ border: "1px dashed black" }}
                    className="action-form"
                    type="text"
                    placeholder="Number"
                    value={editHomerun.number}
                    onChange={(e) => handleEditHomerunChange(e, "number")}
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Game Number</td>
                <td>
                  <input
                    className="action-form"
                    type="text"
                    value={editHomerun.game_number}
                    onChange={(e) => handleEditHomerunChange(e, "game_number")}
                  />
                </td>
              </tr>
              <tr>
                <td>Player Team</td>
                <td>
                  <input
                    className="action-form"
                    type="text"
                    value={editHomerun.player_team}
                    onChange={(e) => handleEditHomerunChange(e, "plater_team")}
                  />
                </td>
              </tr>
              <tr>
                <td>Player Name</td>
                <td>
                  <input
                    className="action-form"
                    type="text"
                    value={editHomerun.player_name}
                    onChange={(e) => handleEditHomerunChange(e, "player_name")}
                  />
                </td>
              </tr>
              <tr>
                <td>RBI</td>
                <td>
                  <select
                    className="action-form"
                    value={editHomerun.RBI}
                    onChange={(e) => handleEditHomerunChange(e, "RBI")}
                  >
                    <option value=""></option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <button className="action-button" onClick={updateHomerun}>
                    Confirm
                  </button>
                  <button
                    className="action-button"
                    onClick={() => {
                      resetEditHomerunForm();
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
                <th colSpan="2">Delete Homerun</th>
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
                    onClick={() => deleteHomerun(deleteNumber)}
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

export default Homerun;
