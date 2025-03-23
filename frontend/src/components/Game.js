import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Game.css";

const API_URL = "http://127.0.0.1:5000";

function Game() {
  const [games, setGames] = useState([]);
  const [newGame, setNewGame] = useState({
    number: "",
    date: getCurrentDate(),
    event: "",
    stadium_number: "",
    away_team: "",
    away_score: "",
    home_team: "",
    home_score: "",
  });
  const [editGame, setEditGame] = useState({
    number: "",
    date: getCurrentDate(),
    event: "",
    stadium_number: "",
    away_team: "",
    away_score: "",
    home_team: "",
    home_score: "",
  });
  const [deleteNumber, setDeleteNumber] = useState("");
  const [showForm, setShowForm] = useState({
    add: false,
    edit: false,
    delete: false,
  });

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await axios.get(`${API_URL}/game`);
      setGames(response.data);
    } catch (error) {
      console.error("There was an error fetching the games!", error);
    }
  };

  const addGame = async () => {
    try {
      await axios.post(`${API_URL}/game`, newGame);
      fetchGames();
      resetNewGameForm();
      setShowForm({ ...showForm, add: false });
    } catch (error) {
      console.error("There was an error creating the game!", error);
    }
  };

  const updateGame = async () => {
    try {
      await axios.patch(`${API_URL}/game/${editGame.number}`, editGame);
      fetchGames();
      resetEditGameForm();
      setShowForm({ ...showForm, edit: false });
    } catch (error) {
      console.error("There was an error updating the game!", error);
    }
  };

  const deleteGame = async (number) => {
    try {
      await axios.delete(`${API_URL}/game/${number}`);
      fetchGames();
      setDeleteNumber("");
      setShowForm({ ...showForm, delete: false });
    } catch (error) {
      console.error("There was an error deleting the game!", error);
    }
  };

  const resetNewGameForm = () => {
    setNewGame({
      number: "",
      date: getCurrentDate(),
      event: "",
      stadium_number: "",
      away_team: "",
      away_score: "",
      home_team: "",
      home_score: "",
    });
  };

  const resetEditGameForm = () => {
    setEditGame({
      date: getCurrentDate(),
      event: "",
      stadium_number: "",
      away_team: "",
      away_score: "",
      home_team: "",
      home_score: "",
    });
  };

  const resetDeleteNumber = () => {
    setDeleteNumber("");
  };

  const handleNewGameChange = (e, field) => {
    setNewGame({ ...newGame, [field]: e.target.value });
  };

  const handleEditGameChange = (e, field) => {
    setEditGame({ ...editGame, [field]: e.target.value });
  };

  const handleDeleteNumberChange = (e) => {
    setDeleteNumber(e.target.value);
  };

  function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  return (
    <div className="games-container">
      <div className="games-list-container">
        <h2 className="games-header">Game</h2>
        <table className="games-table">
          <thead>
            <tr>
              <th>Number</th>
              <th>Date</th>
              <th>Weekday</th>
              <th>Event</th>
              <th>Stadium</th>
              <th>Away Team</th>
              <th>Away Score</th>
              <th>Home Team</th>
              <th>Home Score</th>
              <th>HR</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game, index) => (
              <tr key={index}>
                <td>{game.number}</td>
                <td>{game.date}</td>
                <td>{game.weekday}</td>
                <td>{game.event}</td>
                <td>{game.stadium}</td>
                <td>{game.away_team}</td>
                <td>{game.away_score}</td>
                <td>{game.home_team}</td>
                <td>{game.home_score}</td>
                <td>{game.HR}</td>
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
            resetEditGameForm();
            resetDeleteNumber();
            setShowForm({ add: !showForm.add, edit: false, delete: false });
          }}
        >
          Add
        </button>
        <button
          className="action-button"
          onClick={() => {
            resetNewGameForm();
            resetDeleteNumber();
            setShowForm({ add: false, edit: !showForm.edit, delete: false });
          }}
        >
          Edit
        </button>
        <button
          className="action-button"
          onClick={() => {
            resetNewGameForm();
            resetEditGameForm();
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
                <th colSpan="2">Add Game</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Number</td>
                <td>
                  <input
                    className="action-form"
                    type="text"
                    value={newGame.number}
                    onChange={(e) => handleNewGameChange(e, "number")}
                  />
                </td>
              </tr>
              <tr>
                <td>Date</td>
                <td>
                  <input
                    className="action-form"
                    type="date"
                    min="1900-01-01"
                    max="2199-12-31"
                    value = {newGame.date}
                    onChange={(e) => handleNewGameChange(e, "date")}
                  />
                </td>
              </tr>
              <tr>
                <td>Event</td>
                <td>
                  <input
                    className="action-form"
                    type="text"
                    value={newGame.event}
                    onChange={(e) => handleNewGameChange(e, "event")}
                  />
                </td>
              </tr>
              <tr>
                <td>Stadium Number</td>
                <td>
                  <input
                    className="action-form"
                    type="text"
                    value={newGame.stadium_number}
                    onChange={(e) => handleNewGameChange(e, "stadium_number")}
                  />
                </td>
              </tr>
              <tr>
                <td>Away Team</td>
                <td>
                  <input
                    className="action-form"
                    type="text"
                    value={newGame.away_team}
                    onChange={(e) => handleNewGameChange(e, "away_team")}
                  />
                </td>
              </tr>
              <tr>
                <td>Away Score</td>
                <td>
                  <input
                    className="action-form"
                    type="text"
                    value={newGame.away_score}
                    onChange={(e) => handleNewGameChange(e, "away_score")}
                  />
                </td>
              </tr>
              <tr>
                <td>Home Team</td>
                <td>
                  <input
                    className="action-form"
                    type="text"
                    value={newGame.home_team}
                    onChange={(e) => handleNewGameChange(e, "home_team")}
                  />
                </td>
              </tr>
              <tr>
                <td>Home Score</td>
                <td>
                  <input
                    className="action-form"
                    type="text"
                    value={newGame.home_score}
                    onChange={(e) => handleNewGameChange(e, "home_score")}
                  />
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <button className="action-button" onClick={addGame}>
                    Confirm
                  </button>
                  <button
                    className="action-button"
                    onClick={() => {
                      resetNewGameForm();
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
                <th>Edit Game</th>
                <th>
                  <input
                    style={{ border: "1px dashed black" }}
                    className="action-form"
                    type="text"
                    placeholder="Number"
                    value={editGame.number}
                    onChange={(e) => handleEditGameChange(e, "number")}
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Date</td>
                <td>
                  <input
                    className="action-form"
                    type="date"
                    min="1900-01-01"
                    max="2199-12-31"
                    value={editGame.date}
                    onChange={(e) => handleEditGameChange(e, "date")}
                  />
                </td>
              </tr>
              <tr>
                <td>Event</td>
                <td>
                  <input
                    className="action-form"
                    type="text"
                    value={editGame.event}
                    onChange={(e) => handleEditGameChange(e, "event")}
                  />
                </td>
              </tr>
              <tr>
                <td>Stadium Number</td>
                <td>
                  <input
                    className="action-form"
                    type="text"
                    value={editGame.stadium_number}
                    onChange={(e) => handleEditGameChange(e, "stadium_number")}
                  />
                </td>
              </tr>
              <tr>
                <td>Away Team</td>
                <td>
                  <input
                    className="action-form"
                    type="text"
                    value={editGame.away_team}
                    onChange={(e) => handleEditGameChange(e, "away_team")}
                  />
                </td>
              </tr>
              <tr>
                <td>Away Score</td>
                <td>
                  <input
                    className="action-form"
                    type="text"
                    value={editGame.away_score}
                    onChange={(e) => handleEditGameChange(e, "away_score")}
                  />
                </td>
              </tr>
              <tr>
                <td>Home Team</td>
                <td>
                  <input
                    className="action-form"
                    type="text"
                    value={editGame.home_team}
                    onChange={(e) => handleEditGameChange(e, "home_team")}
                  />
                </td>
              </tr>
              <tr>
                <td>Home Score</td>
                <td>
                  <input
                    className="action-form"
                    type="text"
                    value={editGame.home_score}
                    onChange={(e) => handleEditGameChange(e, "home_score")}
                  />
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <button className="action-button" onClick={updateGame}>
                    Confirm
                  </button>
                  <button
                    className="action-button"
                    onClick={() => {
                      resetEditGameForm();
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
                <th colSpan="2">Delete Game</th>
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
                    onClick={() => deleteGame(deleteNumber)}
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

export default Game;
