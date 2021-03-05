import React, { useState } from "react";
import styled from "styled-components";
import { useHistory, useLocation } from "react-router-dom";
import { useTheme } from "../app/theme";

import Header from "../components/Header";
import Button from "../components/Button";
import Ring from "../components/Ring";
import SelectModal from "../components/SelectModal";

const numberOfGamesOptions = [
  {
    key: 2,
    value: "2 Games",
  },
  {
    key: 3,
    value: "3 Games",
  },
  {
    key: 5,
    value: "5 Games",
  },
  {
    key: 10,
    value: "10 Games",
  },
];

const whoStartsOptions = [
  {
    key: "alternative-turn",
    value: "Alternative Turn",
  },
  {
    key: "looser-first",
    value: "Looser first",
  },
  {
    key: "winner-first",
    value: "Winner first",
  },
  {
    key: "always-player-01",
    value: "Always player 01",
  },
  {
    key: "always-player-02",
    value: "Always player 02",
  },
];

const StartGame = () => {
  const theme = useTheme();
  const history = useHistory();
  const location = useLocation();

  const state = location.state as {
    player1Name: string;
    player1Gender: "M" | "F";
    player2Name: string;
    player2Gender: "M" | "F";
    numberOfGames: number;
    whoStarts:
      | "alternative-turn"
      | "looser-first"
      | "winner-first"
      | "always-player-01"
      | "always-player-02";
  };

  const [player1Name, setPlayer1Name] = useState(state?.player1Name ?? "");
  const [player1Gender, setPlayer1Gender] = useState<"M" | "F">(
    state?.player1Gender ?? "M"
  );
  const [player2Name, setPlayer2Name] = useState(state?.player2Name ?? "");
  const [player2Gender, setPlayer2Gender] = useState<"M" | "F">(
    state?.player2Gender ?? "F"
  );
  const [numberOfGames, setNumberOfGames] = useState(state?.numberOfGames ?? 5);
  const [whoStarts, setWhoStarts] = useState(
    state?.whoStarts ?? "alternative-turn"
  );

  const [isOpenNumberOfGamesModal, setIsOpenNumberOfGamesModal] = useState(
    false
  );
  const [isOpenWhoStartsModal, setIsOpenWhoStartsModal] = useState(false);

  const handleGenderChange = (player: string, gender: "M" | "F") => {
    switch (player) {
      case "1":
        setPlayer1Gender(gender === "M" ? "F" : "M");
        return;
      case "2":
        setPlayer2Gender(gender === "M" ? "F" : "M");
        return;
      default:
        setPlayer2Gender("F");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    history.push("/tournament", {
      player1Name: player1Name,
      player1Gender: player1Gender ?? "M",
      player2Name: player2Name,
      player2Gender: player2Gender ?? "F",
      numberOfGames: numberOfGames,
      whoStarts: whoStarts,
    });
  };

  return (
    <StyledStartGame>
      <Header backPath="/" />
      <div className="container">
        <form onSubmit={handleSubmit}>
          <StyledInputCard theme={theme} variant="primary">
            <Ring
              icon="boy"
              variant="primary"
              shadow
              player="1"
              value={player1Gender}
              handleGenderChange={handleGenderChange}
            />
            <div>
              <label htmlFor="player1Name">Player 01</label>
              <input
                name="player1Name"
                value={player1Name}
                placeholder="Player 01"
                onChange={(e) => setPlayer1Name(e.target.value)}
                required
              />
            </div>
          </StyledInputCard>
          <StyledInputCard theme={theme} variant="secondary">
            <Ring
              icon="girl"
              variant="secondary"
              shadow
              player="2"
              value={player2Gender}
              handleGenderChange={handleGenderChange}
            />
            <div>
              <label htmlFor="player2Name">Player 02</label>
              <input
                name="player2Name"
                value={player2Name}
                placeholder="Player 02"
                onChange={(e) => setPlayer2Name(e.target.value)}
                required
              />
            </div>
          </StyledInputCard>
          <StyledInputCard theme={theme} variant="tertiary">
            <Ring icon="winner" variant="tertiary" />
            <div>
              <label htmlFor="numberOfGames">Number of games</label>
              <input
                name="numberOfGames"
                value={
                  numberOfGamesOptions
                    .filter((option) => option.key === numberOfGames)
                    .shift()?.value
                }
                onClick={() => {
                  setIsOpenNumberOfGamesModal(true);
                }}
                readOnly
              />
              <div id="number-of-games" data-uk-modal>
                <SelectModal
                  isOpen={isOpenNumberOfGamesModal}
                  title="Number of games"
                  options={numberOfGamesOptions}
                  currentValue={numberOfGames}
                  updateValue={setNumberOfGames}
                  onCancel={() => {
                    setIsOpenNumberOfGamesModal(!isOpenNumberOfGamesModal);
                  }}
                />
              </div>
            </div>
          </StyledInputCard>
          <StyledInputCard theme={theme} variant="tertiary">
            <Ring icon="run" variant="tertiary" />
            <div>
              <label htmlFor="whoStarts">Who Starts</label>
              <input
                name="whoStarts"
                value={
                  whoStartsOptions
                    .filter((option) => option.key === whoStarts)
                    .shift()?.value
                }
                onClick={() => {
                  setIsOpenWhoStartsModal(true);
                }}
                readOnly
              />
              <div id="who-starts" data-uk-modal>
                <SelectModal
                  isOpen={isOpenWhoStartsModal}
                  title="Who starts"
                  options={whoStartsOptions}
                  currentValue={whoStarts}
                  updateValue={setWhoStarts}
                  onCancel={() => {
                    setIsOpenWhoStartsModal(!isOpenWhoStartsModal);
                  }}
                />
              </div>
            </div>
          </StyledInputCard>
          <hr className="horizontal-divider" />
          <Button variant="primary" type="submit">
            Start Game
          </Button>
        </form>
      </div>
    </StyledStartGame>
  );
};

const StyledStartGame = styled.div`
  display: grid;
  place-content: center;
  min-height: calc((var(--vh, 1vh) * 100));
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 500px;
    min-width: 400px;
    background: #ffffff;
    box-shadow: 0px 3px 6px #00000029;
    border: 1px solid #f7f7f7;
    border-radius: 30px;
    padding: 30px;
    opacity: 1;
    @media (max-width: 768px) {
      width: 500px;
      min-width: 400px;
      padding: 24px;
    }
    @media (max-width: 540px) {
      width: 90vw;
      min-width: unset;
      padding: 16px;
    }
    .horizontal-divider {
      margin: 12px 0;
      width: 100%;
      height: 0.5px;
      border-width: 0;
      background-color: #e5e5e5;
      @media (max-width: 768px) {
        margin: 12px 0;
      }
      @media (max-width: 540px) {
        margin: 12px 0;
      }
    }
    & > form {
      display: grid;
      grid-template-columns: 1fr;
      grid-gap: 10px;
      width: 100%;
      button {
        font-size: 1.1rem;
      }
    }
  }
`;

interface StyledInputCardProps {
  variant: "primary" | "secondary" | "tertiary";
}

const StyledInputCard = styled("div")<StyledInputCardProps>`
  display: flex;
  justify-content: center;
  grid-gap: 16px;
  width: 100%;
  padding: 12px;
  background: ${(props) => props.theme.palette[props.variant].light};
  border: 1px solid #70707026;
  border-radius: 15px;
  @media (max-width: 768px) {
    padding: 12px;
  }
  @media (max-width: 540px) {
    width: 80vw;
    padding: 12px;
  }
  & > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: calc(100% - 96px);
    & > label {
      font-size: 0.8rem;
      color: #707070;
      margin-left: -35px;
      padding: 0 0 0 30px;
    }
    & > input,
    select {
      font-family: Poppins;
      font-size: 1.3rem;
      height: 50px;
      margin-left: -35px;
      padding: 10px 0 0 30px;
      border: 0;
      border-bottom: 1px solid #707070;
      background-color: transparent;
      outline: none;
    }
  }
`;

export default StartGame;
