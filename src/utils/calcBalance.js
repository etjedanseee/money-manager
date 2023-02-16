export const calcBalance = (invoice, filterInvoiceBy) => {
  let sum = 0;
  for (let key in invoice) {
    if (filterInvoiceBy === 'All invoice') {
      sum += invoice[key].balance
    } else if (key === filterInvoiceBy) {
      sum += invoice[key].balance
    }
  }
  return sum
}