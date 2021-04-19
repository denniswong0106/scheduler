import React from 'react';

export default function Saving(props) {
  return <main className="appointment__card appointment__card--status">
  <img
    className="appointment__status-image"
    src="images/status.png"
    alt="status"
  />
  <h1>
    {props.status}
  </h1>
</main>
}