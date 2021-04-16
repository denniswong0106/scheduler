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

const getInterview = (state, interview) => {
  


  // console.log('interviewerId', interviewerId);
  // console.log('isnterviewerObj', interviewerObj)
  
  if (!interview) {
    return null
  } else {
    const interviewerId = interview.interviewer;
    const interviewerObj = {...state.interviewers[interviewerId]};
    return {...interview, interviewer: interviewerObj};
  }

};

// const state = {
//   days: [
//     {
//       id: 1,
//       name: "Monday",
//       appointments: [1, 2, 3]
//     },
//     {
//       id: 2,
//       name: "Tuesday",
//       appointments: [4, 5]
//     }
//   ],
//   appointments: {
//     "1": { id: 1, time: "12pm", interview: null },
//     "2": { id: 2, time: "1pm", interview: null },
//     "3": {
//       id: 3,
//       time: "2pm",
//       interview: { student: "Archie Cohen", interviewer: 2 }
//     },
//     "4": { id: 4, time: "3pm", interview: null },
//     "5": {
//       id: 5,
//       time: "4pm",
//       interview: { student: "Chad Takahashi", interviewer: 2 }
//     }
//   },
//   interviewers: {
//     "1": {  
//       "id": 1,
//       "name": "Sylvia Palmer",
//       "avatar": "https://i.imgur.com/LpaY82x.png"
//     },
//     "2": {
//       id: 2,
//       name: "Tori Malcolm",
//       avatar: "https://i.imgur.com/Nmx0Qxo.png"
//     }
//   }
// };

// console.log(getInterview(state, state.appointments["3"].interview));


export {getAppointmentsForDay, getInterview};