import { replace, useNavigate } from "react-router-dom";
import styled from "styled-components";
import PrevIcon from "../assets/icons/PrevIcon";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { auth, db, storage } from "../firebase";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import Loading from "../components/Loading";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px;
  border-bottom: 1px solid #999;
  margin-bottom: 40px;
  font-size: 18px;
  h2 {
    font-weight: 500;
  }
  button {
    cursor: pointer;
    padding: 0;
    background: none;
    border: 0 none;
    svg {
      height: 32px;
    }
    &:hover,
    &:active {
      opacity: 0.8;
    }
  }
  input {
    border: 0 none;
    background: none;
    color: #813dff;
    cursor: pointer;
    &:hover,
    &:active {
      color: #6002ee;
    }
  }
`;

const Content = styled.div`
  > div {
    padding: 20px 20px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    &:nth-child(n + 4) {
      border-top: 1px solid #ccc;
    }
  }
  label {
    flex: 1 1 40px;
  }
  input {
    flex: 4 1 40px;
    border: 0 none;
    &:focus {
      outline: none;
    }
  }
  .image {
    label {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    input {
      display: none;
    }
    .preview {
      width: 48px;
      height: 48px;
      svg,
      img {
        width: 100%;
        height: auto;
      }
    }
  }
  .title input {
    font-size: 18px;
    font-weight: 500;
  }
  .date_picker {
    flex: 4 1 40px;
    .react-datepicker-wrapper {
      width: 100%;
    }
    .react-datepicker__input-container {
      display: flex;
      align-items: center;
      svg {
        padding: 0;
      }
    }
  }
  .review {
    flex-direction: column;
    align-items: flex-start;
    textarea {
      width: 100%;
      resize: none;
    }
  }
`;

const New = () => {
  const nav = useNavigate();
  const user = auth.currentUser;
  const [isLoading, setLoading] = useState(false);
  const [ticket, setTicket] = useState({
    title: "",
    image: "",
    date: new Date().getTime(),
    cast: "",
    seat: "",
    price: "",
    site: "",
  });
  const [preview, setPreview] = useState("");
  const [file, setFile] = useState<File | null>(null);

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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 유효성 체크
    if (!user || ticket.title === "" || !ticket.date || !file) return;
    try {
      setLoading(true);
      // ticket db에 저장
      // user 컬렉션 > uid 문서 > tickets 컬렉션
      const locationRef = ref(storage, `${user.uid}/tickets/${ticketDoc.id}`);
      const result = await uploadBytes(locationRef, file);
      const uploadedUrl = await getDownloadURL(result.ref);

      const userDocRef = doc(db, "users", user.uid);
      const ticketsCollectionRef = collection(userDocRef, "tickets");
      const ticketDoc = await addDoc(ticketsCollectionRef, {
        ...ticket,
        image: uploadedUrl,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      nav("/tickets", { replace: true });
    }
  };

  return (
    <Wrapper>
      <Form onSubmit={onSubmit}>
        <Header>
          <button onClick={() => nav("../")}>
            <PrevIcon fill="#333" />
          </button>
          <h2>새 일정 추가</h2>
          <input type="submit" value="저장" />
        </Header>
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
            <input required type="file" id="image" onChange={onChangeFile} />
          </div>
          <div className="title">
            <input
              required
              type="text"
              id="title"
              placeholder="제목을 입력하세요"
              onChange={onChangeInput}
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
                dateFormat="yyyy년 MM월 dd일 hh시 mm분"
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
            />
          </div>
          <div>
            <label htmlFor="theater">극장</label>
            <input
              type="text"
              id="theater"
              placeholder="극장을 입력하세요"
              onChange={onChangeInput}
            />
          </div>
          <div>
            <label htmlFor="seat">좌석</label>
            <input
              type="text"
              id="seat"
              placeholder="좌석을 입력하세요"
              onChange={onChangeInput}
            />
          </div>
          <div>
            <label htmlFor="price">금액</label>
            <input
              type="text"
              id="price"
              placeholder="금액을 입력하세요"
              onChange={onChangeInput}
            />
          </div>
          <div>
            <label htmlFor="site">예매처</label>
            <input
              type="text"
              id="site"
              placeholder="예매처를 입력하세요"
              onChange={onChangeInput}
            />
          </div>
          <div className="review">
            <label htmlFor="review">리뷰</label>
            <textarea
              id="review"
              maxLength={300}
              onChange={onChangeTextarea}
            ></textarea>
          </div>
        </Content>
      </Form>
      {isLoading ? <Loading /> : null}
    </Wrapper>
  );
};

export default New;
