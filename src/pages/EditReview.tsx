import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../firebase";
import { Review } from "./NewReview";
import { doc, getDoc, updateDoc, collection } from "firebase/firestore";
import styled from "styled-components";
import Loading from "../components/Loading";
import Header from "../components/Header";
import ReviewForm from "../components/ReviewForm";

const apikey = import.meta.env.VITE_KOPIS_API_KEY;

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

const EditReview = () => {
  const params = useParams();
  const user = auth.currentUser;
  const nav = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [review, setReview] = useState<Review>({
    show: { id: "", poster: "", title: "", duration: "", theater: "" },
    uid: "",
    createdAt: Date.now(),
    recommend: null,
    review: "",
  });

  const fetchReview = async () => {
    if (!user || !params.id) return;
    try {
      setLoading(true);
      const reviewRef = doc(db, "reviews", params.id);
      const reviewSnap = await getDoc(reviewRef);

      if (reviewSnap.exists()) {
        const reviewObj = reviewSnap.data();
        setReview({ ...(reviewObj as Review) });
      } else {
        console.log("문서 데이터 X");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !user ||
      !params.id ||
      review.recommend === null ||
      review.review === ""
    ) {
      return;
    }
    try {
      setLoading(true);
      const reviewRef = doc(db, "reviews", params.id);
      updateDoc(reviewRef, {
        ...review,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      nav("/my-review", { replace: true });
    }
  };

  useEffect(() => {
    fetchReview();
  }, []);

  return (
    <>
      <Header
        center={"리뷰 수정"}
        right={
          <input form="review" className="button" type="submit" value="저장" />
        }
      />
      {isLoading ? (
        <Loading />
      ) : (
        <ReviewForm review={review} setReview={setReview} onSubmit={onSubmit} />
      )}
    </>
  );
};

export default EditReview;
