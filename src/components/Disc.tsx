import React from "react";
import styled from "styled-components";
import { useTheme } from "../app/theme";
import boyAvator from "../assets/avatar01.png";
import girlAvator from "../assets/avatar02.png";

import { Player } from "../types";
interface Props {
  player: Player;
}

const Disk: React.FC<Props> = ({ player }) => {
  const theme = useTheme();
  return (
    <StyledDisk theme={theme} player={player}>
      <img
        src={player.gender === "M" ? boyAvator : girlAvator}
        alt={player.name}
      />
    </StyledDisk>
  );
};

interface StyledDiskProps {
  player: Player;
}

const StyledDisk = styled("div")<StyledDiskProps>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border: 8px solid ${(props) => props.theme.palette[props.player.color].main};
  box-shadow: inset 1px 1px 3px 0px rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  overflow: hidden;
  @media (max-width: 768px) {
    border: 6px solid ${(props) => props.theme.palette[props.player.color].main};
  }
  @media (max-width: 540px) {
    border: 4px solid ${(props) => props.theme.palette[props.player.color].main};
  }
  & > img {
    object-fit: cover;
    position: absolute;
    bottom: 0px;
    height: 37px;
    @media (max-width: 768px) {
      height: 30px;
    }
    @media (max-width: 540px) {
      height: 20px;
    }
  }
  animation: bounce 0.7s;

  @keyframes bounce {
    from,
    0% {
      transform: translateY(-1000px);
    }
    20%,
    53%,
    to {
      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }

    40%,
    43% {
      -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
      animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
      -webkit-transform: translate3d(0, -30px, 0);
      transform: translate3d(0, -30px, 0);
    }

    70% {
      -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
      animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
      -webkit-transform: translate3d(0, -15px, 0);
      transform: translate3d(0, -15px, 0);
    }

    80% {
      -webkit-transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }

    90% {
      -webkit-transform: translate3d(0, -4px, 0);
      transform: translate3d(0, -4px, 0);
    }
  }
`;

export default Disk;
