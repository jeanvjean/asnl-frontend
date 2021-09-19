export const getFilters = (filters: any) => {
  const urls: any[] = []

  for (const index in filters) {
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
    if (index === 'departments') {
      filters[index].map((filter: any) => urls.push(`&${index}[]=${filter}`))
    } else {
      filters[index].map((filter: any) => urls.push(`&${index}=${filter}`))
    }
  }

  return urls.join('')
}

export interface rowType {
  name: String
  value: String
  class?: String
}

export const getTableBody = (
  bodyArray: any,
  displayedColumns: string[] = []
) => {
  const responseArray: rowType[][] = []
  bodyArray.forEach((body: any) => {
    const mainArr: rowType[] = []
    for (const i in body) {
      if (displayedColumns.includes(i)) {
        mainArr.push({ name: i, value: body[i] })
      } else {
        mainArr.push({ name: i, value: body[i], class: 'hidden' })
      }
    }
    responseArray.push(mainArr)
  })
  return responseArray
}

export const getRandomValue = () =>
  Math.floor(Math.random() * (1000 - 100 + 1)) + 100
