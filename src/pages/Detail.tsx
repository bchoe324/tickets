import { collection, deleteDoc, doc, getDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import { auth, db, storage } from "../firebase";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ITicket } from "./Tickets";
import DeleteIcon from "../assets/icons/DeleteIcon";
import EditIcon from "../assets/icons/EditIcon";
import Loading from "../components/common/Loading";
import { deleteObject, ref } from "firebase/storage";
import { Wrapper, Content } from "../components/tickets/TicketInfoComponents";
import Header from "../components/layout/Header";
import ActionMenu from "../components/common/ActionMenu";

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
        <Header
          right={
            <ActionMenu
              items={[
                {
                  element: (
                    <span>
                      <EditIcon fill="#333" />
                      기록 수정하기
                    </span>
                  ),
                  onClick: () => nav(`/tickets/edit/${docId}`),
                },
                {
                  element: (
                    <span className="delete_button">
                      <DeleteIcon fill="#FF5252" /> 리뷰 삭제하기
                    </span>
                  ),
                  onClick: () => onDelete(),
                },
              ]}
            />
          }
        />
        <main>
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
        </main>
      </div>
      {isLoading ? <Loading /> : null}
    </Wrapper>
  );
};

export default Detail;
