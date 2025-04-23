"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Rank } from "@/types";
import Image from "next/image";

export default function RankSlide({ rankArray }: { rankArray: Rank[] }) {
  return (
    <Swiper className="" slidesPerView={2.4} spaceBetween={10}>
      {rankArray.map((item, index) => (
        <SwiperSlide key={item.mt20id}>
          <span className="w-[24px] h-[24px] flex items-center justify-center bg-black text-white text-[12px] font-medium absolute inset-0">
            {index + 1}
          </span>
          <Image
            className="aspect-3/4"
            src={item.poster}
            alt={`Poster for rank ${index + 1}`}
            width={200}
            height={300}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
