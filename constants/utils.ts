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
  tdClass?: String
}

export const getTableBody = (
  bodyArray: any,
  displayedColumns: string[] = [],
  classObject: any = {}
) => {
  const responseArray: rowType[][] = []
  bodyArray.forEach((body: any) => {
    const mainArr: rowType[] = []
    for (const i in body) {
      if (displayedColumns.includes(i)) {
        mainArr.push({
          name: i,
          value: body[i],
          class: `${getColumnClass(i, body[i], classObject)}`,
        })
      } else {
        mainArr.push({ name: i, value: body[i], tdClass: 'hidden' })
      }
    }
    responseArray.push(mainArr)
  })
  return responseArray
}

const getColumnClass = (
  columnName: any,
  columnValue: any,
  classObject: any
) => {
  let response = ''
  if (columnName in classObject) {
    if (columnValue in classObject[columnName]) {
      response = classObject[columnName][columnValue]
    }
  }

  return response
}

export function formatDate(dateValue: string) {
  const date = new Date(dateValue)
  const year = date.getFullYear()
  let month: any = date.getMonth() + 1
  let dt: any = date.getDate()

  if (dt < 10) {
    dt = '0' + dt
  }
  if (month < 10) {
    month = '0' + month
  }

  return year + '-' + month + '-' + dt
}

export const getRandomValue = () =>
  Math.floor(Math.random() * (1000 - 100 + 1)) + 100
