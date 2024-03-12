"use client";
import { signOut } from "next-auth/react";
import React from "react";

function Nnavbar() {
  return (
    <>
      <div className="nav w-full h-14  flex items-center justify-around">
        <div className="title text-3xl font-bold">TECH-HUNT</div>

        <button
          className="px-4 py-2 bg-green-400 text-white font-bold rounded-sm"
          onClick={() => {
            signOut();
          }}
        >
          Sign Out
        </button>
      </div>
    </>
  );
}

export default Nnavbar;
