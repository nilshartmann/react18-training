import React from "react";

/**
 * Die Daten und Funktionen, die über den AuthContext der Anwendung
 * zur Verfügung gestellt werden sollen
 */
type IAuthContext = {
  username?: string | null;
  onLogin(newUser: string): void;
  onLogout(): void;
};

const defaultContext: IAuthContext = {
  username: null,
  onLogin() {},
  onLogout() {}
};

// TODO:
//  - Erzeuge mit 'createContext' einen neuen Context
//    - Der Context-Wert soll vom Typ 'IAuthContext' sein
//    - Als Default-Context kannst Du 'defaultContext' übergeben

type AuthContextProviderProps = {
  children?: React.ReactElement;
};

export default function AuthContextProvider({ children }: AuthContextProviderProps) {
  // TODO:
  //   - Erzeuge einen State, der den Namen des aktuellen Benutzers (oder null) enthält
  //      (z.B. 'currentUser')
  const [currentUser, setCurrentUser] = React.useState<string | null>(null);

  // - Erzeuge ein Context-Objekt, mit den Werten, die in IAuthContext beschrieben sind
  //    - Den username nimmst Du aus deinem State
  //    - die beiden Funktionen 'onLogin' und 'onLogout' müssen deinen State
  //      aktualisieren
  //    - Ersetze das 'div' durch die AuthContext.Provider-Komponente
  //       - übergib dein Context-Objekt als 'value'
  //       - übergib die 'children' unverändert ({children})

  return <div>{children}</div>;
}

export function useAuthContext(): IAuthContext {
  // TODO: Implementiere den Hook
  //   - Lies den AuthContext-Hook
  //   - gib statt 'null' dessen Wert zurück
  //     (entferne den @ts-ignore-Kommentar, es sollten dann
  //     keine Compile-Fehler auftauchen)

  // @ts-ignore
  return null;
}
