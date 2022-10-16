export default undefined;

// AUFGABEN 🤔:
//  Erzeuge einen Typen für das Objekt, das enterNewPersonForm zurückliefert
//    - Der Typ soll "NewPerson" heißen
//  Erzeuge einen Type ("Person"), der NewPerson um ein id Property erweitert
//

function enterNewPersonForm() {
  return {
    name: "Klaus",
    age: 32,
    hobby: "TypeScript"
  };
}

// klaus sollte eine 'Person' sein
const klaus = {
  id: "1",
  name: "Klaus",
  age: 34,
  hobby: "TypeScript!"
};

// ----------------------------------------------------------------------

type Employee = {
  contact: {
    address: {
      phone: string;
      email: string;
      street: string;
      city: string;
    };
  };
};

// Extrahiere den Typen für Employee.contact.address und
//  setze ihn statt 'any'.
type Address = Employee["contact"]["address"];

// address soll dann Address sein und compilieren
const address: any = {
  email: "sam@example.de",
  phone: "123456",
  street: "Mainstreet",
  city: "London"
};

// Entferne aus dem Address-Typen die beiden Felder "phone" und "mail"

type AddressWithoutPhone = Omit<Address, "phone" | "email">;

// addressWithoutPhone soll dann AddressWithoutPhone sein und compilieren
const addressWithoutPhone: any = {
  street: "Mainstreet",
  city: "London"
};

// https://www.typescriptlang.org/docs/handbook/utility-types.html
