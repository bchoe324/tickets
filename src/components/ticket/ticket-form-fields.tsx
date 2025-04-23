"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import { TicketData } from "@/types";

function addCommaToPrice(price: number | string) {
  return price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

type TicketFormType = {
  title: string;
  file: File | null;
  price: number;
  date: number;
  cast: string;
  theater: string;
  seat: string;
  site: string;
  review: string;
};

const defaultFormData: TicketFormType = {
  title: "",
  file: null,
  price: 0,
  date: new Date().getTime(),
  theater: "",
  cast: "",
  seat: "",
  site: "",
  review: "",
};

export default function TicketFormFields({ ticket }: { ticket?: TicketData }) {
  const [form, setForm] = useState(ticket ?? defaultFormData);

  const [formattedPrice, setFormattedPrice] = useState(
    ticket?.price ? addCommaToPrice(ticket.price) : ""
  );
  const [preview, setPreview] = useState(
    ticket?.imageUrl
      ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/tickets-images/${ticket.imageUrl}`
      : ""
  );

  const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleReview = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numeric = e.target.value.replace(/[^0-9]/g, "");
    const formatted = addCommaToPrice(numeric);
    setFormattedPrice(formatted);
    setForm((prev) => ({
      ...prev,
      price: Number(numeric),
    }));
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    // 파일 개수 & 파일 용량 1MB 이하
    if (files && files?.length === 1) {
      if (files[0].size > 1024 ** 2) return;
      // 미리보기
      setPreview(URL.createObjectURL(files[0]));
      setForm((prev) => ({
        ...prev,
        file: files[0],
      }));
    }
  };

  return (
    <div className="ticket-form-layout">
      <input type="hidden" name="ticketId" value={ticket?.id} readOnly />
      <div className="row image">
        <label htmlFor="image">
          <div className="preview">
            {preview ? (
              <Image
                src={preview}
                width={100}
                height={100}
                alt="이미지 미리보기"
              />
            ) : (
              <svg
                fill="#333"
                width="48px"
                height="48px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M22,19 C22,20.6568542 20.6568542,22 19,22 L5,22 C3.34314575,22 2,20.6568542 2,19 L2,5 C2,3.34314575 3.34314575,2 5,2 L9.0005,2 C9.55250861,2 10,2.44749139 10,2.9995 C10,3.55154094 9.55254095,3.99908949 9.00050002,3.9991999 L5,4 C4.44771525,4 4,4.44771525 4,5 L4,18.278 L8.18626653,12.4187618 C8.50017051,11.9792962 9.09949173,11.8737129 9.54124102,12.158983 L9.6401844,12.2317787 L14.785,16.518 L16.1679497,14.4452998 C16.4946552,13.9552416 17.1635825,13.8584909 17.6141119,14.2105599 L17.7071068,14.2928932 L20,16.585 L20,15 C20,14.4477153 20.4477153,14 21,14 C21.5522847,14 22,14.4477153 22,15 L22,19 Z M9.187,14.458 L5.228,20 L19,20 C19.4289102,20 19.794752,19.7299721 19.9367986,19.3506434 L17.155,16.57 L15.8320503,18.5547002 C15.5242948,19.0163334 14.9063415,19.1337563 14.4540306,18.8379569 L14.3598156,18.7682213 L9.187,14.458 Z M17,2 C17.5522847,2 18,2.44771525 18,3 L18,6 L21,6 C21.5522847,6 22,6.44771525 22,7 C22,7.55228475 21.5522847,8 21,8 L18,8 L18,11 C18,11.5522847 17.5522847,12 17,12 C16.4477153,12 16,11.5522847 16,11 L16,8 L13,8 C12.4477153,8 12,7.55228475 12,7 C12,6.44771525 12.4477153,6 13,6 L16,6 L16,3 C16,2.44771525 16.4477153,2 17,2 Z M8,6 C9.1045695,6 10,6.8954305 10,8 C10,9.1045695 9.1045695,10 8,10 C6.8954305,10 6,9.1045695 6,8 C6,6.8954305 6.8954305,6 8,6 Z" />
              </svg>
            )}
          </div>
        </label>
        <input
          required
          type="file"
          name="image"
          id="image"
          onChange={handleFile}
        />
      </div>
      <div className="row title">
        <input
          required
          type="text"
          name="title"
          id="title"
          placeholder="제목을 입력하세요"
          value={form.title}
          onChange={handleTextInput}
        />
      </div>
      <div className="row">
        <label htmlFor="">일시</label>
        <div className="date_picker">
          <DatePicker
            showIcon
            selected={new Date(form.date)}
            onChange={(date: Date | null) =>
              date && setForm((prev) => ({ ...prev, date: date.getTime() }))
            }
            showTimeSelect
            timeIntervals={30}
            dateFormat="yyyy년 MM월 dd일 HH시 mm분"
          />
          <input
            type="text"
            hidden
            readOnly
            name="date"
            value={new Date(form.date).toISOString()}
          />
        </div>
      </div>
      <div className="row">
        <label htmlFor="cast">캐스트</label>
        <input
          type="text"
          name="cast"
          id="cast"
          placeholder="캐스트를 입력하세요"
          value={form.cast}
          onChange={handleTextInput}
        />
      </div>
      <div className="row">
        <label htmlFor="theater">공연장</label>
        <input
          type="text"
          name="theater"
          id="theater"
          placeholder="공연장을 입력하세요"
          value={form.theater}
          onChange={handleTextInput}
        />
      </div>
      <div className="row">
        <label htmlFor="seat">좌석</label>
        <input
          type="text"
          name="seat"
          id="seat"
          placeholder="좌석을 입력하세요"
          value={form.seat}
          onChange={handleTextInput}
        />
      </div>
      <div className="row">
        <label htmlFor="price">금액</label>
        <input
          type="text"
          name="price_display"
          id="price"
          inputMode="numeric"
          placeholder="금액을 입력하세요"
          onChange={handlePrice}
          value={formattedPrice}
        />
        <input hidden readOnly name="price" type="number" value={form.price} />
      </div>
      <div className="row">
        <label htmlFor="site">예매처</label>
        <input
          type="text"
          name="site"
          id="site"
          placeholder="예매처를 입력하세요"
          value={form.site}
          onChange={handleTextInput}
        />
      </div>
      <div className="row review">
        <label htmlFor="review">리뷰</label>
        <textarea
          name="review"
          id="review"
          maxLength={300}
          placeholder="리뷰를 입력하세요"
          value={form.review}
          onChange={handleReview}
        />
      </div>
    </div>
  );
}
