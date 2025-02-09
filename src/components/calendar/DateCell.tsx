import styled from "styled-components";
import { format, getMonth } from "date-fns";
import { ko } from "date-fns/locale";
import { useState, useRef, useEffect } from "react";
import { CalendarTicketProps } from "../../pages/Tickets";
import { useNavigate } from "react-router-dom";
import BottomSheet from "../common/BottomSheet";
import useModal from "../../hooks/useModal";
import calendar from "../../assets/icons/date.svg";
import theater from "../../assets/icons/theater.svg";
import seat from "../../assets/icons/seat.svg";
import cast from "../../assets/icons/cast.svg";

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

  .bottom_sheat {
    .ticket_item {
      cursor: pointer;
      display: flex;
      border: 1px solid #ccc;
      border-radius: 8px;
      overflow: hidden;
      aspect-ratio: 3/1;

      &:nth-child(n + 2) {
        margin-top: 20px;
      }
      .image {
        flex: 0 0 auto;
        width: 36%;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .text {
        flex: 1 1 auto;
        text-align: left;
        > p:not(.title) {
          padding: 0 10px;
          font-size: 14px;
          line-height: 1.6;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          img {
            width: 15px;
            margin-right: 5px;
          }
        }
        .empty {
          color: #999;
        }
        .title {
          font-size: 16px;
          font-weight: 500;
          padding: 10px;
        }
      }
    }
  }
`;

const TicketWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  .item {
    flex: 1 1 auto;
    width: 100%;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
  a {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

const DateCell = ({
  pivotDate,
  month,
  day,
  date,
  tickets,
}: {
  pivotDate: Date;
  month: string;
  day: string;
  date: string;
  tickets: CalendarTicketProps[];
}) => {
  const nav = useNavigate();
  const dateWidth = useRef<HTMLDivElement>(null);
  const [dateHeight, setDateHeight] = useState(0);
  const { isOpen, openModal, closeModal } = useModal();

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
      <TicketWrapper>
        {tickets &&
          tickets.map((ticket) => {
            return (
              <div
                key={ticket.id}
                className="item"
                style={{ height: `calc(100% / ${tickets.length})` }}
                onClick={
                  tickets.length > 1
                    ? () => openModal("select-ticket")
                    : () => nav(`/tickets/detail/${ticket.id}`)
                }
              >
                <img src={ticket.image} alt="티켓 이미지" />
              </div>
            );
          })}
      </TicketWrapper>
      {/* 회차 선택 모달 */}
      {isOpen("select-ticket") ? (
        <BottomSheet
          title="기록 선택"
          onClose={() => closeModal("select-ticket")}
        >
          <div>
            {tickets && tickets.length > 1
              ? tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="ticket_item"
                    onClick={() => nav(`/tickets/detail/${ticket.id}`)}
                  >
                    <div className="image">
                      <img src={ticket.image} />
                    </div>
                    <div className="text">
                      <p className="title">{ticket.title}</p>
                      <p className="date">
                        <img src={calendar} />
                        {format(
                          ticket.date,
                          "yyyy년 MM월 dd일 (eee) HH시 mm분",
                          { locale: ko }
                        )}
                      </p>
                      <p className={!ticket.theater ? `empty` : ""}>
                        <img src={theater} />
                        {ticket.theater || "공연장"}
                      </p>
                      <p className={!ticket.seat ? `empty` : ""}>
                        <img src={seat} />
                        {ticket.seat || "좌석"}
                      </p>
                      <p className={!ticket.cast ? `empty` : ""}>
                        <img src={cast} />
                        {ticket.cast || "출연진"}
                      </p>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </BottomSheet>
      ) : null}
    </Wrapper>
  );
};

export default DateCell;
