import React from "react";

interface Props {
  children: React.ReactNode;
}

export const ErrorMsg: React.FC<Props> = ({ children }) => (
  <div>{children}</div>
);
