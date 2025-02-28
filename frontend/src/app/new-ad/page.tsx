"use client"
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { handleImageUpload } from "../../components/handleImageUpload";
import { createAnAd } from "../../api/task";
import { useRouter } from "next/navigation";
import { AppContext, AppContextType } from "@/context/AppContext";

export default function NewAd() {
    const {tgId, token} = useContext(AppContext) as AppContextType
  const router = useRouter()
  const createAd = async () => {
    if (!projectImage || !formData.name || !formData.description) {
      setErr("Please fill all fields");
      return setTimeout(() => setErr(""), 3000);
    }

    if (category == "X") {
      if (!formData.xLink) {
        setErr("X account link is required.");
        return setTimeout(() => setErr(""), 3000);
      }
    }

    if (category == "Telegram") {
      if (!formData.telegramChannelLink || !formData.telegramGroupLink) {
        setErr("Channel or group link is required.");
        return setTimeout(() => setErr(""), 3000);
      }
    }

    if (category == "Youtube") {
      if (!formData.youtubeVideoLink) {
        setErr("Youtube video link is required.");
        return setTimeout(() => setErr(""), 3000);
      }
    }

    try {
      setSubmitting(true);
      const adDetails = { ...formData, category, logo: projectImage };
      const createRes = await createAnAd(tgId as number, token as string, adDetails);
      if (createRes?.success) {
        setSubmitting(false);
        router.push("/tasks");
      }
    } catch (error) {
      setErr("Error creating ad. Try again later.");
      return setTimeout(() => setErr(""), 3000);
      console.log(error);
    }
  };

  const [category, setCategory] = useState("Telegram");
  const [projectImage, setProjectImage] = useState("");
  const [err, setErr] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    telegramChannelLink: "",
    telegramGroupLink: "",
    youtubeVideoLink: "",
    xLink: "",
    description: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full flex flex-col justify-start items-center h-screen pt-[40px]">
      <p>Create an Ad</p>
      <div className="w-full max-w-[350px] mt-[25px] flex flex-col justify-start items-center">
        <label htmlFor="category">Select Category</label>
        <select
          onChange={(e) => setCategory(e.target.value)}
          name="category"
          id="category"
          className="mt-[5px] mb-[20px] bg-[#363a3a]"
          value={category}
        >
          <option value="Telegram">Telegram</option>
          <option value="X">X</option>
          <option value="Youtube">Youtube</option>
        </select>

        <label htmlFor="name">Project Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-[75%] bg-red-800 mb-[20px] pl-[10px] outline-none rounded-[5px] mt-[5px] h-[30px] text-[14px]"
          value={formData.name}
          onChange={handleInputChange}
        />

        {category === "Telegram" && (
          <>
            <label htmlFor="telegramChannelLink">Telegram Channel Link</label>
            <input
              type="text"
              id="telegramChannelLink"
              name="telegramChannelLink"
              className="w-[75%] bg-red-800 pl-[10px] mb-[20px] outline-none rounded-[5px] mt-[5px] h-[30px] text-[14px]"
              value={formData.telegramChannelLink}
              onChange={handleInputChange}
            />

            <label htmlFor="telegramGroupLink">Telegram Group Link</label>
            <input
              type="text"
              id="telegramGroupLink"
              name="telegramGroupLink"
              className="w-[75%] bg-red-800 pl-[10px] mb-[20px] outline-none rounded-[5px] mt-[5px] h-[30px] text-[14px]"
              value={formData.telegramGroupLink}
              onChange={handleInputChange}
            />
          </>
        )}

        {category === "Youtube" && (
          <>
            <label htmlFor="youtubeVideoLink">Youtube Video Link</label>
            <input
              type="text"
              id="youtubeVideoLink"
              name="youtubeVideoLink"
              className="w-[75%] bg-red-800 pl-[10px] mb-[20px] outline-none rounded-[5px] mt-[5px] h-[30px] text-[14px]"
              value={formData.youtubeVideoLink}
              onChange={handleInputChange}
            />
          </>
        )}

        {category === "X" && (
          <>
            <label htmlFor="xLink">X Account Link</label>
            <input
              type="text"
              id="xLink"
              name="xLink"
              className="w-[75%] bg-red-800 pl-[10px] mb-[20px] outline-none rounded-[5px] mt-[5px] h-[30px] text-[14px]"
              value={formData.xLink}
              onChange={handleInputChange}
            />
          </>
        )}

        <label htmlFor="description" className="mb-[5px]">
          Project Description
        </label>
        <textarea
          id="description"
          name="description"
          className="bg-red-800 p-[10px] w-[70%] min-w-[65%] max-w-[80%] min-h-[100px] max-h-[170px] text-white"
          value={formData.description}
          onChange={handleInputChange}
        ></textarea>

        <label className="mt-[20px]">Project Image</label>
        <div className="w-full flex justify-center items-center mt-[20px]">
          <input
            type="file"
            id="image"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImageUpload(e, setProjectImage)}
          />
          {projectImage.length > 0 && (
            <img
              src={projectImage}
              alt="Project image"
              className="w-[150px] h-[100px] mr-[20px]"
            />
          )}
          <label
            htmlFor="image"
            className="bg-slate-500 text-white text-[14px] rounded-[12px] px-[19px] py-[10px] mb-[10px] "
          >
            {projectImage.length > 0 ? "Change" : "Upload"} image{" "}
            {projectImage.length === 0 && " +"}
          </label>
        </div>
      </div>

      {err && (
        <p className="my-[20px] text-[13px] text-center text-[red] max-w-[200px] break-words">
          {err}
        </p>
      )}

      <button
        onClick={createAd}
        className="bg-[#308623] text-white rounded-[4px] px-[50px] py-[10px] mb-[40px] mt-[20px]"
      >
        {submitting ? "Submitting ..." : "Submit Ad"}
      </button>

      <button className="bg-[#308623] opacity-0 text-white rounded-[4px] px-[50px] py-[10px] mb-[40px]">
        Submit Ad
      </button>
    </div>
  );
}
