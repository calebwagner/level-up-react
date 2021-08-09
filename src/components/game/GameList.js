import React, { useContext, useEffect } from "react";
import { GameContext } from "./GameProvider.js";
import { useHistory } from "react-router-dom";
import "./Game.css";

export const GameList = (props) => {
  const { games, getGames } = useContext(GameContext);
  const history = useHistory();

  useEffect(() => {
    getGames();
  }, []);

  return (
    <article className="games">
      <h1>Level Up Game List</h1>
      {games.map((game) => {
        return (
          <section key={`game--${game.id}`} className="game">
            <div className="game_edit">
              <button
                className="btn btn-3"
                onClick={() => history.push(`/games/${game.id}/edit`)}
              >
                Edit
              </button>
            </div>
            <div className="game__title">
              {game.name} by {game.maker}
            </div>
            <div className="game__players">
              {game.number_of_players} players needed
            </div>
          </section>
        );
      })}
      <button
        className="btn btn-2 btn-sep icon-create"
        onClick={() => {
          history.push({ pathname: "/games/new" });
        }}
      >
        Register New Game
      </button>
    </article>
  );
};
