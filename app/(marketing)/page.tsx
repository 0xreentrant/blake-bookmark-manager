"use client";
import Link from "next/link";

import { CloudUpload, List, ExternalLink, Heart } from "lucide-react";

export default function Page() {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center w-full pb-28 gap-28 bg-white">
        {/* Hero */}
        <div className="flex items-center w-full max-w-screen-xl">
          <div className="flex flex-col w-1/2 gap-[32px]">
            <h1 className="playfair  font-bold text-[#050505] w-full max-w-[15ch] text-[64px] tracking-[0] leading-[80px]">
              Create Community with Your Bookmarks
            </h1>
            <p className="font-normal text-[#333333] text-2xl tracking-[0] leading-[30px]">
              Create online communities with your own collection of bookmarks
              using Blake, the social bookmarks platform.
            </p>
            <Link
              href="/login"
              className="w-max px-20 py-6 bg-[#050505] hover:bg-[#303030] transition duration-300 rounded-2xl font-medium text-white text-2xl tracking-[0] leading-[18px]"
            >
              Try Blake Now
            </Link>
          </div>
          <img className="w-1/2" src="hero.png" />
        </div>

        {/* Blurb */}
        <div className="flex w-full max-w-screen-xl gap-[99px]">
          <img
            className="w-[50%] h-[445px] object-cover"
            alt="Image"
            src="screenshot.png"
          />
          <div className="flex flex-col w-[50%] gap-[28px]">
            <h1 className="playfair  font-bold text-[#050505] text-[64px] tracking-[0] leading-[80px]">
              Create a List, and Now You Have a Gathering Space
            </h1>
            <p className="top-[268px] left-0 font-normal text-[#333333] text-2xl tracking-[0] leading-[30px]">
              Share your list, and people can comment, upvote and downvote
              links, add to their own lists.
            </p>
          </div>
        </div>

        {/* how it works */}
        <div className="flex flex-col gap-12 w-full max-w-screen-xl">
          <h1 className="playfair font-bold text-[64px] text-center tracking-[0] leading-[80px]">
            How does it work?
          </h1>
          <div className="flex gap-6">
            <div className="flex flex-col items-center gap-6">
              <CloudUpload className="w-[33.71px] h-[33.71px]" />
              <h2 className="playfair font-semibold text-black text-[34px] text-center tracking-[0] leading-[normal]">
                1. Import
              </h2>
              <p className="text-black text-2xl tracking-[0] leading-[normal]">
                Import your Chrome bookmarks into Blake using the app.
              </p>
            </div>
            <div className="flex flex-col items-center gap-6">
              <List className=" w-[33.71px] h-[33.71px]  top-[-4.00px]" />
              <h2 className="playfair font-semibold text-black text-[34px] text-center tracking-[0] leading-[normal]">
                2. List
              </h2>
              <p className="text-black text-2xl tracking-[0] leading-[normal]">
                Your list is where people can comment, upvote, and share with
                their friends.
              </p>
            </div>
            <div className="flex flex-col items-center gap-6">
              <ExternalLink className=" w-[33.71px] h-[33.71px]" />
              <h2 className="playfair  font-semibold text-black text-[34px] text-center tracking-[0] leading-[normal]">
                3. Share
              </h2>
              <p className="text-black text-2xl tracking-[0] leading-[normal]">
                Share with your audience, your newsletter, your social media
                followers.
              </p>
            </div>
          </div>
        </div>

        {/* try now */}
        <div className="flex flex-wrap w-full max-w-screen-xl  items-center justify-between px-[81px] py-[52px] bg-[#f7f7f5] rounded-[52px]">
          <div className="">
            <h1 className="playfair font-bold text-black text-[64px] tracking-[0] leading-[80px] whitespace-nowrap">
              Try Blake now
            </h1>
            <div className="font-normal text-black text-2xl tracking-[0] leading-[30px] whitespace-nowrap">
              Your bookmarks, your community
            </div>
          </div>
          <Link
            href="/login"
            className="w-max px-20 py-6 bg-[#050505] hover:bg-[#303030] transition duration-300 rounded-2xl font-medium text-white text-2xl tracking-[0] leading-[18px]"
          >
            Start Here
          </Link>
        </div>

        {/* newsletter */}
        <div className="flex flex-col items-center justify-center max-w-3xl gap-6 py-0 ">
          <h1 className="playfair font-bold text-[#050505] text-[64px] text-center tracking-[0] leading-[80px]">
            A new way to make communities
          </h1>
          <p className=" self-stretch h-[90px]  font-normal text-[#333333] text-2xl tracking-[0] leading-[30px]">
            Blake is built with Love by Alex Perez. Join the mailing list to get
            updates on Blake and what&#39;s going on in the software developer
            world.
          </p>
          <Heart className=" w-[47px] h-[38.96px]" />
        </div>
      </div>
    </div>
  );
}
