export interface IDiff {
    index: number;
    oldValue: any;
    newValue: any;
    type: diffType;
}
declare type diffType = "E" | "A" | "D";
export default function compareArray(left: any[], right: any[], start?: number): IDiff[];
export {};
