import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../firebase";
import { Review } from "./NewReview";
import { doc, getDoc, updateDoc, collection } from "firebase/firestore";
import Loading from "../components/common/Loading";
import Header from "../components/layout/Header";
import ReviewForm from "../components//reviews/ReviewForm";

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
    <div>
      <Header
        center={"리뷰 수정"}
        right={
          <input form="review" className="button" type="submit" value="저장" />
        }
      />
      {isLoading ? (
        <Loading />
      ) : (
        <main>
          <ReviewForm
            review={review}
            setReview={setReview}
            onSubmit={onSubmit}
          />
        </main>
      )}
    </div>
  );
};

export default EditReview;
