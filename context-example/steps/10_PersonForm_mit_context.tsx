import React, { useContext } from "react";
import Container from "./Container";

type IFormContext = {
  formState: Record<string, string>;
  onClearForm(): void;
  onFieldChange(fieldname: string, value: string): void;
};

const FormContext = React.createContext<IFormContext>({
  formState: {},
  onClearForm() {},
  onFieldChange() {}
});

function useFormContext() {
  return useContext(FormContext);
}

type FormProps = {
  children: React.ReactNode;
};

function Form({ children }: FormProps) {
  const [formState, setFormState] = React.useState<Record<string, string>>({});

  function onClearForm() {
    setFormState({});
  }

  function onFieldChange(fieldname: string, value: string) {
    setFormState({
      ...formState,
      [fieldname]: value
    });
  }

  return (
    <Container title="Form">
      <FormContext.Provider
        value={{
          formState,
          onClearForm,
          onFieldChange
        }}
      >
        {children}
      </FormContext.Provider>
    </Container>
  );
}

type InputProps = {
  name: string;
};

function Input({ name }: InputProps) {
  const { formState, onFieldChange } = useFormContext();
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
  const { onClearForm } = useFormContext();

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
    <Container title="PersonForm">
      <Form>
        <FieldSet>
          <Input name="firstname" />
          <Input name="lastname" />
        </FieldSet>
        <ClearButton />
      </Form>
    </Container>
  );
}
