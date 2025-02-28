import React, { createContext, useState, ReactNode } from "react";

type referralsType = {
  username?: string;
  firstname?: string;
  lastname?: string;
};
// Define the types for the context
export interface AppContextType {
  chatId: number | null;
  balance: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
  setChatId: (chatId: number | null) => void;
  referrals: referralsType[];
  setReferrals: (referrals: referralsType[]) => void;
  completedTasks: string[];
  setCompletedTasks: React.Dispatch<React.SetStateAction<string[]>>;
  walletAddress: string | null;
  setWalletAddress: React.Dispatch<React.SetStateAction<string | null>>;
}

// Create the context with a default value of `null`
export const AppContext = createContext<AppContextType | null>(null);

// Define the provider props
interface AppProviderProps {
  children: ReactNode;
}

// Create the provider component
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [balance, setBalance] = useState<number>(0);
  const [chatId, setChatId] = useState<number | null>(null);
  const [referrals, setReferrals] = useState<referralsType[]>([]);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  return (
    <AppContext.Provider
      value={{
        walletAddress,
        setWalletAddress,
        completedTasks,
        setCompletedTasks,
        chatId,
        setChatId,
        balance,
        setBalance,
        referrals,
        setReferrals,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
