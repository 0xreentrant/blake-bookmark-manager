"use client";
import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { Icon } from "../Icon";
import { addRemoveFromLists } from "../../actions";

export const CachedLink = ({ link }) => (
  <a
    target="_blank"
    href={"https://web.archive.org/web/*/" + link}
    rel="noreferrer"
  >
    (Cached Link)
  </a>
);

export const HNLink = ({ link }) => (
  <a
    target="_blank"
    href={
      "https://hn.algolia.com/?dateRange=all&page=0&prefix=true&query=" +
      encodeURIComponent(link)
    }
    rel="noreferrer"
  >
    (HN)
  </a>
);

export const ListEntry = ({ list }) => (
  <div className=" flex justify-between pb-4">
    {list.title}
    <div className="round">
      <input type="checkbox" name={list.id} id={list.id} />
      <label htmlFor={list.id} />
    </div>
  </div>
);

export const Entry = ({
  id,
  isArchived,
  points,
  href,
  title,
  date,
  lists,
  handleArchive,
  handleRestore,
  handleUpvote,
  handleDownvote,
  handleOpenModal,
  style,
}: {
  id;
  isArchived;
  points;
  href;
  title;
  date;
  lists;
  handleArchive;
  handleRestore;
  handleUpvote;
  handleDownvote;
  handleOpenModal?;
  style?;
}) => {
  // TODO: remove the border and fix the spacing between entries
  return (
    <div className="flex border rounded-lg" style={style}>
      <div className="flex flex-col items-center">
        {points}
        <div className="flex flex-col">
          <Icon icon="chevron-up" onClick={handleUpvote}></Icon>
          <Icon icon="chevron-down" onClick={handleDownvote}></Icon>
        </div>
      </div>
      <div>
        <h3 className="uk-card-title">
          <a href={href}>{title}</a>
        </h3>
        {new Date(date * 1000).toLocaleString()}
        <hr />
        <CachedLink link={href} />
        <HNLink link={href} />
        {isArchived ? (
          <Icon icon="refresh" onClick={handleRestore} />
        ) : (
          <Icon icon="trash" onClick={handleArchive} />
        )}
        <Link href={`/bookmarks/edit/${id}`}>
          <Icon icon="file-edit" />
        </Link>{" "}
        {handleOpenModal && (
          <>
            {/* TODO: optimize, pull up so that we're only using 1 actual modal */}
            <Dialog.Root>
              <Dialog.Trigger>
                <Icon icon="folder" />
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                  <Dialog.Title className="m-0  font-medium">
                    Add to List
                  </Dialog.Title>
                  <form action={addRemoveFromLists.bind(null, id)}>
                    {lists &&
                      lists.map((list) => (
                        <ListEntry key={list.id} list={list} />
                      ))}
                    <div className="mt-[25px] flex justify-end">
                      <button
                        type="submit"
                        className="inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
                      >
                        Done
                      </button>
                    </div>
                  </form>
                  <Dialog.Close asChild>
                    <button
                      className="absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                      aria-label="Close"
                    ></button>
                  </Dialog.Close>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </>
        )}
      </div>
    </div>
  );
};