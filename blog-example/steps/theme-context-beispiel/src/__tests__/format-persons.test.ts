import { formatPersons } from "../format-persons";

const persons = [
  { firstname: "Klaus", age: 32 },
  { firstname: "Susi", age: 37 }
];

test("format persons", () => {
  // Ruf formatPersons mit dem 'persons'-Array auf
  // - Übergib' als zweiten Parameter eine Callback-(Mock)-Funktion
  // - Stell sicher, dass die Callback-Funktion aufgerufen wurde
  //   - Sie sollte für jede Person einmal aufgerufen worden sein
  //   - Sie sollte jeweils einen der "firstname"-Properties übergeben bekommen haben
});
