import React from "react";
import styled from "styled-components";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const IconButton: React.FC<Props> = ({ onClick, children, ...rest }) => {
  return (
    <StyledIconButton onClick={onClick} {...rest}>
      {children}
    </StyledIconButton>
  );
};

const StyledIconButton = styled.button`
  background: #ffffff;
  border: 0;
  width: 40px;
  height: 40px;
  outline: none;
  cursor: pointer;
  & > svg {
    width: 100%;
    height: 100%;
  }
`;

export default IconButton;
