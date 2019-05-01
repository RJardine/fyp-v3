import { SET_ALERT, REMOVE_ALERT } from "../types";

const initalState = [];
export default function(state = initalState, action) {
  const { type, payload } = action;
  switch (action.type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
}
