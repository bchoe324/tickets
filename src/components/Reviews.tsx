import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import styled from "styled-components";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { Review } from "../pages/NewReview";
import ThumbUpIcon from "../assets/icons/ThumbUpIcon";
import ThumbDownIcon from "../assets/icons/ThumbDownIcon";
import ToggleText from "./common/ToggleText";
import getRelativeTime from "../util/getRelativeTime";

const Wrapper = styled.section`
  .review_wrapper {
    display: flex;
    flex-direction: column;
    .item {
      position: relative;
      display: flex;
      padding: 40px 25px;
      border-bottom: 1px solid #ccc;
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
  }
`;

type ReviewCardType = Pick<
  Review,
  "show" | "recommend" | "createdAt" | "review"
>;

const Reviews = () => {
  const [reviews, setReviews] = useState<ReviewCardType[]>([]);
  const now = Date.now();

  const fetchReviews = async () => {
    const reviewQuery = query(
      collection(db, "reviews"),
      orderBy("createdAt", "desc"),
      limit(5)
    );
    const reviewSnap = await getDocs(reviewQuery);
    const reviewArray = reviewSnap.docs.map((doc) => {
      const { show, recommend, review, createdAt } = doc.data();
      return {
        show,
        recommend,
        review,
        createdAt,
      };
    });
    setReviews(reviewArray);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <Wrapper className="reviews">
      <h2>공연 리뷰</h2>
      <div className="review_wrapper">
        {reviews &&
          reviews.map((review) => (
            <div className="item" key={review.createdAt}>
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
              <p className="created_time">
                {getRelativeTime(review.createdAt, now)}
              </p>
            </div>
          ))}
      </div>
    </Wrapper>
  );
};

export default Reviews;
