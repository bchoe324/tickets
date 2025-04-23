export interface TicketData {
  title: string;
  imageUrl: string;
  date: number;
  cast: string;
  theater: string;
  seat: string;
  price: number;
  site: string;
  review: string;
  id: string;
}

export type TicketFormType = {
  title: string;
  file: File | null;
  price: number;
  date: number;
  cast: string;
  theater: string;
  seat: string;
  site: string;
  review: string;
};

export interface ReviewData {
  id: string;
  show: Show;
  createdAt: number;
  recommend: boolean | null;
  review: string;
}

export interface Show {
  id: string;
  title: string;
  poster: string;
  startDate: string;
  endDate: string;
  theater: string;
}

export interface RawShow {
  mt20id: string;
  poster: string;
  prfnm: string;
  prfpdfrom: string;
  prfpdto: string;
  fcltynm: string;
}

export interface Rank {
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
}
