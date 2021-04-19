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

  return { 
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}

