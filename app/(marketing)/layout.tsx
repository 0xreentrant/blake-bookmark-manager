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
  Globe,
  Twitter,
} from "lucide-react";

import { AnimatedButton } from "@/components/AnimatedButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blake - Social Bookmarking Manager",
  description:
    "Discover Blake, the ultimate social bookmarking manager designed to help you create and share online communities through curated bookmark collections. Organize, comment, upvote, and downvote links effortlessly. Built with love by Alex Perez.",
  keywords: [
    "social bookmarking",
    "bookmark manager",
    "online communities",
    "curated collections",
    "link sharing",
    "bookmark organizing",
    "community engagement",
    "upvote and downvote links",
    "bookmark lists",
    "SaaS bookmark manager",
  ],
  openGraph: {
    title: "Blake - Social Bookmarking Manager",
    description:
      "Discover Blake, the ultimate social bookmarking manager designed to help you create and share online communities through curated bookmark collections.",
    url: "https://getblake.link",
    siteName: "Blake",
    images: [
      {
        url: "https://getblake.link/og-image.png",
        width: 800,
        height: 600,
        alt: "Blake - Social Bookmarking Manager",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blake - Social Bookmarking Manager",
    description:
      "Discover Blake, the ultimate social bookmarking manager designed to help you create and share online communities through curated bookmark collections.",
    images: ["https://getblake.link/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};
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
      <body className="!pointer-events-auto pt-4 bg-lightgray">
        {/* Header nav */}
        <div className="flex justify-between lg:px-12 px-5 pb-8">
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
        <div className="flex md:flex-row flex-col-reverse justify-between items-center w-full px-[51px] md:py-[28px] py-10 gap-[32px] bg-tan">
          <div className="flex items-center gap-4 font-normal text-black  tracking-tight whitespace-nowrap">
            <img
              className="w-[35px]"
              alt="Blake logo removebg"
              src="blake-logo-final.png"
            />
            Copyright 2024 Alex Perez
          </div>
          <div className="flex md:flex-row flex-col-reverse items-center md:gap-[29px] gap-5">
            {/*
             *<div className=" w-fit  font-normal text-white text-l tracking-[0] leading-[30px] whitespace-nowrap">
             *  Blog
             *</div>
             *<div className=" w-fit  font-normal text-white text-l tracking-[0] leading-[30px] whitespace-nowrap">
             *  Our Story
             *</div>
             */}
            <div className="text-black flex gap-[32px]">
              Socials:
              <Link href="https://gitresethard.com">
                <Globe color="#050505" />
              </Link>
              <Link href="https://github.com/0xreentrant/blake-bookmark-manager">
                <Github color="#050505" />
              </Link>
              {/* TODO: link to blake linkedin */}
              <Link href="https://linkedin.com/in/alexanderlperez">
                <Linkedin color="#050505" />
              </Link>
              {/* TODO: link to blake twitter */}
              {/*
               *<Twitter color="#ffffff" />
               */}
            </div>
            <Link
              href="/login"
              className="w-max px-8 py-2.5 border-2 border-solid border-black hover:border-black hover:bg-black hover:text-lightgray hover:active:bg-tan hover:active:text-black transition duration-300 rounded-xl font-medium text-black text-l tracking-tight leading-[18px]"
            >
              Login/Sign Up
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
