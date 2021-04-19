import React, {useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";
import DayList from "components/DayList.js";
import Appointment from "components/Appointment/index.js";
import {getInterviewersForDay, getAppointmentsForDay, getInterview} from "helpers/selectors.js";

export default function Application(props) {


  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(()=> {

    const urlDays = '/api/days';
    const urlAppointments = 'api/appointments';
    const urlInterviewers = 'api/interviewers';

    const axiosCall = url => axios.get(url);

    Promise.all([axiosCall(urlDays), axiosCall(urlAppointments), axiosCall(urlInterviewers)])
      .then((all) => {
        setState(prev => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        }))
      });
    }, []);

  function bookInterview(id, interview) {
    console.log('interview', interview)
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const urlBook = `/api/appointments/${id}`;

    return axios.put(urlBook, {interview})
      .then(resolve => {
        console.log('resolved')
        setState(prev => ({
          ...prev,
          appointments
        }))
        return resolve;
      })

  };

  const cancelInterview = (id) => {
    console.log('cancelInterview', id)
    const interview = {interview: null};
    const urlDelete = `/api/appointments/${id}`;

    return axios.delete(urlDelete)
      .then(resolve => {
        console.log('resolved', resolve)
      })

  }

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);

  const mapAppointments = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return <Appointment 
      key={appointment.id} {...appointment} 
      interview={interview} 
      interviewers={dailyInterviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
    />;
  });



  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {mapAppointments}
      </section>

      
    </main>
    
  );
}
