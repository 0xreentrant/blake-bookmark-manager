import useSWR from 'swr'
import { fetcher } from 'features/fetcher'

export const useBookmarks = ({random = false, limit = 0}: {random?: boolean, limit} = {random: false, limit: 0}) => {
  return useSWR(
    random 
      ? `/api/random`
      : `/api/bookmarks${limit ? `/${limit}` : ''}`,
    fetcher, 
    { revalidateOnFocus: false }
  )
}


