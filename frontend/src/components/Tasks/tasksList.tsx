import boat from "../../assets/images/boat.svg";
import {
  selectedTaskCategoryType,
  Task,
  taskPreviewModeType,
} from "../../lib/types";
import { Dispatch, SetStateAction, useState } from "react";
import { disableScroll, enableScroll } from "../../helpers/scroll";

export default function TaskList({
  completedTasks,
  tasks,
  setSelectedTaskCategory,
  setSelectedTask,
  setTaskPopupShown,
}: {
  completedTasks: string[];
  tasks: taskPreviewModeType[];
  setSelectedTaskCategory: Dispatch<SetStateAction<selectedTaskCategoryType>>;
  setSelectedTask: Dispatch<SetStateAction<string>>;
  setTaskPopupShown: Dispatch<SetStateAction<boolean>>;
}) {
  const setCategoryImage = (category: string): string => {
    switch (category) {
      case "X":
        return "/assets/images/x.png";
        break;
      case "Youtube":
        return "/assets/images/youtube.png";
        break;
      default:
        return "/assets/images/telegram.png"
    }
  };

  const handlePreviewClick = (each: taskPreviewModeType) => {
    window.scrollTo(0, 0);
    disableScroll();
    setSelectedTaskCategory(each.category);
    setSelectedTask(each._id);
    setTaskPopupShown(true);
  };

  return (
    <div className="relative w-full h-full">
      {tasks.map((each, i) => {
        const categoryImage = setCategoryImage(each.category);
        return (
          <div
            key={i}
            className="w-full flex justify-between items-center bg-[#1c1c1c] rounded-[10px]  mb-[30px] px-[20px] py-[14px]"
          >
            <img
              src={categoryImage}
              className="w-[80px] h-[70px] rounded-[50px]"
            />
            {completedTasks.includes(each._id) && (
              <div className="flex  flex-col justify-start items-center w-[40%]">
                <span className="text-white">
                  <b className="text-red-700">{each.name}</b>
                  {` on ${each.category}`}
                </span>
                <button className="bg-slate-700 px-[30px] py-[8px] mt-[20px] rounded-[8px] text-white">
                  Done
                </button>
              </div>
            )}

            {!completedTasks.includes(each._id) && (
              <div
                onClick={() => handlePreviewClick(each)}
                className="flex  flex-col justify-start items-center w-[40%]"
              >
                <span className="text-white">
                  <b className="text-red-700">{each.name}</b>
                  {` on ${each.category}`}
                </span>
                <button className="bg-black px-[30px] py-[8px] mt-[20px] rounded-[8px] text-white">
                  Start
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
