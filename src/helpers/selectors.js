const getAppointmentsForDay = (state, day) => {
  // find the appointment array of given day
  // then iterate through appointments and return all the
  // appointment objects with matching ids

  const filterDaysByDay = state.days.filter(
    (stateDay) => day === stateDay.name
  );

  const appointments = filterDaysByDay[0]
    ? filterDaysByDay[0].appointments.map((id) => state.appointments[id])
    : [];

  return appointments;
};

const getInterviewersForDay = (state, day) => {
  // find the interviewer array of given day
  // then iterate through interviewers and return all the
  // interviewer objects with matching ids

  const filterDaysByDay = state.days.filter(
    (stateDay) => day === stateDay.name
  );

  const interviewers = filterDaysByDay[0]
    ? filterDaysByDay[0].interviewers.map((id) => state.interviewers[id])
    : [];

  return interviewers;
};

const getInterview = (state, interview) => {
  if (!interview) {
    return null;
  } else {
    const interviewerId = interview.interviewer;
    const interviewerObj = { ...state.interviewers[interviewerId] };
    return { ...interview, interviewer: interviewerObj };
  }
};

export { getInterviewersForDay, getAppointmentsForDay, getInterview };
