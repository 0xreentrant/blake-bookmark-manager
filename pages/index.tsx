import { useEffect, useState } from 'react'
import Fuse from 'fuse.js'

import { Box } from '@mui/material'

import { Entry } from '../features/Entry'
import { useBookmarks } from '../features/useBookmarks'

export default function Home() {
  const [list, setList] = useState([])
  const {data, error} = useBookmarks()

  const archive = (id) => {
    setList(list.filter(e => e.id !== id))
    fetch('/api/archive/' + id).then(res => res.json())
  }

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
