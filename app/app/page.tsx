"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Cards from "./Cards";
import Part from "./Part";
import Link from "next/link";
import Book from "./componet/Book";
import axios from "axios";
import { useCookies } from "next-client-cookies";

export default function New() {
  const cookies = useCookies();
  const [jobs, setjobs] = useState<any[]>([]);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://akil-backend.onrender.com/opportunities/search",
          {
            headers: {
              Authorization: `Bearer ${cookies.get("access-token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        setjobs(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  console.log(jobs);

  const card = (
    <div>
      {jobs.map((job, ind) => (
        // console.log(job),
        <div key={ind} className="flex">
          <Link
            href={{
              pathname: "/app/about",
              query: {
                name: job.title,
                id: ind,
                job: job,
              },
            }}
          >
            <Cards job={job} ind={ind} c={job.isBookmarked} st={'/app'} handler={()=>{console.log('handler')}}/>
          </Link>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <div className="pl-[85px] pt-32 pr-[16rem]">
        <div className="flex justify-between items-center">
          <div>
            <div className="font-black text-4xl">Opportunities</div>
            <div className="font-extralight text-gray-400 pt-1">
              Showing {jobs.length} results
            </div>
          </div>
          <div className="">
            Sort by: <strong>Most relevant</strong>
          </div>
        </div>
        {card}
      </div>
    </div>
  );
}
