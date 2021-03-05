import React from "react";
import styled from "styled-components";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
interface CustomButtonProps extends ButtonProps {
  variant?: "primary" | "secondary" | "danger";
  color?: string;
  icon?: string;
}

const Button: React.FC<CustomButtonProps> = ({
  variant,
  icon,
  color,
  children,
  ...rest
}) => {
  return (
    <StyledButton variant={variant} color={color} icon={icon} {...rest}>
      {icon && <img src={icon} className="icon" alt="icon" />}
      {children}
    </StyledButton>
  );
};

interface StyledButtonProps {
  icon?: string;
  color?: string;
  variant?: "primary" | "secondary" | "danger";
}

const StyledButton = styled("button")<StyledButtonProps>`
  color: ${(props) =>
    props.variant === "primary"
      ? "#ffffff"
      : props.variant === "secondary"
      ? "#4babff"
      : props.variant === "danger"
      ? "#CC0000"
      : "#ffffff"};
  background: ${(props) =>
    props.color
      ? props.color
      : props.variant === "primary"
      ? "#4B7BFF"
      : props.variant === "secondary"
      ? "#ffffff"
      : props.variant === "danger"
      ? "#ffffff"
      : "#4babff"};
  border-radius: 14px;
  border: 0px;
  cursor: pointer;
  position: relative;
  font-family: Poppins;
  font-size: 1.3rem;
  box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.25);
  outline: 0;
  width: 100%;
  height: 60px;
  padding-left: ${(props) => (props.icon ? "30px" : "unset")};
  @media (max-width: 768px) {
    font-size: 1.2rem;
    width: 100%;
    height: 50px;
  }
  @media (max-width: 540px) {
    font-size: 0.7rem;
    width: 100%;
    height: 45px;
    box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.25);
  }
  .icon {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    height: 50%;
  }
  &:disabled {
    cursor: unset;
    color: #6d6d6d;
    background: #c7c7c7;
  }
`;

export default Button;
