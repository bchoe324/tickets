import { format, subDays } from "date-fns";
import { useEffect, useState } from "react";
import styled from "styled-components";
import xmlToJson from "../util/xmlToJson";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const apikey = import.meta.env.VITE_KOPIS_API_KEY;
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

type Rank = {
  prfplcnm: string;
  seatcnt: string;
  rnum: string;
  poster: string;
  prfpd: string;
  mt20id: string;
  prfnm: string;
  cate: string;
  prfdtcnt: string;
  area: string;
};

const Ranks = () => {
  const today = format(new Date(), "yyyyMMdd");
  const weekBefore = format(subDays(new Date(), 7), "yyyyMMdd");
  const [ranks, setRanks] = useState<Rank[]>([]);

  // TODO
  // [ ] 빌드 전에 프록시 설정 변경해야됨
  // [ ] 더보기 버튼 => 50개 다 보여주기
  const fetchAPI = async () => {
    try {
      // 장르별 예매 통계
      const apiURL = `/api/openApi/restful/boxoffice?service=${apikey}&stdate=${weekBefore}&eddate=${today}&catecode=GGGA&area=11`;
      const response = await fetch(apiURL);
      const xmlText = await response.text();

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, "application/xml");

      const jsonResult = xmlToJson(xmlDoc);
      setRanks(jsonResult.boxofs.boxof);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <Wrapper className="ranks">
      <h2>공연 순위</h2>

      <Swiper className="rank_swiper" slidesPerView={2.4} spaceBetween={10}>
        {ranks &&
          ranks.map((item, index) => {
            if (index < 10) {
              return (
                <SwiperSlide>
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
