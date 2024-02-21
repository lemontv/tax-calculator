import React, { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input: React.FC<Props> = ({ label, ...rest }) => (
  <label>
    {label}
    <input {...rest} />
  </label>
);
