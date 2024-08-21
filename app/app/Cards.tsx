"use client";
import React from "react";
import Image from "next/image";
import { useEffect } from "react";
import { useState } from "react";
import Book from "./componet/Book";
import { useCookies } from "next-client-cookies";
import { useSession } from "next-auth/react";

const Cards = ({ job, ind, c, st, handler }: { job: any; ind: number; c : boolean, st:string, handler:any}) => {
  const cookies = useCookies();
  const { status, data: session } = useSession();
  // console.log('s',job) 
  return (
    <div className="p-6 rounded-3xl border my-9 border-gray-400 divide-black">
      <div className="  flex">
        <div className="rounded-lg">
          <img src={job.logoUrl ||"https://media.istockphoto.com/id/1290160752/vector/work-from-home-line-icon-editable-stroke.jpg?s=612x612&w=0&k=20&c=YkgybsrnBfnFR0lGjTClpObiq5g_MAEhPVJGxK94cfg="} alt="adsd" width={67 * 3} height={59 * 3} />
        </div>
        <div className=" ml-16 overflow-auto">
          <div className="flex justify-between">
            <h1 className="font-mono font-semibold text-2xl text-indigo-950">
              {job.title}
            </h1>
                  {cookies.get("access-token") == undefined &&
      status == "unauthenticated" ? (<div> </div>):(
            <Book id={job.id} c={c} st={st} handler={handler} />)}
          </div>
          <h4 className="font-extralight text-gray-400">
            {job.orgName} .{" "}
            {job.location.map((val: any) => {
              val;
            })}
          </h4>
          <p className="text-sm text-zinc-800">{job.description}</p>
          <div className="pt-2">
            <button className="text-xs rounded-full bg-gray-100 p-1 mr-1 text-green-500">
              In Person
            </button>
            <button className="text-xs rounded-full border border-yellow-600 p-1 mr-1 text-yellow-600">
              Education
            </button>
            <button className="text-xs rounded-full border border-violet-900 p-1 mr-1 text-violet-900">
              IT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
