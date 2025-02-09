import styled from "styled-components";
import getCalendarDays from "../../util/getCalendarDays";
import DateCell from "./DateCell";
import { CalendarTicketProps } from "../../pages/Tickets";
import { format } from "date-fns";

const Wrapper = styled.div`
  padding: 0 20px;
`;
const Days = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;
const Day = styled.div`
  flex: 0 0 calc(100% / 7);
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Dates = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

const DaysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

const Calendar = ({
  pivotDate,
  tickets,
}: {
  pivotDate: Date;
  tickets: CalendarTicketProps[];
}) => {
  const daysInMonth = getCalendarDays(pivotDate);

  const ticketsByDate = tickets.reduce((acc, ticket) => {
    const dayKey = format(new Date(ticket.date), "yyyyMMdd");
    acc[dayKey] = acc[dayKey] ? [...acc[dayKey], ticket] : [ticket];
    return acc;
  }, {} as Record<string, CalendarTicketProps[]>);

  return (
    <>
      <Wrapper>
        <Days>
          {DaysOfWeek.map((day) => (
            <Day key={day}>{day}</Day>
          ))}
        </Days>
        <Dates>
          {daysInMonth.map((date) => (
            <DateCell
              key={date.date}
              {...date}
              pivotDate={pivotDate}
              tickets={ticketsByDate[format(new Date(date.date), "yyyyMMdd")]}
            />
          ))}
        </Dates>
      </Wrapper>
    </>
  );
};

export default Calendar;
