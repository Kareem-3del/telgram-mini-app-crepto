"use client"
import { useEffect, useState } from "react";
import { deleteATask, fetchATask, updateATask } from "../../api/task";
import { Task as Tasktype } from "../../lib/types";
import Loader from "../../components/Loader";
import { disableScroll, enableScroll } from "../../helpers/scroll";
import Navbar from "../../components/Navbar";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";


const Task = () => {
  const [task, setTask] = useState<Tasktype | null>(null);
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter()

  const loadTask = async () => {
    try {
      setLoading(true);
      disableScroll()
      const loadRes = await fetchATask(id as string);
      if (loadRes?.success) {
        setTask(loadRes.data);
        setLoading(false);
        enableScroll()
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadTask();
  }, []);

  const [approving, setApproving] = useState<boolean>(false);
  const [declining, setDeclining] = useState<boolean>(false);
  const [deleting, setDeleting]= useState<boolean>(false);


  const approve = async () => {
    try {
      setApproving(true);
      const res = await updateATask(task?._id as string, {
        ...task,
        status: "Approved",
      });
      if (res?.success) {
        alert("Task Approved!")
        setTask({ ...(task as Tasktype), status: "Approved" });
        setApproving(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const decline = async () => {
    try {
      setDeclining(true);
      const res = await updateATask(task?._id as string, {
        ...task,
        status: "Declined",
      });
      if (res?.success) {
        alert("Task Declined!")
        setTask({ ...(task as Tasktype), status: "Declined" });
        setDeclining(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async ()=>{
    try {
      setDeleting(true)
      const res = await deleteATask(task?._id as string)
      if(res?.success){
        alert("Task deleted!");
        router.push("/")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const openLink = (url: string | undefined) => {
    if (!url) return; // Prevent errors if the URL is undefined
    const formattedUrl = url.startsWith("http") ? url : `https://${url}`;
    window.open(formattedUrl, "_blank");
  };

  return (
    <main className="w-full min-h-screen flex flex-col justify-start items-center py-[30px] px-[20px] relative">
      {loading && <Loader />}
      <Navbar />

      <img
        src={task?.logo}
        className="w-full h-[220px] rounded-[10px]"
        alt="Project image"
      />
      <div className="w-full mt-[20px] flex justify-center items-center">
        <h2 className="text-white text-[22px] break-words max-w-[60%]">
          {task?.name}
        </h2>
        <span className="bg-slate-600 text-white rounded-[20px] text-[13px] px-[10px] py-[5px] ml-[20px]">
          {task?.category} ad
        </span>
      </div>

      <span className="break-words font-medium text-slate-300 my-[20px] text-[14px] text-center">
        {task?.description}
      </span>

      {task?.category === "Telegram" && (
        <div className="my-[14px] flex items-center justify-center">
          <button
            onClick={() => openLink(task.telegramGroupLink)}
            className="underline bg-green-700 px-[15px] py-[5px] text-[14px] rounded-[8px] text-white"
          >
            Telegram Group
          </button>

          <button
            onClick={() => openLink(task.telegramChannelLink)}
            className="ml-[30px] underline bg-green-700 px-[15px] py-[5px] text-[14px] rounded-[8px] text-white"
          >
            Telegram Channel
          </button>
        </div>
      )}

      {task?.category === "Youtube" && (
        <button
          onClick={() => openLink(task.youtubeVideoLink)}
          className="underline bg-green-700 my-[14px] px-[15px] py-[5px] text-[14px] rounded-[8px] text-white"
        >
          Youtube Video
        </button>
      )}

      {task?.category === "X" && (
        <button
          onClick={() => openLink(task.xLink)}
          className="underline bg-green-700 my-[14px] px-[15px] py-[5px] text-[14px] rounded-[8px] text-white"
        >
          X Account
        </button>
      )}

      <div className="mt-[30px] flex items-center justify-center">
        {(task?.status == "Declined" || task?.status == "Pending") && (
          <button onClick={approve} className=" bg-green-700 w-[100px] py-[5px] text-[14px] rounded-[8px] text-white">
            {approving ? "Approving ..." : "Approve"}
          </button>
        )}

       {task?.status=="Pending" && (
        <div className="w-[30px]"></div>
       )}

        {(task?.status == "Approved" || task?.status == "Pending") && (
          <button onClick={decline} className=" bg-red-700 w-[100px] py-[5px] text-[14px] rounded-[8px] text-white">
            {declining ? "Declining ..." : "Decline"}
          </button>
        )}
      </div>

      <div className="mt-[30px] flex items-center justify-center">
        <Link href={`/edit/${task?._id}`}>
          <button className=" bg-yellow-700 w-[100px] py-[5px] text-[14px] rounded-[8px] text-white">
            Edit
          </button>
        </Link>

        <button  onClick={deleteTask} className="ml-[30px]  bg-red-700 w-[100px] py-[5px] text-[14px] rounded-[8px] text-white">
          {deleting?"Deleting ...":"Delete"}
        </button>
      </div>
    </main>
  );
};

export default Task;
