import { useParams } from "react-router-dom";
import xmlToJson from "../util/xmlToJson";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/layout/Header";
import Loading from "../components/common/Loading";

const apikey = import.meta.env.VITE_KOPIS_API_KEY;

const ShowLayout = styled.div`
  .info_wrapper {
    display: flex;
    margin: 20px 20px 40px;
    .poster {
      width: 30%;
      margin-right: 20px;
    }
    .text {
      flex: 1 1 auto;
    }
    .title {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      h3 {
        font-size: 18px;
        font-weight: 600;
      }
      .icon {
        margin-left: 10px;
        color: #813dff;
        font-size: 14px;
        border: 1px solid #813dff;
        border-radius: 20px;
        padding: 3px 8px;
      }
    }
    dl {
      display: flex;
      align-items: center;
      font-size: 15px;
      margin-top: 10px;
      dt {
        color: #999;
        flex: 0 1 30%;
        width: 30%;
      }
      dd {
        flex: 1 1 auto;
      }
    }
  }
  .more_info_wrapper {
    margin: 0 20px 40px;
    dl {
      font-size: 15px;
      &:nth-child(n + 2) {
        margin-top: 10px;
      }
      dt {
        color: #999;
        margin-bottom: 5px;
      }
    }
  }
  .detail_wrapper {
    width: 100%;
  }
`;

const Show = () => {
  const params = useParams();
  const [data, setData] = useState<Record<string, any>>({});
  const [isLoading, setLoading] = useState(false);

  const fetchShow = async () => {
    if (!params || !params.id) return;
    const showId = params.id;
    try {
      setLoading(true);
      const apiURL = `/api/openApi/restful/pblprfr/${showId}?service=${apikey}`;
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
    fetchShow();
  }, []);

  return (
    <ShowLayout>
      <Header center={"공연 상세 정보"} />
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className="info_wrapper">
            <div className="poster">
              <img src={data.poster} />
            </div>
            <div className="text">
              <div className="title">
                <h3>{data.prfnm}</h3>
                <span className="icon">{data.prfstate}</span>
              </div>

              <dl>
                <dt>개요</dt>
                <dd>
                  {data.genrenm} | {data.prfage}
                </dd>
              </dl>
              <dl>
                <dt>기간</dt>
                <dd>
                  {data.prfpdfrom} ~ {data.prfpdto}
                </dd>
              </dl>
              <dl>
                <dt>공연장</dt>
                <dd>{data.fcltynm}</dd>
              </dl>
              <dl>
                <dt>관람시간</dt>
                <dd>{data.prfruntime}</dd>
              </dl>
            </div>
          </div>

          <div className="more_info_wrapper">
            <dl>
              <dt>출연진</dt>
              <dd>{data.prfcast}</dd>
            </dl>
            <dl>
              <dt>가격정보</dt>
              <dd>{data.pcseguidance}</dd>
            </dl>
          </div>

          <div className="detail_wrapper">
            <img
              src={
                Array.isArray(data?.styurls)
                  ? data.styurls[0]?.styurl
                  : data?.styurls?.styurl ?? ""
              }
            />
          </div>
        </div>
      )}
    </ShowLayout>
  );
};

export default Show;
