export const calcBalance = (invoice, filterInvoiceBy) => {
  let sum = 0;
  for (let key in invoice) {
    if (filterInvoiceBy === 'All invoice') {
      sum += invoice[key].sum
    } else if (key === filterInvoiceBy) {
      sum += invoice[key].sum
    }
  }
  return sum
}