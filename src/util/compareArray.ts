export interface IDiff {
  index: number;
  oldValue: any;
  newValue: any;
  type: diffType;
}

// edit/add/delete
type diffType = "E" | "A" | "D";

// no more function
function filterOutFn(input: object): object {
  return Object.entries(input).reduce((last, [key, value]) => {
    if (typeof value === "function") {
      return last;
    }
    return {
      ...last,
      [key]: value
    };
  }, {});
}

// sort object
// ! for edge cases
function sort(input: { [index: string]: any }): {} {
  return Object.keys(input)
    .sort()
    .reduce((last, key) => {
      return {
        ...last,
        [key]: input[key]
      };
    }, {});
}

// is object
function isObj(input: any): boolean {
  return Object.prototype.toString.call(input) === "[object Object]";
}

// safe stringify
function stringify(input: any): string {
  if (isObj(input)) {
    return JSON.stringify(sort(filterOutFn(input)));
  }
  return JSON.stringify(input);
}

// find same element
function findSame(left: any[], right: any[]): Array<[number, number]> {
  return left.reduce((last: number[], item, i) => {
    const itemStr = stringify(item);
    const index: number = right.findIndex(
      rightItem => stringify(rightItem) === itemStr
    );
    if (index > -1) {
      return [...last, [i, index]];
    }
  }, []) as Array<[number, number]>;
}

// simple diff for array
export default function compareArray(
  left: any[],
  right: any[],
  start: number = 0
): IDiff[] {
  const leftLen: number = left.length;
  const rightLen: number = right.length;
  if (leftLen === rightLen) {
    return left.reduce((last: IDiff[], item, i) => {
      const rightItem: any = right[i];
      if (typeof item === "function" && typeof rightItem === "function") {
        return last;
      }
      const leftStr: string = stringify(item);
      const rightStr: string = stringify(rightItem);
      if (leftStr !== rightStr) {
        return [
          ...last,
          {
            index: i + start,
            oldValue: item,
            newValue: rightItem,
            type: "E"
          }
        ];
      }
      return last;
    }, []);
  } else if (leftLen > rightLen) {
    // delete
    if (rightLen === 0) {
      return left.map((item, i) => {
        return {
          index: i + start,
          oldValue: item,
          newValue: undefined,
          type: "D"
        };
      }) as IDiff[];
    } else {
      const samePair: Array<[number, number]> = findSame(left, right);
      // just delete?
      const isJustDel: boolean = samePair.length === rightLen;
      // update + delete
      if (!isJustDel) {
        return compareArray(left.slice(0, rightLen), right).concat(
          compareArray(left.slice(rightLen), [], rightLen)
        );
      }
      return left.reduce((last, item, i) => {
        const hasSame: boolean = samePair.some(
          ([leftIndex]) => leftIndex === i
        );
        if (hasSame) {
          return last;
        }
        return {
          index: i + start,
          oldValue: item,
          newValue: undefined,
          type: "D"
        };
      }, []);
    }
  } else {
    // add
    if (leftLen === 0) {
      return right.map((item, i) => {
        return {
          index: i + start,
          oldValue: undefined,
          newValue: item,
          type: "A"
        };
      }) as IDiff[];
    } else {
      const samePair: Array<[number, number]> = findSame(left, right);
      // just add?
      const isJustAdd: boolean = samePair.length === leftLen;
      if (!isJustAdd) {
        return compareArray(left, right.slice(0, leftLen)).concat(
          compareArray([], right.slice(leftLen), leftLen)
        );
      }
      return right.reduce((last, item, i) => {
        const hasSame: boolean = samePair.some(
          ([_, rightIndex]) => rightIndex === i
        );
        if (hasSame) {
          return last;
        }
        return [
          ...last,
          {
            index: i + start,
            oldValue: undefined,
            newValue: item,
            type: "A"
          }
        ];
      }, []) as IDiff[];
    }
  }
}
