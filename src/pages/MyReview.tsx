import styled from "styled-components";
import { auth, db } from "../firebase";
import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { Review } from "./NewReview";
import ThumbUpIcon from "../assets/icons/ThumbUpIcon";
import ThumbDownIcon from "../assets/icons/ThumbDownIcon";
import ToggleText from "../components/common/ToggleText";
import Loading from "../components/common/Loading";
import { format } from "date-fns";
import ActionMenu from "../components/common/ActionMenu";
import { Link, useNavigate } from "react-router-dom";
import EditIcon from "../assets/icons/EditIcon";
import DeleteIcon from "../assets/icons/DeleteIcon";
import plusIcon from "../assets/icons/plus.svg";
import Header from "../components/layout/Header";
import NoContents from "../components/common/NoContents";

const Wrapper = styled.div``;

const Content = styled.div`
  .item {
    position: relative;
    display: flex;
    padding: 40px 25px;
    border-bottom: 1px solid #ccc;
    .action_button {
      position: absolute;
      right: 10px;
      top: 10px;
    }
    .poster {
      position: relative;
      flex: 0 0 auto;
      width: 24%;
      height: 100%;
      aspect-ratio: 3/4;
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 4px;
      }
      .icon {
        position: absolute;
        top: 0;
        left: 0;
        transform: translate(-30%, -30%);
        -webkit-transform: translate(-30%, -30%);
        width: 28px;
        height: 28px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        svg {
          width: 20px;
        }
        &.like {
          background-color: #61d800;
        }
        &.dislike {
          background-color: #ff1744;
        }
      }
    }
    .text {
      margin-left: 20px;
      flex: 1 1 auto;
      .title {
        font-weight: 600;
      }
      .review {
        margin-top: 5px;
      }
      button {
        cursor: pointer;
        margin-top: 10px;
        border: 0;
        background: none;
        text-decoration: underline;
        padding: 0;
      }
    }
    .created_time {
      position: absolute;
      bottom: 10px;
      right: 20px;
      font-size: 14px;
      color: #999;
    }
  }
`;

const FloatingButton = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #813dff;
  a {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 36px;
      height: 36px;
    }
  }
`;

interface MyReviews extends Review {
  id: string;
}

const MyReview = () => {
  const nav = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [reviews, setReviews] = useState<MyReviews[]>([]);

  const fetchReviews = async () => {
    const user = auth.currentUser;
    if (!user) return;
    try {
      setLoading(true);
      const reviewQuery = query(
        collection(db, "reviews"),
        where("uid", "==", user.uid),
        limit(10),
        orderBy("createdAt", "desc")
      );
      const reviewSnap = await getDocs(reviewQuery);
      const reviewArray = reviewSnap.docs.map((doc) => {
        const { recommend, review, createdAt, show, uid } = doc.data();

        return {
          show,
          recommend,
          review,
          createdAt,
          uid,
          id: doc.id,
        };
      });
      setReviews(reviewArray);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (id: string) => {
    const isConfirmed = confirm("정말 리뷰를 삭제하시겠습니까?");
    if (!isConfirmed) return;

    try {
      setLoading(true);
      await deleteDoc(doc(db, "reviews", id));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      alert("리뷰를 삭제하였습니다.");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <Wrapper>
      {isLoading ? <Loading /> : null}
      <Header center={"내 리뷰"} />
      <Content>
        {!reviews.length ? (
          <NoContents text={<p>작성한 리뷰가 없습니다.</p>} />
        ) : (
          reviews.map((review) => (
            <div className="item" key={review.id}>
              <ActionMenu
                items={[
                  {
                    element: (
                      <span>
                        <EditIcon fill="#333" />
                        리뷰 수정하기
                      </span>
                    ),
                    onClick: () => nav(`/my-review/edit/${review.id}`),
                  },
                  {
                    element: (
                      <span className="delete_button">
                        <DeleteIcon fill="#FF5252" /> 리뷰 삭제하기
                      </span>
                    ),
                    onClick: () => onDelete(review.id),
                  },
                ]}
              />
              <div className="poster">
                <img src={review.show.poster} />
                {review.recommend ? (
                  <span className="icon like">
                    <ThumbUpIcon fill="#fff" />
                  </span>
                ) : (
                  <span className="icon dislike">
                    <ThumbDownIcon fill="#fff" />
                  </span>
                )}
              </div>
              <div className="text">
                <p className="title">{review.show.title}</p>
                <ToggleText text={review.review} maxLength={100} />
              </div>
              <div className="created_time">
                {format(review.createdAt, "yyyy. MM. dd")}
              </div>
            </div>
          ))
        )}
      </Content>
      <FloatingButton>
        <Link to="/new-review">
          <img src={plusIcon} alt="" />
        </Link>
      </FloatingButton>
    </Wrapper>
  );
};

export default MyReview;
