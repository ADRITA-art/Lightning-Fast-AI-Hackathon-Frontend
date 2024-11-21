
import { InputHTMLAttributes } from "react";

export const Input: React.FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return (
    <input
      {...props}
      className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
    />
  );
};
