"use client";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CloudUpload, List, ExternalLink, Heart } from "lucide-react";
import Typewriter from "typewriter-effect";

import { AnimatedButton } from "@/components/AnimatedButton";
import { QuadStar } from "./assets/QuadStar";
import { OctoStar } from "./assets/OctoStar";
import { BigSquare } from "./assets/BigSquare";
import { SmallSquare } from "./assets/SmallSquare";
import slide1 from "@/public/slide1.png";
import slide2 from "@/public/slide2.png";
import slide3 from "@/public/slide3.png";
import slide4 from "@/public/slide4.png";
import slide5 from "@/public/slide5.png";
import slide6 from "@/public/slide6.png";
import slide7 from "@/public/slide7.png";
import slide8 from "@/public/slide8.png";
import slide9 from "@/public/slide9.png";
import slide10 from "@/public/slide10.png";
import hero from "@/public/home-blake2.png";

gsap.registerPlugin(useGSAP);

export default function Page() {
  const page = useRef();
  const container = useRef();

  useGSAP((context, contextSafe) => {
    // Hero interaction
    const speed = 0.5;

    const items = gsap.utils.toArray(".movable").map((element) => {
      return {
        element,
        shiftValue: element.getAttribute("data-value") / 1500,
        xSet: gsap.quickSetter(element, "x", "%"),
        ySet: gsap.quickSetter(element, "y", "%"),
      };
    });

    const mouse = { x: 0, y: 0 };

    page.current.parentNode.addEventListener(
      "mousemove",
      contextSafe((e) => {
        const rect = container.current.getBoundingClientRect();
        mouse.x = e.x - rect.left;
        mouse.y = e.y - rect.top;
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

    // slideshow
    const duration = 1;
    const delay = 0.75;
    gsap.set("#slide-start", { opacity: 1, objectFit: "fill" });
    gsap.set(".slide", { opacity: 0, objectFit: "fill" });

    gsap
      .timeline({ repeat: -1 })
      .to("#slide3", { opacity: 1, delay, duration, ease: "power1.inOut" })
      .to("#slide4", { opacity: 1, delay, duration, ease: "power1.inOut" })
      .to("#slide5", { opacity: 1, delay, duration, ease: "power1.inOut" })
      .to("#slide6", { opacity: 1, delay, duration, ease: "power1.inOut" })
      .to("#slide7", { opacity: 1, delay, duration, ease: "power1.inOut" })
      .to("#slide8", { opacity: 1, delay, duration, ease: "power1.inOut" })
      .to("#slide9", { opacity: 1, delay, duration, ease: "power1.inOut" })
      .to("#slide10", { opacity: 1, delay, duration, ease: "power1.inOut" })
      .to(".slide", { opacity: 0, delay, duration, ease: "power1.inOut" });
  });

  return (
    <div className="w-full">
      <div className="flex flex-col items-center w-full pb-28 gap-48 bg-white">
        {/* Hero */}
        <div
          ref={page}
          className="flex items-center gap-w-full max-w-screen-xl h-[calc(1280px/2*1.25)]"
        >
          <div className="flex flex-col w-1/2 gap-[32px]">
            <h1 className="playfair  font-bold text-[#050505] w-full max-w-[15ch] h-[6ch] text-[64px] tracking-[0] leading-[80px]">
              Create Community with Your{" "}
              <Typewriter
                options={{
                  strings: ["Bookmarks", "Links", "Favorites", "References"],
                  autoStart: true,
                  loop: true,
                }}
              />
            </h1>
            <p className="font-normal text-[#333333] text-2xl tracking-[0] leading-[30px]">
              Create online communities with your own collection of bookmarks
              using Blake, the social bookmarks platform.
            </p>

            <AnimatedButton variant="lg" href="/login">
              Try Blake Now
            </AnimatedButton>
          </div>

          {/* animation */}
          <div ref={container} className="relative w-1/2 h-full">
            <BigSquare
              data-value="1"
              className="movable absolute top-[4%] left-[10%] w-[80%] h-[70%]"
            />
            <SmallSquare
              data-value="1.5"
              className="movable absolute bottom-[3.5%] right-0"
            />

            <Image
              src={hero}
              data-value="2.5"
              alt=""
              className="movable absolute top-1/2 translate-y-[-50%] left-[15%] w-[75%] h-[80%] object-cover rounded-3xl [box-shadow:1px_1px_10px_#999999]"
            />

            <OctoStar className="movable absolute top-0" />

            <QuadStar className="movable absolute bottom-[15%] left-[22.5%]" />

            <QuadStar className="movable absolute bottom-[20%] right-[10%]" />
          </div>
        </div>

        {/* Blurb */}
        <div className="w-full max-w-screen-xl">
          <h2 className="pb-12 font-bold text-[28px]">What can I do?</h2>
          <div className="flex gap-[99px]">
            <div className="relative w-1/2">
              <Image
                className="border-4 rounded-3xl absolute"
                id="slide-start"
                alt=""
                src={slide2}
              />
              <Image
                className="border-4 rounded-3xl slide absolute"
                id="slide3"
                alt=""
                src={slide3}
              />
              <Image
                className="border-4 rounded-3xl slide absolute"
                id="slide4"
                alt=""
                src={slide9}
              />
              <Image
                className="border-4 rounded-3xl slide absolute"
                id="slide5"
                alt=""
                src={slide10}
              />
              <Image
                className="border-4 rounded-3xl slide absolute"
                id="slide6"
                alt=""
                src={slide4}
              />
              <Image
                className="border-4 rounded-3xl slide absolute"
                id="slide7"
                alt=""
                src={slide6}
              />
              <Image
                className="border-4 rounded-3xl slide absolute"
                id="slide8"
                alt=""
                src={slide5}
              />
              <Image
                className="border-4 rounded-3xl slide absolute"
                id="slide9"
                alt=""
                src={slide7}
              />
              <Image
                className="border-4 rounded-3xl slide absolute"
                id="slide10"
                alt=""
                src={slide8}
              />
            </div>

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
        </div>

        {/* newsletter */}
        <div className="w-full max-w-screen-xl">
          <h2 className="pb-12 font-bold text-[28px]">Why use Blake?</h2>
          <div className="flex gap-6">
            <h1 className="playfair font-bold text-[#050505] text-[64px]  tracking-[0] leading-[80px]">
              It&apos;s the new way to make communities
            </h1>
            <div className="flex flex-col items-center">
              <p className="max-w-xl pb-8 font-normal text-[#333333] text-2xl tracking-[0] leading-[30px]">
                Blake is built with Love by Alex Perez. To get updates on Blake
                and and its author,{" "}
                <Link
                  href="https://forms.gle/THRneSrxpQHbgath7"
                  className="underline font-medium hover:font-bold"
                >
                  join the mailing list
                </Link>
              </p>
              <Heart className="w-[47px] h-[38.96px]" />
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
          <AnimatedButton variant="lg" href="/login">
            Start Here
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
}
