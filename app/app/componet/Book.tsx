"use client";
import React, { useState } from "react";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import axios from "axios";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";

const Book = ({ id, c, st, handler }: { id: number; c: boolean; st:string; handler:any }) => {
  const router = useRouter();
  const cookies = useCookies();
  const [b, setb] = useState(c);
  const fetchPost = async () => {
    if (b == false) {
      try {
        const res = await axios.post(
          `https://akil-backend.onrender.com/bookmarks/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${cookies.get("access-token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        setb(!b);
        // setJob(result.data);
      } catch (err) {
        console.error(err);
      } finally {
        // handler()
        // setLoading(false);
          router.push(st);
        router.refresh();
      }
    } else {
      try {
        const res = await axios.delete(
          `https://akil-backend.onrender.com/bookmarks/${id}`,
          {
            headers: {
              Authorization: `Bearer ${cookies.get("access-token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        setb(!b);
        // setJob(result.data);
      } catch (err) {
        console.error(err);
      } finally {
        // setLoading(false);
          router.push(st);
          router.refresh();
      }
    }
  };

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        handler
      }}
      className="w-5 "
    >
      {b ? <IoBookmark /> : <IoBookmarkOutline />}
    </button>
  );
};

export default Book;
