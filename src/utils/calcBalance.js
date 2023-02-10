export const calcBalance = (invoice) => {
  let sum = 0;
  for (let key in invoice) {
    sum += invoice[key]
  }
  return sum
}