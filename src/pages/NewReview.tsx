import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import PrevIcon from "../assets/icons/PrevIcon";

const Wrapper = styled.div``;

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
  > div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .button {
    display: block;
    height: 100%;
    cursor: pointer;
    padding: 0;
    background: none;
    border: 0 none;
    svg {
      display: block;
      width: auto;
      height: 32px;
    }
    &:hover,
    &:active {
      opacity: 0.8;
    }
  }
  .right {
    .button svg {
      height: 24px;
    }
    .button:last-child {
      margin-left: 10px;
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
    &:disabled {
      cursor: default;
      color: #ccc;
    }
  }
`;

const Content = styled.div``;

export interface Review {
  performanceId: string;
  title: string;
  poster: string;
  uid: string;
  createdAt: number;
  recommend: boolean;
  review: string;
}

// TODO
// [ ] 더보기 버튼 누르면 이전 데이터 불러오기

type Performance = {
  id: string;
  poster: string;
  title: string;
  duration: string;
};

const NewReview = () => {
  const nav = useNavigate();
  const [review, setReview] = useState<Review>();
  const [performance, setPerformance] = useState<Performance>();
  const location = useLocation();

  return (
    <Wrapper>
      <div>
        <Header>
          <button className="button" onClick={() => nav(-1)}>
            <PrevIcon fill="#333" />
          </button>
          <h2>리뷰 작성</h2>
          {location.pathname === "/new-review/write" ? (
            <input type="submit" form="write" value="저장" />
          ) : (
            <input type="submit" form="find" value="다음" />
          )}
        </Header>
        <Content>
          <Outlet
            context={{ performance, setPerformance, review, setReview }}
          />
        </Content>
      </div>
    </Wrapper>
  );
};

export default NewReview;
