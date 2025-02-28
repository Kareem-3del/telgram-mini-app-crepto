"use client"
import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import Navbar from "../../components/Navbar";
import { fetchAllUsers } from "../../api/user";
import { disableScroll, enableScroll } from "../../helpers/scroll";
import { parseNames, setUsername } from "../../lib/parseNames";

type UserType = {
  balance: number;
  firstname: string;
  lastname: string;
  username: string;
  walletAddress: string;
};
const Users = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<UserType[]>([]);

  const loadUsers = async () => {
    setLoading(true)
    try {
      window.scrollTo(0, 0);
      disableScroll();
      const res = await fetchAllUsers();
      if (res?.success) {
        setUsers(res.data);
        enableScroll();
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);
  return (
    <main className="w-full min-h-screen flex flex-col justify-start items-center py-[30px] px-[20px] relative">
      {loading && <Loader />}
      <Navbar />
      <div className="w-full flex justify-center items-center mb-[30px]">
        <span className="w-[33%] text-left font-bold text-[18px] text-red-500">Name</span>
        <span className="w-[33%] text-left font-bold text-[18px] text-red-500">Address</span>
        <span className="w-[33%] text-left font-bold text-[18px] text-red-500">Points</span>
      </div>

      <div className="w-full flex flex-col justify-start items-center">
        {users.map((eachUser, i) => {
            let userData = {
                firstname:eachUser.firstname,
                lastname:eachUser.lastname,
                username:eachUser.username
            }
          return (
            <div
              key={i}
              className="w-full flex justify-center items-center mb-[30px]"
            >
              <span className="w-[33%] pr-[10px] text-[14px] text-left break-words">
                {setUsername(userData)}
              </span>
              <span className="w-[33%] pr-[10px] text-[14px] text-left break-words">{eachUser.walletAddress}</span>
              <span className="w-[33%] pr-[10px] text-[14px] text-center break-words">{eachUser.balance}</span>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Users;
