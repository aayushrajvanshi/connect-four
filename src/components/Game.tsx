import React, { useState, useRef } from "react";
import styled from "styled-components";
import useSound from "use-sound";

import {
  calculateNextPositionInColumn,
  calculateGameWinner,
  deepCopy,
  chechWhoStarts,
  calculateTournamentWinner,
} from "../helpers";
import { Player } from "../types";

import Board from "./Board";
import ScoreCard from "./ScoreCard";
import Button from "./Button";
import coinInsertSound from "../assets/sounds/insert.mp3";
import { useHistory } from "react-router-dom";

interface Props {
  numberOfGames: number;
  gamesLeft: number;
  players: Array<Player>;
  setGamesLeft: React.Dispatch<React.SetStateAction<number>>;
  updatePlayerScore: (playerId: "X" | "O") => void;
  resetScores: () => void;
  whoStarts:
    | "alternative-turn"
    | "looser-first"
    | "winner-first"
    | "always-player-01"
    | "always-player-02";
}

const Game: React.FC<Props> = ({
  numberOfGames,
  players,
  gamesLeft,
  setGamesLeft,
  updatePlayerScore,
  resetScores,
  whoStarts,
}) => {
  const history = useHistory();
  const currentGame = numberOfGames - gamesLeft + 1;
  const [play] = useSound(coinInsertSound, {
    volume: 0.3,
  });
  const [gameHistory, setGameHistory] = useState([
    Array(8)
      .fill(null)
      .map(() => Array(8).fill(null)),
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [turn, setTurn] = useState<"X" | "O">(chechWhoStarts(whoStarts));
  const xO = turn === "X" ? players[0] : players[1];
  const gameRef = useRef<{
    tie?: boolean;
    winner: Player | null;
    winningRow: string[];
  } | null>(null);
  const [won, setWon] = useState(false);
  gameRef.current = calculateGameWinner(gameHistory[stepNumber]);
  const tournamentRef = useRef("");
  tournamentRef.current = calculateTournamentWinner(players);

  React.useEffect(() => {
    if (gameRef.current?.winner && !won) {
      setWon(true);
      updatePlayerScore(gameRef.current?.winner.symbol);
    }
  }, [updatePlayerScore, won, gameRef.current?.winner]);

  const handleClick = (i: number, j: number) => {
    // return if won
    if (gameRef.current?.winner) return;
    // play disc insert sound
    play();
    const gameHistoryPoint = gameHistory.slice(0, stepNumber + 1);
    const current = gameHistoryPoint[stepNumber];
    const board = deepCopy(current);
    const nextRow = calculateNextPositionInColumn(board, j);
    // return if occupied
    if (nextRow === null) return;
    // select square
    board[nextRow][j] = xO;
    setGameHistory([...gameHistoryPoint, board]);
    setStepNumber(gameHistoryPoint.length);
    setTurn(turn === "X" ? "O" : "X");
  };

  const handleUndo = () => {
    if (stepNumber === 0) return;
    setStepNumber(stepNumber - 1);
    setTurn(turn === "X" ? "O" : "X");
  };

  const handleNextGame = () => {
    setGameHistory([
      Array(8)
        .fill(null)
        .map(() => Array(8).fill(null)),
    ]);
    setStepNumber(0);
    setTurn(
      chechWhoStarts(whoStarts, {
        lastTurn: turn,
        whoWonLast: gameRef.current?.winner?.symbol,
      })
    );
    setGamesLeft(gamesLeft - 1);
    setWon(false);
    gameRef.current = null;
  };

  const handlePlayAgain = () => {
    setGameHistory([
      Array(8)
        .fill(null)
        .map(() => Array(8).fill(null)),
    ]);
    setStepNumber(0);
    setTurn(chechWhoStarts(whoStarts));
    setGamesLeft(numberOfGames);
    resetScores();
    setWon(false);
    gameRef.current = null;
    tournamentRef.current = "";
  };

  const handleEndTournament = () => {
    history.push("/");
  };

  return (
    <StyledGame>
      <div className="board">
        <Board
          circles={gameHistory[stepNumber]}
          onClick={handleClick}
          winningRow={gameRef.current?.winningRow}
        />
      </div>
      <div className="game-info">
        <div>
          <h2 className="tournament-info">{`${numberOfGames} Games Tournament`}</h2>
          {gameRef.current?.winner ? (
            !(gamesLeft - 1) ? (
              tournamentRef.current === "#####Draw#####" ? (
                <h2 className="congratulations-text">It's a draw!</h2>
              ) : (
                <>
                  <h2 className="congratulations-text">Congratulation!</h2>
                  {tournamentRef.current !== "#####Draw#####" && (
                    <h3 className="congratulations-subtext">
                      <strong>{`${tournamentRef.current}`}</strong>
                      {`, you won tournament`}
                    </h3>
                  )}
                </>
              )
            ) : (
              <>
                <h2 className="congratulations-text">Congratulation!</h2>
                <h3 className="congratulations-subtext">
                  <strong>{`${gameRef.current.winner.name}`}</strong>
                  {`, you won Game ${currentGame}`}
                </h3>
              </>
            )
          ) : gameRef.current?.tie ? (
            !(gamesLeft - 1) ? (
              tournamentRef.current === "#####Draw#####" ? (
                <h2 className="congratulations-text">It's a draw!</h2>
              ) : (
                <>
                  <h2 className="congratulations-text">Congratulation!</h2>
                  {tournamentRef.current !== "#####Draw#####" && (
                    <h3 className="congratulations-subtext">
                      <strong>{`${tournamentRef.current}`}</strong>
                      {`, you won tournament`}
                    </h3>
                  )}
                </>
              )
            ) : (
              <h2 className="congratulations-text">It's a tie!</h2>
            )
          ) : (
            <h3 className="game-number">{`Playing Game ${currentGame}`}</h3>
          )}
        </div>
        <div className="game-info-grid">
          <div className="score-grid">
            {players.map((player, i) => (
              <ScoreCard
                key={i}
                index={i}
                player={player}
                turn={turn}
                isWinnerDeclared={won || Boolean(gameRef.current?.tie)}
              />
            ))}
          </div>
          <hr className="horizontal-divider" />
          <div className="action-buttons">
            {gameRef.current?.winner || gameRef.current?.tie ? (
              gamesLeft > 1 ? (
                <Button variant="primary" onClick={handleNextGame}>
                  Next Game
                </Button>
              ) : (
                <Button variant="primary" onClick={handlePlayAgain}>
                  Play Again
                </Button>
              )
            ) : (
              <Button
                variant="primary"
                onClick={handleUndo}
                disabled={stepNumber === 0}
              >
                Undo Step
              </Button>
            )}
            <Button variant="danger" onClick={handleEndTournament}>
              End Tournament
            </Button>
          </div>
        </div>
      </div>
    </StyledGame>
  );
};

const StyledGame = styled.div`
  display: flex;
  flex-direction: row;
  background: #ffffff;
  @media (max-width: 1024px) {
    flex-direction: row;
  }
  @media (max-width: 768px) {
    flex-direction: row;
  }
  @media (max-width: 540px) {
    flex-direction: column;
  }
  .board {
    width: 600px;
    height: 600px;
    background: #ffffff;
    box-shadow: 0px 3px 10px #00000029;
    border: 1px solid #f7f7f7;
    border-radius: 30px;
    box-sizing: border-box;
    z-index: 1;
    padding: 16px;
    @media (max-width: 768px) {
      width: 500px;
      height: 500px;
    }
    @media (max-width: 540px) {
      width: 90vw;
      height: 90vw;
    }
  }
  .game-info {
    display: flex;
    flex-direction: column;
    width: 600px;
    height: 600px;
    background: #f5f5f5;
    border: 1px solid #f7f7f7;
    border-radius: 30px;
    box-sizing: border-box;
    padding: 20px 20px 0 320px;
    margin: 0 0 0 -300px;
    display: flex;
    align-items: center;
    text-align: center;
    @media (max-width: 768px) {
      width: 500px;
      height: 500px;
      margin: 0 0 0 -250px;
      padding: 20px 20px 0 270px;
    }
    @media (max-width: 540px) {
      width: 90vw;
      height: unset;
      padding: 50px 10px 10px 10px;
      margin: -50px 0 0 0;
    }
    .game-info-grid {
      display: flex;
      flex-direction: column;
      width: 100%;
      @media (max-width: 768px) {
      }
      @media (max-width: 540px) {
        display: grid;
        grid-template-columns: 2fr 1fr;
        grid-gap: 10px;
        /* place-items: center; */
      }
    }
    .tournament-info {
      margin: 0;
      font-size: 1.3rem;
      font-weight: normal;
      @media (max-width: 768px) {
        font-size: 1rem;
      }
      @media (max-width: 540px) {
        margin: 4px 0;
        font-size: 1rem;
      }
    }
    .congratulations-text {
      margin: 6px 0 2px;
      font-size: 1.8rem;
      font-weight: normal;
      color: #ff6600;
      @media (max-width: 768px) {
        margin: 4px 0 2px;
        font-size: 1.5rem;
      }
      @media (max-width: 540px) {
        font-size: 1.5rem;
      }
    }
    .congratulations-subtext {
      margin: 0 0 20px;
      font-size: 1.2rem;
      font-weight: normal;
      color: #505351;
      @media (max-width: 768px) {
        margin: 0 0 20px;
        font-size: 1rem;
      }
      @media (max-width: 540px) {
        margin: 0 0 8px;
        font-size: 0.9rem;
      }
    }
    .game-number {
      margin: 10px 0;
      font-size: 1.3rem;
      font-weight: normal;
      color: #505351;
      @media (max-width: 768px) {
        font-size: 1.1rem;
      }
      @media (max-width: 540px) {
        margin: 0 0 8px;
        font-size: 0.9rem;
      }
    }
    .score-grid {
      display: grid;
      grid-template-columns: 1fr;
      grid-gap: 10px;
      width: 100%;
      @media (max-width: 768px) {
        grid-gap: 8px;
      }
      @media (max-width: 540px) {
        grid-gap: 8px;
      }
    }
    .horizontal-divider {
      margin: 24px 0;
      width: 100%;
      height: 0.5px;
      border-width: 0;
      background-color: #e5e5e5;
      @media (max-width: 768px) {
        height: 0.5px;
        margin: 10px 0;
      }
      @media (max-width: 540px) {
        display: none;
        height: 0.5px;
        margin: 10px 0;
      }
    }
    .action-buttons {
      display: grid;
      grid-template-columns: 1fr;
      grid-gap: 16px;
      width: 100%;
      @media (max-width: 768px) {
        grid-gap: 12px;
      }
      @media (max-width: 540px) {
        display: flex;
        flex-direction: column;
        grid-gap: 8px;
      }
    }
  }
`;

export default Game;
