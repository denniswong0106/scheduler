import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";



// import classNames from "classnames";

export default function InterviewerList(props) {

  // props.interviewer = array of objects for info of each interviewer
  // props.interviewer.length = the id of interviewer
  // props.setInterviewer = a function takes in interviewer id 

  console.log(props);
  const Interviewers = props.interviewers.map(interviewer => {
    return <InterviewerListItem
    id={interviewer.id}
    name={interviewer.name}
    avatar={interviewer.avatar}
    selected={props.interviewer === interviewer.id}
    setInterviewer={() => {props.setInterviewer(interviewer.id)}}
    key={interviewer.id}
    />
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{Interviewers}</ul>
    </section>
  );
}

