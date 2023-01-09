export const mapList = (list: string[]) => {
  let stringList = "";
  if (list.length == 1) stringList = `${list[0]}`;
  else {
    for (let i = 0; i < list.length - 1; i++)
      stringList = stringList + list[i] + ", ";
    stringList = stringList + "and " + list[list.length - 1];
  }
  return stringList;
};
