import React, { createContext, useCallback, useContext, useMemo } from "react";
import Container from "./Container";

// ------------------------
type IFormChangeContext = {
  onClearForm(): void;
  onFieldChange(fieldname: string, value: string): void;
};

const FormChangeContext = createContext<IFormChangeContext | null>(null);

function useFormChangeContext(): IFormChangeContext {
  const context = useContext(FormChangeContext);
  if (!context) {
    throw new Error(
      "Invalid usage of FormChangeContext. Please make sure, you have Form component set."
    );
  }

  return context;
}

type IFormContext = {
  formState: Record<string, string>;
};

const FormContext = React.createContext<IFormContext | null>(null);

function useFormContext(): IFormContext {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("Invalid usage of FormContext. Please make sure, you have Form component set.");
  }

  return context;
}

type FormProps = {
  children: React.ReactNode;
};

function Form({ children }: FormProps) {
  const [formState, setFormState] = React.useState<Record<string, string>>({});

  const onClearForm = useCallback(function onClearForm() {
    setFormState({});
  }, []);

  const onFieldChange = useCallback(function onFieldChange(fieldname: string, value: string) {
    setFormState(oldState => ({
      ...oldState,
      [fieldname]: value
    }));
  }, []);

  const changeContext = useMemo(
    () => (
      <FormChangeContext.Provider value={{ onClearForm, onFieldChange }}>
        {children}
      </FormChangeContext.Provider>
    ),
    [onClearForm, onFieldChange, children]
  );

  return (
    <Container title="Form">
      <FormContext.Provider
        value={{
          formState
        }}
      >
        {changeContext}
      </FormContext.Provider>
    </Container>
  );
}

type InputProps = {
  name: string;
};

function Input({ name }: InputProps) {
  const { formState } = useFormContext();
  const { onFieldChange } = useFormChangeContext();
  return (
    <Container title={`input_${name}`}>
      <label>
        {name}
        <input
          type="text"
          value={formState[name] || ""}
          onChange={e => onFieldChange(name, e.target.value)}
        />
      </label>
    </Container>
  );
}

function ClearButton() {
  const { onClearForm } = useFormChangeContext();

  return (
    <Container title={`clear`}>
      <button onClick={onClearForm}>Clear form</button>{" "}
    </Container>
  );
}

type FieldSetProps = {
  children: React.ReactNode;
};

function FieldSet({ children }: FieldSetProps) {
  return <Container title="Fieldset">{children}</Container>;
}

export default function PersonForm() {
  return (
    <div style={{ border: "1px solid grey", padding: "0.5rem" }}>
      <Form>
        <FieldSet>
          <Input name="firstname" />
          <Input name="lastname" />
        </FieldSet>
        <ClearButton />
      </Form>
    </div>
  );
}
