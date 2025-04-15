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

export interface ReviewData extends ShowCard {
  show: ShowCard;
  uid: string;
  createdAt: number;
  recommend: boolean | null;
  review: string;
}

export interface ShowCard {
  id: string;
  title: string;
  poster: string;
}

export interface Show {
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
