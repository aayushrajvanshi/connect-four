import React from "react";
import styled from "styled-components";
import { useTheme } from "../app/theme";
import boyAvator from "../assets/avatar01@2x.png";
import girlAvator from "../assets/avatar02@2x.png";

import { Player } from "../types";
interface Props {
  player: Player;
  turn: "X" | "O";
  isWinnerDeclared: boolean;
}

const Avator: React.FC<Props> = ({ player, turn, isWinnerDeclared }) => {
  const theme = useTheme();
  return (
    <StyledAvator
      theme={theme}
      player={player}
      turn={turn}
      isWinnerDeclared={isWinnerDeclared}
    >
      <div>
        <img
          src={player?.gender === "M" ? boyAvator : girlAvator}
          alt={player?.name}
        />
      </div>
      <span></span>
    </StyledAvator>
  );
};

interface StyledAvatorProps {
  player: Player;
  turn: "X" | "O";
  isWinnerDeclared: boolean;
}

const StyledAvator = styled("div")<StyledAvatorProps>`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border: 12px solid
      ${(props) => props.theme.palette[props.player.color].main};
    border-radius: 50%;
    z-index: 10;
    & > img {
      object-fit: cover;
      position: absolute;
      bottom: 13px;
      height: 40px;
      @media (max-width: 768px) {
        bottom: 10px;
        height: 40px;
      }
      @media (max-width: 540px) {
        bottom: 10px;
        height: 35px;
      }
    }
  }
  & > span {
    position: absolute;
    width: ${(props) =>
      !props.isWinnerDeclared && props.turn === props.player.symbol
        ? "120%"
        : "100%"};
    height: ${(props) =>
      !props.isWinnerDeclared && props.turn === props.player.symbol ? "120%" : "100%"};
    top: ${(props) =>
      !props.isWinnerDeclared && props.turn === props.player.symbol
        ? "-7px"
        : "3px"};
    left: ${(props) =>
      !props.isWinnerDeclared && props.turn === props.player.symbol
        ? "-7px"
        : "1px"};
    border: ${(props) =>
      !props.isWinnerDeclared && props.turn === props.player.symbol
        ? "12px solid #FFA200"
        : `12px solid ${props.theme.palette[props.player.color].dark}`};
    box-shadow: inset 1px 1px 3px 0px rgba(0, 0, 0, 0.4);
    border-radius: 50%;
  }
`;

export default Avator;
