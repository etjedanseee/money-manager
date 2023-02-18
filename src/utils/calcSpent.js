export const calcAll = (spent, categories, selectedDate, filterInvoiceBy) => {
  let categSum = {};
  if (selectedDate.length > 0) {
    const startDate = selectedDate[0];
    const endDate = selectedDate[1];
    for (let date in spent) {
      const parsedDate = new Date(Date.parse(date));
      if ((parsedDate < startDate) || (parsedDate > endDate)) {
        continue
      }
      for (let operation of spent[date]) {
        if (filterInvoiceBy === 'All invoice') {
          if (categSum[operation.category] !== undefined) {
            categSum[operation.category] += operation.sum
          } else {
            categSum[operation.category] = operation.sum
          }
        } else if (operation.payWith === filterInvoiceBy) {
          if (categSum[operation.category] !== undefined) {
            categSum[operation.category] += operation.sum
          } else {
            categSum[operation.category] = operation.sum
          }
        }
      }
    }
  } else {
    for (let date in spent) {
      const parsedDate = new Date(Date.parse(date));
      if (+parsedDate !== +selectedDate) {
        continue
      }
      for (let operation of spent[date]) {
        if (filterInvoiceBy === 'All invoice') {
          if (categSum[operation.category] !== undefined) {
            categSum[operation.category] += operation.sum
          } else {
            categSum[operation.category] = operation.sum
          }
        } else if (operation.payWith === filterInvoiceBy) {
          if (categSum[operation.category] !== undefined) {
            categSum[operation.category] += operation.sum
          } else {
            categSum[operation.category] = operation.sum
          }
        }
      }
    }
  }
  return sortData(categSum, categories)
}

const sortData = (categSum, categories) => {
  const sortedCategSum = Object.fromEntries(Object.entries(categSum).sort((a, b) => a[1] > b[1] ? 1 : -1))
  const sortedCategories = []
  const sortedSum = []
  const sortedColors = []

  for (let cat in categories) {
    if (!categSum[cat]) {
      sortedCategories.push(cat)
      sortedSum.push(0)
      sortedColors.push(categories[cat])
    }
  }

  for (let key in sortedCategSum) {
    sortedCategories.push(key)
    sortedSum.push(categSum[key])
    sortedColors.push(categories[key])
  }
  return [sortedCategories, sortedColors, sortedSum]
}

export const getOperations = (spent, selectedDate, filterInvoiceBy, search) => {
  const res = {}
  if (selectedDate.length > 0) {
    const startDate = selectedDate[0];
    const endDate = selectedDate[1];
    for (let date in spent) {
      const parsedDate = new Date(Date.parse(date));
      if ((parsedDate < startDate) || (parsedDate > endDate)) {
        continue
      }
      for (let operation of spent[date]) {
        const operObj = { ...operation }
        if (filterInvoiceBy === 'All invoice' || operation.payWith === filterInvoiceBy) {
          if (search === '' || operation.description.toLowerCase().includes(search.toLowerCase())) {
            if (!res[date]) {
              res[date] = {
                operations: [],
                totalSum: 0
              }
            }
            res[date].operations.push(operObj)
            res[date].totalSum += operObj.sum
          }
        }
      }
    }
  } else {
    for (let date in spent) {
      const parsedDate = new Date(Date.parse(date));
      if (+parsedDate !== +selectedDate) {
        continue
      }
      for (let operation of spent[date]) {
        const operObj = { ...operation }
        if (filterInvoiceBy === 'All invoice' || operation.payWith === filterInvoiceBy) {
          if (search === '' || operation.description.toLowerCase().includes(search.toLowerCase())) {
            if (!res[date]) {
              res[date] = {
                operations: [],
                totalSum: 0
              }
            }
            res[date].operations.push(operObj)
            res[date].totalSum += operObj.sum
          }
        }
      }
    }
  }
  return sortOperations(res)
}

const sortOperations = (operations) => {
  const sortedOperations = Object.entries(operations).sort((date1, date2) => new Date(date2[0]) - new Date(date1[0]))
  const dateArr = []
  const operArr = []
  for (let i = 0; i < sortedOperations.length; i++) {
    dateArr.push(sortedOperations[i][0])
    operArr.push(sortedOperations[i][1])
  }
  return [dateArr, operArr]
}