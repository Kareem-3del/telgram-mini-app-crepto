import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import { AppContext, AppContextType } from "@/context/AppContext";
import { fetchUser, saveWallet, updateBalance } from "@/api/user";
import Loader from "../Loader";
import { retrieveLaunchParams } from "@tma.js/sdk";

type WalletModalProps = {
  walletAddress: string | null;
  setWalletAddress: Dispatch<SetStateAction<string | null>>;
  setWalletModal: Dispatch<SetStateAction<boolean>>;
};

const WalletModal = ({
                       setWalletAddress,
                       walletAddress,
                       setWalletModal,
                     }: WalletModalProps) => {
  const [address, setAddress] = useState<string>("");
  const [saved, setSaved] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);

  const submit = async () => {
    try {
      setSaving(true);
      const saveRes = await saveWallet(1234, address, "ddd9");
      if (saveRes?.success) {
        setSaved(true);
        setWalletAddress(address);
        setTimeout(() => setWalletModal(false), 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
      <div className="absolute w-full h-full top-0 left-0 z-[9] bg-[#000000ca] flex justify-center items-center">
        <div className="rounded-[5px] py-[20px] bg-[#344b4c] flex flex-col justify-start items-center">
          {!saved && !walletAddress && (
              <>
                <div
                    onClick={() => setWalletModal(false)}
                    className="w-full flex justify-end pr-[20px]"
                >
              <span className="bg-slate-900 text-white rounded-[50px] w-[40px] h-[40px] flex justify-center items-center">
                X
              </span>
                </div>
                <span className="mt-[20px] mx-[35px]">
              Add your SOL wallet address
            </span>
                <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Write here..."
                    className="w-[250px] max-w-[250px] min-h-[60px] max-h-[100px] mt-[12px] h-[60px] rounded-[5px] p-[12px] text-slate-800 outline-none"
                ></textarea>
                {address.length > 30 && (
                    <button
                        onClick={submit}
                        className="mt-[25px] text-white bg-[#1c2425] rounded-[5px] px-[40px] py-[7px]"
                    >
                      {saving ? "Saving..." : "Save"}
                    </button>
                )}
              </>
          )}

          {saved && <span>Wallet address saved!</span>}
          {walletAddress && (
              <>
                <div
                    onClick={() => setWalletModal(false)}
                    className="w-full flex justify-end pr-[20px] mb-[10px]"
                >
              <span className="bg-slate-900 text-white rounded-[50px] w-[40px] h-[40px] flex justify-center items-center">
                X
              </span>
                </div>
                <span>Your SOL address</span>

                <span className="mx-[25px] bg-slate-300 text-[14px] max-w-[250px] break-words mt-[20px] border-[2px] p-[5px] border-slate-900 rounded-[5px] text-slate-900">
              {walletAddress}
            </span>
              </>
          )}
        </div>
      </div>
  );
};

interface FloatingText {
  id: number;
  x: number;
  y: number;
}

const Mine = () => {
  // Instead of using hooks from SDK, use direct approach
  // This avoids needing SDKProvider
  const [token, setTokenValue] = useState("");
  const [tgId, setTgIdValue] = useState<number | null>(null);

  // Try to get launch parameters directly
  useEffect(() => {
    try {
      // Get Telegram WebApp from window object
      const tgWebApp = (window as any).Telegram?.WebApp;

      if (tgWebApp) {
        // If we have access to Telegram WebApp, get user and init data
        if (tgWebApp.initDataUnsafe?.user?.id) {
          setTgIdValue(tgWebApp.initDataUnsafe.user.id);
        }

        if (tgWebApp.initData) {
          setTokenValue(tgWebApp.initData);
        }

        // Setup closing confirmation if needed
        if (tgWebApp.enableClosingConfirmation) {
          tgWebApp.enableClosingConfirmation();
        }

        // Expand the viewport
        if (tgWebApp.expand) {
          tgWebApp.expand();
        }
      } else {
        // Fallback to SDK method if WebApp is not available
        try {

          const params = retrieveLaunchParams();
          if (params?.initDataRaw) {
            setTokenValue(params.initDataRaw);

            // Try to extract user ID from init data if possible
            try {
              const initData = JSON.parse(decodeURIComponent(params.initDataRaw.split('=')[1]));
              if (initData?.user?.id) {
                setTgIdValue(initData.user.id);
              }
            } catch (parseError) {
              console.error("Error parsing initData:", parseError);
            }
          }
        } catch (sdkError) {
          console.error("Unable to retrieve launch parameters:", sdkError);
        }
      }
    } catch (error) {
      console.error("Error accessing Telegram WebApp:", error);
    }
  }, []);

  const {
    setTgId,
    setToken,
    setBalance,
    setChatId,
    setReferrals,
    walletAddress,
    setWalletAddress,
    setCompletedTasks,
  } = useContext(AppContext) as AppContextType;

  const [loading, setLoading] = useState<boolean>(false);

  // Load user data once we have tgId and token
  useEffect(() => {
    const loadUser = async () => {
      if (!tgId) return;

      setLoading(true);
      try {
        const loadRes = await fetchUser(tgId, token);
        if (loadRes?.data) {
          setBalance(loadRes.data.balance);
          setValue(loadRes.data.balance);
          setChatId(loadRes.data.chatId);
          setReferrals(loadRes.data.referrals);
          setWalletAddress(loadRes.data.walletAddress);
          setCompletedTasks(loadRes.data.completedTasks);
          setTgId(tgId);
          setToken(token);
        }
      } catch (error) {
        console.error("Failed to load user:", error);
      } finally {
        setLoading(false);
      }
    };

    if (tgId && token) {
      loadUser();
    }
  }, [tgId, token, setBalance, setChatId, setReferrals, setWalletAddress, setCompletedTasks, setTgId, setToken]);

  const maxEnergy = 250;
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!tgId) return;

    const timeoutId = setTimeout(() => {
      updateBalance(tgId, value, token).catch((error) =>
          console.error("Failed to update balance:", error)
      );
    }, 1500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, tgId, token]);

  const [energy, setEnergy] = useState(maxEnergy);
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);
  const [nextId, setNextId] = useState(0);

  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (energy > 0) {
      setValue((prev) => prev + 1);
      setEnergy((prev) => (prev > 0 ? prev - 1 : 0));

      const {clientX: x, clientY: y} = e;
      const newText: FloatingText = {id: nextId, x, y};
      setFloatingTexts((prev) => [...prev, newText]);
      setNextId((prev) => prev + 1);

      setTimeout(() => {
        setFloatingTexts((prev) =>
            prev.filter((text) => text.id !== newText.id)
        );
      }, 2000);
    }
  };

  const energyPercentage = Math.min((energy / maxEnergy) * 100, 100);

  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prevEnergy) =>
          prevEnergy < maxEnergy ? prevEnergy + 1 : maxEnergy
      );
    }, 1500);

    return () => clearInterval(interval);
  }, [maxEnergy]);

  const [walletModal, setWalletModal] = useState<boolean>(false);

  return (
      <div className="w-full h-full flex flex-col justify-evenly relative">
        {loading && <Loader/>}
        <div
            onClick={() => setWalletModal(true)}
            className="absolute top-[30px] right-[8px] p-[12px] rounded-[50px] bg-slate-700 flex justify-center items-center cursor-pointer"
        >
          <img
              src={"/assets/images/wallet.svg"}
              alt="Wallet icon"
              className="w-[25px] h-[25px]"
          />
        </div>

        {walletModal && (
            <WalletModal
                setWalletModal={setWalletModal}
                walletAddress={walletAddress}
                setWalletAddress={setWalletAddress}
            />
        )}
        <div className="w-full flex flex-col items-center justify-center gap-0">
          <div className="text-gray-300 text-2xl">Your Balance:</div>
          <span className="font-bold text-7xl">{value.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-center">
          <img
              src={"/assets/images/boat.svg"}
              alt="logo"
              onClick={handleClick}
              className="w-[65%] cursor-pointer drop-shadow-2xl coin-button"
          />
        </div>

        <div className="w-full flex flex-col gap-2">
          <div className="w-full relative rounded-full h-[16px] bg-[#012237] border border-[#073755]">
            <div
                className="absolute left-0 h-full rounded-full bg-gradient-to-r from-[#dc7b0c] to-[#fff973]"
                style={{width: `${energyPercentage}%`}}
            ></div>
          </div>
          <div className="w-full text-center text-[15px] font-semibold">
            {energy} / {maxEnergy}
          </div>
        </div>

        {floatingTexts.map((text) => (
            <span
                className="floating-text font-semibold text-[30px]"
                key={text.id}
                style={{top: text.y, left: text.x}}
            >
          +1
        </span>
        ))}
      </div>
  );
};

export default Mine;