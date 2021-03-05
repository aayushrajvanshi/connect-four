import { Player } from "../types";

export function calculateGameWinner(board: Array<Array<Player | null>>) {
  // horizontalCheck
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length - 3; j++) {
      if (
        board[i][j]?.symbol &&
        board[i][j]?.symbol === board[i][j + 1]?.symbol &&
        board[i][j]?.symbol === board[i][j + 2]?.symbol &&
        board[i][j]?.symbol === board[i][j + 3]?.symbol
      ) {
        return {
          winner: board[i][j],
          winningRow: [
            `${i}-${j}`,
            `${i}-${j + 1}`,
            `${i}-${j + 2}`,
            `${i}-${j + 3}`,
          ],
        };
      }
    }
  }
  // verticalCheck
  for (let i = 0; i < board.length - 3; i++) {
    for (let j = 0; j < board.length; j++) {
      if (
        board[i][j]?.symbol &&
        board[i][j]?.symbol === board[i + 1][j]?.symbol &&
        board[i][j]?.symbol === board[i + 2][j]?.symbol &&
        board[i][j]?.symbol === board[i + 3][j]?.symbol
      ) {
        return {
          winner: board[i][j],
          winningRow: [
            `${i}-${j}`,
            `${i + 1}-${j}`,
            `${i + 2}-${j}`,
            `${i + 3}-${j}`,
          ],
        };
      }
    }
  }
  // ascendingDiagonalCheck
  for (let i = 3; i < board.length; i++) {
    for (let j = 0; j < board.length - 3; j++) {
      if (
        board[i][j]?.symbol &&
        board[i][j]?.symbol === board[i - 1][j + 1]?.symbol &&
        board[i][j]?.symbol === board[i - 2][j + 2]?.symbol &&
        board[i][j]?.symbol === board[i - 3][j + 3]?.symbol
      )
        return {
          winner: board[i][j],
          winningRow: [
            `${i}-${j}`,
            `${i - 1}-${j + 1}`,
            `${i - 2}-${j + 2}`,
            `${i - 3}-${j + 3}`,
          ],
        };
    }
  }
  // descendingDiagonalCheck
  for (let i = 3; i < board.length; i++) {
    for (let j = 3; j < board.length; j++) {
      if (
        board[i][j]?.symbol &&
        board[i][j]?.symbol === board[i - 1][j - 1]?.symbol &&
        board[i][j]?.symbol === board[i - 2][j - 2]?.symbol &&
        board[i][j]?.symbol === board[i - 3][j - 3]?.symbol
      )
        return {
          winner: board[i][j],
          winningRow: [
            `${i}-${j}`,
            `${i - 1}-${j - 1}`,
            `${i - 2}-${j - 2}`,
            `${i - 3}-${j - 3}`,
          ],
        };
    }
  }
  let foundEmptySlot = false;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j] === null) {
        foundEmptySlot = true;
      }
    }
  }
  if (!foundEmptySlot) {
    return {
      tie: true,
      winner: null,
      winningRow: [],
    };
  }
  return null;
}

export function calculateNextPositionInColumn(
  board: Array<Array<number | null>>,
  column: number
) {
  for (let i = board.length - 1; i >= 0; i--) {
    if (!board[i][column]) {
      return i;
    }
  }
  return null;
}

export function deepCopy(arr: Array<any>) {
  const copy: Array<any> = [];
  arr.forEach((elem) => {
    if (Array.isArray(elem)) {
      copy.push(deepCopy(elem));
    } else {
      copy.push(elem);
    }
  });
  return copy;
}

export function calculateTournamentWinner(players: Array<Player>) {
  return players[0].score > players[1].score
    ? players[0].name
    : players[1].score > players[0].score
    ? players[1].name
    : "#####Draw#####";
}

export function chechWhoStarts(
  whoStarts:
    | "alternative-turn"
    | "looser-first"
    | "winner-first"
    | "always-player-01"
    | "always-player-02",
  options?: {
    lastTurn?: "X" | "O";
    whoWonLast?: "X" | "O";
  }
) {
  switch (whoStarts) {
    case "alternative-turn":
      return options?.lastTurn ? options.lastTurn : "X";
    case "always-player-01":
      return "X";
    case "always-player-02":
      return "O";
    case "winner-first":
      return options?.whoWonLast ? options.whoWonLast : "X";
    case "looser-first":
      return options?.whoWonLast
        ? options.whoWonLast === "X"
          ? "O"
          : "X"
        : "X";
    default:
      return "X";
  }
}
