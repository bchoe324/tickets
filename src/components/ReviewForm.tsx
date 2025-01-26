import { useState } from "react";
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";
import Loading from "./Loading";
import styled from "styled-components";
import ThumbDownIcon from "../assets/icons/ThumbDownIcon";
import ThumbUpIcon from "../assets/icons/ThumbUpIcon";
import { auth, db } from "../firebase";
import { Review } from "../pages/NewReview";
import { addDoc, collection, doc } from "firebase/firestore";

type ContextType = {
  performance: {
    id: string;
    poster: string;
    title: string;
    duration: string;
    theater: string;
  };
  review: Review;
  setReview: React.Dispatch<React.SetStateAction<object>>;
};

const Form = styled.form`
  padding: 0 20px;
  .section:nth-child(n + 2) {
    margin-top: 60px;
  }
  .notice {
    font-weight: 600;
    margin-bottom: 15px;
  }
  .performance {
    .box {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      padding: 10px;
      border: 1px solid #7416ff;
      border-radius: 8px;

      img {
        flex: 0 0 auto;
        width: 14%;
      }
      .text {
        margin-left: 20px;
        flex: 1 1 auto;
        p {
          margin-top: 5px;
          font-size: 14px;
          &.title {
            font-size: 16px;
            font-weight: 600;
            margin-top: 0;
          }
        }
      }
    }
  }
  .recommend {
    .box {
      margin: 20px auto 0;
      display: flex;
      justify-content: space-between;
      width: 50%;
      .radio {
        flex: 0 0 auto;
        width: calc((100% - 20px) / 2);
        label {
          cursor: pointer;
          text-align: center;
          span {
            display: block;
          }
          .icon {
            flex: 1 1 auto;
            padding: 8px 30px;
            border-radius: 28px;
            border: 1px solid #999;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            svg {
              width: 24px;
            }

            &.checked {
              border-color: #7416ff;
              background-color: #7416ff;
            }
          }
        }
        input {
          display: none;
        }
      }
    }
  }

  .review {
    textarea {
      width: 100%;
      padding: 10px;
      resize: none;
      border: 1px solid #999;
      border-radius: 8px;
      &:focus {
        outline: 0;
        border: 1px solid #813dff;
      }
    }
  }
`;
// TODO
// [ ] 작성중인 폼 데이터 캐시에 저장?
// [ ] review, setReview useOutletContext()로 가져오지 말고, 그냥 컴포넌트 내부에 만들어도 될 듯
const ReviewForm = () => {
  const user = auth.currentUser;
  const nav = useNavigate();
  const { performance, review, setReview } = useOutletContext<ContextType>();
  const [isLoading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const onChangeRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedId(e.target.id);
    setReview((prev) => ({
      ...prev,
      recommend: Boolean(Number(e.target.value)),
    }));
  };

  const onChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview((prev) => ({
      ...prev,
      review: e.target.value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !user ||
      typeof review.recommend === "undefined" ||
      review.review === ""
    ) {
      return;
    }
    const updatedReview = {
      ...review,
      uid: user.uid,
      createdAt: Date.now(),
      performanceId: performance.id,
      title: performance.title,
      poster: performance.poster,
    };
    setReview(updatedReview);
    try {
      setLoading(true);
      addDoc(collection(db, "reviews"), {
        ...updatedReview,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      nav("/", { replace: true });
    }
  };

  if (!performance) {
    return <Navigate to="/" />;
  } else {
    return (
      <>
        {isLoading ? <Loading /> : null}
        <Form id="write" onSubmit={onSubmit}>
          <div className="performance section">
            <p className="notice">관람 공연</p>
            <div className="box">
              <img src={performance.poster} />
              <div className="text">
                <p className="title">{performance.title}</p>
                <p className="duration">{performance.duration}</p>
                <p className="theater">{performance.theater}</p>
              </div>
            </div>
          </div>
          <div className="recommend section">
            <p className="notice">이 작품을 추천하시나요?</p>
            <div className="box">
              <div className="radio">
                <label htmlFor="like">
                  <div
                    className={`icon ${selectedId === "like" ? "checked" : ""}`}
                  >
                    <ThumbUpIcon
                      fill={selectedId === "like" ? "#fff" : "#333"}
                    />
                  </div>
                  <div>추천해요</div>
                </label>
                <input
                  type="radio"
                  id="like"
                  name="recommend"
                  value="1"
                  onChange={onChangeRadio}
                />
              </div>
              <div className="radio">
                <label htmlFor="dislike">
                  <div
                    className={`icon ${
                      selectedId === "dislike" ? "checked" : ""
                    }`}
                  >
                    <ThumbDownIcon
                      fill={selectedId === "dislike" ? "#fff" : "#333"}
                    />
                  </div>
                  <div>아쉬워요</div>
                </label>
                <input
                  type="radio"
                  id="dislike"
                  name="recommend"
                  value="0"
                  onChange={onChangeRadio}
                />
              </div>
            </div>
          </div>
          <div className="review section">
            <p className="notice">상세 리뷰를 남겨보세요</p>
            <textarea
              id="review"
              maxLength={300}
              placeholder="이 공연에서 좋았던 점이나 아쉬웠던 점을 자유롭게 적어주세요. (예: 배우들의 연기가 어땠나요? 무대 연출이 흥미로웠나요?)"
              onChange={onChangeTextarea}
            ></textarea>
          </div>
        </Form>
      </>
    );
  }
};

export default ReviewForm;
