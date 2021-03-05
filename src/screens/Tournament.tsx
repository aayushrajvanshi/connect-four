import React, { useState } from "react";
import { Prompt, useHistory, useLocation } from "react-router-dom";

import Header from "../components/Header";
import Game from "../components/Game";
import { Player } from "../types";
import styled from "styled-components";

const Tournament = () => {
  const alertUser = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = "";
  };

  React.useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);

  const history = useHistory();
  const location = useLocation();
  const state = location.state as {
    player1Name: string;
    player1Gender: "M" | "F";
    player2Name: string;
    player2Gender: "M" | "F";
    numberOfGames: number;
    whoStarts:
      | "alternative-turn"
      | "looser-first"
      | "winner-first"
      | "always-player-01"
      | "always-player-02";
  };

  const player1Name = state?.player1Name;
  const player1Gender = state?.player1Gender;
  const player2Name = state?.player2Name;
  const player2Gender = state?.player2Gender;
  const numberOfGames = state?.numberOfGames;
  const whoStarts = state?.whoStarts;

  React.useEffect(() => {
    if (!player1Name || !player2Name) {
      history.push("/start-game", location.state);
    }
  });

  const [gamesLeft, setGamesLeft] = useState(numberOfGames);
  const initialState: Array<Player> = [
    {
      name: player1Name,
      gender: player1Gender,
      score: 0,
      symbol: "X",
      color: "primary",
    },
    {
      name: player2Name,
      gender: player2Gender,
      score: 0,
      symbol: "O",
      color: "secondary",
    },
  ];
  const [players, setPlayers] = useState<Array<Player>>(initialState);

  const updatePlayerScore = (playerId: "X" | "O") => {
    const playerIndex = players
      .map((player) => player.symbol)
      .indexOf(playerId);
    const updatedPlayers = [...players];
    updatedPlayers[playerIndex].score = updatedPlayers[playerIndex].score + 1;
    setPlayers(updatedPlayers);
  };

  const resetScores = () => {
    setPlayers(initialState);
  };

  return (
    <StyledTournament>
      <Header backPath="/start-game" state={location.state} />
      <Prompt message="Are you sure you want to leave?" />
      <Game
        numberOfGames={numberOfGames}
        players={players}
        gamesLeft={gamesLeft}
        setGamesLeft={setGamesLeft}
        updatePlayerScore={updatePlayerScore}
        resetScores={resetScores}
        whoStarts={whoStarts}
      />
    </StyledTournament>
  );
};

const StyledTournament = styled.div`
  display: grid;
  place-content: center;
  min-height: calc((var(--vh, 1vh) * 100));
`;

export default Tournament;
