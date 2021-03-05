import React from "react";
import styled from "styled-components";
import Circle from "./Circle";
import { Player } from "../types";

interface Props {
  circles: Array<Array<Player | null>>;
  winningRow: Array<string> | undefined;
  onClick: (i: number, j: number) => void;
}

const Board: React.FC<Props> = ({ circles, onClick, winningRow }) => {
  return (
    <StyledBoard>
      <div className="grid">
        {circles.map((circle, i) => {
          return circle.map((c, j) => (
            <Circle
              key={`${i}${j}`}
              player={c}
              onClick={() => onClick(i, j)}
              highlight={winningRow?.includes(`${i}-${j}`) ?? false}
            />
          ));
        })}
      </div>
    </StyledBoard>
  );
};

const StyledBoard = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  @media (max-width: 768px) {
    border-radius: 12px;
  }
  .grid {
    position: absolute;
    top: 0;
    right: 0;
    display: grid;
    place-items: center;
    grid-template-columns: repeat(8, 1fr);
    width: 100%;
    height: 100%;
    grid-gap: 6px;
    padding: 12px;
    @media (max-width: 768px) {
      grid-gap: 4px;
      padding: 8px;
    }
    @media (max-width: 540px) {
      grid-gap: 2px;
      padding: 4px;
    }
  }
`;

export default Board;
