"use client"
import { ChangeEvent, useEffect, useRef, useState } from "react";
import telegramImage from "../assets/images/telegram.png";
import { fetchAllTasks, fetchRules, updateRules } from "../api/task";
import { Task } from "../lib/types";
import Loader from "../components/Loader";
import { disableScroll, enableScroll } from "../helpers/scroll";
import Navbar from "../components/Navbar";
import Link from "next/link";

export default function Home() {
  // State for form fields
  const [formData, setFormData] = useState<rulesType>({
    referralPoints: 0,
    taskPoints: 0,
    dailyTapLimit: 0,
    maxTokensForAllUsers: 0,
  });

  // State for task list tab
  const [currentTab, setCurrentTab] = useState("All");

  // Handle input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  type rulesType = {
    maxTokensForAllUsers: number;
    dailyTapLimit: number;
    taskPoints: number;
    referralPoints: number;
  };
  const [loading, setLoading] = useState<boolean>(false);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [rules, setRules] = useState<rulesType | null>(null);

  const loadRules = async () => {
    try {
      const loadRes = await fetchRules();
      if (loadRes?.success) {
        setFormData(loadRes.data);
        setRules(loadRes.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  useEffect(() => {
    if (
      rules?.dailyTapLimit !== formData.dailyTapLimit ||
      rules.maxTokensForAllUsers !== formData.maxTokensForAllUsers ||
      rules.referralPoints !== formData.referralPoints ||
      rules.taskPoints !== formData.taskPoints
    ) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [
    formData.dailyTapLimit,
    formData.maxTokensForAllUsers,
    formData.referralPoints,
    formData.taskPoints,
  ]);

  const refPointRef = useRef<HTMLInputElement>(null);
  const handleEdit = async () => {
    if (!isEditing) {
      if (refPointRef.current) {
        return refPointRef.current.focus();
      }
    } else {
      try {
        setIsUpdating(true);
        setIsEditing(false);
        const updateRes = await updateRules(formData);
        if (updateRes?.success) {
          alert("Rules updated!");
          setIsUpdating(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const [tasksToRender, setTasksToRender] = useState<Task[]>([]);

  useEffect(() => {
    setTasksToRender(tasks);
  }, [tasks]);

  useEffect(() => {
    switch (currentTab) {
      case "All":
        setTasksToRender(tasks);
        break;
      case "Approved":
        setTasksToRender(
          tasks.filter((e) => e.status?.toLocaleLowerCase() == "approved")
        );
        break;
      case "Pending":
        setTasksToRender(
          tasks.filter((e) => e.status?.toLocaleLowerCase() == "pending")
        );
        break;
      default:
        setTasksToRender(
          tasks.filter((e) => e.status?.toLocaleLowerCase() == "declined")
        );
    }
  }, [currentTab]);

  const loadTasks = async () => {
    try {
      window.scrollTo(0, 0);
      disableScroll();
      setLoading(true);
      const loadRes = await fetchAllTasks();
      if (loadRes?.success) {
        setTasks(loadRes.data);
        enableScroll();
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadRules();
    loadTasks();
  }, []);

  return (
    <main className="w-full min-h-screen flex flex-col justify-start items-center py-[30px] relative px-[20px]">
      {loading && <Loader />}
      <Navbar />

      <h1 className="text-white text-[35px]">Welcome, Admin</h1>

      {/* Admin Rules */}
      <section className="mt-[35px] w-full flex flex-col justify-start items-center px-[15px] py-[20px] rounded-[8px] bg-gray-700">
        <span className="text-[20px] mb-[20px]">Admin Rules</span>

        <section className="w-full flex justify-between items-center my-[10px]">
          <section className="flex flex-col justify-start items-start w-[40%]">
            <label htmlFor="ReferralPoints" className="mb-[10px]">
              Referral Points
            </label>
            <input
              ref={refPointRef}
              type="number"
              name="referralPoints"
              id="ReferralPoints"
              value={formData.referralPoints}
              onChange={handleInputChange}
              className="w-full h-[40px] pl-[10px] rounded-[5px] text-slate-900"
            />
          </section>

          <section className="flex flex-col justify-start items-start w-[40%]">
            <label htmlFor="TaskPoints" className="mb-[10px]">
              Task Points
            </label>
            <input
              type="number"
              name="taskPoints"
              id="TaskPoints"
              value={formData.taskPoints}
              onChange={handleInputChange}
              className="w-full h-[40px] pl-[10px] rounded-[5px] text-slate-900"
            />
          </section>
        </section>

        <section className="w-full flex justify-between items-center my-[10px]">
          <section className="flex flex-col justify-start items-start w-[40%]">
            <label htmlFor="DailyTapLimit" className="mb-[10px]">
              Daily Tap Limit
            </label>
            <input
              type="number"
              name="dailyTapLimit"
              id="DailyTapLimit"
              value={formData.dailyTapLimit}
              onChange={handleInputChange}
              className="w-full h-[40px] pl-[10px] rounded-[5px] text-slate-900"
            />
          </section>

          <section className="flex flex-col justify-start items-start w-[40%]">
            <label htmlFor="MaximumToken" className="mb-[10px]">
              Maximum Tokens (All users)
            </label>
            <input
              type="number"
              name="maxTokensForAllUsers"
              id="MaximumToken"
              value={formData.maxTokensForAllUsers}
              onChange={handleInputChange}
              className="w-full h-[40px] pl-[10px] rounded-[5px] text-slate-900"
            />
          </section>
        </section>

        <section className="w-full flex mt-[15px] justify-center items-center">
          <button
            onClick={handleEdit}
            className="px-[42px] py-[8px] rounded-[5px] text-white bg-green-700"
          >
            {isEditing && "Update"}
            {isUpdating && "Updating ..."}
            {!isEditing && !isUpdating && "Edit"}
          </button>
          {isEditing && (
            <button
              onClick={() => setFormData(rules as rulesType)}
              className="px-[42px] py-[8px] rounded-[5px] text-white bg-red-700 ml-[25px]"
            >
              Cancel
            </button>
          )}
        </section>
      </section>

      {/* Task List */}
      <section className="w-full flex flex-col justify-start items-center mt-[100px] bg-gray-700 py-[20px] px-[10px] rounded-[5px]">
        <h2 className="text-[20px] font-bold">Tasks/Ads</h2>

        {/* Header */}
        <section className="w-full flex justify-center items-center mt-[20px]">
          {["All", "Approved", "Pending", "Declined"].map((tab, i) => (
            <span
              key={tab}
              onClick={() => setCurrentTab(tab)}
              style={{ color: currentTab == tab ? "#ef4444" : "#cbd5e1" }}
              className={`text-slate-300 mr-[20px] cursor-pointer ${
                i < 3 && "mr-[20px]"
              } ${currentTab === tab ? "underline" : ""}`}
            >
              {tab}
            </span>
          ))}
        </section>

        {/* Tasks */}
        <section className="w-full flex flex-col justify-start items-center mt-[20px]">
          {tasksToRender.map((each, i) => {
            return (
              <div
                key={i}
                className="w-full flex justify-between items-center bg-[#1a1818] rounded-[10px]  mb-[30px] px-[20px] py-[14px]"
              >
                <div className="flex flex-col justify-start items-start w-[50%]">
                  <img
                    src={each.logo}
                    className="w-[80px] h-[70px] rounded-[50px]"
                  />

                  <span
                    className={`${each.status == "Pending" && "bg-yellow-600"}
            ${each.status == "Declined" && "bg-red-900"}
            ${each.status == "Approved" && "bg-green-800"}
             text-[12px] font-bold px-[10px] py-[5px] mt-[20px] rounded-[8px] text-white`}
                  >
                    {each.status?.toLowerCase()}
                  </span>
                </div>

                <div className="flex  flex-col justify-start items-end w-[50%]">
                  <span className="text-white text-center">
                    <b className="text-red-700">{each.name}</b>
                    {` on ${each.category}`}
                  </span>
                  <Link href={`/task/${each._id}`}>
                    <button className="bg-green-700 px-[30px] py-[8px] mt-[20px] rounded-[8px] text-white">
                      View Ad
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}

          {tasksToRender.length == 0 && (
            <span className="bg-slate-950 text-white rounded-[5px] px-[30px] py-[10px]">
              No task
            </span>
          )}
        </section>
      </section>
    </main>
  );
}
