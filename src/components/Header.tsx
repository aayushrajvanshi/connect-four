import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as PrevIcon } from "../assets/previous-arrow.svg";

import IconButton from "./IconButton";

interface Props {
  backPath: string;
  state?: unknown;
}

const Header: React.FC<Props> = ({ backPath, state }) => {
  const history = useHistory();
  return (
    <StyledHeader>
      <IconButton
        className="back-button"
        onClick={() => {
          history.push(backPath, state);
        }}
      >
        <PrevIcon />
      </IconButton>
      Two Players Game
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  height: 50px;
  width: 100vw;
  box-shadow: 0px 3px 6px #00000029;
  .back-button {
    position: absolute;
    left: 20px;
  }
`;

export default Header;
