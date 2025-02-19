import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Content } from "..//tickets/TicketInfoComponents";
import { useTicketForm } from "./TicketFormContext";

const TicketForm = ({
  onSubmit,
}: {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
  const { ticket, setTicket, preview, setPreview, file, setFile } =
    useTicketForm();
  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    // 파일 개수 & 파일 용량 1MB 이하
    if (files && files?.length === 1) {
      if (files[0].size > 1024 ** 2) return;
      // 파일 저장
      setFile(files[0]);
      // 미리보기
      setPreview(URL.createObjectURL(files[0]));
    }
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTicket((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const onChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTicket((prev) => ({
      ...prev,
      review: e.target.value,
    }));
  };

  return (
    <form className="content" onSubmit={onSubmit} id="ticket">
      <Content>
        <div className="image">
          <label htmlFor="image">
            <div className="preview">
              {preview ? (
                <img src={preview} />
              ) : (
                <svg
                  fill="#333"
                  width="800px"
                  height="800px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M22,19 C22,20.6568542 20.6568542,22 19,22 L5,22 C3.34314575,22 2,20.6568542 2,19 L2,5 C2,3.34314575 3.34314575,2 5,2 L9.0005,2 C9.55250861,2 10,2.44749139 10,2.9995 C10,3.55154094 9.55254095,3.99908949 9.00050002,3.9991999 L5,4 C4.44771525,4 4,4.44771525 4,5 L4,18.278 L8.18626653,12.4187618 C8.50017051,11.9792962 9.09949173,11.8737129 9.54124102,12.158983 L9.6401844,12.2317787 L14.785,16.518 L16.1679497,14.4452998 C16.4946552,13.9552416 17.1635825,13.8584909 17.6141119,14.2105599 L17.7071068,14.2928932 L20,16.585 L20,15 C20,14.4477153 20.4477153,14 21,14 C21.5522847,14 22,14.4477153 22,15 L22,19 Z M9.187,14.458 L5.228,20 L19,20 C19.4289102,20 19.794752,19.7299721 19.9367986,19.3506434 L17.155,16.57 L15.8320503,18.5547002 C15.5242948,19.0163334 14.9063415,19.1337563 14.4540306,18.8379569 L14.3598156,18.7682213 L9.187,14.458 Z M17,2 C17.5522847,2 18,2.44771525 18,3 L18,6 L21,6 C21.5522847,6 22,6.44771525 22,7 C22,7.55228475 21.5522847,8 21,8 L18,8 L18,11 C18,11.5522847 17.5522847,12 17,12 C16.4477153,12 16,11.5522847 16,11 L16,8 L13,8 C12.4477153,8 12,7.55228475 12,7 C12,6.44771525 12.4477153,6 13,6 L16,6 L16,3 C16,2.44771525 16.4477153,2 17,2 Z M8,6 C9.1045695,6 10,6.8954305 10,8 C10,9.1045695 9.1045695,10 8,10 C6.8954305,10 6,9.1045695 6,8 C6,6.8954305 6.8954305,6 8,6 Z" />
                </svg>
              )}
            </div>
          </label>
          <input type="file" id="image" onChange={onChangeFile} />
        </div>
        <div className="title">
          <input
            required
            type="text"
            id="title"
            placeholder="제목을 입력하세요"
            onChange={onChangeInput}
            value={ticket.title}
          />
        </div>
        <div>
          <label htmlFor="">일시</label>
          <div className="date_picker">
            <DatePicker
              showIcon
              selected={new Date(ticket.date)}
              onChange={(date) =>
                setTicket((prev) => ({
                  ...prev,
                  date: new Date(date).getTime(),
                }))
              }
              showTimeSelect
              timeIntervals={30}
              dateFormat="yyyy년 MM월 dd일 HH시 mm분"
            />
          </div>
        </div>
        <div>
          <label htmlFor="cast">캐스트</label>
          <input
            type="text"
            id="cast"
            placeholder="캐스트를 입력하세요"
            onChange={onChangeInput}
            value={ticket.cast}
          />
        </div>
        <div>
          <label htmlFor="theater">극장</label>
          <input
            type="text"
            id="theater"
            placeholder="극장을 입력하세요"
            onChange={onChangeInput}
            value={ticket.theater}
          />
        </div>
        <div>
          <label htmlFor="seat">좌석</label>
          <input
            type="text"
            id="seat"
            placeholder="좌석을 입력하세요"
            onChange={onChangeInput}
            value={ticket.seat}
          />
        </div>
        <div>
          <label htmlFor="price">금액</label>
          <input
            type="text"
            id="price"
            placeholder="금액을 입력하세요"
            onChange={onChangeInput}
            value={ticket.price}
          />
        </div>
        <div>
          <label htmlFor="site">예매처</label>
          <input
            type="text"
            id="site"
            placeholder="예매처를 입력하세요"
            onChange={onChangeInput}
            value={ticket.site}
          />
        </div>
        <div className="review">
          <label htmlFor="review">리뷰</label>
          <textarea
            id="review"
            maxLength={300}
            onChange={onChangeTextarea}
            value={ticket.review}
          ></textarea>
        </div>
      </Content>
    </form>
  );
};

export default TicketForm;
