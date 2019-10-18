import produce from "immer";
import {
  ADD_COURSE_BEGIN,
  ADD_COURSE_SUCCESS,
  ADD_COURSE_ERROR
} from "./actions";

const initialState = {
  isLoading: null,
  error: null,
  courses: []
};

const reducer = produce((draft, action) => {
  switch (action.type) {
    case ADD_COURSE_BEGIN:
      draft.isLoading = true;
      return;
    case ADD_COURSE_SUCCESS:
      draft.isLoading = false;
      draft.courses.push(action.payload);
      return;
    case ADD_COURSE_ERROR:
      draft.isLoading = false;
      draft.error = action.error;
      return;
    default:
      return;
  }
}, initialState);

export default reducer;
