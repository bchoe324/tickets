import xmlToJson from "../util/xmlToJson";
import useDebounce from "../hooks/useDebounce";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import styled from "styled-components";
import Loading from "./Loading";
import { useNavigate, useOutletContext } from "react-router-dom";

const apikey = import.meta.env.VITE_KOPIS_API_KEY;

type ContextType = {
  performance: {
    id: string;
    poster: string;
    title: string;
    duration: string;
    fcltynm: string;
  };
  setPerformance: React.Dispatch<React.SetStateAction<object>>;
};

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
    &.checked {
      background-color: #7416ff;
      p {
        color: #fff;
      }
    }
    label {
      width: 100%;
      display: flex;
      align-items: center;
      cursor: pointer;
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
    input {
      display: none;
    }
  }
`;

const SelectPerformance = () => {
  const nav = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const { performance, setPerformance } = useOutletContext<ContextType>();
  const debouncedKeyword = useDebounce(keyword, 1500);

  const fetchAPI = async (name: string) => {
    try {
      setLoading(true);
      const encoding = encodeURIComponent(name);
      const today = format(new Date(), "yyyyMMdd");
      const apiURL = `api/openApi/restful/pblprfr?service=${apikey}&stdate=20000101&eddate=${today}&cpage=1&rows=10&shprfnm=${encoding}`;
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

  useEffect(() => {
    if (debouncedKeyword) {
      fetchAPI(debouncedKeyword);
    }
  }, [debouncedKeyword]);

  const onChangeSearchInput = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setKeyword(e.target.value);
  };

  const onSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedId(e.target.id);
    const value = JSON.parse(e.target.value);

    setPerformance(value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!performance) {
      alert("공연을 선택해 주세요");
      return;
    }
    nav("/new-review/write");
  };

  return (
    <>
      {isLoading ? <Loading /> : null}
      <Form id="find" onSubmit={onSubmit}>
        <h3>공연 선택</h3>
        <input
          type="text"
          placeholder="공연명을 검색하세요"
          onChange={onChangeSearchInput}
        />
        <List>
          {data.length > 0 ? (
            <p className="notice">공연을 선택해 주세요</p>
          ) : null}
          {data &&
            data.map((item) => {
              const value = {
                id: item.mt20id,
                poster: item.poster,
                title: item.prfnm,
                duration: `${item.prfpdfrom} ~ ${item.prfpdto}`,
                theater: item.fcltynm,
              };
              return (
                <div
                  className={`item ${
                    selectedId === item.mt20id ? "checked" : ""
                  }`}
                  key={item.mt20id}
                >
                  <label htmlFor={item.mt20id}>
                    <img className="poster" src={item.poster} />
                    <div className="text">
                      <p className="title">{item.prfnm}</p>
                      <p className="duration">
                        {item.prfpdfrom} ~ {item.prfpdto}
                      </p>
                      <p className="theater">{item.fcltynm}</p>
                    </div>
                  </label>
                  <input
                    type="radio"
                    id={item.mt20id}
                    name="performance"
                    value={JSON.stringify(value)}
                    onChange={onSelect}
                  />
                </div>
              );
            })}
        </List>
      </Form>
    </>
  );
};

export default SelectPerformance;
