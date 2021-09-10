export const getFilters = (filters: any) => {
  const urls: any[] = []

  for (const index in filters) {
    // urls = urls.concat(filters[index])
    for (let i = 0; i < filters[index].length; i++) {
      if (filters[index][i] === true || filters[index][i] === false) {
        urls.push(index)
      } else {
        urls.push(filters[index][i])
      }
    }
  }
  return urls
}

export const getQueryString = (filters: any) => {
  const urls: string[] = []

  for (const index in filters) {
    filters[index].map((filter: any) => urls.push(`&${index}=${filter}`))
  }

  return urls.join('')
}

export const getRandomValue = () =>
  Math.floor(Math.random() * (1000 - 100 + 1)) + 100
