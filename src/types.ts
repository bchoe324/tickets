export interface TicketData {
  title: string;
  imageUrl: string;
  date: number;
  cast: string;
  theater: string;
  seat: string;
  price: string;
  site: string;
  review: string;
  id: string;
}

export interface ReviewData extends Show {
  show: Show;
  uid: string;
  createdAt: number;
  recommend: boolean | null;
  review: string;
}

export interface Show {
  id: string;
  poster: string;
  title: string;
  duration: string;
  theater: string;
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
