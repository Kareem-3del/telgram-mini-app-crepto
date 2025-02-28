import React, {
  createContext,
  useState,
  ReactNode,
  SetStateAction,
  Dispatch,
} from "react";

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
  tgId: string | undefined | number;
  setTgId: Dispatch<SetStateAction<string | undefined | number>>;
  token: string | undefined;
  setToken: Dispatch<SetStateAction<string | undefined>>;
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
  const [tgId, setTgId] = useState<string | number | undefined>("");
  const [token, setToken] = useState<string | undefined>("");

  return (
    <AppContext.Provider
      value={{
        token,
        setToken,
        tgId,
        setTgId,
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
