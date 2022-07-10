import React from "react";
import { Location, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "./AuthContext";

type LoginPageLocationState = {
  redirectAfter: Location;
};

type FixLocation<O extends object> = Omit<Location, "state"> & { state?: Partial<O> };

function useLocationWithState<O extends object = {}>(): FixLocation<O> {
  const location = useLocation();
  // TS Typ-Definition von Location enthält unknown,
  // es gibt leider keine Möglichkeit, den 'state'
  // mit einem TS-Typ zu beschreiben
  return location as any as FixLocation<O>;
}

// Als Alternative zu useLocationWithState kann eine Type Predicate Function
// gebaut werden:
// eslint-disable-next-line
function isLoginPageLocationState(state: unknown): state is LoginPageLocationState {
  return state !== null && typeof state === "object" && "redirectAfter" in state;
}

export default function LoginPage() {
  const [username, setUsername] = React.useState("");
  const navigate = useNavigate();

  const location = useLocationWithState<LoginPageLocationState>();
  const redirectAfter = location.state?.redirectAfter?.pathname || "/";

  // oder:
  // const { state } = useLocation();
  // const redirectAfter = isLoginPageLocationState(state) ? state.redirectAfter : "/"

  const authContext = useAuthContext();

  function handleLoginClick() {
    authContext.onLogin(username);
    navigate(redirectAfter, {
      state: {},
      replace: true
    });
  }

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
