import {
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  eachDayOfInterval,
  format,
  getDay,
} from "date-fns";

const getCalendarDays = (date: Date) => {
  const startDate = startOfWeek(startOfMonth(date), { weekStartsOn: 0 });
  const endDate = endOfWeek(endOfMonth(date, { weekStartsOn: 0 }));
  const days = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });
  const daysInMonth = days.map((day) => ({
    date: format(day, "yyyy-MM-dd"),
    year: format(day, "yyyy"),
    month: format(day, "MM"),
    day: format(day, "d"),
    dayIndexOfWeek: getDay(day),
  }));
  return daysInMonth;
};

export default getCalendarDays;
