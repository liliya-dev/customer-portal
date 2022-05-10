/**
 * Typesafe pick function
 * use this to take an object and get a subset by passing keys as rest params:
 * pick({ a:1, b:2, c: 3}, 'a', 'b') -> { a: 1, b: 2}
 */

export function pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
  const ret: any = {};
  keys.forEach((key) => {
    ret[key] = obj[key];
  });
  return ret;
}
