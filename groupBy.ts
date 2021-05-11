export enum Gender {
  Male,
  Female,
}

type Entire =
  | string
  | number
  | {
  g:
    | 'toString'
    | 'toFixed'
    | 'toExponential'
    | 'toPrecision'
    | 'valueOf'
    | 'toLocaleString';
  n: string;
};

export function groupBy(
  array: Array<number | string | { g: keyof Gender; n: string }>,
  callback: {
    (p: number): number;
    (p: Entire): number | string;
  }
) {
  return array.reduce((acc: { [key in string]: Entire[] }, element) => {
    const cell = callback(element);
    acc[cell] = !acc[cell] ? [element] : [...acc[cell], element];
    return acc;
  }, {});
}

console.log(groupBy([1.2, 1.1, 2.3, 0.4], Math.floor));
console.log(groupBy(['one', 'two', 'three'], el => el.length));
console.log(
  groupBy(
    [
      { g: Gender.Male, n: 'A' },
      { g: Gender.Female, n: 'B' },
      { g: Gender.Female, n: 'C' },
    ],
    el => el.g
  )
);
