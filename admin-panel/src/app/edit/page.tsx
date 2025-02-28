"use client"
import { ChangeEvent, useEffect, useState } from "react";
import { handleImageUpload } from "../../helpers/handleImageUpload";
import { Task as Tasktype } from "../../lib/types";
import { fetchATask, updateATask } from "../../api/task";
import Loader from "../../components/Loader";
import { disableScroll, enableScroll } from "../../helpers/scroll";
import Navbar from "../../components/Navbar";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";


const Edit = () => {
  const [task, setTask] = useState<Tasktype | null>(null);
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  // State for form fields
  const [formData, setFormData] = useState<Tasktype>({
    category: "",
    _id: "",
    logo: "",
    name: "",
    creatorId: 0,
    description: "",
    status: "",
    telegramChannelLink: "",
    telegramGroupLink: "",
    xLink: "",
    id: "",
  });

  // Handle input change
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loadTask = async () => {
    try {
      setLoading(true);
      disableScroll();
      const loadRes = await fetchATask(id as string);
      if (loadRes?.success) {
        setFormData(loadRes.data);
        setTask(loadRes.data);
        setImage(loadRes.data.logo);
        setLoading(false);
        enableScroll();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadTask();
  }, []);

  const [image, setImage] = useState<string>(formData.logo);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [processing, setProcessing] = useState<boolean>(false);
  const update = async () => {
    try {
      setProcessing(true);
      console.log(formData);
      const res = await updateATask(task?._id as string, {
        ...formData,
        logo: image,
      });
      if (res?.success) {
        alert("Task updated!");
        router.push(`/task/${task?._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (formData.category == "Telegram") {
      if (
        formData.name &&
        formData.logo &&
        (formData.telegramChannelLink || formData.telegramGroupLink)
      ) {
        return setIsUpdating(true);
      } else {
        return setIsUpdating(false);
      }
    }

    if (formData.category == "X") {
      if (formData.name && formData.logo && formData.xLink) {
        return setIsUpdating(true);
      } else {
        return setIsUpdating(false);
      }
    }

    if (formData.category == "Youtube") {
      if (formData.name && formData.logo && formData.youtubeVideoLink) {
        return setIsUpdating(true);
      } else {
        return setIsUpdating(false);
      }
    }
  }, [
    formData.category,
    formData.description,
    formData.logo,
    formData.telegramChannelLink,
    formData.telegramGroupLink,
    formData.youtubeVideoLink,
    formData.xLink,
  ]);

  return (
    <main className="w-full min-h-screen flex flex-col justify-start items-center py-[30px] px-[20px] relative">
      {loading && <Loader />}
      <Navbar />
      <img
        src={image}
        className="w-full h-[220px] rounded-[10px]"
        alt="Project image"
      />
      <input
        type="file"
        id="image"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleImageUpload(e, setImage)}
      />
      <label
        htmlFor="image"
        className="my-[25px] cursor-pointer bg-blue-700 px-[15px] py-[5px] text-[14px] rounded-[8px] text-white"
      >
        Change image
      </label>

      <section className="w-full my-[20px] flex flex-col justify-start items-center">
        <label htmlFor="category" className="mb-[10px]">
          Category
        </label>
        <select
          id="category"
          name="category"
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          className="pl-[10px] rounded-[5px] text-white h-[30px] bg-red-700 w-[120px]"
        >
          <option value="Telegram" selected={formData.category == "Telegram"}>
            Telegram
          </option>
          <option value="X" selected={formData.category == "X"}>
            X
          </option>
          <option value="Youtube" selected={formData.category == "Youtube"}>
            Youtube
          </option>
        </select>
      </section>

      <section className="w-full my-[20px] flex flex-col justify-start items-center">
        <label htmlFor="projectName" className="mb-[10px]">
          Project Name
        </label>
        <input
          type="text"
          id="projectName"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="pl-[10px] rounded-[5px] text-slate-900 h-[40px] w-[80%]"
        />
      </section>

      <section className="w-full my-[20px] flex flex-col justify-start items-center">
        <label htmlFor="description" className="mb-[10px]">
          Project Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="p-[10px] rounded-[5px] text-slate-900 h-[60px] w-[80%] max-w-[80%] min-h-[40px] max-h-[80px]"
        />
      </section>

      {formData.category == "Telegram" && (
        <>
          <section className="w-full my-[20px] flex flex-col justify-start items-center">
            <label htmlFor="telegramGroup" className="mb-[10px]">
              Telegram Group Link
            </label>
            <input
              type="text"
              id="telegramGroup"
              name="telegramGroupLink"
              value={formData.telegramGroupLink}
              onChange={handleInputChange}
              className="pl-[10px] rounded-[5px] text-slate-900 h-[40px] w-[80%]"
            />
          </section>

          <section className="w-full my-[20px] flex flex-col justify-start items-center">
            <label htmlFor="telegramChannel" className="mb-[10px]">
              Telegram Channel Link
            </label>
            <input
              type="text"
              id="telegramChannel"
              name="telegramChannelLink"
              value={formData.telegramChannelLink}
              onChange={handleInputChange}
              className="pl-[10px] rounded-[5px] text-slate-900 h-[40px] w-[80%]"
            />
          </section>
        </>
      )}
      {formData.category == "Youtube" && (
        <section className="w-full my-[20px] flex flex-col justify-start items-center">
          <label htmlFor="youtubeVideo" className="mb-[10px]">
            YouTube Video Link
          </label>
          <input
            type="text"
            id="youtubeVideo"
            name="youtubeVideoLink"
            value={formData.youtubeVideoLink}
            onChange={handleInputChange}
            className="pl-[10px] rounded-[5px] text-slate-900 h-[40px] w-[80%]"
          />
        </section>
      )}

      {formData.category == "X" && (
        <section className="w-full my-[20px] flex flex-col justify-start items-center">
          <label htmlFor="xAccount" className="mb-[10px]">
            X Account Link
          </label>
          <input
            type="text"
            id="xAccount"
            name="xLink"
            value={formData.xLink}
            onChange={handleInputChange}
            className="pl-[10px] rounded-[5px] text-slate-900 h-[40px] w-[80%]"
          />
        </section>
      )}

      {isUpdating && (
        <button
          onClick={update}
          className="my-[20px] rounded-[5px] text-white bg-green-700 px-[40px] py-[7px]"
        >
          {processing ? "Updating ..." : "Update"}
        </button>
      )}
    </main>
  );
};

export default Edit;
