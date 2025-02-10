import { format, subDays } from "date-fns";
import xmlToJson from "../util/xmlToJson";
import { useQuery } from "@tanstack/react-query";

const apikey = import.meta.env.VITE_KOPIS_API_KEY;

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

  const fetchAPI = async () => {
    try {
      // 장르별 예매 통계
      const apiURL = `/api/openApi/restful/boxoffice?service=${apikey}&stdate=${weekBefore}&eddate=${today}&catecode=GGGA&area=11`;
      const response = await fetch(apiURL);
      const xmlText = await response.text();

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, "application/xml");
      const jsonResult = await xmlToJson(xmlDoc);
      if (!jsonResult?.boxofs?.boxof) {
        console.error("❌ 예상한 데이터 형식이 아님!", jsonResult);
        throw new Error("데이터를 가져올 수 없습니다.");
      }

      return jsonResult.boxofs.boxof;
    } catch (error) {
      console.log(error);
    }
  };

  const {
    data: ranks,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["ranks"],
    queryFn: fetchAPI,
    staleTime: 1000 * 60 * 60 * 24,
  });

  return { isLoading, isError, ranks };
};

export default useRank;
