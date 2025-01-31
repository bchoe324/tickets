import xmlToJson from "../util/xmlToJson";
import { useState } from "react";
import { format } from "date-fns";
import styled from "styled-components";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import { Review } from "../pages/NewReview";

const apikey = import.meta.env.VITE_KOPIS_API_KEY;

const Form = styled.form`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  h3 {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 15px;
  }
  input {
    display: block;
    width: 100%;
    padding: 10px;
    border: 1px solid #999;
    border-radius: 8px;
    &:focus {
      outline: 0;
      border-color: #9d74ff;
    }
  }
`;

const List = styled.div`
  margin-top: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .notice {
    color: #999;
    font-weight: 600;
    margin: 0 0 10px 10px;
  }
  .item {
    position: relative;
    flex: 1 1 auto;
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
    &:active {
      background-color: #7416ff;
      p {
        color: #fff;
      }
    }
    .poster {
      flex: 0 0 auto;
      height: 60px;
    }
    .text {
      margin-left: 20px;
      flex: 1 1 auto;
      p {
        margin-top: 5px;
        font-size: 14px;
        &.title {
          font-size: 16px;
          font-weight: 700;
          margin-top: 0;
        }
      }
    }
  }
`;

type PropsType = {
  review: Review;
  setReview: React.Dispatch<React.SetStateAction<Review>>;
};

const FindShow = ({ review, setReview }: PropsType) => {
  const nav = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState("");

  const fetchAPI = async (name: string) => {
    try {
      setLoading(true);
      const encoding = encodeURIComponent(name);
      const today = format(new Date(), "yyyyMMdd");
      const apiURL = `api/openApi/restful/pblprfr?service=${apikey}&stdate=20000101&eddate=${today}&cpage=1&rows=10&shcate=GGGA&shprfnm=${encoding}`;
      const response = await fetch(apiURL);
      const xmlText = await response.text();

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, "application/xml");

      const jsonResult = xmlToJson(xmlDoc);
      setData(jsonResult.dbs.db);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onChangeSearchInput = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setKeyword(e.target.value);
  };

  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchAPI(keyword);
  };

  const onSelect = ({ id, title, poster, duration, theater }: Show) => {
    setReview((prev) => ({
      ...prev,
      show: { id, title, poster, duration, theater },
    }));
  };

  return (
    <>
      {isLoading ? <Loading /> : null}
      <Form id="findPrfm" onSubmit={onSearch}>
        <h3>공연 선택</h3>
        <input
          type="text"
          placeholder="공연 이름을 검색하세요"
          onChange={onChangeSearchInput}
        />
      </Form>
      <List>
        {data.length > 0 ? (
          <p className="notice">공연을 선택해 주세요</p>
        ) : null}
        {data &&
          data.map((item) => (
            <div
              className="item"
              key={item.mt20id}
              onClick={() =>
                onSelect({
                  id: item.mt20id,
                  title: item.prfnm,
                  poster: item.poster,
                  duration: `${item.prfpdfrom} ~ ${item.prfpdto}`,
                  theater: item.fcltynm,
                })
              }
            >
              <img className="poster" src={item.poster} />
              <div className="text">
                <p className="title">{item.prfnm}</p>
                <p className="duration">
                  {item.prfpdfrom} ~ {item.prfpdto}
                </p>
                <p className="theater">{item.fcltynm}</p>
              </div>
            </div>
          ))}
      </List>
    </>
  );
};

export default FindShow;
