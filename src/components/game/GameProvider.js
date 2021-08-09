import React, { useState } from "react";

export const GameContext = React.createContext();

export const GameProvider = (props) => {
  const [games, setGames] = useState([]);
  const [gameTypes, setTypes] = useState([]);

  const getGames = () => {
    return fetch("http://localhost:8000/games", {
      headers: {
        Authorization: `Token ${localStorage.getItem("lu_token")}`,
      },
    })
      .then((response) => response.json())
      .then(setGames);
  };

  const createGame = (game) => {
    return fetch("http://localhost:8000/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("lu_token")}`,
      },
      body: JSON.stringify(game),
    }).then(getGames);
  };

  const getGameTypes = () => {
    return fetch("http://localhost:8000/gametypes", {
      headers: {
        Authorization: `Token ${localStorage.getItem("lu_token")}`,
      },
    })
      .then((response) => response.json())
      .then(setTypes);
  };

  const updateGame = (game) => {
    return fetch(`http://localhost:8000/games/${game.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("lu_token")}`,
      },
      body: JSON.stringify(game),
    }).then(getGames(game));
  };

  const getGameById = (gameId) => {
    return fetch(`http://localhost:8000/games/${gameId}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("lu_token")}`,
      },
    }).then((response) => response.json());
  };

  return (
    <GameContext.Provider
      value={{
        games,
        gameTypes,
        getGames,
        getGameTypes,
        createGame,
        updateGame,
        getGameById,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};
