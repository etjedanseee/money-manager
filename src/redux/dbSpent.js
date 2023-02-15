import { dateToString } from "../utils/calcDate";

export const dbSpent = {
  Transport: {
    [dateToString(new Date(2023, 1, 5))]: [
      { sum: 100, payWith: 'Cash', id: 1 },
      { sum: 50, payWith: 'Card', id: 2 }
    ],
    [dateToString(new Date(2023, 0, 21))]: [
      { sum: 5, payWith: 'Cash', id: 3 },
      { sum: 45, payWith: 'Card', id: 4 }
    ],
    [dateToString(new Date(2023, 1, 10))]: [
      { sum: 10, payWith: 'CardX', id: 5 },
      { sum: 40, payWith: 'Cash', id: 6 }
    ],
    [dateToString(new Date(2023, 1, 3))]: [
      { sum: 10, payWith: 'Cash', id: 7 },
    ]
  },
  Food: {
    [dateToString(new Date(2023, 0, 5))]: [
      { sum: 90, payWith: 'Cash', id: 8 },
      { sum: 150, payWith: 'Card', id: 9 }
    ],
    [dateToString(new Date(2023, 1, 3))]: [
      { sum: 80, payWith: 'Cash', id: 10 },
      { sum: 100, payWith: 'CardX', id: 11 }
    ]
  },
  Cafe: {
    [dateToString(new Date(2023, 1, 13))]: [
      { sum: 30, payWith: 'Cash', id: 12 },
      { sum: 150, payWith: 'Card', id: 13 }
    ],
    [dateToString(new Date(2023, 1, 10))]: [
      { sum: 40, payWith: 'Cash', id: 14 },
      { sum: 60, payWith: 'CardX', id: 15 }
    ]
  },
  Rest: {
    [dateToString(new Date(2023, 1, 14))]: [
      { sum: 50, payWith: 'Cash', id: 16 },
      { sum: 150, payWith: 'Card', id: 19 }
    ],
    [dateToString(new Date(2023, 1, 9))]: [
      { sum: 50, payWith: 'Cash', id: 17 },
      { sum: 60, payWith: 'CardX', id: 18 }
    ]
  }
}