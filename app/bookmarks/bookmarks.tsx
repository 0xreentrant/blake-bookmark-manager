"use client";

import { useEffect, useState, useRef } from "react";
import { FixedSizeList as List } from "react-window";

import { Entry } from "../components/Entry";

// from: https://stackoverflow.com/a/54095466
function outerHeight(element: HTMLElement) {
  const height = element.offsetHeight,
    style = window.getComputedStyle(element);

  return ["top", "bottom"]
    .map((side) => parseInt(style[`margin-${side}`]))
    .reduce((total, side) => total + side, height);
}

export function Bookmarks({ bookmarks, doArchive, hasError, parentRef }) {
  const listRef = useRef(null);
  const [parentHeight, setParentHeight] = useState(0);

  // get height of parent container so our list can match it
  useEffect(() => {
    // need ResizeObserver for initial render to set height, otherwise 0px
    const resizeObserver = new ResizeObserver((event) => {
      const parent = parentRef.current;
      const rawParentHeight = event[0].contentBoxSize[0].blockSize;

      // get all children and their heights, except for the list element
      const getChildrenHeight = () => {
        const children = parent.childNodes;
        let totalHeights = 0;

        for (let child of children) {
          console.log({ child });
          if (child !== listRef.current) {
            totalHeights += outerHeight(child);
          }
        }

        console.log({ totalHeights });
        return totalHeights;
      };

      setParentHeight(rawParentHeight - getChildrenHeight());
    });

    resizeObserver.observe(parentRef.current.parentElement);
  }, [parentRef]);

  const Row = ({ style, data, index }) => {
    return (
      <Entry
        key={index}
        style={style}
        entry={data[index]}
        onClick={doArchive}
      />
    );
  };

  if (hasError) {
    return <div>Failed to load</div>;
  }

  if (!bookmarks) {
    return <div>Loading...</div>;
  }

  console.log({ bookmarks });

  return (
    <div className="flex flex-1 flex-col">
      <List
        height={parentHeight}
        itemData={bookmarks}
        itemCount={bookmarks.length}
        itemSize={122}
        innerRef={listRef}
      >
        {Row}
      </List>
    </div>
  );
}
