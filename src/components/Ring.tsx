import React from "react";
import styled from "styled-components";
import { useTheme } from "../app/theme";

import boyRing from "../assets/avatar01@2x.png";
import girlRing from "../assets/avatar02@2x.png";
import runRing from "../assets/run@2x.png";
import winnerRing from "../assets/winner@2x.png";

const iconImage = (icon: string) => {
  switch (icon) {
    case "boy":
      return boyRing;
    case "girl":
      return girlRing;
    case "run":
      return runRing;
    case "winner":
      return winnerRing;
  }
};

interface RingProps {
  variant: "primary" | "secondary" | "tertiary";
  icon: string;
  player?: string;
  value?: string;
  shadow?: boolean;
  handleGenderChange?: any;
}

const Ring: React.FC<RingProps> = ({
  icon,
  player,
  value,
  shadow = false,
  variant,
  handleGenderChange,
}) => {
  const theme = useTheme();
  return (
    <StyledRing theme={theme} variant={variant} shadow={shadow}>
      {shadow && <span></span>}
      <div onClick={() => handleGenderChange(player, value)}>
        <img
          src={iconImage(value === "M" ? "boy" : value === "F" ? "girl" : icon)}
          alt={icon}
        />
      </div>
    </StyledRing>
  );
};

interface StyledRingProps {
  variant: "primary" | "secondary" | "tertiary";
  shadow?: boolean;
}

const StyledRing = styled("div")<StyledRingProps>`
  display: flex;
  position: relative;
  width: 80px;
  height: 80px;
  cursor: ${(props) => (props.shadow ? "pointer" : "unset")};
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border: 12px solid ${(props) => props.theme.palette[props.variant].main};
    border-radius: 50%;
    z-index: 0;
    & > img {
      object-fit: cover;
      position: absolute;
      bottom: ${(props) => (props.shadow ? "10px" : "unset")};
      height: ${(props) => (props.shadow ? "50px" : "36px")};
    }
  }
  & > span {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 3px;
    left: 1px;
    border: 12px solid ${(props) => props.theme.palette[props.variant].dark};
    box-shadow: inset 1px 1px 3px 0px rgba(0, 0, 0, 0.4);
    border-radius: 50%;
  }
`;

export default Ring;
