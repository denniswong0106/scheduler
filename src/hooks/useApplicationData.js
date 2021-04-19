import React, {useState, useEffect } from "react";
import axios from 'axios';


export default function useApplicationData() {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  const setDay = day => setState({ ...state, day });
  
  const axiosCall = url => axios.get(url);

  useEffect(()=> {
  
    const urlDays = '/api/days';
    const urlAppointments = 'api/appointments';
    const urlInterviewers = 'api/interviewers';
  
  
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

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
  
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  
    const urlBook = `/api/appointments/${id}`;
  
    return Promise.all([axios.put(urlBook, {interview}),axiosCall('/api/days')]) 
      .then(all => {
        console.log('resolved')
        setState(prev => ({
          ...prev,
          days: all[1].data,
          appointments
        }))
        return all;
      })
  
  };
  
  const cancelInterview = (id) => {

    const urlDelete = `/api/appointments/${id}`;
  
    return Promise.all([axios.delete(urlDelete), axiosCall('/api/days')])
      .then(all => {
        console.log('resolved')
        setState(prev => ({
          ...prev,
          days: all[1].data
        }))
      })
  
  }

  return { 
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}

