import React, { ReactNode, useContext, useState, createContext } from "react";
import Container from "./Container";

// todo

type ICounterContext = {
  value: number;
};

type ICounterSetterContext = {
  increase(): void;
};

export const CounterContext = React.createContext<ICounterContext | undefined>(undefined);
const CounterSetterContext = createContext<ICounterSetterContext | null>(null);

// CounterContext.Provider

type CounterProviderProps = {
  children: React.ReactNode;
};

export default function CounterProvider({ children }: CounterProviderProps) {
  const [count, setCount] = React.useState(0);

  // const config = React.useMemo(() => {
  //   return { increaseValue: increaseValue };
  // }, [increaseValue]);

  const stableIncrease = React.useCallback(() => {
    setCount(currentValue => currentValue + 1);
  }, []);

  // const contextValue: ICounterContext = React.useMemo(() => {
  //   return {
  //     value: count
  //   };
  // }, []);

  const contextValue: ICounterContext = {
    value: count
  };

  return (
    <CounterContext.Provider value={contextValue}>
      <CounterSetter increase={stableIncrease}>{children}</CounterSetter>
    </CounterContext.Provider>
  );
}

type CounterSetterProps = {
  children: React.ReactNode;
  increase(): void;
};
const CounterSetter = React.memo(
  function CounterSetter({ children, increase }: CounterSetterProps) {
    return (
      <CounterSetterContext.Provider value={{ increase }}>{children}</CounterSetterContext.Provider>
    );
  }
  //  ,(oldProps, newProps) => oldProps.title === newProps.title
);

// state
// children
// React.memo/useCallback/useMemo

export function useCounter() {
  const value = React.useContext(CounterContext);
  if (value === undefined) {
    throw new Error(
      "Context nicht korrekt initialisiert. Ist die CounterProvider-Komponente eingebunden?"
    );
  }

  return value;
}

export function useCounterSetterContext(): ICounterSetterContext {
  const ctx = useContext(CounterSetterContext);
  if (ctx == null) {
    throw new Error(
      "Invalid usage of CounterSetterContext. Please make sure, you have CounterSetterContextProvider enabled."
    );
  }

  return ctx;
}
