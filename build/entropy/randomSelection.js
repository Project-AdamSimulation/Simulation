"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomSelection = void 0;
const randomSelection = (iterable, n) => {
    let array = Array.from(iterable);
    // randomly generate n if not provided
    if (!n)
        n = Math.ceil(Math.random() * array.length);
    let result = [];
    for (let i = 0; i < n; i++) {
        let index = Math.floor(Math.random() * array.length);
        result.push(array[index]);
        array.splice(index, 1);
    }
    return result;
};
exports.randomSelection = randomSelection;
