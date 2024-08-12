import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export default function Login() {
  return (
    <div className="w-full h-screen lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login or Sign Up</h1>
          </div>
          <div className="grid gap-4">
            <Link
              className={buttonVariants({ variant: "outline" })}
              href="/login/google"
            >
              <span className="w-[24px] h-[24px] mr-2">
                <img src="/google.svg" alt="login with google" />
              </span>
              Login or Sign Up with Google
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/alegria.png"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
