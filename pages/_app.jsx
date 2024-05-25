import styled from '@emotion/styled'
import { Box, Link } from '@mui/material'
import '../styles/globals.css'

const Navigation = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 20px;
  border-bottom: 1px solid black;
  background-color: #eee;
`

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navigation>
        <Link href="/">All</Link>
        <Link href="/random">Random</Link>
      </Navigation>
      <Box padding="10px">
        <Component {...pageProps} />
      </Box>
    </>
    )
}

export default MyApp
