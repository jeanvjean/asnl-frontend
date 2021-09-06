export const getFilters = (filters: any) => {
  let urls: any[] = []

  for (const index in filters) {
    urls = urls.concat(filters[index])
  }
  console.log(urls)
  return urls
}

export const getQueryString = (filters: any) => {
  const urls: string[] = []

  for (const index in filters) {
    filters[index].map((filter: any) => urls.push(`&${index}=${filter}`))
  }

  return urls.join('')
}
