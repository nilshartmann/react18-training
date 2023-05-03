import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// TODO: Implementiere den EditorSlice!

//  SCHRITT 1: Der EditorSlice:
//  - Der State soll aus zwei (string) Einträgen bestehen, die den Titel bzw. den Body enthalten
//  - Die Funktionalität des PostEditors soll durch Action(s) abgebildet werden.
//    - Definiere für deine Action TypeScript Typen
//    - Implementiere die reducer-Funktionen
//  - Wieviele und welche Actions und Reducer Du verwendest, kannst Du selbst entscheiden,
//     wichtig ist nur, dass der PostEditor hinterher weiterhin funktioniert :)
//
//  SCHRITT 2: Anpassen vom PostEditor
//  - Entferne im PostEditor.tsx den lokalen State (useState-Aufrufe)
//  - Ersetze den lokalen State durch useSelector-Aufrufe und dispatche
//    deine Actions, um den globalen State zu aktualisieren

type EditorSliceState = {
  currentTitle: string;
  currentBody: string;
};

const initialState: EditorSliceState = {
  currentTitle: "",
  currentBody: ""
};

type SetBodyAction = { body: string };

type SetTitleAction = { title: string };

const editorSlice = createSlice({
  initialState,
  name: "editor",
  reducers: {
    clear() {
      return initialState;
    },
    setTitle(state, action: PayloadAction<SetTitleAction>) {
      state.currentTitle = action.payload.title;
    },

    setBody(state, action: PayloadAction<SetBodyAction>) {
      state.currentBody = action.payload.body;
    }
  }
});

export default editorSlice.reducer;
export const { clear, setBody, setTitle } = editorSlice.actions;
