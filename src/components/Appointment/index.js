import React, { Fragment } from 'react';

import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import useVisualMode from "../../hooks/useVisualMode";

export default function Appointment(props) {


  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  console.log(props)

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
  <>
    <Header time={props.time} />
    
    {mode === EMPTY && <Empty onAdd={() => transition('CREATE')} />}
    {mode === SHOW && (
    <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
    />
    )}
    {mode === CREATE && (
    <Form 
      interviewers={props.interviewers}
      onSave={event => console.log("on Save clicked")}
      onCancel={event => back()}
    />
    )}
  </>
  )
}
