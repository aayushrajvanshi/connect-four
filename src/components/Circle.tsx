import React from "react";
import styled from "styled-components";
import { Player } from "../types";
import { useTheme } from "../app/theme";

import Disc from "./Disc";
interface Props {
  player: Player | null;
  highlight: boolean;
  onClick: () => void;
}

const Circle: React.FC<Props> = ({ player, onClick, highlight }) => {
  const theme = useTheme();
  return (
    <StyledCircle theme={theme} onClick={onClick} highlight={highlight}>
      <span>
        <span></span>
        <span></span>
      </span>
      <span></span>
      {player && <Disc player={player} />}
    </StyledCircle>
  );
};

interface StyledCircleProps {
  highlight: boolean;
}

const StyledCircle = styled("div")<StyledCircleProps>`
  position: relative;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  border: 2px solid #ffffff;
  background-color: #ffffff;
  box-shadow: inset 1px 1px 3px 0px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  @media (max-width: 768px) {
    border: 1.5px solid #ffffff;
    width: 50px;
    height: 50px;
  }
  @media (max-width: 540px) {
    border: 1px solid #ffffff;
    width: 35px;
    height: 35px;
  }

  // Horizontal & Vertical Concave Box
  & > span:nth-child(1) > span {
    content: "";
    display: inline-block;
    position: absolute;
    transform: translate(-50%, -50%);
    background-color: ${(props) => props.theme.palette.default.main};
    z-index: -9;
  }

  // Horizontal Concave Box
  & > span:nth-child(1) > span:nth-child(1) {
    top: 100%;
    left: 50%;
    width: 55px;
    height: 65px;
    @media (max-width: 768px) {
      width: 40px;
      height: 40px;
    }
    @media (max-width: 540px) {
      width: 35px;
      height: 40px;
    }
  }

  // Vertical Concave Box
  & > span:nth-child(1) > span:nth-child(2) {
    top: 50%;
    left: 100%;
    width: 65px;
    height: 55px;
    @media (max-width: 768px) {
      width: 40px;
      height: 40px;
    }
    @media (max-width: 540px) {
      width: 40px;
      height: 35px;
    }
  }

  // Horizontal Concave Box
  &:nth-of-type(8n) > span:nth-child(1) > span:nth-child(2) {
    display: none;
  }

  // Vertical Concave Box
  &:nth-child(57) > span:nth-child(1) > span:nth-child(1),
  &:nth-child(58) > span:nth-child(1) > span:nth-child(1),
  &:nth-child(59) > span:nth-child(1) > span:nth-child(1),
  &:nth-child(60) > span:nth-child(1) > span:nth-child(1),
  &:nth-child(61) > span:nth-child(1) > span:nth-child(1),
  &:nth-child(62) > span:nth-child(1) > span:nth-child(1),
  &:nth-child(63) > span:nth-child(1) > span:nth-child(1),
  &:nth-child(64) > span:nth-child(1) > span:nth-child(1) {
    display: none;
  }

  // Center Box
  & > span:nth-child(2) {
    content: "";
    position: absolute;
    top: 125%;
    left: 125%;
    width: 60px;
    height: 60px;
    @media (max-width: 768px) {
      top: 130%;
      left: 130%;
      width: 40px;
      height: 40px;
    }
    @media (max-width: 540px) {
      top: 140%;
      left: 140%;
      width: 35px;
      height: 40px;
    }
    transform: translate(-50%, -50%);
    background-color: ${(props) => props.theme.palette.default.main};
    z-index: -1;
    @media (max-width: 768px) {
      width: 45px;
      height: 45px;
    }
  }
  &:nth-of-type(8n) > span:nth-child(2) {
    display: none;
  }
  &:nth-child(57) > span:nth-child(2),
  &:nth-child(58) > span:nth-child(2),
  &:nth-child(59) > span:nth-child(2),
  &:nth-child(60) > span:nth-child(2),
  &:nth-child(61) > span:nth-child(2),
  &:nth-child(62) > span:nth-child(2),
  &:nth-child(63) > span:nth-child(2),
  &:nth-child(64) > span:nth-child(2) {
    display: none;
  }

  // Circle
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(-8px, -8px);
    width: 100%;
    height: 100%;
    border: 8px solid ${(props) => props.theme.palette.default.main};
    @media (max-width: 768px) {
      border: 7px solid ${(props) => props.theme.palette.default.main};
      transform: translate(-7px, -7px);
    }
    @media (max-width: 540px) {
      border: 6px solid ${(props) => props.theme.palette.default.main};
      transform: translate(-6px, -6px);
    }
    border-radius: 50%;
    z-index: -10;
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.25);
  }
  &::after {
    content: "";
    display: ${(props) => (props.highlight ? "block" : "none")};
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(-8px, -8px);
    width: 100%;
    height: 100%;
    border: 8px solid #ffff00;
    border-radius: 50%;
    @media (max-width: 768px) {
      transform: translate(-7px, -7px);
      border: 7px solid #ffff00;
    }
    @media (max-width: 540px) {
      transform: translate(-6px, -6px);
      border: 6px solid #ffff00;
    }
  }
`;

export default Circle;
