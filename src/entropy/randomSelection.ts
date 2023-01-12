export const randomSelection = <T>(iterable: Iterable<T>, n?: number) => {
  let array = Array.from(iterable);

  // randomly generate n if not provided
  if (!n) n = Math.ceil(Math.random() * array.length);

  let result: T[] = [];
  for (let i = 0; i < n; i++) {
    let index = Math.floor(Math.random() * array.length);
    result.push(array[index]);
    array.splice(index, 1);
  }
  return result;
};
