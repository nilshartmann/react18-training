import { ReactNode, useState } from "react";
import "./ContextApp.css";
import React from "react";
import Container from "./Container";
import CounterContextProvider, { useCounterContext } from "./CounterContext";

function Flex({ children }: { children?: ReactNode }) {
  return (
    <Container title="TwoColumns">
      <div className="Flex">{children}</div>
    </Container>
  );
}

function Main() {
  // was wird neu gerendert wenn sich der lokale Zustand ändert?
  const [appCount, setAppCount] = useState(0);

  return (
    <Container title="Main">
      <div style={{ display: "flex" }}>
        local app counter: {appCount}
        <button onClick={() => setAppCount(appCount + 1)}>Increase</button>
      </div>
      <Flex>
        <CountReader />
        <CountSetter />
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

function CountSetter() {
  const { increase } = useCounterContext();
  return (
    <Container title="Counter Setter">
      <h1>Counter Setter</h1>
      <button onClick={increase}>Increase Counter</button>
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

export default function App() {
  return (
    <Container title="Root">
      <CounterContextProvider>
        <Main />
      </CounterContextProvider>
    </Container>
  );
}
