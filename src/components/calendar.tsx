"use client";

import NextIcon from "@/assets/icons/NextIcon";
import PrevIcon from "@/assets/icons/PrevIcon";
import addTicket from "@/assets/icons/add_ticket.svg";
import calendar from "@/assets/icons/date.svg";
import theater from "@/assets/icons/theater.svg";
import seat from "@/assets/icons/seat.svg";
import cast from "@/assets/icons/cast.svg";
import useModal from "@/hooks/useModal";
import { TicketData } from "@/types";
import {
  addMonths,
  format,
  getDay,
  getDaysInMonth,
  getMonth,
  getYear,
  isToday,
  startOfMonth,
  subMonths,
} from "date-fns";
import { ko } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import BottomSheet from "./BottomSheet";

const DaysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

export default function Calendar({
  pivotDate,
  tickets,
}: {
  pivotDate: Date;
  tickets: TicketData[];
}) {
  const router = useRouter();
  const startDate = startOfMonth(pivotDate);
  const daysInMonth = getDaysInMonth(pivotDate);
  const startDay = getDay(startDate);
  const year = getYear(pivotDate);
  const month = getMonth(pivotDate);
  const { isOpen, openModal, closeModal } = useModal();

  function handleMonthChange(delta: number) {
    const newDate =
      delta > 0
        ? addMonths(pivotDate, Math.abs(delta))
        : subMonths(pivotDate, Math.abs(delta));
    const year = getYear(newDate);
    const month = getMonth(newDate);
    router.push(`/tickets?year=${year}&month=${month}`);
  }

  function handleDateClick(tickets: TicketData[]) {
    if (tickets.length <= 0) {
      return;
    } else if (tickets.length === 1) {
      router.push(`/tickets/detail/${tickets[0].id}`);
    } else {
      openModal("select-ticket");
    }
  }

  const ticketMap = useMemo(() => {
    const map = new Map<string, TicketData[]>();
    tickets.forEach((ticket) => {
      const dateKey = format(new Date(ticket.date), "yyyy-MM-dd");
      if (!map.has(dateKey)) {
        map.set(dateKey, []);
      }
      map.get(dateKey)!.push(ticket);
    });
    return map;
  }, [tickets]);

  const calendarDays = Array.from({ length: daysInMonth + startDay }).map(
    (_, idx) => {
      const day = (startDay + idx) % 7;
      const cellDate = idx - startDay + 1;
      if (cellDate <= 0) return null;
      const date = new Date(year, month, cellDate);
      const dateKey = format(date, "yyyy-MM-dd");
      const today = isToday(date);
      const dailyTickets = ticketMap.get(dateKey) ?? [];
      return { dateKey, cellDate, day, dailyTickets, today };
    }
  );

  return (
    <>
      <div className="calendar-header">
        <div className="title">
          <button className="button" onClick={() => handleMonthChange(-1)}>
            <PrevIcon fill="currentColor" />
          </button>
          <h2>{format(pivotDate, "yyy년 MM월")}</h2>
          <button className="button" onClick={() => handleMonthChange(1)}>
            <NextIcon fill="currentColor" />
          </button>
        </div>
        <div>
          <Link className="button" href={"/my-tickets/new"}>
            <Image src={addTicket} width={48} height={48} alt="새 일정 등록" />
          </Link>
        </div>
      </div>
      <div className="calendar-body">
        <div className="weekday-header">
          {DaysOfWeek.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>
        <div className="date-table">
          {calendarDays.map(
            (item) =>
              item && (
                <div
                  key={item.cellDate}
                  className={`${item.today ? "today " : ""}date-cell`}
                  onClick={() => handleDateClick(item.dailyTickets)}
                >
                  {item.dailyTickets.length > 0
                    ? item.dailyTickets.map((ticket) => (
                        <div key={ticket.id}>
                          <Image
                            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${ticket.imageUrl}`}
                            width={60}
                            height={80}
                            alt={`${ticket.title}의 대표 이미지`}
                          />
                        </div>
                      ))
                    : item.cellDate}
                  {/* 티켓 선택 모달 */}
                  {isOpen("select-ticket") ? (
                    <BottomSheet
                      title="티켓 선택"
                      onClose={() => closeModal("select-ticket")}
                    >
                      <div>
                        {item.dailyTickets.length > 1
                          ? item.dailyTickets.map((ticket) => (
                              <div key={ticket.id}>
                                <div>
                                  <Image
                                    src={ticket.imageUrl}
                                    width={100}
                                    height={200}
                                    alt={`${ticket.title} 대표 이미지`}
                                  />
                                </div>
                                <div className="text">
                                  <p className="title">{ticket.title}</p>
                                  <p className="date">
                                    <Image
                                      src={calendar}
                                      width={15}
                                      height={15}
                                      alt="날짜 아이콘"
                                    />
                                    {format(
                                      ticket.date,
                                      "yyyy년 MM월 dd일 (eee) HH시 mm분",
                                      { locale: ko }
                                    )}
                                  </p>
                                  <p className={!ticket.theater ? `empty` : ""}>
                                    <Image
                                      src={theater}
                                      width={15}
                                      height={15}
                                      alt="공연장 아이콘"
                                    />
                                    {ticket.theater || "공연장"}
                                  </p>
                                  <p className={!ticket.seat ? `empty` : ""}>
                                    <Image
                                      src={seat}
                                      width={15}
                                      height={15}
                                      alt="좌석 아이콘"
                                    />
                                    {ticket.seat || "좌석"}
                                  </p>
                                  <p className={!ticket.cast ? `empty` : ""}>
                                    <Image
                                      src={cast}
                                      width={15}
                                      height={15}
                                      alt="출연진 아이콘"
                                    />
                                    {ticket.cast || "출연진"}
                                  </p>
                                </div>
                              </div>
                            ))
                          : null}
                      </div>
                    </BottomSheet>
                  ) : null}
                </div>
              )
          )}
        </div>
      </div>
    </>
  );
}
