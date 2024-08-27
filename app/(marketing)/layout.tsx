import { Playfair_Display, Work_Sans } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import "../../styles/globals.css";
import Link from "next/link";
import {
  CloudUpload,
  List,
  ExternalLink,
  Heart,
  Linkedin,
  Github,
  Twitter,
} from "lucide-react";

import { AnimatedButton } from "@/components/AnimatedButton";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair-display",
});

const worksans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default function Layout({ children }) {
  return (
    <html className={`${playfair.variable} ${worksans.className}`}>
      <body className="!pointer-events-auto pt-4">
        {/* Header nav */}
        <div className="flex justify-between px-12 pb-8">
          <img
            className="w-[35px]"
            alt="Blake logo removebg"
            src="blake-logo-final.png"
          />
          <div className="flex items-center gap-[29px]">
            {/*
             *<div className="text-black text-l tracking-[0] leading-[30px] whitespace-nowrap">
             *  Blog
             *</div>
             */}
            {/*
             *<div className="text-black text-l tracking-[0] leading-[30px] whitespace-nowrap">
             *  Our Story
             *</div>
             */}

            <AnimatedButton href="/login">Login/Sign Up</AnimatedButton>
          </div>
        </div>

        <div className="">{children}</div>

        {/* footer */}
        <div className="flex flex-col w-full px-[51px] py-[18px] gap-[32px] bg-[#050505]">
          <div
            className="flex justify-between items-center
          "
          >
            <div className=" font-normal text-white text-base tracking-[0]  whitespace-nowrap">
              Copyright 2024 Alex Perez
            </div>
            <div className="flex items-center  gap-[29px]">
              {/*
               *<div className=" w-fit  font-normal text-white text-l tracking-[0] leading-[30px] whitespace-nowrap">
               *  Blog
               *</div>
               *<div className=" w-fit  font-normal text-white text-l tracking-[0] leading-[30px] whitespace-nowrap">
               *  Our Story
               *</div>
               */}
              <div className="text-white flex gap-[32px]">
                Socials:
                <Link
                  alt="Github"
                  href="https://github.com/0xreentrant/blake-bookmark-manager"
                >
                  <Github color="#ffffff" />
                </Link>
                {/* TODO: link to blake linkedin */}
                <Link alt="LinkedIn" href="https://linkedin/in/alexanderlperez">
                  <Linkedin color="#ffffff" />
                </Link>
                {/* TODO: link to blake twitter */}
                {/*
                 *<Twitter color="#ffffff" />
                 */}
              </div>
              <Link
                href="/login"
                className="w-max px-8 py-2.5 border-2 border-solid border-white hover:border-white hover:bg-white hover:text-black hover:active:bg-[#050505] hover:active:text-white transition duration-300 rounded-xl font-medium text-white text-l tracking-[0] leading-[18px]"
              >
                Login/Sign Up
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
