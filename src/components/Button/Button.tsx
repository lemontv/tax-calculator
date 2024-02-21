import React, { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}
export const Button: React.FC<Props> = ({ children, ...rest }) => (
  <button {...rest}>{children}</button>
);
