"use client"
import {
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
    useState,
  } from "react";
  import TaskList from "../../components/Tasks/tasksList";
  import { formatNumberWithCommas } from "fomautils";
  import {
    selectedTaskCategoryType,
    Task,
    taskPreviewModeType,
  } from "../../lib/types";
  
  import { enableScroll } from "../../helpers/scroll";
  import Ads from "../../components/Ads";
  import { doATask, fetchAllTasks } from "../../api/task";
  import { AppContext, AppContextType } from "../../context/AppContext";
  import Loader from "../../components/Loader";
  
  const TaskPopup = ({
    taskDetails,
    setCompletedTasks,
    setBalance,
    setTaskPopupShown,
  }: {
    setCompletedTasks: Dispatch<SetStateAction<string[]>>;
    setBalance: Dispatch<SetStateAction<number>>;
    taskDetails: Task;
    setTaskPopupShown: Dispatch<SetStateAction<boolean>>;
  }) => {
    const {
      logo,
      name,
      category,
      telegramChannelLink,
      telegramGroupLink,
      websiteLink,
      xLink,
      youtubeVideoLink,
      _id,
    } = taskDetails;
  
    const setInstructions = (
      category: "X" | "Youtube" | "Telegram" | "Website"
    ) => {
      switch (category) {
        case "X":
          return [
            "Follow the project account",
            "Retweet all posts",
            "Like all posts",
            "Positive comment on posts",
          ];
        case "Telegram":
          return ["Join the main channel of the project", "Join the chat group"];
        case "Youtube":
          return [
            "Follow the channel",
            "Watch the video",
            "Like",
            "Positive comments",
          ];
        case "Website":
          return [
            "Register as a seller on the site",
            "Add a service or digital product to the seller's personal account",
            "Submit a screenshot for manual review",
          ];
        default:
          return [];
      }
    };
  
    const instructions: string[] = setInstructions(category);
  
    const getCategoryLink = () => {
      switch (category) {
        case "X":
          return xLink;
        case "Youtube":
          return youtubeVideoLink;
        case "Telegram":
          return telegramChannelLink || telegramGroupLink;
        case "Website":
          return websiteLink;
        default:
          return null; // or some default value, depending on the use case
      }
    };
  
    const doTask = async () => {
      window.open(getCategoryLink() as string, "_blank");
      try {
        const doATaskRes = await doATask(1234, "333", _id);
        if (doATaskRes?.data) {
          setBalance(doATaskRes.data.balance);
          setCompletedTasks(doATaskRes.data.completedTasks);
          setTaskPopupShown(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
      <>
        <div
          onClick={() => {
            enableScroll();
            setTaskPopupShown(false);
          }}
          className="cursor-pointer absolute top-[25px] right-[25px] bg-slate-700 text-white rounded-[50px] flex justify-center items-center w-[40px] h-[40px] z-[10]"
        >
          X
        </div>
  
        <div className="absolute w-full h-full top-0 left-0 flex flex-col justify-center items-center bg-[#000000e3] z-[9]">
          <img
            src={logo}
            alt={"Project logo"}
            className="w-[200px] h-[200px] rounded-[10px] mb-[30px]"
          />
          <span>
            <b className="text-red-500">{name}</b> on {category}{" "}
          </span>
  
          <ul className="mt-[50px] w-[70%] list-disc">
            {instructions.map((each, i) => {
              return <li key={i}> {each} </li>;
            })}
          </ul>
  
          <button
            onClick={doTask}
            className="bg-slate-600 rounded-[8px] text-white px-[60px] py-[8px] mt-[25px]"
          >
            Go
          </button>
        </div>
      </>
    );
  };
  
  const tabs = ["All Tasks", "Ads"];
  
  const bgs = [
    "/assets/images/wallpaper_1.jpg",
    "/assets/images/wallpaper_2.jpg",
    "/assets/images/wallpaper_3.jpg",
    "/assets/images/wallpaper_4.jpg",
    "/assets/images/wallpaper_5.jpg"
  ];
  
  export default function Tasks() {
    const { balance, setBalance, setChatId, tgId,  token, completedTasks, setCompletedTasks } =
      useContext(AppContext) as AppContextType;
  
    const [tab, setTab] = useState(0);
    // use setTaskList to set the Tasks from back-end
    const [taskList, setTaskList] = useState<Task[]>([]);
    const [tasksDetailsForPreview, setTasksDetailsForPreview] = useState<
      taskPreviewModeType[]
    >(
      taskList.map(({ _id, name, category, status, logo }) => ({
        _id,
        name,
        category,
        status,
        logo,
      }))
    );
  
    const [taskPopupShown, setTaskPopupShown] = useState<boolean>(false);
    const [selectedTaskCategory, setSelectedTaskCategory] =
      useState<selectedTaskCategoryType>(null);
    const [selectedTask, setSelectedTask] = useState<string>(""); //Id of selected task
  
    const [selectedTaskDetails, setSelectedTaskDetails] = useState<Task | null>(
      null
    );
  
    //set details for popup whenever a task is clicked
    useEffect(() => {
      setSelectedTaskDetails(taskList.filter((e) => e._id === selectedTask)[0]);
    }, [selectedTask]);
  
    useEffect(() => {
      window.scrollTo(0, 0);
      const cachedTab = JSON.parse(localStorage.getItem("currentTab") as string);
      if (cachedTab) {
        setTab(parseInt(cachedTab));
      }
    }, []);
  
    const [myAds, setMyAds] = useState<taskPreviewModeType[]>([]);
  
    useEffect(() => {
      setTasksDetailsForPreview(
        taskList.map(({ _id, name, category, status, logo }) => ({
          _id,
          name,
          category,
          status,
          logo,
        }))
      );
  
      setMyAds(
        taskList
          .filter((e) => e.creatorId == tgId) //Only select ads created by you
          .map(({ _id, name, category, status, logo }) => ({
            _id,
            name,
            category,
            status,
            logo,
          }))
      );
    }, [taskList]);
  
    const [loading, setLoading] = useState<boolean>(false);
  
    const loadTasks = async () => {
      try {
        const loadRes = await fetchAllTasks(tgId as number, token as string);
        if (loadRes?.success) {
          setTaskList(loadRes.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
      loadTasks();
    }, []);
  
    return (
      <div
        style={{ backgroundImage: `url(${bgs[tab]})` }}
        className={`w-full max-w-md h-screen bg-cover bg-center flex flex-col justify-between my-0 relative mx-auto px-5 py-3`}
      >
        {loading && <Loader />}
  
        {taskPopupShown && selectedTaskDetails && (
          <TaskPopup
            taskDetails={selectedTaskDetails}
            setTaskPopupShown={setTaskPopupShown}
            setCompletedTasks={setCompletedTasks}
            setBalance={setBalance}
          />
        )}
        <div className="flex flex-col space-y-16 p-[12px] items-center bg-[#0c0c0ce2]">
          <span className="text-4xl">Tasks 📋</span>
  
          <div className="flex flex-col justify-center items-center space-y-3">
            <span className="text-lg text-gray-400">Your Balance:</span>
            <div className="flex items-center justify-center text-emerald-100 text-6xl gap-4">
              <img src={"/assets/images/boat.svg"} width={35} height={35} />
              <span>{formatNumberWithCommas(balance)}</span>
            </div>
            <span className="text-gray-400">
              Earn W-coin rewards by completing simple tasks
            </span>
            <a href="#" className="text-purple-800">
              How tasks work?
            </a>
          </div>
  
          <div className="flex justify-center w-full items-center">
            {tabs.map((t, i) => (
              <span
                key={i}
                className={`text-lg cursor-pointer ${
                  i == tab ? "text-gray-500 border-b" : ""
                } ${i == 1 && `ml-[60px]`}`}
                onClick={() => {
                  setTab(i);
                  localStorage.setItem("currentTab", JSON.stringify(i));
                  // setTaskList(tasks);
                  if ("vibrate" in navigator) {
                    // Vibrate for 200 milliseconds
                    navigator.vibrate(200);
                  }
                }}
              >
                {t}
              </span>
            ))}
          </div>
  
          <div className="w-full flex items-center justify-center h-fit">
            {tab == 0 && (
              <TaskList
                tasks={tasksDetailsForPreview}
                setSelectedTaskCategory={setSelectedTaskCategory}
                setSelectedTask={setSelectedTask}
                setTaskPopupShown={setTaskPopupShown}
                completedTasks={completedTasks}
              />
            )}
  
            {tab == 1 && <Ads ads={myAds} />}
          </div>
        </div>
      </div>
    );
  }
  