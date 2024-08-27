"use client";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CloudUpload, List, ExternalLink, Heart } from "lucide-react";

import { QuadStar } from "./assets/QuadStar";
import { OctoStar } from "./assets/OctoStar";
import { BigSquare } from "./assets/BigSquare";
import { SmallSquare } from "./assets/SmallSquare";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(useGSAP);

export default function Page() {
  const page = useRef();
  const container = useRef();

  useGSAP(
    (context, contextSafe) => {
      console.log("starting");
      const speed = 0.5;

      const items = gsap.utils.toArray(".movable").map((element) => {
        return {
          element,
          shiftValue: element.getAttribute("data-value") / 500,
          xSet: gsap.quickSetter(element, "x", "%"),
          ySet: gsap.quickSetter(element, "y", "%"),
        };
      });

      const mouse = {
        x: 0,
        y: 0,
      };

      page.current.parentNode.addEventListener(
        "mousemove",
        contextSafe((e) => {
          const rect = container.current.getBoundingClientRect();
          mouse.x = e.x - rect.left;
          mouse.y = e.y - rect.top;
          console.log("moved");
        })
      );

      gsap.ticker.fps(30);
      gsap.ticker.add(() => {
        const dt = 0.5 - Math.pow(0.5 - speed, gsap.ticker.deltaRatio());

        items.forEach((item) => {
          item.xSet(item.shiftValue * mouse.x * dt);
          item.ySet(item.shiftValue * mouse.y * dt);
        });
      });
    },
    { scope: container }
  );

  return (
    <div className="w-full" ref={page}>
      <div className="flex flex-col items-center w-full pb-28 gap-28 bg-white">
        {/* Hero */}
        <div className="flex items-center gap-w-full max-w-screen-xl h-[778px]">
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
              className="w-max px-20 py-6 [box-shadow:10px_10px_10px_#999999] hover:active:[box-shadow:9px_9px_9px_#aaaaaa] bg-[#050505] hover:bg-[#303030] hover:active:bg-[#050505] transition duration-300 rounded-2xl font-medium text-white text-2xl tracking-[0] leading-[18px]"
            >
              Try Blake Now
            </Link>
          </div>

          {/* WIP: animation */}
          <div ref={container} className="relative w-1/2 h-full">
            <BigSquare
              data-value="1"
              className="movable absolute top-[4%] left-[10%]"
            />
            <SmallSquare
              data-value="1.5"
              className="movable absolute bottom-[3.5%] right-0"
            />

            <img
              src="/home-blake2.png"
              data-value="2.5"
              className="movable absolute top-1/2 translate-y-[-50%] left-[15%] w-[75%] h-[80%] object-cover rounded-3xl [box-shadow:1px_1px_10px_#999999]"
            />

            <OctoStar className="movable absolute top-0" />

            <QuadStar className="movable absolute bottom-[15%] left-[22.5%]" />

            <QuadStar className="movable absolute bottom-[20%] right-[10%]" />
          </div>
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
            className="w-max px-20 py-6 [box-shadow:10px_10px_10px_#999999] hover:active:[box-shadow:9px_9px_9px_#aaaaaa] bg-[#050505] hover:bg-[#303030] hover:active:bg-[#050505] transition duration-300 rounded-2xl font-medium text-white text-2xl tracking-[0] leading-[18px]"
          >
            Start Here
          </Link>
        </div>

        {/* newsletter */}
        <div className="flex flex-col items-center justify-center max-w-3xl gap-6 py-0 ">
          <h1 className="playfair font-bold text-[#050505] text-[64px] text-center tracking-[0] leading-[80px]">
            A new way to make communities
          </h1>
          <p className=" self-stretch font-normal text-[#333333] text-2xl tracking-[0] leading-[30px]">
            Blake is built with Love by Alex Perez.{" "}
            <Link
              href="https://forms.gle/THRneSrxpQHbgath7"
              className="underline font-medium"
            >
              Join the mailing list
            </Link>{" "}
            to get updates on Blake and and its author.
          </p>
          <Heart className=" w-[47px] h-[38.96px]" />
        </div>
      </div>
    </div>
  );
}
