"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Please ignore this line:
exports.default = undefined;
function createPerson({ name, age = 18 }) {
    return { name, age };
}
const p = createPerson({ name: "Klaus" });
// worin unterscheidet sich der hergeleitete Typ von p von Person
