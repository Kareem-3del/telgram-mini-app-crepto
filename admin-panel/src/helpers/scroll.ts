export const disableScroll = () => {
  document.body.style.overflowY = "hidden";
  document.getElementById("root")!!.style.overflowY = "hidden";

};

export const enableScroll = () => {
  document.body.style.overflowY = "scroll";
  document.getElementById("root")!!.style.overflowY = "scroll";
};
