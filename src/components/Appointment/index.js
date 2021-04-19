import React, { Fragment } from 'react';

import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import useVisualMode from "../../hooks/useVisualMode";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";

export default function Appointment(props) {


  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  console.log('Appoientment props', props)

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {

    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW)});
  
  };



  const deleteInterview = () => {

    transition(CONFIRM);

  }

  const confirmDelete = () => {

    transition(DELETING);
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY)});

  }

  return (
  <>
    <Header time={props.time} />
    
    {mode === EMPTY && <Empty onAdd={() => transition('CREATE')} />}
    {mode === SHOW && (
    <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
      onDelete={deleteInterview}
    />
    )}
    {mode === CREATE && (
      <Form 
        interviewers={props.interviewers}
        onSave={save}
        onCancel={event => back()}
      />
    )}
    {mode === SAVING && <Status status={'SAVING'} />}
    {mode === DELETING && <Status status={'DELETING'} />}
    {mode === CONFIRM && (
      <Confirm
        message={`Are you sure you want to delete this booking with ${props.interview.interviewer.name}?`}
        onConfirm={confirmDelete}
        onCancel={event => back()}
      />
    )}
  </>
  )
}
