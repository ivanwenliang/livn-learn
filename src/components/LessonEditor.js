import React from "react";

const LessonEditor = ({ lesson }) => (
  <>
    <div className="lesson-editor-help">
      <p>You are editing this lesson. Changes are saved automatically.</p>
    </div>
    <textarea className="lesson-editor" value={lesson.name} />
  </>
);

export default LessonEditor;
