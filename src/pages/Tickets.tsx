import styled from "styled-components";
import Calendar from "../components/calendar/Calendar";
import PrevIcon from "../assets/icons/PrevIcon";
import NextIcon from "../assets/icons/NextIcon";
import addTicket from "../assets/icons/add_ticket.svg";
import {
  subMonths,
  addMonths,
  format,
  endOfMonth,
  startOfMonth,
} from "date-fns";
import { createContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase";

const Wrapper = styled.div``;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;

  .left {
    display: flex;
    align-items: center;
  }

  .button {
    display: block;
    cursor: pointer;
    padding: 10px;
    background: none;
    border: 0 none;
    img,
    svg {
      height: 28px;
      width: auto;
    }
  }
`;

export interface ITicket {
  title: string;
  image: string;
  date: number;
  cast: string;
  theater: string;
  seat: string;
  price: string;
  site: string;
  review: string;
  id: string;
}

export interface CalendarTicketProps
  extends Pick<
    ITicket,
    "title" | "image" | "date" | "id" | "theater" | "cast" | "seat"
  > {}

export const MonthlyTicketsContext = createContext<CalendarTicketProps[]>([]);

const Tickets = () => {
  // 월별 티켓
  const [tickets, setTickets] = useState<CalendarTicketProps[]>([]);
  const [pivotDate, setPivotDate] = useState(new Date());
  const prevMonth = () => {
    setPivotDate((pivotDate) => {
      return subMonths(pivotDate, 1);
    });
  };
  const nextMonth = () => {
    setPivotDate((pivotDate) => {
      return addMonths(pivotDate, 1);
    });
  };

  const fetchTickets = async () => {
    const user = auth.currentUser;
    if (!user) return;
    const endTimestamp = endOfMonth(pivotDate).getTime();
    const startTimestamp = startOfMonth(pivotDate).getTime();
    const userDocRef = doc(db, "users", user.uid);
    const q = query(
      collection(userDocRef, "tickets"),
      where("date", ">=", startTimestamp),
      where("date", "<=", endTimestamp)
    );

    const querySnapshot = await getDocs(q);
    const ticketsArr = querySnapshot.docs.map((doc) => {
      const { image, title, date, theater, cast, seat } = doc.data();
      return {
        image,
        title,
        date,
        theater,
        cast,
        seat,
        id: doc.id,
      };
    });
    setTickets(ticketsArr);
  };

  useEffect(() => {
    fetchTickets();
  }, [pivotDate]);

  return (
    <>
      <Wrapper>
        <Header>
          <div className="left">
            <button onClick={prevMonth} className="button">
              <PrevIcon fill="#333" />
            </button>
            <h2>{format(pivotDate, "yyyy년 MM월")}</h2>
            <button onClick={nextMonth} className="button">
              <NextIcon fill="#333" />
            </button>
          </div>
          <div className="right">
            <Link to="/tickets/new" className="button">
              <img src={addTicket} />
            </Link>
          </div>
        </Header>
        <MonthlyTicketsContext.Provider value={tickets}>
          <Calendar pivotDate={pivotDate} />
        </MonthlyTicketsContext.Provider>
      </Wrapper>
    </>
  );
};

export default Tickets;
