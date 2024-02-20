import { useContext, useState } from "react";
import Container from "./Container";
import TwoColumns from "./TwoColumns";
import { CounterContext, CounterProvider, useCounter } from "./CounterContext";

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
      <NumberDisplay />
      <CounterButton />
    </Container>
  );
}

function CounterButton() {
  const { onIncreaseCounter } = useCounter();
  return (
    <Container title="Button">
      <button onClick={() => onIncreaseCounter()}>Increase!</button>
    </Container>
  );
}

type NumberDisplayProps = {
  label: string;
  value: number;
};
function NumberDisplay() {
  const counter = useCounter();
  return (
    <Container title="NumberDisplay">
      <p>Current Value: {counter.currentCounter}</p>
    </Container>
  );
}

export default function App() {
  return (
    <Container title="Root">
      <CounterProvider>
        <Main />
      </CounterProvider>
    </Container>
  );
}
