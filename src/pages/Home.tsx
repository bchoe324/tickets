import styled from "styled-components";
import Ranks from "../components/Ranks";
import Reviews from "../components/Reviews";

const Wrapper = styled.div`
  section {
    padding: 20px 20px 60px;
    &.ranks {
      padding-right: 0;
    }
    h2 {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 10px;
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
