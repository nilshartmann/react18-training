import { PayloadAction, createSlice } from "@reduxjs/toolkit";

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
