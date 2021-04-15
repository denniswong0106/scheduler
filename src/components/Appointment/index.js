import React, { Fragment } from 'react';

import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";

export default function Appointment(props) {


  const formatAppointment = props.id !== 'last' && (
    props.interview ? 
      <Show student={props.interview.student} interviewer={props.interview.interviewer}/> :
      <Empty/>
  );


  return (
  <>
    <Header time={props.time} />
    {formatAppointment}
  </>
  )
}
