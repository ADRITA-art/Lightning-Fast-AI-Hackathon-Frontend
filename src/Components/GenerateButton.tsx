import React from "react";
import styled from "styled-components";

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, disabled = false, loading = false, children }) => {
  return (
    <StyledWrapper>
      <button
        onClick={onClick}
        disabled={disabled || loading}
        className={`button ${disabled || loading ? "disabled" : ""}`}
      >
        {loading ? "Generating..." : children}
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .button {
    position: relative;
    width: 120px;
    height: 40px;
    background-color: #000;
    display: flex;
    align-items: center;
    color: white;
    flex-direction: column;
    justify-content: center;
    border: none;
    padding: 12px;
    gap: 12px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
  }

  .button.disabled {
    cursor: not-allowed;
    background-color: #666;
  }

  .button::before {
    content: '';
    position: absolute;
    inset: 0;
    left: -4px;
    top: -1px;
    margin: auto;
    width: 128px;
    height: 48px;
    border-radius: 10px;
    background: linear-gradient(-45deg, #e81cff 0%, #40c9ff 100%);
    z-index: -10;
    pointer-events: none;
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .button::after {
    content: "";
    z-index: -1;
    position: absolute;
    inset: 0;
    background: linear-gradient(-45deg, #fc00ff 0%, #00dbde 100%);
    transform: translate3d(0, 0, 0) scale(0.95);
    filter: blur(20px);
  }

  .button:hover:not(.disabled)::after {
    filter: blur(30px);
  }

  .button:hover:not(.disabled)::before {
    transform: rotate(-180deg);
  }

  .button:active:not(.disabled)::before {
    scale: 0.7;
  }
`;

export default Button;
