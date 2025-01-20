import styled from "styled-components";
import { format, getMonth } from "date-fns";
import { useState, useRef, useEffect, useContext } from "react";
import { MonthlyTicketsContext } from "../pages/Tickets";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
  flex: 0 0 calc(100% / 7);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  &.today {
    border: 1px solid #9965f4;
  }
`;

const TicketWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  a {
    display: block;
    width: 100%;
    height: 100%;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
`;

const DateCell = ({
  pivotDate,
  month,
  day,
  date,
}: {
  pivotDate: Date;
  month: string;
  day: string;
  date: string;
}) => {
  const dateWidth = useRef<HTMLDivElement>(null);
  const [dateHeight, setDateHeight] = useState(0);
  const tickets = useContext(MonthlyTicketsContext);

  useEffect(() => {
    if (!dateWidth.current) return;
    setDateHeight(dateWidth.current.offsetWidth);
  }, []);

  return (
    <Wrapper
      ref={dateWidth}
      style={{ height: `${dateHeight}px` }}
      className={
        format(new Date(), "MMdd") === format(new Date(date), "MMdd")
          ? "today"
          : ""
      }
    >
      {getMonth(pivotDate) + 1 === Number(month) ? day : null}
      {tickets.map((ticket) => {
        if (
          format(new Date(ticket.date), "MMdd") ===
          format(new Date(date), "MMdd")
        ) {
          return (
            <TicketWrapper>
              <Link to={`tickets-detail/${ticket.id}`}>
                <img src={ticket.image} />
              </Link>
            </TicketWrapper>
          );
        }
      })}
    </Wrapper>
  );
};

export default DateCell;
