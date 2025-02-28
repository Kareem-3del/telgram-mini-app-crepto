"use client"
import React, { useContext, useEffect, useState } from "react";
import { AppContext, AppContextType } from "../../context/AppContext";
import { fetchReferrals } from "../../api/user";
import { parseNames } from "../../lib/parseNames";

const Referrals = () => {
  const { setReferrals, referrals, tgId, token } = useContext(AppContext) as AppContextType;
  let parsedReferrals = parseNames(referrals);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (copied) {
      setTimeout(() => setCopied(false), 2500);
    }
  }, [copied]);

  const [reloadText, setReloadText] = useState<string>("Reload");

  const reload = async () => {
    setReloadText("Reloading ...");

    try {
      const reloadRes = await fetchReferrals(tgId as number, token as string);
      if (reloadRes?.data) {
        setReferrals(reloadRes.data);
        setReloadText("Updated!");
        setTimeout(() => setReloadText("Reload"), 1500);
      }
    } catch (error) {
      setReloadText("Reload");
      console.log(error);
    }
  };

  return (
    <div className="w-full flex flex-col justify-start items-center h-screen pt-[40px] bg-slate-900">
      <div className="relative w-full h-full flex flex-col justify-start items-center p-[10px]">
        <div className="w-full flex justify-center items-center">
          <span>My Friends({parsedReferrals.length})</span>
          <span
            style={{
              backgroundColor:
                reloadText == "Updated!"
                  ? "#15803d"
                  : reloadText == "Reloading ..."
                  ? "#eab308"
                  : "#2563eb",
            }}
            onClick={reload}
            className={`
         py-[4px] px-[10px] text-white rounded-[10px] ml-[40px]`}
          >
            {reloadText}
          </span>
        </div>

        <div className="flex items-center mt-[15px]">
          <span className="text-white bg-slate-700 px-[20px] py-[8px] rounded-[5px] mr-[15px]">
            Invite Friends
          </span>
          <span
            className={`text-white  px-[20px] py-[8px] rounded-[5px] ${
              copied ? "bg-slate-500" : "bg-slate-700"
            }`}
            onClick={() => setCopied(true)}
          >
            {copied ? "Copied!" : "Copy Link"}
          </span>
        </div>

        <div className="mt-[30px] w-[80%] flex flex-col justify-start items-center">
          {parsedReferrals.map((each, i) => {
            return (
              <div key={i} className="w-full flex justify-between items-center">
                <span>{each}</span>
                <span>+1</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Referrals;
