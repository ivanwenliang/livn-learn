import produce from "immer";
import {
  ADD_LESSON_BEGIN,
  ADD_LESSON_SUCCESS,
  ADD_LESSON_ERROR,
  LOAD_LESSONS_BEGIN,
  LOAD_LESSONS_SUCCESS,
  LOAD_LESSONS_ERROR,
  SAVE_LESSON_BEGIN,
  SAVE_LESSON_SUCCESS,
  SAVE_LESSON_ERROR,
  RESET_LESSON_ERROR
} from "../actions";

const initialState = {
  lessons: {},
  lessonSaveInProgress: false,
  lessonSaveError: null
};

const reducer = produce((draft, action) => {
  switch (action.type) {
    case LOAD_LESSONS_BEGIN:
      draft.loading = true;
      draft.error = null;
      return;
    case LOAD_LESSONS_SUCCESS:
      draft.loading = false;
      action.payload.forEach(lesson => {
        draft.lessons[lesson.id] = lesson;
      });
      return;
    case LOAD_LESSONS_ERROR:
      draft.loading = false;
      draft.error = action.error;
      return;
    case ADD_LESSON_BEGIN:
      draft.lessonSaveInProgress = true;
      draft.lessonSaveError = null;
      return;
    case ADD_LESSON_SUCCESS:
      draft.lessonSaveInProgress = false;
      draft.lessons[action.payload.id] = action.payload;
      return;
    case ADD_LESSON_ERROR:
      draft.lessonSaveInProgress = false;
      draft.lessonSaveError = action.error;
      return;
    case SAVE_LESSON_BEGIN:
      draft.lessonSaveInProgress = true;
      draft.lessonSaveError = null;
      return;
    case SAVE_LESSON_SUCCESS:
      draft.lessonSaveInProgress = false;
      draft.lessons[action.payload.id] = action.payload;
      return;
    case SAVE_LESSON_ERROR:
      draft.lessonSaveInProgress = false;
      draft.lessonSaveError = action.error;
      return;
    case RESET_LESSON_ERROR:
      draft.error = null;
      return;
    default:
      return;
  }
}, initialState);

export default reducer;
