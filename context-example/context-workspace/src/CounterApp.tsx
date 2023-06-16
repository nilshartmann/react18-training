import { useState } from "react";
import React from "react";
import Container from "./Container";
import TwoColumns from "./TwoColumns";
import CounterProvider, {
  CounterContext,
  useCounter,
  useCounterSetterContext
} from "./CounterContext";

function Main() {
  // was wird neu gerendert wenn sich der lokale Zustand ändert?
  const [appCount, setAppCount] = useState(0);

  return (
    <Container title="Main">
      <div className="Flex">
        local app counter: {appCount}
        <button onClick={() => setAppCount(appCount + 1)}>Increase</button>
      </div>
      <TwoColumns>
        <CounterDisplay />
      </TwoColumns>
    </Container>
  );
}

function CounterDisplay() {
  return (
    <Container title="Counter Display">
      <h1>Counter</h1>
      <NumberDisplay label="Current Counter value" />
      <IncreaseButton />
    </Container>
  );
}

function IncreaseButton() {
  const { increase } = useCounterSetterContext();
  return (
    <Container title="IncreaseButton">
      <button onClick={increase}>Increase!</button>
    </Container>
  );
}

type NumberDisplayProps = {
  label: string;
};
function NumberDisplay({ label }: NumberDisplayProps) {
  const { value } = useCounter();
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
    <CounterProvider>
      <Container title="Root">
        <Main />
      </Container>
    </CounterProvider>
  );
}
