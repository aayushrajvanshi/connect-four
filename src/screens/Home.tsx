import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import one from "../assets/one.png";
import two from "../assets/two.png";
import online from "../assets/online.png";
import training from "../assets/training.png";
import logo from "../assets/4inarow@2x.png";

import Button from "../components/Button";

const Home = () => {
  return (
    <StyledHome>
      <div className="container">
        <div className="heading">
          <p className="title">CONNECT FOUR!</p>
          <p className="sub-title">Play with other players around the world.</p>
        </div>
        <div className="box">
          <div className="empty-row">
            <img src={logo} className="connect-four-image" alt="connect-four" />
            <span className="ring ring-1"></span>
            <span className="ring ring-2"></span>
          </div>
          <hr className="horizontal-divider" />
          <div className="action-buttons">
            <Link to="/coming-soon">
              <Button color="#4BABFF" icon={one}>
                Custom Game
              </Button>
            </Link>
            <Link to="/start-game">
              <Button color="#4B7BFF" icon={two}>
                Two Players
              </Button>
            </Link>
            <Link to="/coming-soon">
              <Button color="#4B4BFF" icon={online}>
                Game Online
              </Button>
            </Link>
            <Link to="/coming-soon">
              <Button color="#6E4BFF" icon={training}>
                Training Game
              </Button>
            </Link>
          </div>
        </div>
        <div className="another-box">
          <p className="copyright">©2020</p>
        </div>
      </div>
    </StyledHome>
  );
};

const StyledHome = styled.div`
  display: grid;
  place-content: center;
  min-height: calc((var(--vh, 1vh) * 100));
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #ffffff;
    width: 560px;
    @media (max-width: 768px) {
      width: 500px;
    }
    @media (max-width: 540px) {
      width: 80vw;
    }
    hr {
      margin: 12px 0;
      width: 100%;
      height: 0.5px;
      border-width: 0;
      background-color: #e5e5e5;
      @media (max-width: 768px) {
        margin: 12px 0;
      }
      @media (max-width: 540px) {
        margin: 10px 0;
      }
    }
    .heading {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      width: 100%;
      padding: 20px 40px;
      @media (max-width: 768px) {
        padding: 20px 40px;
      }
      @media (max-width: 540px) {
        padding: 20px 0;
      }
      .title {
        font-size: 1.2rem;
        font-weight: bold;
        color: #3d4276;
        text-transform: uppercase;
        margin: 0;
      }
      .sub-title {
        font-size: 0.8rem;
        color: #949494;
        margin: 0;
        max-width: 180px;
      }
    }
    .box {
      position: relative;
      width: 100%;
      height: 500px;
      background: #ffffff;
      box-shadow: 0px 3px 10px #00000029;
      border: 1px solid #f7f7f7;
      border-radius: 30px;
      box-sizing: border-box;
      z-index: 1;
      padding: 40px;
      @media (max-width: 768px) {
        height: 400px;
        padding: 30px;
      }
      @media (max-width: 540px) {
        padding: 20px;
      }
      .empty-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 16px;
        place-content: center;
        height: 60%;
        @media (max-width: 540px) {
          height: 60%;
          grid-gap: 16px;
        }
      }
      .action-buttons {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 16px;
        place-content: center;
        height: 40%;
        & button {
          font-size: 0.9rem;
          @media (max-width: 768px) {
            font-size: 0.8rem;
          }
          @media (max-width: 540px) {
            font-size: 0.7rem;
          }
        }
        @media (max-width: 768px) {
          height: 40%;
          grid-gap: 16px;
        }
        @media (max-width: 540px) {
          height: 40%;
          grid-gap: 8px;
        }
      }
      .connect-four-image {
        position: absolute;
        top: -135px;
        right: -60px;
        width: 400px;
        z-index: 1;
        @media (max-width: 768px) {
          top: -115px;
          right: -50px;
          width: 300px;
        }
        @media (max-width: 540px) {
          top: -105px;
          right: -50px;
          width: 270px;
        }
      }
      .ring {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        opacity: 0.7;
        border-radius: 50%;
      }
      .ring-1 {
        top: -62.5px;
        left: 210px;
        width: 125px;
        height: 125px;
        border: 20px solid #fff7db;
        @media (max-width: 768px) {
          top: -62.5px;
          left: 210px;
          width: 125px;
          height: 125px;
          border: 20px solid #fff7db;
        }
        @media (max-width: 540px) {
          top: -50.5px;
          left: 120px;
          width: 100px;
          height: 100px;
          border: 14px solid #fff7db;
        }
      }
      .ring-2 {
        top: 70px;
        right: -70px;
        width: 210px;
        height: 210px;
        border: 30px solid#E6FFE9;
        @media (max-width: 768px) {
          top: 70px;
          right: -70px;
          width: 210px;
          height: 210px;
        }
        @media (max-width: 540px) {
          border: 18px solid#E6FFE9;
          top: 60px;
          right: -50px;
          width: 120px;
          height: 120px;
        }
      }
    }
    .another-box {
      width: 100%;
      height: 480px;
      background: #eeeeee;
      border: 1px solid #f7f7f7;
      border-radius: 30px;
      box-sizing: border-box;
      padding: 400px 40px 0;
      margin: -400px 0 0 0;
      display: flex;
      align-items: center;
    }
    .copyright {
      font-size: 0.8rem;
      color: #424242;
    }
  }
`;

export default Home;
