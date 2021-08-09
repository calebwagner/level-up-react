import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { GameContext } from "../game/GameProvider";
import { EventContext } from "./EventProvider";

export const EventForm = () => {
  const { games, getGames, getGameTypes } = useContext(GameContext);
  const { getEvents, createEvent } = useContext(EventContext);
  const history = useHistory();

  const [currentEvent, setEvent] = useState({
    host: localStorage.getItem("lu_token"),
    game: "",
    date: "",
    time: "",
    description: "",
    title: "",
    attendees: [],
  });

  useEffect(() => {
    getGames();
  }, []);

  useEffect(() => {
    getEvents();
  }, []);

  const changeEventState = (event) => {
    const newEventState = { ...currentEvent };
    newEventState[event.target.name] = event.target.value;
    setEvent(newEventState);
  };

  return (
    <form className="gameForm">
      <h2 className="gameForm__title">Schedule New Event</h2>

      <fieldset>
        <div className="form-group">
          <label htmlFor="gameId">Game: </label>
          <select
            name="gameId"
            className="form-control"
            value={currentEvent.gameId}
            onChange={changeEventState}
          >
            <option value="0">Select a game...</option>
            {games.map((game) => (
              <option value={game.id}>{game.name}</option>
            ))}
          </select>
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="maker">Title: </label>
          <input
            type="text"
            name="title"
            required
            autoFocus
            className="form-control"
            value={currentEvent.title}
            onChange={changeEventState}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="maker">Date: </label>
          <input
            type="date"
            name="date"
            required
            autoFocus
            className="form-control"
            value={currentEvent.date}
            onChange={changeEventState}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="maker">Time: </label>
          <input
            type="time"
            name="time"
            required
            autoFocus
            className="form-control"
            value={currentEvent.time}
            onChange={changeEventState}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="maker">Description: </label>
          <input
            type="text"
            name="description"
            required
            autoFocus
            className="form-control"
            value={currentEvent.description}
            onChange={changeEventState}
          />
        </div>
      </fieldset>

      <button
        type="submit"
        onClick={(evt) => {
          evt.preventDefault();

          const event = {
            game: currentEvent.game,
            date: currentEvent.date,
            time: currentEvent.time,
            description: currentEvent.description,
            title: currentEvent.title,
          };

          createEvent(event).then(() => history.push("/events"));
        }}
        className="btn btn-primary"
      >
        Create Event
      </button>
    </form>
  );
};
