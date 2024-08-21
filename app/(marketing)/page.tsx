import { Nav } from "@/components/Marketing/Nav";
import { Footer } from "@/components/Marketing/Footer";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
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

import React from "react";

export default function Page() {
  return (
    <div>
      <div className="flex flex-col items-center gap-[108px] px-[51px] pt-[22px] pb-[102px] relative bg-white">
        {/* Header nav */}

        {/* Hero */}
        <div className="inline-flex items-center justify-center relative">
          <div className="relative w-[653px] h-[460px]">
            <h1 className="playfair absolute w-[629px] left-6 [font-family:'Playfair_Display-Bold',Helvetica] font-bold text-[#050505] text-[64px] tracking-[0] leading-[80px]">
              Create Community with Your Bookmarks
            </h1>
            <p className="absolute w-[629px] top-[271px] left-6 [font-family:'Work_Sans-Regular',Helvetica] font-normal text-[#333333] text-2xl tracking-[0] leading-[30px]">
              Create online communities with your own collection of bookmarks
              using Blake, the social bookmarks platform.
            </p>
            <div className="inline-flex items-start gap-8 absolute top-[394px] left-6">
              <div className="inline-flex items-start gap-2.5 px-12 py-6 relative flex-[0_0_auto] bg-[#050505] rounded-2xl overflow-hidden">
                <div className="relative w-[168px] mt-[-1.00px] [font-family:'Work_Sans-Medium',Helvetica] font-medium text-white text-2xl tracking-[0] leading-[18px]">
                  Try Blake Now
                </div>
              </div>
            </div>
          </div>
          <img
            className="relative w-[635.31px] h-[778.19px]"
            alt="Image group"
            src="hero.png"
          />
        </div>

        {/* Blurb */}
        <div className="relative w-[1274px] h-[446px]">
          <img
            className="absolute w-[619px] h-[445px] top-0 left-0 object-cover"
            alt="Image"
            src="screenshot.png"
          />
          <div className="absolute w-[559px] h-[388px] top-0 left-[718px]">
            <h1 className="playfair absolute w-[555px] top-0 left-0 [font-family:'Playfair_Display-Bold',Helvetica] font-bold text-[#050505] text-[64px] tracking-[0] leading-[80px]">
              Create a List, and Now You Have a Gathering Space
            </h1>
            <p className="absolute w-[526px] top-[268px] left-0 [font-family:'Work_Sans-Regular',Helvetica] font-normal text-[#333333] text-2xl tracking-[0] leading-[30px]">
              Share your list, and people can comment, upvote and downvote
              links, add to their own lists.
            </p>
          </div>
        </div>

        {/* how it works */}
        <div className="flex flex-col w-[1264px] items-center gap-12 relative">
          <h1 className="playfair relative self-stretch mt-[-1.00px] [font-family:'Playfair_Display-Bold',Helvetica] font-bold text-black text-[64px] text-center tracking-[0] leading-[80px]">
            How does it work?
          </h1>
          <div className="relative w-[997px] h-[233px] bg-white rounded-[40px]">
            <div className="inline-flex items-start justify-center gap-6 relative top-px left-px">
              <div className="flex flex-col w-[316px] items-center gap-[27px] px-0 py-px relative">
                <CloudUpload className="relative w-[33.71px] h-[33.71px] mt-[-2.00px]" />
                <div className="playfair relative self-stretch [font-family:'Playfair_Display-SemiBold',Helvetica] font-semibold text-black text-[34px] text-center tracking-[0] leading-[normal]">
                  1. Import
                </div>
                <p className="absolute w-[258px] top-[119px] left-0 [font-family:'Work_Sans-Regular',Helvetica] font-normal text-black text-2xl tracking-[0] leading-[normal]">
                  Import your Chrome bookmarks into Blake using the app.
                </p>
              </div>
              <div className="flex flex-col w-[316px] items-center gap-6 px-0 py-[5px] relative">
                <List className="relative w-[33.71px] h-[33.71px] mt-[-2.00px]" />
                <div className="playfair relative self-stretch [font-family:'Playfair_Display-SemiBold',Helvetica] font-semibold text-black text-[34px] text-center tracking-[0] leading-[normal]">
                  2. List
                </div>
                <p className="relative self-stretch [font-family:'Work_Sans-Regular',Helvetica] font-normal text-black text-2xl tracking-[0] leading-[normal]">
                  Your list is where people can comment, upvote, and share with
                  their friends.
                </p>
              </div>
              <div className="flex flex-col w-[316px] items-center gap-[22px] relative">
                <ExternalLink className="relative w-[33.71px] h-[33.71px] mt-[-2.00px]" />
                <div className="playfair relative self-stretch [font-family:'Playfair_Display-SemiBold',Helvetica] font-semibold text-black text-[34px] text-center tracking-[0] leading-[normal]">
                  3. Share
                </div>
                <p className="relative self-stretch [font-family:'Work_Sans-Regular',Helvetica] font-normal text-black text-2xl tracking-[0] leading-[normal]">
                  Share with your audience, your newsletter, your social media
                  followers.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* try now */}
        <div className="flex w-[1274px] h-[217px] items-center justify-between px-[81px] py-[68px] relative bg-[#f7f7f5] rounded-[52px]">
          <div className="relative w-[427px] h-[110px] mt-[-14.50px] mb-[-14.50px]">
            <div className="absolute top-20 left-0 [font-family:'Work_Sans-Regular',Helvetica] font-normal text-black text-2xl tracking-[0] leading-[30px] whitespace-nowrap">
              Your bookmarks, your community
            </div>
            <h1 className="playfair absolute top-0 left-0 [font-family:'Playfair_Display-Bold',Helvetica] font-bold text-black text-[64px] tracking-[0] leading-[80px] whitespace-nowrap">
              Try Blake now
            </h1>
          </div>
          <div className="inline-flex items-start gap-8 relative flex-[0_0_auto]">
            <div className="inline-flex items-start gap-2.5 px-12 py-6 relative flex-[0_0_auto] bg-[#050505] rounded-2xl overflow-hidden">
              <div className="relative w-[168px] mt-[-1.00px] [font-family:'Work_Sans-Medium',Helvetica] font-medium text-white text-2xl text-center tracking-[0] leading-[18px]">
                Start Here
              </div>
            </div>
          </div>
        </div>

        {/* newsletter */}
        <div className="flex flex-col w-[828.5px] items-center justify-center gap-[25px] px-[30px] py-0 relative">
          <h1 className="playfair relative self-stretch mt-[-1.00px] [font-family:'Playfair_Display-Bold',Helvetica] font-bold text-[#050505] text-[64px] text-center tracking-[0] leading-[80px]">
            A new way to make communities
          </h1>
          <p className="relative self-stretch h-[90px] [font-family:'Work_Sans-Regular',Helvetica] font-normal text-[#333333] text-2xl tracking-[0] leading-[30px]">
            Blake is built with Love by Alex Perez. Join the mailing list to get
            updates on Blake and what&#39;s going on in the software developer
            world.
          </p>
          <Heart className="relative w-[47px] h-[38.96px]" />
        </div>
      </div>
      {/* footer */}
      <div className="flex flex-col px-[51px] py-[42px] gap-[32px] relative  bg-[#050505]">
        <div className="flex justify-between">
          <img
            className="w-[55px] h-[73px]"
            alt="Blake logo removebg"
            src="blake-logo-final.png"
          />
          <div className="inline-flex items-center  gap-[29px]">
            <div className="relative w-fit [font-family:'Work_Sans-Regular',Helvetica] font-normal text-white text-xl tracking-[0] leading-[30px] whitespace-nowrap">
              Blog
            </div>
            <div className="relative w-fit [font-family:'Work_Sans-Regular',Helvetica] font-normal text-white text-xl tracking-[0] leading-[30px] whitespace-nowrap">
              Our Story
            </div>
            <div className="inline-flex items-start gap-8 relative flex-[0_0_auto] shadow-[0px_4px_4px_#00000040]">
              <div className="inline-flex items-center justify-center gap-2.5 px-6 py-[18px] relative flex-[0_0_auto] mt-[-2.00px] mb-[-2.00px] ml-[-2.00px] mr-[-2.00px] rounded-2xl overflow-hidden border-2 border-solid border-white">
                <div className="relative w-[168px] [font-family:'Work_Sans-Medium',Helvetica] font-medium text-white text-xl text-center tracking-[0] leading-[18px]">
                  Login/Sign Up
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="border-[#333333]" />
        <div className="flex justify-between">
          <div className="[font-family:'Work_Sans-Regular',Helvetica] font-normal text-white text-base tracking-[0] leading-[30px] whitespace-nowrap">
            Copyright 2024 Alex Perez
          </div>
          <div className="flex gap-[32px]">
            <Link href="https://github.com/0xreentrant/blake-bookmark-manager">
              <Github color="#ffffff" />
            </Link>
            {/* TODO: link to blake linkedin */}
            <Link href="https://linkedin/in/alexanderlperez">
              <Linkedin color="#ffffff" />
            </Link>
            {/* TODO: link to blake twitter */}
            <Twitter color="#ffffff" />
          </div>
        </div>
      </div>
    </div>
  );
}
