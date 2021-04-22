const getAppointmentsForDay = (state, day) => {
  // find the appointment array of given day
  // then iterate through appointments and return all the
  // appointment objects with matching ids

  const filterDaysByDay = state.days.filter(stateDay => day === stateDay.name);

  const appointments = filterDaysByDay[0] ?
  filterDaysByDay[0].appointments.map(id => state.appointments[id]) :
  [];

  return appointments;
};

const getInterviewersForDay = (state, day) => {
  // find the interviewer array of given day
  // then iterate through interviewers and return all the
  // interviewer objects with matching ids

  const filterDaysByDay = state.days.filter(stateDay => day === stateDay.name);

  const interviewers = filterDaysByDay[0] ?
  filterDaysByDay[0].interviewers.map(id => state.interviewers[id]) :
  [];

  return interviewers;
};

const getInterview = (state, interview) => {
  
  
  if (!interview) {
    return null
  } else {
    const interviewerId = interview.interviewer;
    const interviewerObj = {...state.interviewers[interviewerId]};
    return {...interview, interviewer: interviewerObj};
  }

};

const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3],
      interviewers: [1, 2, 3]
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5],
      interviewers: [1, 4, 5]
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": { id: 2, time: "1pm", interview: null },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "4": { id: 4, time: "3pm", interview: null },
    "5": {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 }
    }
  },
  interviewers: {
    "1": {  
      "id": 1,
      "name": "Sylvia Palmer",
      "avatar": "https://i.imgur.com/LpaY82x.png"
    },
    "2": {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    },
    "3": {
      id: 3,
      name: "mista three",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    },
    "4": {
      id: 4,
      name: "missus fore",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    },
    "5": {
      id: 5,
      name: "dat phibe",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    }
  }
};


export {getInterviewersForDay, getAppointmentsForDay, getInterview};