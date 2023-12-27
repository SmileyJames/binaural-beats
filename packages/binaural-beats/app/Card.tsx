import { ReactNode } from "react";

const Card = ({ children }: { children: ReactNode }) => (
  <div className="p-4 w-full h-full bg-white rounded-xl shadow-md flex flex-col space-y-1 justify-center">
    {children}
  </div>
)

export default Card;