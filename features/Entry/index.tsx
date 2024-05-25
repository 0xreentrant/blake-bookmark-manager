import { Box, Link, IconButton } from '@mui/material'
import ArchiveIcon from '@mui/icons-material/Archive'

export type EntryType = {
  href: string
  title: string
  date: string
}

export const Entry = ({entry, onClick}) => {
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


