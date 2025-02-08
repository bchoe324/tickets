import styled from "styled-components";
import Header from "../components/layout/Header";
import useRank from "../hooks/useRank";
import { format, subDays } from "date-fns";
import { useNavigate } from "react-router-dom";
import Loading from "../components/common/Loading";

const RankingLayout = styled.div`
  .item {
    display: flex;
    padding: 25px;
    border-bottom: 1px solid #ccc;
    cursor: pointer;

    .poster {
      position: relative;
      flex: 0 0 auto;
      width: 30%;
      height: 100%;
      aspect-ratio: 3/4;
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
      .rank {
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #000;
        color: #fff;
        font-weight: 500;
        font-size: 12px;
        text-align: center;
        position: absolute;
        top: 0;
        left: 0;
        border-top-left-radius: 4px;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 4px;
      }
    }
    .text {
      margin-left: 20px;
      flex: 1 1 auto;
      p {
        margin-top: 5px;
        &.title {
          font-weight: 600;
          margin-top: 0;
        }
      }
    }
  }
`;

const Ranking = () => {
  const nav = useNavigate();
  const { isLoading, isError, ranks } = useRank();
  const today = format(new Date(), "yyyy년 MM월 dd일");
  const weekBefore = format(subDays(new Date(), 7), "yyyy년 MM월 dd일");

  if (isLoading) return <Loading />;
  if (isError) return <div>데이터를 불러올 수 없습니다.</div>;

  return (
    <RankingLayout>
      <Header center={"이번 주 공연 순위"} />
      <div className="item_wrapper">
        {Array.isArray(ranks) &&
          ranks.map((item) => {
            return (
              <div
                className="item"
                key={item.mt20id}
                onClick={() => nav(`/show/${item.mt20id}`)}
              >
                <div className="poster">
                  <span className="rank">{item.rnum}</span>
                  <img src={item.poster} />
                </div>
                <div className="text">
                  <p className="title">{item.prfnm}</p>
                  <p>{item.prfplcnm}</p>
                  <p>{item.prfpd}</p>
                </div>
              </div>
            );
          })}
      </div>
      <p className="notice">
        {`※ 집계 기간: ${weekBefore} ~ ${today}`} <br /> ※ 출처:
        (재)예술경영지원센터 공연예술통합전산망(www.kopis.or.kr)
      </p>
    </RankingLayout>
  );
};

export default Ranking;
