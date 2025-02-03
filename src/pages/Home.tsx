import styled from "styled-components";
import Ranks from "../components/Ranks";
import Reviews from "../components/Reviews";

const Wrapper = styled.div`
  section {
    padding: 20px 20px 60px;
    &.ranks {
      padding-right: 0;
    }
    &.reviews {
      padding: 20px 0 60px;
      h2 {
        padding: 0 20px;
      }
    }

    .title_wrapper {
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .view_more {
        flex: 0 0 auto;
        text-decoration: none;
        display: flex;
        svg {
          width: 24px;
        }
      }
    }
    h2 {
      font-size: 18px;
      font-weight: 600;
    }
  }
`;

const Home = () => {
  return (
    <Wrapper>
      <Ranks />
      <Reviews />
    </Wrapper>
  );
};

export default Home;
