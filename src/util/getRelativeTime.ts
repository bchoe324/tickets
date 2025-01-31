import { intervalToDuration } from "date-fns";

const getRelativeTime = (createdTime: number, now: number) => {
  const duration = intervalToDuration({
    start: new Date(createdTime),
    end: new Date(now),
  });
  if (!!duration.years && duration.years > 0) {
    return `${duration.years}년 전`;
  } else if (!!duration.months && duration.months > 0) {
    return `${duration.months}개월 전`;
  } else if (!!duration.weeks && duration.weeks > 0) {
    return `${duration.weeks}주 전`;
  } else if (!!duration.days && duration.days > 0) {
    return `${duration.days}일 전`;
  } else if (!!duration.hours && duration.hours > 0) {
    return `${duration.hours}시간 전`;
  } else if (!!duration.minutes && duration.minutes > 0) {
    return `${duration.minutes}분 전`;
  } else {
    return "방금 전";
  }
};

export default getRelativeTime;
