import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ThumbDownIcon from "../assets/icons/ThumbDownIcon";
import ThumbUpIcon from "../assets/icons/ThumbUpIcon";
import { Review } from "../pages/NewReview";

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

type PropsType = {
  review: Review;
  setReview: React.Dispatch<React.SetStateAction<Review>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

const ReviewForm = ({ review, setReview, onSubmit }: PropsType) => {
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    // 리뷰 데이터 있으면 selectedId에 라디오버튼 선택 정보 저장
    if (review.recommend !== null) {
      const radioId = review.recommend ? "like" : "dislike";
      setSelectedId(radioId);
    }
  }, []);

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

  if (!review.show) {
    return <Navigate to="/" />;
  } else {
    return (
      <>
        <Form id="review" onSubmit={onSubmit}>
          <div className="performance section">
            <p className="notice">관람 공연</p>
            <div className="box">
              <img src={review.show.poster} />
              <div className="text">
                <p className="title">{review.show.title}</p>
                <p className="duration">{review.show.duration}</p>
                <p className="theater">{review.show.theater}</p>
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
              value={review.review}
            ></textarea>
          </div>
        </Form>
      </>
    );
  }
};

export default ReviewForm;
