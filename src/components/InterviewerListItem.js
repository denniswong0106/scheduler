import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {
  const InterviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });

  const formatSelected = props.selected && (
    <p data-testid="selected">{props.name}</p>
  );

  return (
    <li onClick={props.setInterviewer} className={InterviewerClass}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {formatSelected}
    </li>
  );
}
