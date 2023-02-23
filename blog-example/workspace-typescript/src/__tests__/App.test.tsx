import { enableFetchMocks } from "jest-fetch-mock";
import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

const mockPosts = [
  { id: "1", title: "One Fetch Mock", body: "Lorem ipsum" },
  { id: "2", title: "Second Post Fetch Mock", body: "Some more content" }
];

afterEach(() => {
  jest.restoreAllMocks();
});

it("should work from beginning to end", () => {
  enableFetchMocks();

  // Beim Durchlauf durch die Anwendung werden insgesamt zwei fetch-Requests durchgeführt.
  //
  // 1. (initial) GET Request, der die Liste der Blogposts zurückliefert
  //    dafür kannst 'mockPosts' von oben verwenden
  // 2. ein POST-Request, der ein gespeichertes Blogpost-Objekt zurückliefert
  //
  // Nach dem initialen Rendern und dem Speichern des Blogposts musst Du darauf
  // achten, dass React-seitig asynchroner Code ausgeführt wird 😱
  //  Dein Test muss also warten, bis der async Code ausgeführt und die erwarteten
  //  Elemente gerendert wurden.
  //
  // Tipps:
  //  - Starte parallel die App (npm start)
  //  - Dann kannst Du in der App nachvollziehen, was in den einzelnen Schritten passiert
  //    bzw. was Du dort testen kannst.
  //     - Im Netzwerk-Tab kannst Du auch nachschauen, welche Ergebnisse der "echte" Server
  //       liefert, und wie deine Mock-Ergebnisse aussehen müssten
  //  - Du kannst mit "screen.logTestingPlaygroundURL();" jederzeit eine URL für den Playground
  //    ausgeben, um zu sehen, was gerendert wurde, und welche Queries dann jeweils funktionieren
  //    würden
  //  - Warnung von "act" ignorieren
  //  - Beim Mocken von fetch immer daran denken:
  //     - Code bleibt auch bei gemockten Aufrufen asynchron!
  //     - Das body-Feld im body ist immer ein String bzw. muss immer als String angegben werden!
  //       (JSON.stringify verwenden)
  //  - Wenn dein Test funktioniert, bitte einmal das Backend beenden (Ctrl+C) und den Test
  //    noch einmal ausführen, um sicherzustellen, dass der Test nicht doch versehentlich das
  //    "echte" Backend verwendet 😉

  render(<App />);

  // Vorschläge zum Testen:
  //  - Die Posts wurden geladen und auf der Seite müsste sich Elemente mit der Rolle 'heading' befinden,
  //    die jeweils einen der Blog-Titel aus den Mock-Daten enthalten
  //  - Davor müsste eine Element mit der Rolle 'alert' gefunden werden (das ist der LoadingIndicator).
  //  - Klicken auf den Add Post Button
  //  - Nun müsste der PostEditor sichtbar sein
  //    - Mit der Funktion 'getPostEditorModel' (s.u.) kannst Du dir Hilfsfunktionen zurückgeben lassen,
  //      um den PostEditor "fernzusteuern"
  //  - Fülle die Eingabefelder im PostEditor aus
  //  - Klick auf Save
  //    - Achtung! Vorher zweiten fetch-Mock konfigurieren, der das "gespeicherte"  Post vom "Server"
  //      zurückliefert
  //  - Du könntest nun prüfen (Du musst davon nicht alles machen:)
  //  - Es müssten ZWEI fetch Calls durchgeführt werden
  //  - Der ZWEITE Fetch-Call müsste das zu speichernde Blog-Post-Objekt als Body haben (als String!)
  //  - Nun müsste wieder die PostList sichtbar sein
  //  Du könntest prüfen, ob der gespeicherte Post sichtbar ist (z.B. mit 'heading' und dem Titel deines neuen
  //    Blog posts)
});

function getPostEditorModel() {
  return {
    expectPostEditorVisible() {
      expect(screen.getByRole("heading", { name: /create post/i })).toBeInTheDocument();
    },

    saveButton: screen.getByRole("button", { name: "Save Post" }),
    titleInput: screen.getByLabelText("Title"),
    bodyInput: screen.getByLabelText("Body"),

    fillTitle(newTitle: string) {
      userEvent.type(this.titleInput, newTitle);
    },
    fillBody(newBody: string) {
      userEvent.type(this.bodyInput, newBody);
    },
    clickSave() {
      // Still gives warning on the console
      // known bug that re-appears with each new release of react
      //  https://github.com/testing-library/react-testing-library/issues/1051
      act(() => userEvent.click(this.saveButton));
    }
  };
}
