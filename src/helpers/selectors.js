export default function getAppointmentsForDay(state, day) {
  // find the appointment array of given day
  // then iterate through appointments and return all the
  // appointment objects with matching ids

  const filterDaysByDay = state.days.filter(stateDay => day === stateDay.name);

  const appointments = filterDaysByDay[0] ?
  filterDaysByDay[0].appointments.map(id => state.appointments[id]) :
  [];

  return appointments;
};