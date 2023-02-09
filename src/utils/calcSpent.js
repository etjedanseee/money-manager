export const calcAll = (spent, categories) => {
  const spentArr = [];

  for (let categ in categories) {
    let categSum = 0;
    for (let date in spent[categ]) {
      let dateSum = 0;
      for (let operation of spent[categ][date]) {
        dateSum += operation.sum
      }
      categSum += dateSum;
    }
    spentArr.push({ category: categ, sum: categSum, color: categories[categ] })
  }
  return sortData(spentArr)
}

//считать все между датами
export const calcIntervalDate = (spent, categories, startDate, endDate) => {

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
  // console.log([sortedCategories, sortedColors, sortedSum])
  return [sortedCategories, sortedColors, sortedSum]
}