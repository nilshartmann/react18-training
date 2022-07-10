import React, { createContext, useContext } from "react";

type IAuthContext = {
  username?: string | null;
  onLogin(newUser: string): void;
  onLogout(): void;
};

const AuthContext = createContext<IAuthContext>({
  onLogin() {},
  onLogout() {}
});

type AuthContextProviderProps = {
  children?: React.ReactElement;
};

export default function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [currentUser, setCurrentUser] = React.useState<string | null>(null);

  function handleLogin(newUser: string) {
    setCurrentUser(newUser);
  }

  function handleLogout() {
    setCurrentUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        username: currentUser,
        onLogin: handleLogin,
        onLogout: handleLogout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext(): IAuthContext {
  const value = useContext(AuthContext);

  return value;
}
