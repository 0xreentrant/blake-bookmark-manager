import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { FixedSizeList as List } from "react-window";

import { Entry } from "../../features/Entry";
import { useBookmarks } from "../../features/useBookmarks";

// from: https://stackoverflow.com/a/54095466
function outerHeight(element: HTMLElement) {
  const height = element.offsetHeight,
    style = window.getComputedStyle(element);

  return ["top", "bottom"]
    .map((side) => parseInt(style[`margin-${side}`]))
    .reduce((total, side) => total + side, height);
}

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();
  const { data, error } = useBookmarks({
    random: pathname === "random",
  });
  const [list, setList] = useState([]);

  const parentRef = useRef<HTMLDivElement>(null);
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
          if (child !== listRef.current) {
            totalHeights += outerHeight(child);
          }
        }
        return totalHeights;
      };

      setParentHeight(rawParentHeight - getChildrenHeight());
    });

    resizeObserver.observe(parentRef.current.parentElement);
  }, [parentRef]);

  const archive = (id: string) => {
    setList(list.filter((e) => e.id !== id));
    fetch("/api/archive/" + id).then((res) => res.json());
  };

  // allow us to remove entries in a cached list
  useEffect(() => {
    if (data && list.length < 1) {
      setList(data);
    }
  }, [data, list, parentRef]);

  const Row = ({ style, data, index }) => {
    return (
      <Entry key={index} style={style} entry={data[index]} onClick={archive} />
    );
  };

  if (error) {
    return <div>Failed to load</div>;
  }

  if (!list) {
    return <div>Loading...</div>;
  }

  const withActiveToggle = (t) => (pathname === t ? "uk-active" : "");
  console.log(pathname);

  return (
    <div ref={parentRef} className="flex flex-1 flex-col">
      <ul className="uk-subnav uk-subnav-primary p-2">
        <li className={withActiveToggle("/")}>
          <Link href="/">All</Link>
        </li>{" "}
        <li>
          <Link href="/random">Random</Link>
        </li>{" "}
      </ul>
      <List
        height={parentHeight}
        itemData={list}
        itemCount={list.length}
        itemSize={122}
        innerRef={listRef}
      >
        {Row}
      </List>
    </div>
  );
}
