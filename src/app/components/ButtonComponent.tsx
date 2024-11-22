// components/GradientButton.tsx

import React from "react";

// Define props for the button component
interface GradientButtonProps {
  onClick?: () => void;  // Optional click handler
  children: React.ReactNode; // Button text or content
  className?: string;  // Optional additional classes
}

// GradientButton component definition
const GradientButton: React.FC<GradientButtonProps> = ({
  onClick,
  children,
  className = "",
}) => {
  return (
    <div className={`container ${className}`}>
      <button className="button" onClick={onClick}>
        {children}
      </button>
      <style jsx>{`
        button {
          font-size: 1.4em;
          padding: 0.6em 0.8em;
          border-radius: 0.5em;
          border: none;
          background-color: #000;
          color: #fff;
          cursor: pointer;
          box-shadow: 2px 2px 3px #000000b4;
          position: relative;
          z-index: 1; // Ensure button is above the container
        }

        .container {
          position: relative;
          padding: 3px;
          background: linear-gradient(90deg, #03a9f4, #f441a5);
          border-radius: 0.9em;
          transition: all 0.4s ease;
        }

        .container::before {
          content: "";
          position: absolute;
          inset: 0;
          margin: auto;
          border-radius: 0.9em;
          z-index: -10;
          filter: blur(0);
          transition: filter 0.4s ease;
        }

        .container:hover::before {
          background: linear-gradient(90deg, #03a9f4, #f441a5);
          filter: blur(1.2em);
        }

        .container:active::before {
          filter: blur(0.2em);
        }
      `}</style>
    </div>
  );
};

export default GradientButton;
