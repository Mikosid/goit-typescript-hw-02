import { ReactNode } from "react";

import style from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  children: ReactNode;
  textAlign?: string;
  marginBottom?: string;
}

export const ErrorMessage = ({
  children,
  textAlign = "",
  marginBottom = "0",
}: ErrorMessageProps): JSX.Element => {
  return (
    <p
      className={[
        style["text"],
        style[textAlign],
        style[`marginBottom${marginBottom}`],
      ].join(" ")}
    >
      {children}
    </p>
  );
};
