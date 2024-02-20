import { memo, useCallback, useEffect, useMemo, useState } from "react";
import Container from "./Container";

export default function MemoApp() {
  const [name, setName] = useState("");
  const [plz, setPlz] = useState("123");
  const [city, setCity] = useState("");
  const onCancel = useCallback(function () {
    // setPlz(currentPlz => currentPlz + "!");

    setPlz(plz + "!");
    // ...
    // ...
    setPlz(currentPlz => currentPlz + "A");
  }, []);

  const citySearchConf = useMemo(
    function () {
      return { plz, city };
    },
    [plz, city]
  );

  return (
    <Container title="Root">
      <h1>Person</h1>

      <label>
        Name:
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </label>
      <NameDisplayMemo name={name} />

      <label>
        PLZ
        <input type="text" value={plz} onChange={e => setPlz(e.target.value)} />
      </label>

      <label>
        City
        <input type="text" value={city} onChange={e => setCity(e.target.value)} />
      </label>

      <CitySearchMemo conf={citySearchConf} onCancel={onCancel} />
    </Container>
  );
}

type NameDisplayProps = {
  name: string;
};

const NameDisplayMemo = memo(function NameDisplay({ name }: NameDisplayProps) {
  return <b>Name: {name}</b>;
});

type CitySearchConf = {
  city?: string;
  plz?: string;
};

type SearchProps = {
  conf: CitySearchConf;
  onCancel(): void;
};
const CitySearchMemo = memo(function CitySearch({ conf, onCancel }: SearchProps) {
  console.log("CitySearch - searchString", conf);

  const [result, setResult] = useState<string[]>([]);

  useEffect(() => {
    // console.log("useEffect - searchString", conf);
    // in einer richtigen Anwendung würde hier ein richtiger
    // API-Call ausgelöst...

    const searchResult = doSearch(conf.plz! + conf.city!);

    setResult(searchResult);
  }, [conf.plz, conf.city]);

  return (
    <Container title="Search Result">
      <ul>
        {result.map(r => (
          <li key={r}>{r}</li>
        ))}
      </ul>
      <button onClick={() => onCancel()}>Cancel</button>
    </Container>
  );
});

// "Simulation" eines echten Api Calls
function doSearch(searchString: string): string[] {
  return [
    "found-01-for-" + searchString,
    "found-02-for-" + searchString,
    "found-03-for-" + searchString
  ];
}
