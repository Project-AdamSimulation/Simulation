export const delay = (interval: number) => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(resolve, interval);
    } catch (e) {
      reject(e);
    }
  });
};
