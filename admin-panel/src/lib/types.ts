export type Task = {
  id?: string,
  name: string,
  category: "X" | "Youtube" | "Telegram" | "Website" | String
  logo: string,
  websiteLink?: string,
  telegramChannelLink?: string,
  telegramGroupLink?: string,
  youtubeVideoLink?: string,
  xLink?: string,
  status?: "Pending" | "Approved" | "Declined" | String,
  creatorId?: number
  _id?: string,
  description?: string
};

export type taskPreviewModeType = {
  id: string;
  name: string;
  category: "X" | "Youtube" | "Telegram" | "Website"
  status?: "Pending" | "Approved" | "Declined",
  logo: string
};


export type selectedTaskCategoryType = "X" | "Youtube" | "Telegram" | "Website" | null;
