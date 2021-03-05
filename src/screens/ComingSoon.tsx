import React from "react";
import styled from "styled-components";

const ComingSoon = () => {
  return (
    <StyledComingSoon>
      <div className="container">Coming Soon</div>
    </StyledComingSoon>
  );
};

const StyledComingSoon = styled.div`
  display: grid;
  place-content: center;
  min-height: calc((var(--vh, 1vh) * 100));
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 400px;
    height: 70vh;
    box-shadow: 0px 3px 6px #00000029;
    background: #ffffff;
    border: 1px solid #f7f7f7;
    border-radius: 30px;
    @media (max-width: 540px) {
      width: 80vw;
      min-width: unset;
      height: 400px;
    }
  }
`;

export default ComingSoon;
