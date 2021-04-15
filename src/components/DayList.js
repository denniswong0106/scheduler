
import DayListItem from "components/DayListItem";

import React from "react";

export default function DayList(props) {

  const DayListItems = props.days.map(day => {
    return <DayListItem 
    name={day.name} 
    spots={day.spots} 
    selected={day.name === props.day}
    setDay={props.setDay}
    key={day.id}  />
  })

  return <ul>{DayListItems}</ul>;
}