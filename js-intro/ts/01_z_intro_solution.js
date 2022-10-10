"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Please ignore this line:
exports.default = undefined;
// Migriere diese Datei auf TypeScript:
// Füge in newPerson die Typ-Angaben hinzu (siehe JS Doc)
// Repariere die weiteren Fehler, die in dieser Datei enthalten sind
//
/**
 * @param {string} name  The name
 * @param {number} age The age
 * @param {string|undefined} [hobby] The person's hobby
 */
function newPerson(name, age, hobby) {
    const p = {
        name,
        age,
        hobby,
        spendTimeWithHobby: hobby ? () => "...doing something..." : null
    };
    return p;
}
function getAdultAge() {
    return 18;
}
const hans = newPerson("Hans", 34);
console.log(hans.age);
const susi = newPerson("Susi", 18);
const klaus = newPerson("Klaus", 17);
klaus.age = getAdultAge();
if (klaus.hobby) {
    klaus.hobby.toLowerCase();
}
if (klaus.spendTimeWithHobby) {
    klaus.spendTimeWithHobby();
}
