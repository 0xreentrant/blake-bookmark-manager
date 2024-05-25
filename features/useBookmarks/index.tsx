import useSWR from 'swr'

export const useBookmarks = () => {
  const fetcher = (...args) => {
    // @ts-ignore
    return fetch(...args).then(res => res.json())
  }

  return useSWR('/api/bookmarks', fetcher, { revalidateOnFocus: false })
}


