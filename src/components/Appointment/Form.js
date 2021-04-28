import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(
    props.interviewer ? props.interviewer.id : null
  );
  const [error, setError] = useState("");

  // Function that clears the name, interview state
  const reset = () => {
    setName("");
    setInterviewer(null);
  };

  // Function appends reset to props.onCancel().
  // props.onCancel() calls the back function defined in useVisualMode, passed in through appointment/index.js

  const cancel = () => {
    if (props.onCancel) {
      props.onCancel();
      reset();
    }
  };

  // Function that checks if name input is valid
  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }

    setError("");
    if (props.onSave) {
      props.onSave(name, interviewer);
    }
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name={name}
            type="text"
            value={name}
            placeholder="Enter Student Name"
            onChange={(event) => {
              setName(event.target.value);
            }}
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          interviewer={interviewer}
          setInterviewer={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button
            confirm
            onClick={(event) => {
              validate();
            }}
          >
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
