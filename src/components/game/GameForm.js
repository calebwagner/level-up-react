import React, { useContext, useState, useEffect } from "react";
import { GameContext } from "./GameProvider.js";
import { useHistory } from "react-router-dom";

export const GameForm = () => {
  const history = useHistory();
  const { createGame, getGameTypes, gameTypes } = useContext(GameContext);

  /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
  const [currentGame, setCurrentGame] = useState({
    numberOfPlayers: 0,
    name: "",
    description: "",
    maker: "",
    gameTypeId: 0,
  });

  /*
        Get game types on initialization so that the <select>
        element presents game type choices to the user.
    */
  useEffect(() => {
    getGameTypes();
  }, []);

  /*
        REFACTOR CHALLENGE START

        Can you refactor this code so that all property
        state changes can be handled with a single function
        instead of five functions that all, largely, do
        the same thing?

        One hint: [event.target.name]
    */
  const changeGameNameState = (event) => {
    const newGameState = { ...currentGame };
    newGameState.name = event.target.value;
    setCurrentGame(newGameState);
  };

  const changeGameMakerState = (event) => {
    const newGameState = { ...currentGame };
    newGameState.maker = event.target.value;
    setCurrentGame(newGameState);
  };

  const changeGamePlayersState = (event) => {
    const newGameState = { ...currentGame };
    newGameState.numberOfPlayers = event.target.value;
    setCurrentGame(newGameState);
  };

  const changeGameDescriptionState = (event) => {
    const newGameState = { ...currentGame };
    newGameState.description = event.target.value;
    setCurrentGame(newGameState);
  };

  const changeGameTypeState = (event) => {
    const newGameState = { ...currentGame };
    newGameState.gameTypeId = event.target.value;
    setCurrentGame(newGameState);
  };
  /* REFACTOR CHALLENGE END */

  return (
    <form className="gameForm">
      <h2 className="gameForm__title">Register New Game</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            required
            autoFocus
            className="form-control"
            value={currentGame.title}
            onChange={changeGameNameState}
          />
        </div>
      </fieldset>

      {/* You create the rest of the input fields for each game property */}

      <button
        className="btn btn-2 btn-sep icon-create"
        onClick={() => {
          history.push({ pathname: "/games/new" });
        }}
      >
        Register New Game
      </button>

      <button
        type="submit"
        onClick={(evt) => {
          // Prevent form from being submitted
          evt.preventDefault();

          const game = {
            maker: currentGame.maker,
            name: currentGame.name,
            description: currentGame.description,
            numberOfPlayers: parseInt(currentGame.numberOfPlayers),
            gameTypeId: parseInt(currentGame.gameTypeId),
          };

          // Send POST request to your API
          createGame(game).then(() => history.push("/games"));
        }}
        className="btn btn-primary"
      >
        Create
      </button>
    </form>
  );
};
