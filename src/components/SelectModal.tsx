import React, { useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";

import Button from "./Button";

Modal.setAppElement("#root");
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: 0,
    width: "350px",
    borderRadius: "20px",
    padding: "30px",
  },
  overlay: {
    background: "rgba(0, 0, 0, 0.6)",
  },
};

interface Props {
  title: string;
  options: Array<{ key: string | number; value: string }>;
  isOpen: boolean;
  onCancel: () => void;
  currentValue: string | number;
  updateValue: React.Dispatch<React.SetStateAction<any>>;
}

const SelectModal: React.FC<Props> = ({
  isOpen,
  title,
  options,
  currentValue,
  updateValue,
  onCancel,
}) => {
  const [selected, setSelected] = useState(currentValue);
  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      onRequestClose={onCancel}
      shouldCloseOnOverlayClick={true}
    >
      <StyledSelectModal>
        <h4 className="heading" onClick={() => console.log("update value")}>
          {title}
        </h4>
        <div className="options">
          {options.map((option, i) => (
            <div
              key={i}
              onClick={() => {
                setSelected(option.key);
              }}
            >
              <input
                type="radio"
                value={option.key}
                checked={option.key === selected}
                readOnly
              />
              <label>{option.value}</label>
            </div>
          ))}
        </div>
        <hr className="horizontal-divider" />
        <div className="action-buttons">
          <Button
            variant="secondary"
            onClick={() => {
              setSelected(currentValue);
              onCancel();
            }}
          >
            CANCEL
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              updateValue(selected);
              onCancel();
            }}
          >
            OK
          </Button>
        </div>
      </StyledSelectModal>
    </Modal>
  );
};

const StyledSelectModal = styled.div`
  .heading {
    font-family: "Poppins";
    text-align: center;
    color: #424242;
  }
  .options {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 6px;
    & > div {
      cursor: pointer;
      font-family: "Poppins";
      padding: 12px;
      border-radius: 10px;
      background-color: #eff3ff;
      height: 50px;
      border: 1px solid #70707026;
      & > label {
        color: #424242;
        margin-left: 6px;
      }
    }
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
  .action-buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 6px;
    button {
      font-size: 1.1rem;
      height: 50px;
    }
  }
`;

export default SelectModal;
