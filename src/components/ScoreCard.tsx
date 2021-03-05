import React from "react";
import styled from "styled-components";
import { useTheme } from "../app/theme";
import Avatar from "./Avator";

import { Player } from "../types";
interface Props {
  index: number;
  player: Player;
  turn: "X" | "O";
  isWinnerDeclared: boolean;
}

const ScoreCard: React.FC<Props> = ({
  index,
  player,
  turn,
  isWinnerDeclared,
}) => {
  const theme = useTheme();
  return (
    <StyledScoreCard theme={theme} player={player}>
      <div className="avator-container">
        <Avatar
          player={player}
          turn={turn}
          isWinnerDeclared={isWinnerDeclared}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>{`Player ${Number(index + 1)
              .toString()
              .padStart(2, "0")}`}</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{player.name}</td>
            <td>{Number(player.score).toString().padStart(2, "0")}</td>
          </tr>
        </tbody>
      </table>
    </StyledScoreCard>
  );
};

interface StyledScoreCardProps {
  player: Player;
}

const StyledScoreCard = styled("div")<StyledScoreCardProps>`
  display: flex;
  align-items: center;
  border: 1px solid #70707026;
  background-color: ${(props) => props.theme.palette[props.player.color].light};
  width: 100%;
  height: 100px;
  padding: 12px;
  border-radius: 15px;
  @media (max-width: 768px) {
    padding: 10px;
    border-radius: 12px;
  }
  @media (max-width: 540px) {
    height: 90px;
    padding: 8px;
    border-radius: 16 px;
  }
  .avator-container {
    position: relative;
    width: 70px;
    height: 70px;
    margin-right: 10px;
    @media (max-width: 768px) {
      width: 70px;
      height: 70px;
      margin-right: 6px;
    }
    @media (max-width: 540px) {
      width: 65px;
      height: 65px;
      margin-right: 6px;
    }
  }
  table {
    width: calc(100% - 80px);
    @media (max-width: 768px) {
      width: calc(100% - 76px);
    }
    @media (max-width: 540px) {
      width: calc(100% - 71px);
    }
    th {
      font-size: 0.9rem;
      font-weight: normal;
      color: #424242;
      &:nth-child(1) {
        text-align: left;
      }
      @media (max-width: 768px) {
        font-size: 0.8rem;
      }
      @media (max-width: 540px) {
        font-size: 0.9rem;
      }
    }
    td {
      font-size: 1.3rem;
      font-weight: normal;
      color: #424242;
      @media (max-width: 768px) {
        font-size: 1rem;
      }
      @media (max-width: 540px) {
        font-size: 0.9rem;
      }
      &:nth-child(1) {
        text-align: left;
      }
      &:nth-child(2) {
        font-weight: bold;
      }
    }
  }
`;

export default ScoreCard;
