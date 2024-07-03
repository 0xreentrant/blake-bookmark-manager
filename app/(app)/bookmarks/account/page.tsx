import { eq, desc } from "drizzle-orm";
import { db } from "@/db";
import { Bookmarks } from "@/components/Bookmarks";
import { bookmarks } from "@/schema";
import { Nothing } from "@/components/DefaultViews/Nothing";
import { PageHeading } from "@/components/Type/PageHeading";

export default async function Page() {
  return (
    <>
      <PageHeading>Account</PageHeading>
    </>
  );
}
