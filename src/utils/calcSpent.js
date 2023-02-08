export const calcAll = (spent, categories) => {
  const spentArr = [];

  for (let categ in spent) {
    let categSum = 0;
    for (let date in spent[categ]) {
      let dateSum = 0;
      for (let operation of spent[categ][date]) {
        dateSum += operation.sum
      }
      categSum += dateSum;
    }
    spentArr.push({ category: categ, sum: categSum })
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

  for (let i = 0; i < sortedSpentArr.length; i++) {
    sortedCategories.push(sortedSpentArr[i].category)
    sortedSum.push(sortedSpentArr[i].sum)
  }
  return [sortedCategories, sortedSum]
}