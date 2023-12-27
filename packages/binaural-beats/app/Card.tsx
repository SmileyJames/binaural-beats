import { ReactNode } from "react";

const Card = ({ children }: { children: ReactNode }) => (
  <div className="p-4 max-w-sm mx-auto bg-white rounded-xl shadow-md flex flex-col space-y-1">
    {children}
  </div>
)

export default Card;