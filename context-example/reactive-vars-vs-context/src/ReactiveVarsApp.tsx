import { makeVar, useReactiveVar } from "@apollo/client";
import React, { ReactNode, useState } from "react";

function Flex({ children }: CompWithChildrenProps) {
  return (
    <Container title="TwoColumns">
      <div className="Flex">{children}</div>
    </Container>
  );
}

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

  console.log(`Render Reactive Vars '${title}'`, renderCount);

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

const CounterVar = makeVar(0);

function useCounterVar() {
  return useReactiveVar(CounterVar);
}

function increaseCounter() {
  const current = CounterVar();
  CounterVar(current + 1);
}

const AuthVar = makeVar({
  name: "Klaus",
  email: "info@info.de"
});

function useAuthVar() {
  return useReactiveVar(AuthVar);
}

function toggleAuthName() {
  const current = AuthVar();
  if (current.name === "Klaus") {
    AuthVar({ ...current, name: "Susi" });
  } else {
    AuthVar({ ...current, name: "Klaus" });
  }
}

function toggleAuthEmail() {
  const current = AuthVar();
  const newEmail = current.email === "info@info.de" ? "help@help.de" : "info@info.de";
  AuthVar({ ...current, email: newEmail });
}

function ReactiveVarsApp() {
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
        <AuthNameDisplay />
        <AuthEmailDisplay />
      </Flex>
    </Container>
  );
}

function CountReader() {
  const value = useCounterVar();
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
  return (
    <Container title="Counter Setter">
      <h1>Counter Setter</h1>
      <button onClick={increaseCounter}>Increase Counter</button>
    </Container>
  );
}

function AuthNameDisplay() {
  const authContext = useAuthVar();
  return (
    <Container title="Auth Display">
      <h1>Auth</h1>
      <p>Current name in auth context {authContext.name}</p>
      <button onClick={toggleAuthName}>Change!</button>
    </Container>
  );
}

function AuthEmailDisplay() {
  const { email } = useAuthVar();
  return (
    <Container title="Auth Email">
      <h1>Auth</h1>
      <p>Current email in auth context {email}</p>
      <button onClick={toggleAuthEmail}>Change!</button>
    </Container>
  );
}

export default ReactiveVarsApp;
