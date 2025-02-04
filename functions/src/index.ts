import * as functions from "firebase-functions";

import express from "express";
import { Request, Response } from "express";

import cors from "cors";
const app = express();
import fetch from "node-fetch";

// CORS 허용
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

app.get("/api/*", async (req: Request, res: Response) => {
  const queryParams = new URLSearchParams(req.query as any).toString();
  const apiUrl = `https://www.kopis.or.kr/${req.path.replace("/api/", "")}${
    queryParams ? `?${queryParams}` : ""
  }`;
  console.log("cors!!", apiUrl);

  try {
    const response = await fetch(apiUrl);
    if (response.body) {
      response.body.pipe(res); // 응답을 그대로 클라이언트로 전달
    } else {
      res.status(500).send({ error: "API 응답에 본문이 없습니다." });
    }
  } catch (error) {
    res.status(500).send({ error: "API 요청 실패" });
  }
});

export const apiProxy = functions.https.onRequest(app);
