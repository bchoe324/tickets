import styled from "styled-components";
import CloseIcon from "../../assets/icons/CloseIcon";

const Wrapper = styled.div`
  position: relative;
  z-index: 15;
`;

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;
const Body = styled.div`
  max-width: 600px;
  min-width: 300px;
  width: 100%;
  height: auto;
  background-color: #fff;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 20px 20px 0 0;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
  padding: 20px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    h3 {
      font-size: 18px;
      font-weight: 500;
    }
    button {
      cursor: pointer;
      width: 20px;
      background: none;
      border: 0 none;
      padding: 0;
      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

const BottomSheet = ({
  onClose,
  children,
  title,
}: {
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <Wrapper className="bottom_sheat">
      <Background onClick={onClose}></Background>
      <Body>
        <div className="header">
          <h3>{title}</h3>
          <button onClick={onClose}>
            <CloseIcon fill="#999" />
          </button>
        </div>
        <div className="content">{children}</div>
      </Body>
    </Wrapper>
  );
};

export default BottomSheet;
