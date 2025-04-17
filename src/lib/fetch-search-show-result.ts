"use server";

import { format } from "date-fns";
import { XMLParser } from "fast-xml-parser";

export default async function fetchSearchShowResult(q: string) {
  const today = format(new Date(), "yyyyMMdd");
  const encoding = encodeURIComponent(q);
  const url = `http://www.kopis.or.kr/openApi/restful/pblprfr?service=${process.env.KOPIS_API_KEY}&stdate=20000101&eddate=${today}&cpage=1&rows=10&shcate=GGGA&shprfnm=${encoding}`;

  const response = await fetch(url);

  if (!response.ok) return;

  const xmlText = await response.text();

  const parser = new XMLParser();
  const jsonResult = parser.parse(xmlText);

  const searchResult = await jsonResult.dbs.db;

  return searchResult;
}
