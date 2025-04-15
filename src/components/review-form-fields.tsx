"use client";

import ThumbDownIcon from "@/assets/icons/ThumbDownIcon";
import ThumbUpIcon from "@/assets/icons/ThumbUpIcon";
import { useState } from "react";

export default function ReviewFormFields() {
  const [selectedId, setSelectedId] = useState("");

  const handleChangeRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedId(e.target.id);
  };

  return (
    <>
      <div className="recommend section">
        <p className="notice">이 작품을 추천하시나요?</p>
        <div className="mx-auto flex-between w-50 *:flex-fixed *:w-[calc((100% - 20px) / 2)] [&_input]:hidden">
          <div className="">
            <label
              htmlFor="like"
              className="cursor-pointer text-center [&_span]:block"
            >
              <div className={`icon ${selectedId === "like" ? "checked" : ""}`}>
                <ThumbUpIcon fill={selectedId === "like" ? "#fff" : "#333"} />
              </div>
              <div>추천해요</div>
            </label>
            <input
              type="radio"
              id="like"
              name="recommend"
              value={1}
              onChange={handleChangeRadio}
              checked={selectedId === "like" ? true : false}
            />
          </div>
          <div className="">
            <label
              htmlFor="dislike"
              className="cursor-pointer text-center [&_span]:block"
            >
              <div
                className={`icon ${selectedId === "dislike" ? "checked" : ""}`}
              >
                <ThumbDownIcon
                  fill={selectedId === "dislike" ? "#fff" : "#333"}
                />
              </div>
              <div>아쉬워요</div>
            </label>
            <input
              type="radio"
              id="dislike"
              name="recommend"
              value={0}
              onChange={handleChangeRadio}
              checked={selectedId === "dislike" ? true : false}
            />
          </div>
        </div>
      </div>
      <div className="review section">
        <p className="notice">상세 리뷰를 남겨보세요</p>
        <textarea
          name="review"
          maxLength={300}
          placeholder="이 공연에서 좋았던 점이나 아쉬웠던 점을 자유롭게 적어주세요. (예: 배우들의 연기가 어땠나요? 무대 연출이 흥미로웠나요?)"
          className="w-full min-h-50 p-[10px] resize-none border border-zinc-400 rounded-[8px] focus:outline-0 focus:border-primary-400"
        ></textarea>
      </div>
    </>
  );
}
