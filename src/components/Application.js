import React, {useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";
import DayList from "components/DayList.js";
import Appointment from "components/Appointment/index.js";
import getAppointmentsForDay from "helpers/selectors.js"


export default function Application(props) {


  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: []
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));;

  useEffect(()=> {

    const urlDays = '/api/days';
    const urlAppointments = 'api/appointments';
    // const urlInterviewers = 'api/interviewers';

    const axiosCall = url => axios.get(url);

    Promise.all([axiosCall(urlDays), axiosCall(urlAppointments)])
      .then((all) => {

        setState(prev => ({
          ...prev,
          days: all[0].data,
          appointments:all[1].data
        }))

      });
    }, [])

   
  
  const mapAppointments = dailyAppointments.map((appointment) => {
    console.log('appointment', appointment)
    console.log('dailyAppointments', dailyAppointments)
    return <Appointment key={appointment.id} {...appointment} />;
  })

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
