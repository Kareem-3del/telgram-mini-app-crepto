export type Task = {
  _id:string,
  name: string,
  category: "X" | "Youtube" | "Telegram" | "Website"
  logo: string,
  websiteLink?: string,
  telegramChannelLink?: string,
  telegramGroupLink?: string,
  youtubeVideoLink?: string,
  xLink?:string,
  status?:"Pending" | "Approved" | "Declined",
  creatorId?:number
};

export type taskPreviewModeType = {
  _id: string;
  name: string;
  category: "X" | "Youtube" | "Telegram" | "Website"
  status?:"Pending" | "Approved" | "Declined",
  logo:string
};

export type selectedTaskCategoryType = "X" | "Youtube" | "Telegram" | "Website" | null;
