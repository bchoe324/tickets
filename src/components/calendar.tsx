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
  getWeeksInMonth,
  getYear,
  isToday,
  startOfMonth,
  subMonths,
} from "date-fns";
import { ko } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import BottomSheet from "./bottom-sheet";

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
  const weeksInMonth = getWeeksInMonth(pivotDate);
  const year = getYear(pivotDate);
  const month = getMonth(pivotDate);
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedTicket, setSelectedTicket] = useState<TicketData[]>([]);

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
      router.push(`/my-tickets/detail/${tickets[0].id}`);
    } else {
      setSelectedTicket(tickets);
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

  const calendarDays = Array.from({ length: weeksInMonth * 7 }).map(
    (_, idx) => {
      const cellDate = idx - startDay + 1;
      if (cellDate <= 0 || cellDate > daysInMonth)
        return {
          cellDate: "",
          dateKey: "",
          dailyTickets: [],
          today: false,
        };
      const date = new Date(year, month, cellDate);
      const dateKey = format(date, "yyyy-MM-dd");
      const today = isToday(date);
      const dailyTickets = ticketMap.get(dateKey) ?? [];
      return { dateKey, cellDate, dailyTickets, today };
    }
  );
  console.log(calendarDays);

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
            (item, idx) =>
              item && (
                <div
                  key={idx}
                  className={`${item.today ? "today " : ""}date-cell`}
                  onClick={() => handleDateClick(item.dailyTickets)}
                >
                  {item.dailyTickets.length > 0
                    ? item.dailyTickets.map((ticket) => (
                        <div key={ticket.id}>
                          <Image
                            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${ticket.imageUrl}`}
                            width={100}
                            height={200}
                            alt={`${ticket.title}의 대표 이미지`}
                          />
                        </div>
                      ))
                    : item.cellDate}
                </div>
              )
          )}
        </div>
      </div>
      {/* 티켓 선택 모달 */}
      {isOpen("select-ticket") ? (
        <BottomSheet
          title="티켓 선택"
          onClose={() => closeModal("select-ticket")}
        >
          <div>
            {selectedTicket.length > 1
              ? selectedTicket.map((ticket) => (
                  <Link
                    href={`/my-tickets/detail/${ticket.id}`}
                    key={ticket.id}
                    className="flex border border-zinc-300 rounded-[8px] overflow-hidden nth-[n+2]:mt-layout"
                  >
                    <div className="flex-fixed w-30">
                      <Image
                        className="w-full h-full object-cover"
                        src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${ticket.imageUrl}`}
                        width={100}
                        height={200}
                        alt={`${ticket.title} 대표 이미지`}
                      />
                    </div>
                    <div className="flex-1 text-left p-[10px] *:text-[14px] *:flex-start [&_img]:w-[15px] [&_img]:mr-[5px]">
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
                  </Link>
                ))
              : null}
          </div>
        </BottomSheet>
      ) : null}
    </>
  );
}
