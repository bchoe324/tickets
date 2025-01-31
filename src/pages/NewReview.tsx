import { useEffect, useState } from "react";
import styled from "styled-components";
import FindShow from "../components/reviews/FindShow";
import ReviewForm from "../components/reviews/ReviewForm";
import Header from "../components/layout/Header";
import Loading from "../components/common/Loading";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div``;

const Content = styled.div``;

export interface Review {
  show: Show;
  uid: string;
  createdAt: number;
  recommend: boolean | null;
  review: string;
}

// TODO
// [ ] 더보기 버튼 누르면 이전 데이터 불러오기

interface Show {
  id: string;
  poster: string;
  title: string;
  duration: string;
  theater: string;
}

const NewReview = () => {
  const user = auth.currentUser;
  const nav = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [review, setReview] = useState<Review>({
    show: {
      id: "",
      poster: "",
      title: "",
      duration: "",
      theater: "",
    },
    uid: "",
    createdAt: Date.now(),
    recommend: null,
    review: "",
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user || review.recommend === null || review.review === "") {
      return;
    }
    try {
      setLoading(true);
      addDoc(collection(db, "reviews"), {
        ...review,
        createdAt: Date.now(),
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      nav("/", { replace: true });
    }
  };

  useEffect(() => {
    if (!user) return;
    setReview((prev) => ({
      ...prev,
      uid: user.uid,
    }));
  }, []);

  return (
    <Wrapper>
      {isLoading ? <Loading /> : null}
      <div>
        <Header
          center={"리뷰 작성"}
          right={
            <input
              className="button"
              type="submit"
              value="저장"
              form="review"
              disabled={
                review?.recommend !== null && review.review ? false : true
              }
            />
          }
        />
        <Content>
          {review.show.title ? (
            <ReviewForm
              review={review}
              setReview={setReview}
              onSubmit={onSubmit}
            />
          ) : (
            <FindShow review={review} setReview={setReview} />
          )}
        </Content>
      </div>
    </Wrapper>
  );
};

export default NewReview;
