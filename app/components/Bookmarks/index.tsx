"use client";

import { useEffect, useState, useContext, useRef } from "react";
import { FixedSizeList as List } from "react-window";
import throttle from "lodash.throttle";
import { Entry } from "../Entry";
import { LayoutContext } from "../LayoutContext";
import {
  archiveBookmark,
  restoreBookmark,
  upvoteBookmark,
  downvoteBookmark,
} from "../../lib/actions";

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
  const listRef = useRef(null);
  const [remainderHeight, setRemainderHeight] = useState(0);
  const [firstChildHeight, setFirstChildHeight] = useState(60);
  const setRemainderHeightThrottled = throttle(setRemainderHeight, 30);
  const setFirstChildHeightThrottled = throttle(setFirstChildHeight, 30);

  console.log("rendering bookmarks", Date.now(), remainderHeight, firstChildHeight);

  const Row = ({ style, data, index }) => {
    const entry = data[index];
    const { id, archived, points, href, title, date, bookmarksToLists } = entry;
    const isArchived = archived == 1;
    const includedInLists = bookmarksToLists
      ? //? bookmarksToLists.map((e) => e.listId)
        bookmarksToLists
      : [];

    return (
      <div style={style} className="">
        <Entry
          key={id}
          id={id}
          isArchived={isArchived}
          points={points}
          href={href}
          title={title}
          date={date}
          allLists={allLists}
          includedInLists={includedInLists}
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

    // get all children and their heights, except for the list element
    const getRemainderHeightWithoutList = (parentContainer, listRef) => {
      let totalHeights = 0;
      let i = 0;

      for (let child of parentContainer.childNodes) {
        if (listRef.current && child !== listRef.current.parentNode) {
          totalHeights += outerHeight(child);
          i++;
        }
      }

      return totalHeights;
    };

    const observationCb = (event) => {
      const rawParentHeight = event[0].contentBoxSize[0].blockSize;

      const remainder =
        rawParentHeight -
        getRemainderHeightWithoutList(parentContainer, listRef);

      const firstChildHeight =
        // @ts-ignore
        listRef?.current?.children[0]?.children[0]?.offsetHeight;

      /*
       *console.log({
       *  parentContainer,
       *  listRef: listRef.current,
       *  remainderHeightWithoutList: getRemainderHeightWithoutList(
       *    parentContainer,
       *    listRef
       *  ),
       *  remainderHeight,
       *  rawParentHeight,
       *  rawParent: event[0].target,
       *});
       */

      setRemainderHeightThrottled(remainder);
      setFirstChildHeightThrottled(firstChildHeight);
    };

    // need ResizeObserver for initial render to set height, otherwise 0px
    const resizeObserver = new ResizeObserver(observationCb);
    resizeObserver.observe(parentContainer);

    return () => {
      if (parentRef.current) {
        resizeObserver.unobserve(parentRef.current);
      }
    };
  }, [parentRef, listRef]);

  return (
    // @ts-ignore todo: fix this type error
    <List
      height={remainderHeight}
      itemData={bookmarks}
      itemCount={bookmarks.length}
      itemSize={firstChildHeight}
      innerRef={listRef}
      style={{ overflowX: "hidden", paddingBottom: "2rem" }}
    >
      {Row}
    </List>
  );
}
