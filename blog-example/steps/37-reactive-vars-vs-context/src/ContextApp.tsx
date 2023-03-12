import { createContext, ReactNode, useContext, useState } from "react";
import "./ContextApp.css";
import React from "react";
const enableChildrenInCounter = false;
const enableDataContext = false;

type CompWithChildrenProps = {
  children?: ReactNode;
};

type ContainerProps = CompWithChildrenProps & {
  title: string;
  color?: string;
};

const renderMap: Record<string, number> = {};

function Container({ children, title, color = "black" }: ContainerProps) {
  let renderCount = (renderMap[title] || 0) + 1;
  renderMap[title] = renderCount;

  console.log(`Render '${title}'`, renderCount);

  const style: React.CSSProperties = {
    padding: "0.5rem",
    margin: "0.5rem",
    border: `1px solid ${color}`
  };

  return (
    <div style={style}>
      <div>
        <b>{title}</b>
      </div>
      {children}
    </div>
  );
}

type ICounterContext = {
  value: number;
  increase(): void;
};

const CounterContext = createContext<ICounterContext>({
  value: 0,
  increase() {}
});

type CounterContextProviderProps = CompWithChildrenProps & {};

function CounterContextProvider({ children }: CompWithChildrenProps) {
  const [c, setC] = useState(0);

  const increase = () => setC(c => c + 1);
  return (
    <Container title="CounterContextProvider">
      <CounterContext.Provider
        value={{
          increase,
          value: c
        }}
      >
        {enableChildrenInCounter && (
          <Container title="CCProvider Children">
            <h1>Children</h1>
          </Container>
        )}
        {children}
      </CounterContext.Provider>
    </Container>
  );
}

function useCounterContext() {
  return useContext(CounterContext);
}

type IAuthContext = {
  toggleName(): void;
  name: string | null;
};
const AuthContext = createContext<IAuthContext>({
  toggleName() {},
  name: null
});

type AuthContextProviderProps = CompWithChildrenProps & {};
function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [name, setName] = useState("Klaus");

  const toggleName = () => {
    setName(n => (n === "Klaus" ? "Susi" : "Klaus"));
  };

  return (
    <Container title="AuthContextProvider">
      <AuthContext.Provider
        value={{
          toggleName,
          name
        }}
      >
        {enableDataContext ? (
          <DataContextProvider currentData={name}>{children}</DataContextProvider>
        ) : (
          children
        )}
      </AuthContext.Provider>
    </Container>
  );
}

function useAuthContext() {
  return useContext(AuthContext);
}

// --------------------------------------------------------------------------------------------

type IDataContext = {
  data: string;
};
const DataContext = createContext<IDataContext | null>(null);

type DataContextProviderProps = CompWithChildrenProps & {
  currentData: string;
};

function DataContextProvider({ children, currentData }: DataContextProviderProps) {
  const value: IDataContext = {
    data: currentData
  };

  return (
    <Container title="DataContextProvider">
      <DataContext.Provider value={value}>{children}</DataContext.Provider>
    </Container>
  );
}

function useDataContext() {
  const c = useContext(DataContext);
  if (!c) {
    throw new Error("Invalid usage of DataContext - no provider set?");
  }
  return c;
}

function Flex({ children }: CompWithChildrenProps) {
  return (
    <Container title="TwoColumns">
      <div className="Flex">{children}</div>
    </Container>
  );
}

function ContextApp() {
  const [appCount, setAppCount] = useState(0);

  return (
    <Container title="App">
      <div style={{ display: "flex" }}>
        local app counter: {appCount}
        <button onClick={() => setAppCount(appCount + 1)}>Increase</button>
      </div>
      <Flex>
        <CountReader />
        <CountSetter />
        <AuthDisplay />
        {enableDataContext && <DataDisplay />}
      </Flex>
    </Container>
  );
}

function CountReader() {
  const { value } = useCounterContext();
  return (
    <Container title="Counter Consumer">
      <h1>Counter</h1>
      <NumberDisplay label="Current Counter value" value={value} />
    </Container>
  );
}

type NumberDisplayProps = {
  label: string;
  value: number;
};
function NumberDisplay({ label, value }: NumberDisplayProps) {
  return (
    <Container title="NumberDisplay">
      <p>
        {label}: {value}
      </p>
    </Container>
  );
}

function CountSetter() {
  const { increase } = useCounterContext();
  return (
    <Container title="Counter Setter">
      <h1>Counter Setter</h1>
      <button onClick={increase}>Increase Counter</button>
    </Container>
  );
}

function AuthDisplay() {
  const authContext = useAuthContext();
  return (
    <Container title="AuthDisplay">
      <h1>Auth</h1>
      <p>Current name in auth context {authContext.name}</p>
      <button onClick={authContext.toggleName}>Change!</button>
    </Container>
  );
}

function DataDisplay() {
  const dataContext = useDataContext();
  return (
    <Container title="DataDisplay">
      <h1>Data</h1>
      <p>Current data in data context {dataContext.data}</p>
    </Container>
  );
}

function Root() {
  return (
    <Container title="Root">
      <AuthContextProvider>
        <CounterContextProvider>
          <ContextApp />
        </CounterContextProvider>
      </AuthContextProvider>
    </Container>
  );
}

export default Root;
