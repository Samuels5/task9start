"use client";
import React from "react";
import { useCookies } from "next-client-cookies";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Cards from "../Cards";
import Link from "next/link";
import {useRouter} from "next/navigation"

const Favorite = () => {
  const router = useRouter();
  const cookies = useCookies();
  const [jobs, setjobs] = useState<any[]>([]);
  const [Loading, setLoading] = useState(true);
  const [d, setd] = useState(true)

  const handler = () => {setd(!d);
  }

  useEffect(() => {
    setLoading(true);
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
  }, [d]);

  console.log(jobs);
  if (Loading) {
    return <div>loading...</div>;
  }

  return (
    <div className="pt-10 h-96 mx-14">
      {jobs.map((job, ind) => (
        <div key={ind} className="flex-col mt-4">
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
            {job.isBookmarked && (
              <Cards job={job} ind={ind} c={job.isBookmarked} st='/app/Favorite' handler={handler}/>
            )}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Favorite;
