const filterObject = <T extends object = {}>(
  predict: <K extends keyof T>(pair: [K, T[K]], source: T) => boolean
) => (obj: T) => {
  return Object.entries(obj).reduce((last: Partial<T>, pair) => {
    const [k, v] = pair as [keyof T, T[keyof T]];
    if (predict([k, v], obj)) {
      return Object.assign(last, { [k]: v });
    }
    return last;
  }, {});
};

export default filterObject;
