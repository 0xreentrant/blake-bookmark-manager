"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
import { getAttributeValue } from "domutils";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Page() {
  const page = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);

  useGSAP((context, contextSafe) => {
    // Hero interaction
    const speed = 0.5;

    const items = gsap.utils.toArray(".movable").map((element: HTMLElement) => {
      return {
        element,
        shiftValue: parseFloat(element.getAttribute("data-value")) / 1500,
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

    // reveals
    console.log("at reveals");
    const sections = gsap.utils
      .toArray(".reveal")
      .forEach((container: HTMLElement) => {
        const tl = gsap
          .timeline({
            scrollTrigger: {
              trigger: container,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          })
          .delay(0);

        gsap.utils
          .toArray("[data-order]", container)
          .sort((a: HTMLElement, b: HTMLElement) => {
            let ordA =
              Number(a.getAttribute("data-order")) || Number.MAX_SAFE_INTEGER;
            let ordB =
              Number(b.getAttribute("data-order")) || Number.MAX_SAFE_INTEGER;
            return ordA - ordB;
          })
          .forEach((elem: HTMLElement) => {
            tl.from(elem, {
              opacity: 0,
              duration: Number(container.getAttribute("data-duration")) || 0.25,
              ease: "power1.in",
            });
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
      <div className="flex flex-col items-center w-full pb-28 xl:gap-38 gap-32 bg-lightgray">
        {/* Hero */}
        <div
          ref={page}
          className="lg:px-12 px-5 flex xl:flex-row flex-col xl:justify-center xl:items-center xl:h-[calc(1280px/2*1.25)] max-w-screen-xl"
        >
          <div className="flex flex-col xl:w-1/2 gap-9">
            <h1 className="playfair w-full xl:max-w-[15ch] xl:h-[4em] font-bold text-[#050505] lg:text-[64px] text-5xl tracking-tightish lg:leading-[80px] leading-[60px]">
              Create Community with Your{" "}
              <Typewriter
                options={{
                  strings: ["Bookmarks", "Links", "Favorites", "References"],
                  autoStart: true,
                  loop: true,
                }}
              />
            </h1>
            <p className="xl:w-full w-3/4 font-normal text-[#333333] text-2xl tracking-tight leading-[30px]">
              Create online communities with your own collection of bookmarks
              using Blake, the social bookmarks platform.
            </p>

            <AnimatedButton variant="lg" href="/login">
              Try Blake Now
            </AnimatedButton>
          </div>

          {/* animation */}
          <div
            ref={container}
            className="relative xl:w-1/2 xl:block hidden h-full"
          >
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
        <div className="reveal w-full flex py-28 lg:px-12 px-5 bg-black justify-center ">
          <div className="flex items-center w-full max-w-screen-xl">
            <div className="flex lg:flex-row flex-col-reverse items-center xl:gap-[99px] gap-12">
              <div
                data-order="4"
                className="relative grid grid-cols-1 xl:w-1/2 w-full xl:max-w-[500px]"
              >
                <Image
                  className="w-full col-start-1 col-end-1 border-3 rounded-3xl"
                  id="slide-start"
                  alt=""
                  src={slide2}
                />
                <Image
                  className="w-full col-start-1 col-end-1 border-3 rounded-3xl slide absolute"
                  id="slide3"
                  alt=""
                  src={slide3}
                />
                <Image
                  className="w-full col-start-1 col-end-1 border-3 rounded-3xl slide absolute"
                  id="slide4"
                  alt=""
                  src={slide9}
                />
                <Image
                  className="w-full col-start-1 col-end-1 border-3 rounded-3xl slide absolute"
                  id="slide5"
                  alt=""
                  src={slide10}
                />
                <Image
                  className="w-full col-start-1 col-end-1 border-3 rounded-3xl slide absolute"
                  id="slide6"
                  alt=""
                  src={slide4}
                />
                <Image
                  className="w-full col-start-1 col-end-1 border-3 rounded-3xl slide absolute"
                  id="slide7"
                  alt=""
                  src={slide6}
                />
                <Image
                  className="w-full col-start-1 col-end-1 border-3 rounded-3xl slide absolute"
                  id="slide8"
                  alt=""
                  src={slide5}
                />
                <Image
                  className="w-full col-start-1 col-end-1 border-3 rounded-3xl slide absolute"
                  id="slide9"
                  alt=""
                  src={slide7}
                />
                <Image
                  className="w-full col-start-1 col-end-1 border-3 rounded-3xl slide absolute"
                  id="slide10"
                  alt=""
                  src={slide8}
                />
              </div>

              <div className="flex flex-col xl:w-1/2 w-full gap-[28px]">
                <h2
                  data-order="1"
                  className="font-bold text-[32px] text-burntsienna tracking-tight"
                >
                  What can I do?
                </h2>
                <h1
                  data-order="2"
                  className="playfair  font-bold text-lightgray lg:text-[64px] text-5xl tracking-tightish lg:leading-[80px] leading-[60px]"
                >
                  Create a List, and Now You Have a Gathering Space
                </h1>
                <p
                  data-order="3"
                  className="top-[268px] left-0 font-normal text-lightgray text-2xl tracking-tight leading-[30px]"
                >
                  Share your list, and people can comment, upvote and downvote
                  links, add to their own lists.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* newsletter */}
        <div className="reveal lg:px-12 px-5 flex flex-col items-center w-full max-w-screen-xl">
          <div className="flex flex-col gap-6 lg:w-3/4 w-full">
            <h2
              data-order="1"
              className="font-bold text-[32px] tracking-tight text-burntsienna"
            >
              Why use Blake?
            </h2>
            <h1
              data-order="2"
              className="playfair font-bold w-full text-[#050505] lg:text-[64px] text-5xl tracking-tightish lg:leading-[80px] leading-[60px]"
            >
              It&apos;s the new way to make communities
            </h1>
            <div className="flex flex-col w-full">
              <p
                data-order="3"
                className="pb-8 w-full font-normal text-[#333333] text-2xl tracking-tight leading-[30px]"
              >
                Blake is built with Love by Alex Perez. To get updates on Blake
                and and its author,{" "}
                <Link
                  href="https://forms.gle/THRneSrxpQHbgath7"
                  className="underline font-medium hover:font-bold"
                >
                  join the mailing list
                </Link>
              </p>
              <Heart
                data-order="4"
                className="w-[47px] h-[38.96px] self-center"
              />
            </div>
          </div>
        </div>
        {/* try now */}
        <div className="reveal lg:px-12 px-5 w-full max-w-screen-xl">
          <div
            data-order="1"
            className="flex md:flex-row flex-col  w-full items-center md:justify-between justify-center lg:px-[81px] lg:py-[52px] md:px-9 md:py-9 md:bg-tan lg:rounded-[52px] md:rounded-[32px] lg:gap-12 gap-8"
          >
            <div className="flex flex-col md:gap-2 gap-4 w-full">
              <h1
                data-order="2"
                className="playfair font-bold text-black lg:text-[64px] text-5xl tracking-tightish lg:leading-[80px] leading-[60px] md:text-left text-center"
              >
                Try Blake now
              </h1>
              <div
                data-order="3"
                className="font-normal text-black text-2xl tracking-tight leading-[30px] md:text-left text-center"
              >
                Your bookmarks, your community
              </div>
            </div>
            <AnimatedButton
              data-order="4"
              variant="lg"
              href="/login"
              className="text-nowrap"
            >
              Start Here
            </AnimatedButton>
          </div>
        </div>
      </div>
    </div>
  );
}
