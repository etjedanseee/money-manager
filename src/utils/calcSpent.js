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