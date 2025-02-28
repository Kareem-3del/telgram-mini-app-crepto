import Link from "next/link";

import { taskPreviewModeType } from "../../lib/types";

const AdList = ({
  status,
  name,
  category,
  logo,
}: {
  status: "Approved" | "Declined" | "Pending" | String;
  name: string;
  category: "Telegram" | "X" | "Youtube" | String;
  logo: string;
}) => {
  const setButtonColor = () => {
    switch (status) {
      case "Approved":
        return "green";
        break;
      case "Declined":
        return "red";
        break;
      default:
        return "#b6b61d";
    }
  };
  return (
    <div className="w-[90%] flex justify-between items-center bg-[#1c1c1c] rounded-[10px]  mb-[30px] px-[20px] py-[14px]">
      <img src={logo} className="w-[60px] h-[60px]" />
      <div className="flex  flex-col justify-start items-center w-[60%]">
        <span className="max-w-full text-white text-[14px] break-words">
          <b className="text-red-700">{name}</b>
          {` (${category} ad)`}
        </span>
        <button
          style={{ backgroundColor: setButtonColor() }}
          className="px-[30px] py-[8px] mt-[20px] rounded-[8px] text-white"
        >
          {status}
        </button>
      </div>
    </div>
  );
};

const Ads = ({ ads }: { ads: taskPreviewModeType[] }) => {
  return (
    <div className="relative w-full h-full flex flex-col justify-start items-center p-[10px]">
      <Link href={"/new-ad"}>
        <button className="bg-slate-600 text-white rounded-[12px] px-[35px] py-[10px] mb-[40px] ">
          Create Ad +
        </button>
      </Link>

      <div className="w-full flex flex-col justify-start items-center bg-[#2f2f2f] py-[20px]">
        <span>My Ads ({ads.length || 0})</span>
        <div className="w-full mt-[30px] flex flex-col justify-start items-center">
          {ads.map((each, i) => {
            return (
              <AdList
                key={i}
                status={each.status as string}
                category={each.category}
                name={each.name}
                logo={each.logo as string}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Ads;
