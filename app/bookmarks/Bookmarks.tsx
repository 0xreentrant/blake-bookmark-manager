"use client";

import { useEffect, useState, useContext, useRef } from "react";
import { FixedSizeList as List } from "react-window";

import { Entry } from "../components/Entry";
import { BookmarksLayoutContext } from "./BookmarksLayoutContext";
import { archiveBookmark } from "../actions";

const DEBUG = false;

function outerHeight(element: HTMLElement) {
  // from: https://stackoverflow.com/a/54095466
  const height = element.offsetHeight,
    style = window.getComputedStyle(element);

  return ["top", "bottom"]
    .map((side) => parseInt(style[`margin-${side}`]))
    .reduce((total, side) => total + side, height);
}

export function Bookmarks({ bookmarks, hasError }) {
  const parentRef = useContext(BookmarksLayoutContext);
  const listRef = useRef();
  const [remainderHeight, setRemainderHeight] = useState(0);

  const Row = ({ style, data, index }) => {
    return (
      <Entry
        key={index}
        style={style}
        entry={data[index]}
        onClick={archiveBookmark.bind(null, data[index].id)}
      />
    );
  };

  useEffect(() => {
    const parentContainer = parentRef.current;

    // need ResizeObserver for initial render to set height, otherwise 0px
    const resizeObserver = new ResizeObserver((event) => {
      DEBUG && console.log("-- RESIZE");

      const rawParentHeight = event[0].contentBoxSize[0].blockSize;

      // get all children and their heights, except for the list element
      const getRemainderHeightWithoutList = () => {
        DEBUG && console.log("---");
        let totalHeights = 0;

        for (let child of parentContainer.childNodes) {
          if (child !== listRef.current.parentNode) {
            totalHeights += outerHeight(child);
          }

          DEBUG &&
            console.log({
              child,
              outerHeight: outerHeight(child),
              isList: child == listRef.current.parentNode,
            });
        }

        return totalHeights;
      };

      const remainder = rawParentHeight - getRemainderHeightWithoutList();

      DEBUG &&
        console.log({
          rawParentHeight,
          heightWithoutList: getRemainderHeightWithoutList(),
          remainder,
          parentContainer,
          listRef: listRef.current,
          event,
        });

      setRemainderHeight(remainder);
    });

    resizeObserver.observe(parentContainer);

    return () => {
      if (parentRef.current) {
        resizeObserver.unobserve(parentRef.current);
      }
    };
  }, [parentRef]);

  if (hasError) {
    return <div>Failed to load</div>;
  }

  if (!bookmarks) {
    return <div>Loading...</div>;
  }

  return (
    <List
      height={remainderHeight}
      itemData={bookmarks}
      itemCount={bookmarks.length}
      itemSize={122}
      innerRef={listRef}
    >
      {Row}
    </List>
  );
}
