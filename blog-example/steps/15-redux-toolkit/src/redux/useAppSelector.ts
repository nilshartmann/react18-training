import { useSelector } from "react-redux";
import { AppState } from "./store";

export function useAppSelector<Result>(fn: (state: AppState) => Result) {
  return useSelector(fn);
}
