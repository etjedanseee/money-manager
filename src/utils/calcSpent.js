export const calcAll = (spent, categories, selectedDate, filterInvoiceBy) => {
  const spentArr = [];
  if (selectedDate.length > 0) {
    const startDate = selectedDate[0];
    const endDate = selectedDate[1];
    for (let categ in categories) {
      let categSum = 0;
      for (let date in spent[categ]) {
        let dateSum = 0;
        const parsedDate = new Date(Date.parse(date));
        if ((parsedDate < startDate) || (parsedDate > endDate)) {
          continue
        }
        for (let operation of spent[categ][date]) {
          if (filterInvoiceBy === 'All invoice') {
            dateSum += operation.sum
          } else if (operation.payWith === filterInvoiceBy) {
            dateSum += operation.sum
          }
        }
        categSum += dateSum;
      }
      spentArr.push({ category: categ, sum: categSum, color: categories[categ] })
    }
  } else {
    for (let categ in categories) {
      let categSum = 0;
      for (let date in spent[categ]) {
        let dateSum = 0;
        const parsedDate = new Date(Date.parse(date));
        if (+parsedDate !== +selectedDate) {
          continue
        }
        for (let operation of spent[categ][date]) {
          if (filterInvoiceBy === 'All invoice') {
            dateSum += operation.sum
          } else if (operation.payWith === filterInvoiceBy) {
            dateSum += operation.sum
          }
        }
        categSum += dateSum;
      }
      spentArr.push({ category: categ, sum: categSum, color: categories[categ] })
    }
  }
  return sortData(spentArr)
}

const sortData = (spentArr) => {
  const sortedSpentArr = [...spentArr].sort((a, b) => a.sum > b.sum ? 1 : -1)
  const sortedCategories = []
  const sortedSum = []
  const sortedColors = []

  for (let i = 0; i < sortedSpentArr.length; i++) {
    sortedCategories[i] = sortedSpentArr[i].category
    sortedSum[i] = sortedSpentArr[i].sum
    sortedColors[i] = sortedSpentArr[i].color
  }
  return [sortedCategories, sortedColors, sortedSum]
}

export const getOperations = (spent, categories, selectedDate, filterInvoiceBy) => {
  const res = {}
  if (selectedDate.length > 0) {
    const startDate = selectedDate[0];
    const endDate = selectedDate[1];
    for (let categ in categories) {
      for (let date in spent[categ]) {
        const parsedDate = new Date(Date.parse(date));
        if ((parsedDate < startDate) || (parsedDate > endDate)) {
          continue
        }
        if (!res[date]) {
          res[date] = {
            operations: [],
            totalSum: 0
          }
        }
        for (let operation of spent[categ][date]) {
          const operObj = { ...operation, category: categ, color: categories[categ] }
          if (filterInvoiceBy === 'All invoice' || operation.payWith === filterInvoiceBy) {
            res[date].operations.push(operObj)
            res[date].totalSum += operObj.sum
          }
        }
      }
    }
  } else {
    for (let categ in categories) {
      for (let date in spent[categ]) {
        const parsedDate = new Date(Date.parse(date));
        if (+parsedDate !== +selectedDate) {
          continue
        }
        if (!res[date]) {
          res[date] = {
            operations: [],
            totalSum: 0
          }
        }
        for (let operation of spent[categ][date]) {
          const operObj = { ...operation, category: categ, color: categories[categ] }
          if (filterInvoiceBy === 'All invoice' || operation.payWith === filterInvoiceBy) {
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
  return Object.fromEntries(sortedOperations)
}