import React from "react";
import { Location, useLocation } from "react-router-dom";

// eslint-disable-next-line
type LoginPageLocationState = {
  redirectAfter: Location;
};

type FixLocation<O extends object> = Omit<Location, "state"> & { state?: Partial<O> };

// eslint-disable-next-line
function useLocationWithState<O extends object = {}>(): FixLocation<O> {
  const location = useLocation();
  // TS Typ-Definition von Location enthält unknown,
  // es gibt leider keine Möglichkeit, den 'state'
  // mit einem TS-Typ zu beschreiben
  return location as unknown as FixLocation<O>;
}

export default function LoginPage() {
  const [username, setUsername] = React.useState("");

  // TODO Übung "Protected Pages"
  //  - Frag den AuthContext ab
  //  - Frag die navigate-Funktion ab (über useNavigate)
  //  - Frag die Location ab
  //    - Du kannst statt "useLocation" verwenden:
  //       const location = useLocationWithState<LoginPageLocationState>();
  //      (dann ist location mit state korrekt getypt)
  //  - Implementiere die handleLoginClick-Funktion:
  //      - verwende den AuthContext, um den eingegebenen Benutzer (username)
  //        "einzuloggen"
  //      - Führe danach ein Redirect durch auf 'redirectFrom' aus dem State
  //      - beim Redirect soll die aktuelle URL durch die neue ERSETZT werden

  function handleLoginClick() {}

  return (
    <div className="Container">
      <h1>Login</h1>

      <label>
        Username
        <input value={username} onChange={e => setUsername(e.currentTarget.value)} />
      </label>

      <button disabled={username.trim().length === 0} onClick={handleLoginClick}>
        Login
      </button>
    </div>
  );
}
