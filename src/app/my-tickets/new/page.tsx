import DetailHeader from "@/components/detail-header";

export default async function Page() {
  return (
    <>
      <DetailHeader
        centerChild={"새 일정 추가"}
        rightChild={<button type="submit">저장</button>}
      />
      <main>
        <form action="">
          <div>
            <div>
              <label htmlFor="image"></label>
              <input required type="file" name="image" id="image" />
            </div>
          </div>
          <div>
            <input required type="text" name="title" id="title" />
          </div>
          <div>
            <label htmlFor="">일시</label>
          </div>
          <div>
            <label htmlFor="cast">캐스트</label>
            <input type="text" name="cast" id="cast" />
          </div>
          <div>
            <label htmlFor="theater">공연장</label>
            <input
              type="text"
              name="theater"
              id="theater"
              placeholder="공연장을 입력하세요"
            />
          </div>
          <div>
            <label htmlFor="seat">좌석</label>
            <input
              type="text"
              name="seat"
              id="seat"
              placeholder="좌석을 입력하세요"
            />
          </div>
          <div>
            <label htmlFor="price">금액</label>
            <input
              type="text"
              name="price"
              id="price"
              placeholder="금액을 입력하세요"
            />
            <input type="number" />
          </div>
          <div>
            <label htmlFor="site">예매처</label>
            <input
              type="text"
              name="site"
              id="site"
              placeholder="예매처를 입력하세요"
            />
          </div>
          <div>
            <label htmlFor="review">리뷰</label>
            <textarea
              name="review"
              id="review"
              maxLength={300}
              placeholder="리뷰를 입력하세요"
            />
          </div>
        </form>
      </main>
    </>
  );
}
