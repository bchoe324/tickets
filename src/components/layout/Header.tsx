import styled from "styled-components";
import PrevIcon from "../../assets/icons/PrevIcon";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.header`
  position: relative;
  height: 62px;
  padding: 20px;
  border-bottom: 1px solid #999;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  margin-bottom: 20px;
  .left {
    flex: 1 1 20%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .button {
      display: block;
      height: 100%;
      cursor: pointer;
      padding: 0;
      background: none;
      border: 0 none;
      svg {
        display: block;
        width: auto;
        height: 32px;
      }
      &:hover,
      &:active {
        opacity: 0.8;
      }
    }
  }
  .center {
    flex: 1 1 60%;
    display: flex;
    justify-content: center;
    align-items: center;
    h2 {
      font-weight: 600;
    }
  }
  .right {
    flex: 1 1 20%;
    width: 20%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .button {
      border: 0 none;
      background: none;
      color: #813dff;
      cursor: pointer;
      &:hover,
      &:active {
        color: #6002ee;
      }
      &:disabled {
        cursor: default;
        color: #d8ceff;
      }
    }
  }
`;

const Header = ({
  center,
  right,
}: {
  center?: React.ReactNode;
  right?: React.ReactNode;
}) => {
  const nav = useNavigate();
  return (
    <Wrapper className="header">
      <div className="left">
        <button className="button" onClick={() => nav(-1)}>
          <PrevIcon fill="#333" />
        </button>
      </div>
      <div className="center">{center ? <h2>{center}</h2> : null}</div>
      <div className="right">{right ? right : null}</div>
    </Wrapper>
  );
};

export default Header;
