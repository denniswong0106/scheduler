import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => setState({ ...state, day });

  const axiosGetCall = (url) => axios.get(url);

  useEffect(() => {
    const urlDays = "/api/days";
    const urlAppointments = "/api/appointments";
    const urlInterviewers = "/api/interviewers";

    Promise.all([
      axiosGetCall(urlDays),
      axiosGetCall(urlAppointments),
      axiosGetCall(urlInterviewers)
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    });
  }, []);

  // gets the spots for a given day:
  const getSpotsForDay = (dayObj, appointments) => {
    let spots = 0;
    dayObj.appointments.forEach((id) => !appointments[id].interview && spots++);
    return spots;
  };

  const updateSpots = (dayName, days, appointments) => {
    // find the day object:
    const dayObj = days.find((day) => day.name === dayName);

    // calculate the spots for given day:
    const spots = getSpotsForDay(dayObj, appointments);

    // update the new day object into state without mutating state:
    const newDay = { ...dayObj, spots };
    const newDays = days.map((day) => (day.name === dayName ? newDay : day));

    return newDays;
  };

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const urlBook = `/api/appointments/${id}`;

    return axios.put(urlBook, { interview }).then((response) => {
      setState((prev) => {
        const days = updateSpots(prev.day, prev.days, appointments);
        return {
          ...prev,
          appointments,
          days
        };
      });
    });
  }

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const urlDelete = `/api/appointments/${id}`;

    return axios.delete(urlDelete).then((response) => {
      setState((prev) => {
        const days = updateSpots(prev.day, prev.days, appointments);
        return { ...prev, appointments, days };
      });
    });
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}
