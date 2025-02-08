import { Link } from "react-router-dom";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import NextIcon from "../assets/icons/NextIcon";
import useRank from "../hooks/useRank";
import Loading from "./common/Loading";

const Wrapper = styled.section`
  padding-right: 0;

  .rank_swiper {
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
    }
    .poster {
      aspect-ratio: 3/4;
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
`;

const Ranks = () => {
  const { isLoading, isError, ranks } = useRank();
  if (isLoading) return <Loading />;
  if (isError) return <div>데이터를 불러올 수 없습니다.</div>;
  return (
    <Wrapper className="ranks">
      <div className="title_wrapper">
        <h2>공연 순위</h2>
        <Link to="/ranking" className="view_more">
          더보기 <NextIcon fill="#333" />
        </Link>
      </div>

      <Swiper className="rank_swiper" slidesPerView={2.4} spaceBetween={10}>
        {Array.isArray(ranks) &&
          ranks.map((item, index) => {
            if (index < 10) {
              return (
                <SwiperSlide key={item.mt20id}>
                  <span className="rank">{index + 1}</span>
                  <img className="poster" src={item.poster} />
                </SwiperSlide>
              );
            }
          })}
      </Swiper>
    </Wrapper>
  );
};

export default Ranks;
