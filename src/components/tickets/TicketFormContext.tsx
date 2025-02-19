import { createContext, useContext, useState } from "react";
import { ITicket } from "../../pages/Tickets";

type TicketFormContextType = {
  ticket: ITicket;
  setTicket: React.Dispatch<React.SetStateAction<ITicket>>;
  preview: string;
  setPreview: React.Dispatch<React.SetStateAction<string>>;
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
};

const TicketFormContext = createContext<TicketFormContextType | undefined>(
  undefined
);

export const TicketFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [ticket, setTicket] = useState<ITicket>({} as ITicket);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  return (
    <TicketFormContext.Provider
      value={{ ticket, setTicket, preview, setPreview, file, setFile }}
    >
      {children}
    </TicketFormContext.Provider>
  );
};

export const useTicketForm = () => {
  const context = useContext(TicketFormContext);
  if (!context) {
    throw new Error(
      "useTicketFormContext must be used within a TicketFormProvider"
    );
  }
  return context;
};
