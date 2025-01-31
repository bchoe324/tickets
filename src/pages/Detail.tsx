import { collection, deleteDoc, doc, getDoc } from "firebase/firestore";
import { useParams, Link, useNavigate } from "react-router-dom";
import { auth, db, storage } from "../firebase";
import { useEffect, useState } from "react";
import PrevIcon from "../assets/icons/PrevIcon";
import { format } from "date-fns";
import { ITicket } from "./Tickets";
import DeleteIcon from "../assets/icons/DeleteIcon";
import EditIcon from "../assets/icons/EditIcon";
import Loading from "../components/Loading";
import { deleteObject, ref } from "firebase/storage";
import { Wrapper, Header, Content } from "../components/TicketInfoComponents";

// TODO
// [x] 아이디로 문서 찾아서 불러오기
// [x] 디자인은 추가, 수정, 디테일 다 비슷할듯 컴포넌트로 분리?
// [x] 수정, 삭제 버튼
// [ ] confirm, alert 커스텀

const Detail = () => {
  const [isLoading, setLoading] = useState(false);
  const nav = useNavigate();
  let params = useParams();
  const docId = params.id;
  const [ticket, setTicket] = useState<ITicket>({
    title: "",
    image: "",
    date: new Date().getTime(),
    theater: "",
    cast: "",
    seat: "",
    price: "",
    site: "",
    review: "",
    id: docId ?? "",
  });

  const fetchTicket = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const userDocRef = doc(db, "users", user.uid);
    const ticketsCollectionRef = collection(userDocRef, "tickets");

    const docRef = doc(ticketsCollectionRef, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const ticketObj = docSnap.data();
      setTicket({ ...(ticketObj as ITicket) });
    } else {
      console.log("문서 데이터 X");
    }
  };

  useEffect(() => {
    fetchTicket();
  }, []);

  const onDelete = async () => {
    const isConfirmed = confirm("기록을 삭제하시겠습니까?");
    if (isConfirmed) {
      // 데이터 삭제
      try {
        setLoading(true);
        const user = auth.currentUser;
        if (!user) return;

        // 문서 삭제
        const userDocRef = doc(db, "users", user.uid);
        const ticketsCollectionRef = collection(userDocRef, "tickets");
        const docRef = doc(ticketsCollectionRef, docId);
        await deleteDoc(docRef);
        // 이미지 파일 삭제
        const storageRef = ref(storage, `${user.uid}/tickets/${docId}`);
        await deleteObject(storageRef);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        alert("삭제가 완료되었습니다.");
        nav("/tickets", { replace: true });
      }
    }
  };

  return (
    <Wrapper>
      <div className="content">
        <Header>
          <div className="left">
            <button className="button" onClick={() => nav(-1)}>
              <PrevIcon fill="#333" />
            </button>
          </div>
          <div className="right">
            <Link className="button" to={`/tickets/edit/${docId}`}>
              <EditIcon fill="#333" />
            </Link>
            <button className="button" onClick={onDelete}>
              <DeleteIcon fill="#FF5252" />
            </button>
          </div>
        </Header>
        <Content>
          <div className="image">
            <img src={ticket.image} />
          </div>
          <div className="title">
            <h2>{ticket.title}</h2>
          </div>
          <div className="date">
            <div className="label">날짜</div>
            <div className="text">
              {format(ticket.date, "yyyy년 MM월 dd일 HH시 mm분")}
            </div>
          </div>
          <div className="cast">
            <div className="label">캐스트</div>
            <div className="text">{ticket.cast}</div>
          </div>
          <div className="theater">
            <div className="label">극장</div>
            <div className="text">{ticket.theater}</div>
          </div>
          <div className="seat">
            <div className="label">좌석</div>
            <div className="text">{ticket.seat}</div>
          </div>
          <div className="price">
            <div className="label">금액</div>
            <div className="text">{ticket.price}</div>
          </div>
          <div className="site">
            <div className="label">예매처</div>
            <div className="text">{ticket.site}</div>
          </div>
          <div className="review">
            <div className="label">리뷰</div>
            <div className="text">{ticket.review}</div>
          </div>
        </Content>
      </div>
      {isLoading ? <Loading /> : null}
    </Wrapper>
  );
};

export default Detail;
