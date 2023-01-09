"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapList = void 0;
const mapList = (list) => {
    let stringList = "";
    if (list.length == 1)
        stringList = `${list[0]}`;
    else {
        for (let i = 0; i < list.length - 1; i++)
            stringList = stringList + list[i] + ", ";
        stringList = stringList + "and " + list[list.length - 1];
    }
    return stringList;
};
exports.mapList = mapList;
