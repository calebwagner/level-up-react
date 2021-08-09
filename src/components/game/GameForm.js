import React, { useContext, useState, useEffect } from "react";
import { GameContext } from "./GameProvider.js";
import { useHistory, useParams } from "react-router-dom";

export const GameForm = () => {
  const history = useHistory();

  const {
    createGame,
    getGameTypes,
    gameTypes,
    getGameById,
    updateGame,
  } = useContext(GameContext);

  const { gameId } = useParams();

  const [currentGame, setCurrentGame] = useState({
    numberOfPlayers: 0,
    name: "",
    description: "",
    maker: "",
    gameTypeId: 0,
  });

  useEffect(() => {
    getGameTypes();
  }, []);

  useEffect(() => {
    if (gameId) {
      getGameById(gameId).then((game) =>
        setCurrentGame({
          numberOfPlayers: game.number_of_players,
          description: game.description,
          name: game.name,
          maker: game.maker,
          gameTypeId: game.game_type.id,
        })
      );
    }
  }, [gameId]);

  /*
        REFACTOR CHALLENGE START

        Can you refactor this code so that all property
        state changes can be handled with a single function
        instead of five functions that all, largely, do
        the same thing?

        One hint: [event.target.name]
    */

  //   const changeGameNameState = (event) => {
  //     const newGameState = { ...currentGame };
  //     newGameState.name = event.target.value;
  //     setCurrentGame(newGameState);
  //   };

  //   const changeGameMakerState = (event) => {
  //     const newGameState = { ...currentGame };
  //     newGameState.maker = event.target.value;
  //     setCurrentGame(newGameState);
  //   };

  //   const changeGamePlayersState = (event) => {
  //     const newGameState = { ...currentGame };
  //     newGameState.numberOfPlayers = event.target.value;
  //     setCurrentGame(newGameState);
  //   };

  //   const changeGameDescriptionState = (event) => {
  //     const newGameState = { ...currentGame };
  //     newGameState.description = event.target.value;
  //     setCurrentGame(newGameState);
  //   };

  const changeGameState = (event) => {
    const newGameState = { ...currentGame };
    newGameState[event.target.name] = event.target.value;
    setCurrentGame(newGameState);
  };

  //   const changeGameTypeState = (event) => {
  //     const newGameState = { ...currentGame };
  //     newGameState.gameTypeId = event.target.value;
  //     setCurrentGame(newGameState);
  //   };

  return (
    <form className="gameForm">
      <h2 className="gameForm__title">Register New Game</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Game Name: </label>
          <input
            type="text"
            name="name"
            required
            autoFocus
            className="form-control"
            value={currentGame.name}
            onChange={changeGameState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="maker">Game Maker: </label>
          <input
            type="text"
            name="maker"
            required
            autoFocus
            className="form-control"
            value={currentGame.maker}
            onChange={changeGameState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="numberOfPlayers">Number of players: </label>
          <input
            type="text"
            name="numberOfPlayers"
            required
            autoFocus
            className="form-control"
            value={currentGame.numberOfPlayers}
            onChange={changeGameState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="description">Game Description: </label>
          <input
            type="text"
            name="description"
            required
            autoFocus
            className="form-control"
            value={currentGame.description}
            onChange={changeGameState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="gameTypeId">Game Type:</label>
          <select
            value={currentGame.gameTypeId}
            name="gameTypeId"
            id="gameTypeId"
            className="form-control"
            onChange={changeGameState}
          >
            <option value="0">Select</option>
            {gameTypes.map((gametype) => (
              <option key={gametype.id} value={gametype.id}>
                {gametype.label}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      {gameId ? (
        <button
          type="submit"
          onClick={(evt) => {
            // Prevent form from being submitted
            evt.preventDefault();
            updateGame({
              id: gameId,
              name: currentGame.name,
              gameTypeId: parseInt(currentGame.gameTypeId),
              description: currentGame.description,
              numberOfPlayers: parseInt(currentGame.numberOfPlayers),
              maker: currentGame.maker,
            }).then(() => history.push("/"));
          }}
          className="btn btn-primary"
        >
          Edit
        </button>
      ) : (
        <button
          type="submit"
          onClick={(evt) => {
            // Prevent form from being submitted
            evt.preventDefault();

            const game = {
              name: currentGame.name,
              gameTypeId: parseInt(currentGame.gameTypeId),
              description: currentGame.description,
              numberOfPlayers: parseInt(currentGame.numberOfPlayers),
              maker: currentGame.maker,
              // gamer: parseInt(localStorage.getItem("lu_token"))
            };
            // Send POST request to your API
            createGame(game).then(() => history.push("/"));
          }}
          className="btn btn-primary"
        >
          Create
        </button>
      )}
    </form>
  );
};
