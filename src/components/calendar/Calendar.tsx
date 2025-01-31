import styled from "styled-components";
import getCalendarDays from "../../util/getCalendarDays";
import DateCell from "./DateCell";

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

const Calendar = ({ pivotDate }: { pivotDate: Date }) => {
  const daysInMonth = getCalendarDays(pivotDate);

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
            <DateCell key={date.date} {...date} pivotDate={pivotDate} />
          ))}
        </Dates>
      </Wrapper>
    </>
  );
};

export default Calendar;
