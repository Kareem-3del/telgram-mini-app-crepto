import { useState } from "react";
import Link from "next/link";

import a from "../../assets/images/task.png"
const BottomNav = () => {
  return (
    <div className="w-full my-0 mx-auto flex justify-between px-[30px] h-[100px] items-center border-[2px] border-slate-400 rounded-[35px]">
      <Link href={"/tasks"}>
        <img src={"/assets/images/task.png"} className="w-[70px] h-[70px]" alt="" />
      </Link>
      <div className="h-[50px] w-[3px] bg-white"></div>
      <Link href={"/referrals"}>
        <img src={"/assets/images/gift.png"} className="w-[55px] h-[55px]" alt="" />
      </Link>
    </div>
  );
};

export default BottomNav;
