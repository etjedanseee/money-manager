import { dateToString } from "../utils/calcDate";

export const dbSpent = {
  [dateToString(new Date(2023, 1, 5))]: [
    { sum: 100, payWith: 'Cash', id: 1, category: 'Transport' },
    { sum: 50, payWith: 'Card', id: 2, category: 'Transport' }
  ],
  [dateToString(new Date(2023, 0, 21))]: [
    { sum: 5, payWith: 'Cash', id: 3, category: 'Transport' },
    { sum: 45, payWith: 'Card', id: 4, category: 'Transport' }
  ],
  [dateToString(new Date(2023, 1, 10))]: [
    { sum: 10, payWith: 'CardX', id: 5, category: 'Transport' },
    { sum: 40, payWith: 'Cash', id: 6, category: 'Transport' }
  ],
  [dateToString(new Date(2023, 1, 3))]: [
    { sum: 10, payWith: 'Cash', id: 7, category: 'Transport' },
  ],
  [dateToString(new Date(2023, 0, 5))]: [
    { sum: 90, payWith: 'Cash', id: 8, category: 'Food' },
    { sum: 150, payWith: 'Card', id: 9, category: 'Food' }
  ],
  [dateToString(new Date(2023, 1, 3))]: [
    { sum: 80, payWith: 'Cash', id: 10, category: 'Food' },
    { sum: 100, payWith: 'CardX', id: 11, category: 'Food' }
  ],
  [dateToString(new Date(2023, 1, 13))]: [
    { sum: 30, payWith: 'Cash', id: 12, category: 'Cafe' },
    { sum: 150, payWith: 'Card', id: 13, category: 'Cafe' }
  ],
  [dateToString(new Date(2023, 1, 10))]: [
    { sum: 40, payWith: 'Cash', id: 14, category: 'Cafe' },
    { sum: 60, payWith: 'CardX', id: 15, category: 'Cafe' }
  ],
  [dateToString(new Date(2023, 1, 14))]: [
    { sum: 50, payWith: 'Cash', id: 16, category: 'Rest' },
    { sum: 150, payWith: 'Card', id: 19, category: 'Rest' }
  ],
  [dateToString(new Date(2023, 1, 9))]: [
    { sum: 50, payWith: 'Cash', id: 17, category: 'Rest' },
    { sum: 60, payWith: 'CardX', id: 18, category: 'Rest' }
  ]
}