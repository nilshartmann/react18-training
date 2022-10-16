export default undefined;

// AUFGABEN 🤔:
//  Erzeuge einen Typen für das Objekt, das enterNewPersonForm zurückliefert
//    - Der Typ soll "NewPerson" heißen
//  Erzeuge einen Type ("Person"), der NewPerson um ein id Property erweitert
//    - Wenn Du "klaus" als "Person" deklarierst sollten keine Compile-Fehler auftreten

function enterNewPersonForm() {
  return {
    name: "Klaus",
    age: 32,
    hobby: "TypeScript"
  };
}

type NewPerson = ReturnType<typeof enterNewPersonForm>;

type Person = NewPerson & {
  id: string;
};

const klaus: Person = {
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

const address: Address = {
  email: "sam@example.de",
  phone: "123456",
  street: "Mainstreet",
  city: "London"
};

// Entferne aus dem Address-Typen die beiden Felder "phone" und "mail"

type AddressWithoutPhone = Omit<Address, "phone" | "email">;

const addressWithoutPhone: AddressWithoutPhone = {
  street: "Mainstreet",
  city: "London"
};

// https://www.typescriptlang.org/docs/handbook/utility-types.html

// https://www.typescriptlang.org/docs/handbook/utility-types.html
// https://www.typescriptlang.org/play?q=414#example/mapped-types
