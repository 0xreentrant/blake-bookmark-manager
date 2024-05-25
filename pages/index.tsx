import { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { 
  Box, 
  Link,
  IconButton,
} from '@mui/material'
import ArchiveIcon from '@mui/icons-material/Archive'
import useSWR from 'swr'

type EntryType = {
  href: string
  title: string
  date: string
}

const Entry = ({entry, onClick}) => {
  const CachedLink = ({link}) => (
    <Link target="_blank" href={'https://web.archive.org/web/*/' + link}>
      (Cached Link)
    </Link>
  )

  return (
    <Box>
      <CachedLink link={entry.href} />
      <IconButton onClick={() => onClick(entry.id)}>
        <ArchiveIcon />
      </IconButton>
      {new Date(entry.date * 1000).toLocaleString()} <Link target="_blank" href={entry.href}>{entry.title}</Link>
    </Box>
  )
}

export default function Home() {
  const [list, setList] = useState([])

  const archive = (id) => {
    setList(list.filter(e => e.id !== id))
    fetch('/api/archive/' + id).then(res => res.json())
  }

  const fetcher = (...args) => {
    return fetch(...args).then(res => res.json())
  }

  const { data, error } = useSWR('/api/bookmarks', fetcher, { revalidateOnFocus: false })

  useEffect(() => {
    // allow us to remove entries in a cached list
    if (data && list.length < 1) setList(data)
  }, [data, list])

  if (error) {
    return (<div>Failed to load</div>)
  }

  if (!list) {
    return (<div>Loading...</div>)
  }

  return (
    <Box>
      {list.map((e, i) => 
        <Entry 
          key={i} 
          entry={e} 
          onClick={archive}
        />
      )}
    </Box>
  )
}
