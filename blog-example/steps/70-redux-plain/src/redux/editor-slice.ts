type EditorSliceState = {
  currentTitle: string;
  currentBody: string;
};

const initialState: EditorSliceState = {
  currentTitle: "",
  currentBody: ""
};

export function clear() {
  return {
    type: "editor/clear"
  } as const;
}

type ClearAction = ReturnType<typeof clear>;

export function setBody(body: string) {
  return {
    type: "editor/setBody",
    body
  } as const;
}

type SetBodyAction = ReturnType<typeof setBody>;

export function setTitle(title: string) {
  return {
    type: "editor/setTitle",
    title
  } as const;
}

type SetTitleAction = ReturnType<typeof setTitle>;

type EditorAction = ClearAction | SetTitleAction | SetBodyAction;

export default function editorReducer(
  state: EditorSliceState = initialState,
  action: EditorAction
): EditorSliceState {
  switch (action.type) {
    case "editor/clear":
      return initialState;
    case "editor/setBody":
      return { ...state, currentBody: action.body };
    case "editor/setTitle":
      return { ...state, currentTitle: action.title };
    default:
      return state;
  }
}
