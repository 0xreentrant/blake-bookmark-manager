import { useEffect, useState, useRef, useMemo } from "react";
import Head from 'next/head';

import { Box } from "@mui/material";
import { FixedSizeList as List } from "react-window";

import { Entry } from "../features/Entry";
import { useBookmarks } from "../features/useBookmarks";


export default function Home() {
  const { data, error } = useBookmarks();
  const [list, setList] = useState([]);

  const ref = useRef(null);
  const [parentHeight, setParentHeight] = useState(0);

  // get height of parent container so our list can match it
  useEffect(() => {
    // need ResizeObserver used because it's 0 px originally
    const resizeObserver = new ResizeObserver((event) => {
      const height = event[0].contentBoxSize[0].blockSize;
      setParentHeight(height);
    });

    resizeObserver.observe(ref.current.parentElement);
  }, [ref]);

  const archive = (id) => {
    setList(list.filter((e) => e.id !== id));
    fetch("/api/archive/" + id).then((res) => res.json());
  };

  // allow us to remove entries in a cached list
  useEffect(() => {
    if (data && list.length < 1) {
      setList(data);
    }
  }, [data, list, ref]);

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

  return (
    <>
      <Head>
        <title>Bookmarker</title>
        <script defer src="https://cdn.jsdelivr.net/npm/uikit@3.20.8/dist/js/uikit.min.js"></script>
        <script defer src="https://cdn.jsdelivr.net/npm/uikit@3.20.8/dist/js/uikit-icons.min.js"></script>
      </Head>
      <Box flex="1" ref={ref}>
        <List
          height={parentHeight}
          itemData={list}
          itemCount={list.length}
          itemSize={30}
        >
          {Row}
        </List>
      </Box>
    </>
  );
}
