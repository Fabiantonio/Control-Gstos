import type { ReactNode } from "react";

type ErrorMsgProps = {
    children: ReactNode;
}

export const ErrorMsg = ({children}: ErrorMsgProps) => {
  return (
    <p className="bg-red-500 text-white p-2 rounded-md text-center">
        {children}
    </p>
  )
}
