import { Rank } from "@/types";
import { format, subDays } from "date-fns";
import { XMLParser } from "fast-xml-parser";

export default async function fetchRankData() {
  const today = format(new Date(), "yyyyMMdd");
  const weekBefore = format(subDays(new Date(), 7), "yyyyMMdd");

  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/api/openApi/restful/boxoffice?service=${process.env.KOPIS_API_KEY}&stdate=${weekBefore}&eddate=${today}&catecode=GGGA&area=11`;
  const response = await fetch(url, {
    next: { revalidate: 60 * 60 * 24 },
  });
  if (!response.ok) return;
  const xmlText = await response.text();

  const parser = new XMLParser();
  const jsonResult = parser.parse(xmlText);

  const rankData: Rank[] = jsonResult.boxofs.boxof;

  return rankData;
}
