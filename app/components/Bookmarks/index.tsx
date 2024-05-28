"use client";

import { useEffect, useState, useContext, useRef } from "react";
import { FixedSizeList as List } from "react-window";

import { Entry } from "../Entry";
import { LayoutContext } from "../LayoutContext";
import {
  archiveBookmark,
  restoreBookmark,
  upvoteBookmark,
  downvoteBookmark,
} from "../../actions";

function outerHeight(element: HTMLElement) {
  // from: https://stackoverflow.com/a/54095466
  const height = element.offsetHeight,
    style = window.getComputedStyle(element);

  return ["top", "bottom"]
    .map((side) => parseInt(style[`margin-${side}`]))
    .reduce((total, side) => total + side, height);
}

export function Bookmarks({ bookmarks, allLists }) {
  const parentRef = useContext(LayoutContext);
  const listRef = useRef<HTMLElement>();
  const [remainderHeight, setRemainderHeight] = useState(0);

  const Row = ({ style, data, index }) => {
    const entry = data[index];
    const { id, archived, points, href, title, date, bookmarksToLists } = entry;
    const isArchived = archived == 1;
    const includedInLists = bookmarksToLists
      ? bookmarksToLists.map((e) => e.listId)
      : [];

    return (
      <div style={style} className="!w-[98%]">
        <Entry
          key={index}
          id={id}
          isArchived={isArchived}
          points={points}
          href={href}
          title={title}
          date={date}
          allLists={allLists}
          listsIncluded={includedInLists}
          handleUpvote={() => upvoteBookmark(id)}
          handleDownvote={() => downvoteBookmark(id)}
          handleArchive={() => archiveBookmark(id)}
          handleRestore={() => restoreBookmark(id)}
        />
      </div>
    );
  };

  // TODO: turn into hook
  useEffect(() => {
    const parentContainer = parentRef.current;

    // need ResizeObserver for initial render to set height, otherwise 0px
    const resizeObserver = new ResizeObserver((event) => {
      const rawParentHeight = event[0].contentBoxSize[0].blockSize;

      // get all children and their heights, except for the list element
      const getRemainderHeightWithoutList = () => {
        let totalHeights = 0;

        for (let child of parentContainer.childNodes) {
          if (listRef.current && child !== listRef.current.parentNode) {
            totalHeights += outerHeight(child);
          }
        }

        return totalHeights;
      };

      const remainder = rawParentHeight - getRemainderHeightWithoutList();
      setRemainderHeight(remainder);
    });

    resizeObserver.observe(parentContainer);

    return () => {
      if (parentRef.current) {
        resizeObserver.unobserve(parentRef.current);
      }
    };
  }, [parentRef]);

  return (
    <List
      height={remainderHeight}
      itemData={bookmarks}
      itemCount={bookmarks.length}
      itemSize={100}
      innerRef={listRef}
      style={{ overflowX: "hidden" }}
    >
      {Row}
    </List>
  );
}
