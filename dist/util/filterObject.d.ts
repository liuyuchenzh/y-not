declare const filterObject: <T extends object = {}>(predict: <K extends keyof T>(pair: [K, T[K]], source: T) => boolean) => (obj: T) => Partial<T>;
export default filterObject;
