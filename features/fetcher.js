export const fetcher = (...args) => {
  // @ts-ignore
  return fetch(...args).then(res => res.json())
}

