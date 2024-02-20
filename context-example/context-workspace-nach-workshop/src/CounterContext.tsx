// todo

import React, { useContext, useState } from "react";

type ICounterContext = {
  currentCounter: number;
  onIncreaseCounter(): void;
};

const CounterContext = React.createContext<ICounterContext | null>(null);

// CounterContext.Provider
// (CounterContext.Consumer)
//    useContext React 18
//    use React 19

type CounterProviderProps = {
  children: React.ReactNode;
};
export function CounterProvider({ children }: CounterProviderProps) {
  const [counter, setCounter] = useState(0);

  const currentContextValue: ICounterContext = {
    currentCounter: counter,
    onIncreaseCounter() {
      setCounter(counter + 1);
    }
  };

  return <CounterContext.Provider value={currentContextValue}>{children}</CounterContext.Provider>;
}

export function useCounter() {
  // Context verwenden
  const counterContext = useContext(CounterContext);

  if (!counterContext) {
    throw new Error("Kein CounterContext vorhanden!");
  }

  return counterContext;
}
