import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type EditorSliceState = {
  currentTitle: string;
  currentBody: string;
};

const initialState: EditorSliceState = {
  currentTitle: "",
  currentBody: ""
};

type UpdateTitleAction = {
  newTitle: string;
};

type UpdateBodyAction = {
  newBody: string;
};

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    updateTitle(state, action: PayloadAction<UpdateTitleAction>) {
      state.currentTitle = action.payload.newTitle;
    },
    updateBody(state, action: PayloadAction<UpdateBodyAction>) {
      state.currentBody = action.payload.newBody;
    },
    clear() {
      return initialState;
    }
  }
});

export default editorSlice.reducer;
export const { clear, updateBody, updateTitle } = editorSlice.actions;
