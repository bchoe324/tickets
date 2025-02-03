import { useEffect, useState } from "react";
import { format, subDays } from "date-fns";
import xmlToJson from "../util/xmlToJson";

const apikey = import.meta.env.VITE_KOPIS_API_KEY;
const API_URL = import.meta.env.VITE_API_URL;

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

const useRank = () => {
  const today = format(new Date(), "yyyyMMdd");
  const weekBefore = format(subDays(new Date(), 7), "yyyyMMdd");
  const [ranks, setRanks] = useState<Rank[]>([]);

  const fetchAPI = async () => {
    try {
      // 장르별 예매 통계
      const apiURL = `${API_URL}/openApi/restful/boxoffice?service=${apikey}&stdate=${weekBefore}&eddate=${today}&catecode=GGGA&area=11`;
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

  return ranks;
};

export default useRank;
