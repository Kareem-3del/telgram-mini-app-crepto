"use client"
import Mine from "../components/Mine";
import BottomNav from "../components/BottomNav";

export default function Home() {
  return (
    <div className="w-full max-w-md h-screen bg-gradient-to-bl from-black from-10% via-[#321158] via-40% to-[#0F041A] to-90% 
					flex flex-col justify-between my-0 mx-auto px-5 py-3">
      <Mine />
      <div className="animate-bounce-once pb-4"><BottomNav /></div>
    </div>
  )
}
