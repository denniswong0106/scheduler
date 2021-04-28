import React from "react";

// creates the status animation when loading axios calls to update page
export default function Status(props) {
  return (
    <main className="appointment__card appointment__card--status">
      <img
        className="appointment__status-image"
        src="images/status.png"
        alt="status"
      />
      <h1>{props.status}</h1>
    </main>
  );
}
