import classNames from "classnames";
import "components/DayListItem.scss";
import React from "react";

export default function DayListItem(props) {

  const dayClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0
  });

  const formatSpots = 
    props.spots ? 
      props.spots === 1 ? 
      props.spots + " spot remaining" : 
      props.spots + " spots remaining"  : 
      "no spots remaining";

    
  const onClick = () => props.setDay(props.name);
  return (
    <li onClick={onClick} className={dayClass}>
      <h2>{props.name}</h2> 
      <h3>{formatSpots}</h3>
    </li>
  );
}