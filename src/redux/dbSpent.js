import { dateToString } from "../utils/calcDate";

export const dbSpent = {
  Taxi: {
    [dateToString(new Date(2023, 1, 5))]: [
      { sum: 100, payWith: 'Cash', date: new Date(2023, 1, 5) },
      { sum: 50, payWith: 'Card', date: new Date(2023, 1, 5) }
    ],
    [dateToString(new Date(2023, 0, 21))]: [
      { sum: 5, payWith: 'Cash', date: new Date(2023, 0, 21) },
      { sum: 45, payWith: 'Card', date: new Date(2023, 0, 21) }
    ],
    [dateToString(new Date(2023, 1, 10))]: [
      { sum: 10, payWith: 'CardX', date: new Date(2023, 2, 10) },
      { sum: 40, payWith: 'Cash', date: new Date(2023, 2, 10) }
    ],
    [dateToString(new Date(2023, 1, 3))]: [
      { sum: 10, payWith: 'Cash', date: new Date(2023, 2, 3) },
    ]
  },
  Food: {
    [dateToString(new Date(2023, 0, 5))]: [
      { sum: 90, payWith: 'Cash', date: new Date(2023, 0, 5) },
      { sum: 150, payWith: 'Card', date: new Date(2023, 0, 5) }
    ],
    [dateToString(new Date(2023, 1, 3))]: [
      { sum: 80, payWith: 'Cash', date: new Date(2023, 1, 3) },
      { sum: 100, payWith: 'CardX', date: new Date(2023, 1, 3) }
    ]
  },
  Cafe: {
    [dateToString(new Date(2023, 1, 13))]: [
      { sum: 30, payWith: 'Cash', date: new Date(2023, 1, 13) },
      { sum: 150, payWith: 'Card', date: new Date(2023, 1, 13) }
    ],
    [dateToString(new Date(2023, 1, 10))]: [
      { sum: 40, payWith: 'Cash', date: new Date(2023, 1, 10) },
      { sum: 60, payWith: 'CardX', date: new Date(2023, 1, 10) }
    ]
  },
  Rest: {
    [dateToString(new Date(2023, 1, 14))]: [
      { sum: 50, payWith: 'Cash', date: new Date(2023, 1, 14) },
      { sum: 150, payWith: 'Card', date: new Date(2023, 1, 14) }
    ],
    [dateToString(new Date(2023, 1, 9))]: [
      { sum: 50, payWith: 'Cash', date: new Date(2023, 1, 9) },
      { sum: 60, payWith: 'CardX', date: new Date(2023, 1, 9) }
    ]
  }
}